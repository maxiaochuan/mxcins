import { select, Selection, timeFormatDefaultLocale } from 'd3';
import Axis from './Axis';
import Canvas from './Canvas';
import Sider from './Sider';
import './style.less';

timeFormatDefaultLocale({
  time: '%H:%M:%S',
  dateTime: '%a %b %e %X %Y',
  date: '%Y-%m-%d',
  periods: ['AM', 'PM'],
  days: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
  shortDays: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
  months: [
    '一月',
    '二月',
    '三月',
    '四月',
    '五月',
    '六月',
    '七月',
    '八月',
    '九月',
    '十月',
    '十一月',
    '十二月',
  ],
  shortMonths: [
    '一月',
    '二月',
    '三月',
    '四月',
    '五月',
    '六月',
    '七月',
    '八月',
    '九月',
    '十月',
    '十一月',
    '十二月',
  ],
});

export interface ISize {
  width: number;
  height: number;
}

export type Modes = 'week' | 'day';

export interface IOpts {
  rowHeight?: number;
  rowPadding?: number;
  mode?: Modes;
  axisHeight?: number;
  siderWidth?: number;
}

export interface IRequiredOpts extends Required<IOpts> {}

const DEFAULT_OPTIONS: IRequiredOpts = {
  mode: 'week',
  rowHeight: 30,
  rowPadding: 4,

  axisHeight: 50,
  siderWidth: 200,
};

export interface IProgress {
  percent: number;
  color: 'gray' | 'blue' | 'yellow' | 'default';
}

export interface IRecord {
  id: string;
  name: string;
  start: string;
  finish: string;
  level: number;
  progresses: IProgress[];
}

export default class Gantt {
  private options: IRequiredOpts = DEFAULT_OPTIONS;

  private data: IRecord[] = [];

  private axis: Axis;
  private sider: Sider;
  private canvas: Canvas;

  private parent: Selection<HTMLDivElement, any, any, any>;
  private container: Selection<SVGGElement, any, any, any>;
  private svg: Selection<SVGSVGElement, any, any, any>;
  // private scale: ScaleTime<number, number>;
  constructor(wrapper: HTMLDivElement) {
    if (!wrapper) {
      throw new Error('wrapper must be exist');
    }
    this.parent = select(wrapper);
    this.svg = this.parent.append('svg').classed('gantt', true);
    this.container = this.svg.append('g').classed('gantt-container', true);

    this.sider = new Sider(this.container, this.options);
    this.axis = new Axis(this.container, this.options);
    this.canvas = new Canvas(this.container, this.options);
    // // 初始化构建
    this.init();
  }

  public set(data: IRecord[]) {
    this.data = data;
    this.sider.set(this.data);
    this.axis.set(this.data);
    this.canvas.set(this.data, this.axis);
    this.sider.draw();
    this.axis.draw();
    this.canvas.draw();
  }

  private init() {
    const { width, height } = this.getWrapperSize();
    this.svg.attr('width', width).attr('height', height);
    const { siderWidth, axisHeight } = this.options;

    this.sider.init({ width: siderWidth, height });
    this.axis.init({ width: width - siderWidth, height: axisHeight });
    this.canvas.init({ width: width - siderWidth, height: height - axisHeight });
  }

  private getWrapperSize(): ISize {
    if (!this.parent) {
      return { width: 0, height: 0 };
    }
    return {
      width: parseInt(this.parent.style('width'), 10),
      height: parseInt(this.parent.style('height'), 10),
    };
  }
}
