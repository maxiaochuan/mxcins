import * as Util from './Util';
import {
  type SmoothieChartOptions,
  DEFAULT_OPTIONS,
  SIZE_RECORD,
  VALUE_RECORD,
  STATE_RECORD,
} from './_const';
import { type default as TimeSeries, type TimeSeriesExtraOptions } from './TimeSeries';

export default class SmoothieChart {
  private readonly options: Readonly<SmoothieChartOptions>;

  private _canvas?: HTMLCanvasElement;

  private get canvas(): HTMLCanvasElement {
    if (this._canvas == null) {
      throw new Error('canvas is not init');
    }
    return this._canvas;
  }

  private set canvas(v: HTMLCanvasElement) {
    this._canvas = v;
  }

  private get context(): CanvasRenderingContext2D {
    if (this._canvas == null) {
      throw new Error('canvas is not init');
    }
    const context = this._canvas.getContext('2d');
    if (context == null) {
      throw new Error('canvas is not init');
    }
    return context;
  }

  private frameId: number = 0;

  private clientWidth: number = 0;

  private clientHeight: number = 0;

  private delay: number = 500;

  /**
   * @description 对齐数据时间点到当前时间点
   * @author Xiaochuan Ma <mxcins@gmail.com>
   * @date 2023-06-11
   * @private
   * @type {number}
   * @memberof SmoothieChart
   */
  private offset: number = 0;

  private offsetIn: number = 0;

  /**
   * @description 每帧时间，毫秒
   * @author Xiaochuan Ma <mxcins@gmail.com>
   * @date 2023-06-10
   * @private
   * @type {number}
   * @memberof SmoothieChart
   */
  private readonly frameTime: number = 0;
  /**
   * @description 最后渲染的真实时间, 毫秒
   * @author Xiaochuan Ma <mxcins@gmail.com>
   * @date 2023-06-10
   * @private
   * @type {number}
   * @memberof SmoothieChart
   */
  private lastRenderTime: number = 0;
  /**
   * @description 最后渲染图表的时间戳, 毫秒
   * @author Xiaochuan Ma <mxcins@gmail.com>
   * @date 2023-06-10
   * @private
   * @type {number}
   * @memberof SmoothieChart
   */
  private lastChartTime: number = 0;

  /**
   * @description 每像素有多少毫秒
   * @author Xiaochuan Ma <mxcins@gmail.com>
   * @date 2023-06-10
   * @private
   * @type {number}
   * @memberof SmoothieChart
   */
  private millisPerPixel: number = 0;

  /**
   * @description 纵向Grid Line 占用多少时间,毫秒
   * @author Xiaochuan Ma <mxcins@gmail.com>
   * @date 2023-06-10
   * @private
   * @type {number}
   * @memberof SmoothieChart
   */
  private millisPerLine: number = 0;

  public readonly series = new Map<string, TimeSeries>();

  private readonly state = { ...STATE_RECORD };

  private value = { ...VALUE_RECORD };

  private size = { ...SIZE_RECORD };

  constructor(options: Partial<SmoothieChartOptions> = {}) {
    this.options = {
      ...DEFAULT_OPTIONS,
      ...options,
      labels: {
        ...DEFAULT_OPTIONS.labels,
        ...options.labels,
      },
      grid: {
        ...DEFAULT_OPTIONS.grid,
        ...options.grid,
      },
    };
    if (this.options.limitFPS > 0) {
      this.frameTime = 1000 / this.options.limitFPS;
    }
  }

  public streamTo(canvas: HTMLCanvasElement, delay: number = 500): this {
    this.canvas = canvas;
    this.size = { ...SIZE_RECORD };
    this.resize();
    this.delay = delay;
    this.render(Date.now());
    return this;
  }

  public add(name: string, series: TimeSeries, options: TimeSeriesExtraOptions): void {
    this.series.set(name, series.setExtraOptions(options));
    if (series.options.resetBounds && series.options.resetBoundsInterval > 0) {
      series.resetBoundsTimerId = setInterval(() => {
        series.resetBounds();
      }, series.options.resetBoundsInterval);
    }
  }

