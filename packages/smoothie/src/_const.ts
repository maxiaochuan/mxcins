export interface SmoothieChartOptions {
  /**
   * @description 设置最大帧数, 为0则不限制, FPS
   * @author Xiaochuan Ma <mxcins@gmail.com>
   * @date 2023-06-10
   * @type {number}
   * @memberof SmoothieChartOptions
   */
  limitFPS: number;

  /**
   * @description 总绘制时间，毫秒
   * @author Xiaochuan Ma <mxcins@gmail.com>
   * @date 2023-06-10
   * @type {number}
   * @default {20_000}
   * @memberof SmoothieChartOptions
   */
  duration: number;

  /**
   * @description allows proportional padding to be added above the chart. for 10% padding, specify 1.1.
   * @author Xiaochuan Ma <mxcins@gmail.com>
   * @date 2023-06-10
   * @type {number}
   * @default {1}
   * @memberof SmoothieChartOptions
   */
  maxValueScale: number;
  /**
   * @description allows proportional padding to be added below the chart. for 10% padding, specify 1.1.
   * @author Xiaochuan Ma <mxcins@gmail.com>
   * @date 2023-06-10
   * @type {number}
   * @default {1}
   * @memberof SmoothieChartOptions
   */
  minValueScale: number;

  /**
   * @description 可存在最大数据数量，可超出坐标
   * @author Xiaochuan Ma <mxcins@gmail.com>
   * @date 2023-06-10
   * @type {number}
   * @default {2}
   * @memberof SmoothieChartOptions
   */
  maxDataSetLength: number;

  max?: number;
  min?: number;

  /**
   * @description controls the rate at which y-value zoom animation occurs
   * @author Xiaochuan Ma <mxcins@gmail.com>
   * @date 2023-06-10
   * @type {number}
   * @default {0.125}
   * @memberof SmoothieChartOptions
   */
  scaleSmoothing: number;

  /**
   * @description 以哪种方式绘制线条
   * @author Xiaochuan Ma <mxcins@gmail.com>
   * @date 2023-06-10
   * @type {'bezier' | 'linear' | 'line' | 'step'}
   * @default {'bezier'}
   * @memberof SmoothieChartOptions
   */
  interpolation: 'bezier' | 'linear' | 'line' | 'step';

  /**
   * @description 设置是否实时数据
   * @author Xiaochuan Ma <mxcins@gmail.com>
   * @date 2023-06-11
   * @type {boolean}
   * @default {false}
   * @memberof SmoothieChartOptions
   */
  nonRealtimeData: boolean;

  /**
   * @description Label 样式
   * @author Xiaochuan Ma <mxcins@gmail.com>
   * @date 2023-06-10
   * @type {{
   *       fillStyle: string;
   *       disabled: boolean;
   *       fontSize: number;
   *       fontFamily: string,
   *       precision: number,
   *       showIntermediateLabels: boolean,
   *       intermediateLabelSameAxis: boolean,
   *     }}
   * @memberof SmoothieChartOptions
   */
  labels: {
    fillStyle: string;
    disabled: boolean;
    fontSize: number;
    fontFamily: string;
    precision: number;
    showIntermediateLabels: boolean;
    intermediateLabelSameAxis: boolean;
  };
  /**
   * @description Grid 样式
   * @author Xiaochuan Ma <mxcins@gmail.com>
   * @date 2023-06-10
   * @type {{
   *       fillStyle: string;
   *       strokeStyle: string;
   *       lineWidth: number;
   *       millisPerLine: number;
   *       verticalSections: number;
   *       borderVisible: boolean;
   *     }}
   * @memberof SmoothieChartOptions
   */
  grid: {
    fillStyle: string;
    strokeStyle: string;
    lineWidth: number;
    horizontalSections: number;
    verticalSections: number;
    border: boolean;
  };

  /**
   * @description 是否反向滚动
   * @author Xiaochuan Ma <mxcins@gmail.com>
   * @date 2023-06-10
   * @type {boolean}
   * @default {false}
   * @memberof SmoothieChartOptions
   */
  reverse: boolean;

  lines: Array<{
    direction: 'horizontal' | 'vertical';
    value: number;
    lineWidth?: number;
    color?: string;
  }>;
}

export const DEFAULT_OPTIONS: SmoothieChartOptions = {
  limitFPS: 0,
  duration: 20_000,
  maxValueScale: 1,
  minValueScale: 1,
  maxDataSetLength: 2,
  scaleSmoothing: 0.125,
  reverse: false,
  interpolation: 'bezier',
  nonRealtimeData: false,
  labels: {
    fillStyle: '#ffffff',
    disabled: false,
    fontSize: 10,
    fontFamily: 'monospace',
    precision: 2,
    showIntermediateLabels: false,
    intermediateLabelSameAxis: true,
  },
  grid: {
    fillStyle: '#000000',
    strokeStyle: '#777777',
    lineWidth: 2,
    horizontalSections: 10,
    verticalSections: 2,
    border: true,
  },
  lines: [],
};

export interface StateRecord {
  isAnimatingScale: boolean;
  range: number;
  min: number;
}

export const STATE_RECORD: StateRecord = {
  isAnimatingScale: false,
  range: 1,
  min: 0,
};

export interface SizeRecord {
  lastWidth: number;
  lastHeight: number;
}

export const SIZE_RECORD: SizeRecord = {
  lastWidth: 0,
  lastHeight: 0,
};

export interface ValueRecord {
  min: number;
  max: number;
  range: number;
}

export const VALUE_RECORD: ValueRecord = {
  min: Number.NaN,
  max: Number.NaN,
  range: Number.NaN,
};
