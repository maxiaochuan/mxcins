import type { SmoothieChartOptions } from './_const';

export interface TimeSeriesOptions {
  resetBoundsInterval: number;
  resetBounds: boolean;
}

export interface TimeSeriesExtraOptions {
  interpolation?: SmoothieChartOptions['interpolation'];
  strokeStyle?: string;
  lineWidth?: number;
  fillStyle?: string;
  fillToBottom?: boolean;
}

export default class TimeSeries {
  public options: Readonly<
    TimeSeriesOptions & TimeSeriesExtraOptions & { lineWidth: number; strokeStyle: string }
  > = {
    resetBounds: true,
    resetBoundsInterval: 3000,
    lineWidth: 2,
    strokeStyle: 'none',
    // interpolation: 'bezier',
    // fillStyle: '',
    // fillToBottom: false,
  };

  public resetBoundsTimerId: number = 0;

  public disabled: boolean = false;

  public data: Array<[number, number]> = [];

  public min = Number.NaN;

  public max = Number.NaN;

  constructor(options: Partial<TimeSeriesOptions>) {
    this.options = { ...this.options, ...options };
    this.disabled = false;
  }

  public setExtraOptions(options: TimeSeriesExtraOptions): this {
    this.options = { ...this.options, ...options };
    return this;
  }

  // /**
  //  * Adds a new data point to the <code>TimeSeries</code>, preserving chronological order.
  //  *
  //  * @param timestamp the position, in time, of this data point
  //  * @param value the value of this data point
  //  * @param sumRepeatedTimeStampValues if <code>timestamp</code> has an exact match in the series, this flag controls
  //  * whether it is replaced, or the values summed (defaults to false.)
  //  */

  public append(timestamp: number, value: number, sumRepeatedTimeStampValues: boolean): this {
    // Reject NaN
    if (Number.isNaN(timestamp) || Number.isNaN(value)) return this;

    if (this.data.length > 1) {
      // Rewind until we find the place for the new data
      let i = this.data.length - 1;
      while (true) {
        const current = this.data[i];
        if (timestamp >= current[0]) {
          if (timestamp === current[0]) {
            // Update existing values in the array
            if (sumRepeatedTimeStampValues) {
              // Sum this value into the existing 'bucket'
              current[1] += value;
              value = current[1];
            } else {
              // Replace the previous value
              current[1] = value;
            }
          } else {
            // Splice into the correct position to keep timestamps in order
            this.data.splice(i + 1, 0, [timestamp, value]);
          }

          break;
        }

        i--;
        if (i < 0) {
          // This new item is the oldest data
          this.data.splice(0, 0, [timestamp, value]);

          break;
        }
      }
    } else {
      // It's the first element
      this.data.push([timestamp, value]);
    }

    this.max = Number.isNaN(this.max) ? value : Math.max(this.max, value);
    this.min = Number.isNaN(this.min) ? value : Math.min(this.min, value);

    return this;
  }

  public clear(): void {
    this.data = [];
    this.max = Number.NaN; // The maximum value ever seen in this TimeSeries.
    this.min = Number.NaN; // The minimum value ever seen in this TimeSeries.
  }

  /**
   * Recalculate the min/max values for this <code>TimeSeries</code> object.
   *
   * This causes the graph to scale itself in the y-axis.
   */
  public resetBounds(): void {
    console.log('this', this.data);
    if (this.data.length > 0) {
      // Walk through all data points, finding the min/max value
      this.data.forEach(([, v]) => {
        if (Number.isNaN(this.max) || v > this.max) {
          this.max = v;
        }
        if (Number.isNaN(this.max) || v < this.min) {
          this.min = v;
        }
      });
    } else {
      // No data exists, so set min/max to NaN
      this.max = Number.NaN;
      this.min = Number.NaN;
    }
  }

  public removeOldData(oldestValidTime: number, maxDataSetLength: number): void {
    // We must always keep one expired data point as we need this to draw the
    // line that comes into the chart from the left, but any points prior to that can be removed.

    let removeCount = 0;
    while (
      this.data.length - removeCount >= maxDataSetLength &&
      this.data[removeCount + 1][0] < oldestValidTime
    ) {
      removeCount++;
    }
    if (removeCount !== 0) {
      this.data.splice(0, removeCount);
    }
  }
}