  /**
   * Removes the specified <code>TimeSeries</code> from the chart.
   */
  public remove(name: string): void {
    const series = this.series.get(name);
    if (series != null) {
      this.series.delete(name);
      if (series.resetBoundsTimerId > 0) {
        clearInterval(series.resetBoundsTimerId);
      }
    }
  }

  public start(): void {
    if (this.frameId > 0) return;
    const animate = (): void => {
      this.frameId = requestAnimationFrame(() => {
        const now = Date.now();
        // 帧率限制
        const skip = this.options.limitFPS > 0 && now - this.lastRenderTime < this.frameTime;

        if (!skip) this.render(now);

        animate();
      });
    };

    animate();
  }

  public stop(): void {
    if (this.frameId > 0) {
      window.cancelAnimationFrame(this.frameId);
      this.frameId = 0;
      this.offset = 0;
    }
  }

  private needResetOffset(): boolean {
    if (!this.options.nonRealtimeData) return false;
    if (this.offset === 0) return true;

    let isDiff = false;
    for (const [, current] of this.series) {
      if (current.data.length < 3) continue;

      const d1 = current.data[current.data.length - 1];
      const d2 = current.data[current.data.length - 2];
      const d3 = current.data[current.data.length - 3];
      if (d1[0] - d2[0] !== d2[0] - d3[0] && this.offsetIn !== d1[0]) {
        isDiff = true;
        this.offsetIn = d1[0];
        break;
      }
    }

    return isDiff;
  }

  private resetOffset(): this {
    let max = 0;
    for (const [, series] of this.series) {
      if (series.data.length > 0) {
        const timestemp = series.data[series.data.length - 1][0];
        max = max > timestemp ? max : timestemp;
      }
    }

    if (max !== 0) this.offset = Date.now() - max;

    return this;
  }

