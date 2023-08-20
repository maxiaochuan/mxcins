import { describe, expect, it } from 'vitest';
import dayjs from 'dayjs';
import { TimeSeries } from '../src';

describe('time series', () => {
  it('remove old data', () => {
    const series = new TimeSeries();

    const times = Array.from({ length: 10 }).map((_, i) => {
      return dayjs('1990-01-01 01:00:00').add(i, 'h').valueOf();
    });
    times.forEach(time => series.append(time, 0));
    series.removeOldData(times[5], 2);
    expect(series.data.length).toEqual(6);
    series.removeOldData(times[6], 2);
    expect(series.data.length).toEqual(5);
  });
});
