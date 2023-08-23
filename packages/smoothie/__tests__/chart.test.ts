import { describe, expect, it } from 'vitest';
import { SmoothieChart, TimeSeries } from '../src';

describe('smoothie chart', () => {
  it('need reset offset', () => {
    const chart = new SmoothieChart({ nonRealtimeData: true });
    expect(chart.needResetOffset()).toBe(true);
    const series = new TimeSeries();
    chart.add('series', series, { fillStyle: 'red' });
    series.append(1, 0);
    chart.resetOffset();
    expect(chart.needResetOffset()).toBe(false);
    series.append(101, 0);
    expect(chart.needResetOffset()).toBe(false);
    series.append(301, 0);
    expect(chart.needResetOffset()).toBe(true);
    series.append(501, 0);
    chart.resetOffset();
    expect(chart.needResetOffset()).toBe(false);
  });
});