  private render(now: number): void {
    const timestamp = (() => {
      if (this.needResetOffset()) this.resetOffset();
      return now - this.offset;
    })();

    /**
     * @description 当前绘制时间
     * @type {number}
     * */
    let time: number = (timestamp ?? now) - this.delay;
    // 时间平滑
    time -= time % this.millisPerPixel;

    if (!this.state.isAnimatingScale) {
      // We're not animating. We can use the last render time and the scroll speed to work out whether
      // we actually need to paint anything yet. If not, we can return immediately.
      const sameTime = this.lastChartTime === time;
      if (sameTime) {
        // Render at least every 1/6th of a second. The canvas may be resized, which there is
        // no reliable way to detect.
        const needToRenderInCaseCanvasResized = now - this.lastRenderTime > 1000 / 6;
        if (!needToRenderInCaseCanvasResized) {
          return;
        }
      }
    }

    this.lastRenderTime = now;
    this.lastChartTime = time;

    this.resize();

    // 绘图范围
    const dimensions = { top: 0, left: 0, width: this.clientWidth, height: this.clientHeight };

    // 最早有效时间
    const oldestValidTime = time - dimensions.width * this.millisPerPixel;

    const v2y = (v: number, lineWidth: number): number => {
      const offset = v - this.state.min;
      const y = dimensions.height * (1 - offset / this.state.range);
      return Util.pixelSnap(y, lineWidth);
    };

    const t2x = (t: number, lineWidth: number): number => {
      // Why not write it as `(time - t) / chartOptions.millisPerPixel`:
      // If a datapoint's `t` is very close or is at the center of a pixel, that expression,
      // due to floating point error, may take value whose `% 1` sometimes is very close to
      // 0 and sometimes is close to 1, depending on the value of render time (`time`),
      // which would make `pixelSnap` snap it sometimes to the right and sometimes to the left,
      // which would look like it's jumping.
      // You can try the default examples, with `millisPerPixel = 100 / 3` and
      // `grid.lineWidth = 1`. The grid would jump.
      // Writing it this way seems to avoid such inconsistency because in the above example
      // `offset` is (almost?) always a whole number.
      // TODO Maybe there's a more elegant (and reliable?) way.
      const offset = time / this.millisPerPixel - t / this.millisPerPixel;
      const x = this.options.reverse ? offset : dimensions.width - offset;
      return Util.pixelSnap(x, lineWidth);
    };

    this.update();

    const context = this.context;

    context.font = `${this.options.labels.fontSize}px ${this.options.labels.fontFamily}`;

    // Save the state of the canvas context, any transformations applied in this method
    // will get removed from the stack at the end of this method when .restore() is called.
    context.save();

    // Move the origin.
    context.translate(dimensions.left, dimensions.top);

    // Create a clipped rectangle - anything we draw will be constrained to this rectangle.
    // This prevents the occasional pixels from curves near the edges overrunning and creating
    // screen cheese (that phrase should need no explanation).
    context.beginPath();
    context.rect(0, 0, dimensions.width, dimensions.height);
    context.clip();

    const { grid } = this.options;

    // Clear the working area.
    context.save();
    context.fillStyle = grid.fillStyle;
    context.clearRect(0, 0, dimensions.width, dimensions.height);
    context.fillRect(0, 0, dimensions.width, dimensions.height);
    context.restore();

    // Grid lines...
    context.save();
    context.lineWidth = grid.lineWidth;
    context.strokeStyle = grid.strokeStyle;

    // 纵向分割线
    if (this.millisPerLine > 0) {
      context.beginPath();
      for (
        let t = time - (time % this.millisPerLine);
        t >= oldestValidTime;
        t -= this.millisPerLine
      ) {
        const gx = t2x(t, grid.lineWidth);
        context.moveTo(gx, 0);
        context.lineTo(gx, dimensions.height);
      }
      context.stroke();
    }

    // 横向分割线
    for (let v = 1; v < grid.verticalSections; v += 1) {
      const gy = Util.pixelSnap((v * dimensions.height) / grid.verticalSections, grid.lineWidth);
      context.beginPath();
      context.moveTo(0, gy);
      context.lineTo(dimensions.width, gy);
      context.stroke();
    }
    // Grid border
    if (grid.border) {
      context.strokeRect(0, 0, dimensions.width, dimensions.height);
    }
    context.restore();

    // Draw any horizontal lines...
    const horizontal = this.options.lines.filter(l => l.direction === 'horizontal');
    if (horizontal.length > 0) {
      for (let hl = 0; hl < horizontal.length; hl++) {
        const line = horizontal[hl];
        const lineWidth = line.lineWidth ?? 1;
        const hly = v2y(line.value, lineWidth);
        context.strokeStyle = line.color ?? '#ffffff';
        context.lineWidth = lineWidth;
        context.beginPath();
        context.moveTo(0, hly);
        context.lineTo(dimensions.width, hly);
        context.stroke();
      }
    }

    // For each data set...
    this.series.forEach(series => {
      const dataset = series.data;
      series.removeOldData(oldestValidTime, this.options.maxDataSetLength);
      if (dataset.length < 2 || series.disabled) return;

      context.save();

      const drawStroke =
        series.options.strokeStyle.length > 0 && series.options.strokeStyle !== 'none';
      // TODO: ???
      const lineWidthMaybeZero = drawStroke ? series.options.lineWidth : 0;

      // Draw the line...
      context.beginPath();
      const firstX = t2x(dataset[0][0], lineWidthMaybeZero);
      const firstY = v2y(dataset[0][1], lineWidthMaybeZero);
      let lastX = firstX;
      let lastY = firstY;

      context.moveTo(firstX, firstY);
      const draw = this.getDrawLineFn(series);

      dataset.forEach(([t, v]) => {
        const x = t2x(t, lineWidthMaybeZero);
        const y = v2y(v, lineWidthMaybeZero);
        draw(x, y, lastX, lastY);
        lastX = x;
        lastY = y;
      });

      if (drawStroke) {
        context.lineWidth = series.options.lineWidth;
        context.strokeStyle = series.options.strokeStyle;
        context.stroke();
      }

      if (series.options.fillStyle != null) {
        // Close up the fill region.
        const fillEndY =
          series.options.fillToBottom ?? false
            ? dimensions.height + lineWidthMaybeZero + 1
            : v2y(0, 0);
        context.lineTo(lastX, fillEndY);
        context.lineTo(firstX, fillEndY);

        context.fillStyle = series.options.fillStyle;
        context.fill();
      }

      context.restore();
    });

    // labels
    if (!this.options.labels.disabled) {
      const { labels } = this.options;
      if (!Number.isNaN(this.value.min) && !Number.isNaN(this.value.max)) {
        const maxValueString = this.value.max.toFixed(labels.precision);
        const minValueString = this.value.min.toFixed(labels.precision);
        const maxLabelPos = dimensions.width - context.measureText(maxValueString).width - 2;
        const minLabelPos = dimensions.width - context.measureText(minValueString).width - 2;
        context.fillStyle = labels.fillStyle;
        context.fillText(maxValueString, maxLabelPos, labels.fontSize);
        context.fillText(minValueString, minLabelPos, dimensions.height - 2);
      }
    }
  }

