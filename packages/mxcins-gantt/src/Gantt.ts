import {
  select,
  Selection,
  axisTop,
  scaleTime,
  timeWednesday,
  min,
  max,
  ScaleTime,
  BaseType,
  selectAll,
  timeDay,
  timeWeek,
} from 'd3';
import moment from 'moment';
import { Debounce } from 'lodash-decorators';
import Row from './Row';

export interface IProgress {
  percent: number;
  color: 'gray' | 'blue' | 'yellow' | 'default';
}
export interface IRecord {
  id: string;
  start: string;
  end: string;
  progresses: IProgress[];
}

interface IRow extends IRecord {
  x0: number;
  x1: number;
}

export interface IGroups {
  xAxis: Selection<SVGGElement, any, any, any>;
  rows: Selection<SVGGElement, any, any, any>;
}

export default class Gantt {
  private options = {
    rowHeight: 20,
    rowPadding: 4,
  };
  private parent: Selection<HTMLDivElement, any, any, any>;
  private scene: Selection<SVGElement, any, any, any>;
  private groups: IGroups;

  private tick: number = 60;

  private data: IRecord[] = [];
  private rows: Row[] = [];

  /**
   * 所有进度最早开始时间
   */
  // private start: number;
  /**
   * 所有进度最晚开始时间
   */
  // private end: number;
  // private width: number;

  private x: ScaleTime<number, number>;

  constructor(container: HTMLDivElement) {
    this.parent = select(container);
    this.parent.html('');
    this.scene = this.parent.append<SVGElement>('svg:svg');
    this.groups = {
      xAxis: this.generateGroup('x-axis').attr('transform', 'translate(10, 30)'),
      rows: this.generateGroup('rows').attr('transform', 'translate(10, 40)'),
    };

    this.x = scaleTime();
  }

  public bind(data: IRecord[]) {
    this.data = data;

    this.prepare();
    this.draw();
  }

  private prepare() {
    const start = min(this.data, record => moment(record.start).valueOf());
    const end = max(this.data, record => moment(record.end).valueOf());

    if (start && end) {
      this.x.domain([start, end]).nice();
      const [s, e] = this.x.domain();
      this.start = moment(s).valueOf();
      this.end = moment(e).valueOf();
      const width = this.tick * moment(e).diff(s, 'week');

      this.width = width;

      this.x.range([0, this.width]);

      this.scene.attr('width', this.width + 100);
    }

    this.rows = this.data.map((v, i) => new Row(v, i, this.x));
  }

  private draw() {
    this.drawAxes();
    this.drawRows();
  }

  private drawAxes() {
    const xAxis = axisTop(this.x).tickFormat(date => moment(date as Date).format('YYYY-MM-DD'));
    const ticksArg = timeWeek;
    if (ticksArg) {
      xAxis.ticks(ticksArg);
    }
    this.groups.xAxis.call(xAxis);
  }

  private drawRows() {
    // this.rows.forEach(row => {
    //   row.draw().append
    //   // this.groups.rows.data(rows)
    //   // this.groups.rows
    // })
    // this.groups.rows.data(this.rows).enter().append(d => {
    //   console.log(d);
    //   return 'a';
    // });
    this.groups.rows.data(this.rows);
    // this.groups.rows
    //   .selectAll('.row')
    //   .data(this.rows)
    //   .enter()
    //   .append('rect')
    //   .classed('row', true)
    //   .attr('y', (d, i) => i * this.options.rowHeight)
    //   .attr('width', this.width)
    //   .attr('height', this.options.rowHeight)
    //   .attr('fill', (d, i) => (i % 2 ? '#FFFFFF' : '#EEEEEE'));

    // this.groups.rows
    //   .selectAll('.rect')
    //   .data(this.rows)
    //   .enter()
    //   .append('rect')
    //   .classed('item', true)
    //   .attr('width', d => d.x1 - d.x0)
    //   .attr('height', this.options.rowHeight - this.options.rowPadding * 2)
    //   .attr('transform', (d, i) => `translate(${d.x0},${i * this.options.rowHeight + this.options.rowPadding})`)
    //   .attr('fill', 'gray');

    // this.rows.forEach((row, i) => {
    //   const { x0, x1, progresses } = row;
    //   this.groups.rows
    //     .selectAll(`.progress-${i}`)
    //     .data(progresses.reverse())
    //     .enter()
    //     .append('rect')
    //     .classed(`progress-${i}`, true)
    //     .attr('width', d => (x1 - x0) * d.percent)
    //     .attr('height', this.options.rowHeight - this.options.rowPadding * 2)
    //     .attr('transform', `translate(${x0},${i * this.options.rowHeight + this.options.rowPadding})`)
    //     .attr('fill', d => d.color);
    // });
  }

  private generateGroup(name: string) {
    return this.scene.append<SVGGElement>('svg:g').classed(name, true);
  }

  @Debounce(200)
  private resize() {
    if (!this.parent) {
      return;
    }
    const node = this.parent.node();
    if (node) {
      const { width, height } = window.getComputedStyle(node);
      this.scene.attr('width', parseInt(width as string, 10));
      this.scene.attr('height', parseInt(height as string, 10));
    }
  }
}