  private getDrawLineFn(
    series: TimeSeries,
  ): (x: number, y: number, lx: number, ly: number) => void {
    const context = this.context;
    const interpolation = series.options.interpolation ?? this.options.interpolation;
    switch (interpolation) {
      case 'line':
      case 'linear': {
        return (x: number, y: number, lx: number, ly: number) => {
          context.lineTo(x, y);
        };
      }
      case 'bezier': {
        return (x: number, y: number, lx: number, ly: number) => {
          context.bezierCurveTo(
            // startPoint (A) is implicit from last iteration of loop
            Math.round((lx + x) / 2),
            ly, // controlPoint1 (P)
            Math.round(lx + x) / 2,
            y, // controlPoint2 (Q)
            x,
            y,
          ); // endPoint (B)
        };
      }
      case 'step': {
        return (x: number, y: number, lx: number, ly: number) => {
          context.lineTo(x, ly);
          context.lineTo(x, y);
        };
      }
      default: {
        return (x: number, y: number, lx: number, ly: number) => {
          context.bezierCurveTo(
            // startPoint (A) is implicit from last iteration of loop
            Math.round((lx + x) / 2),
            ly, // controlPoint1 (P)
            Math.round(lx + x) / 2,
            y, // controlPoint2 (Q)
            x,
            y,
          ); // endPoint (B)
        };
      }
    }
  }

  private update(): void {
    let max = Number.NaN;
    let min = Number.NaN;

    this.series.forEach(series => {
      if (series.disabled) return;
      if (!Number.isNaN(series.max)) {
        max = !Number.isNaN(max) ? Math.max(max, series.max) : series.max;
      }
      if (!Number.isNaN(series.min)) {
        min = !Number.isNaN(min) ? Math.min(min, series.min) : series.min;
      }
    });

    if (this.options.max !== undefined) {
      max = this.options.max;
    } else {
      max *= this.options.maxValueScale;
    }

    if (this.options.min !== undefined) {
      min = this.options.min;
    } else {
      min -= Math.abs(min * this.options.minValueScale - min);
    }

    if (!Number.isNaN(max) && !Number.isNaN(min)) {
      const range = max - min;
      const rangeDiff = range - this.state.range;
      const minDiff = min - this.state.min;

      this.state.isAnimatingScale = Math.abs(rangeDiff) > 0.1 || Math.abs(minDiff) > 0.1;
      this.state.range += this.options.scaleSmoothing * rangeDiff;
      this.state.min += this.options.scaleSmoothing * minDiff;
    }

    this.value = { min, max, range: max - min };
  }

  private resize(): void {
    const dpr = window.devicePixelRatio;

    const width = this.canvas.offsetWidth;
    const height = this.canvas.offsetHeight;

    if (width !== this.size.lastWidth) {
      this.size.lastWidth = width;
      this.canvas.setAttribute('width', Math.floor(width * dpr).toString());
      this.context.scale(dpr, dpr);
    }
    if (height !== this.size.lastHeight) {
      this.size.lastHeight = height;
      this.canvas.setAttribute('height', Math.floor(height * dpr).toString());
      this.context.scale(dpr, dpr);
    }

    this.clientWidth = width;
    this.clientHeight = height;
    this.millisPerPixel = this.options.duration / this.clientWidth;
    this.millisPerLine = this.options.duration / this.options.grid.horizontalSections;
  }
}
