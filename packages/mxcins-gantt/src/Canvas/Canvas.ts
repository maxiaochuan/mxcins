import { Selection } from 'd3';
import moment from 'moment';
import Axis from '../Axis';
import { IProgress as IBaseProgress, IRecord as IBaseRecord, IRequiredOpts, ISize } from '../Gantt';

interface IRecord extends IBaseRecord {
  x0: number;
  x1: number;
  w: number;
  progresses: IProgress[];
}

interface IProgress extends IBaseProgress {
  w: number;
  x: number;
}

export default class Canvas {
  private options: IRequiredOpts;
  private parent: Selection<SVGGElement, any, any, any>;
  private container: Selection<SVGGElement, any, any, any>;
  private inner: Selection<SVGGElement, any, any, any>;
  private data: IRecord[] = [];
  private width: number = 0;
  constructor(parent: Selection<SVGGElement, any, any, any>, options: IRequiredOpts) {
    this.options = options;
    this.parent = parent;
    this.container = this.parent
      .append('g')
      .classed('gantt-canvas-container', true)
      .attr('transform', `translate(${this.options.siderWidth}, ${this.options.axisHeight})`);
    this.container.append('rect').classed('gantt-canvas-background', true);
    this.inner = this.container.append('g').classed('gantt-canvas-inner', true);
  }

  public init({ width, height }: ISize) {
    this.container
      .select('.gantt-canvas-background')
      .attr('width', width)
      .attr('height', height)
      .attr('fill', '#FFFFFF');
    this.width = width;
  }

  public set(data: IBaseRecord[], axis: Axis) {
    this.data = data.map(item => {
      const x0 = axis.scale(moment(item.start));
      const x1 = axis.scale(moment(item.finish));
      const w = x1 - x0;

      const main: IBaseProgress = { percent: 1, color: 'gray' };
      const progresses: IProgress[] = [...item.progresses, main].map(p => ({
        ...p,
        w: w * p.percent,
        x: x0,
      }));
      return { ...item, x0, x1, w, progresses };
    });
  }

  public draw() {
    this.inner.html('');
    const { rowHeight, rowPadding } = this.options;

    const rows = this.inner
      .selectAll()
      .data(this.data)
      .join('g')
      .classed('gantt-canvas-row', true)
      .attr('transform', (_, i) => `translate(0, ${i * rowHeight})`);

    rows
      .append('rect')
      .classed('row-background', true)
      .attr('width', this.width)
      .attr('height', rowHeight)
      .attr('fill', (_, i) => (i % 2 === 0 ? '#EEEEEE' : '#FFFFFF'));

    rows
      .selectAll('.row-bar')
      .data(d => d.progresses.reverse())
      .join('rect')
      .classed('.row-bar', true)
      .attr('width', p => p.w)
      .style('fill', p => p.color)
      .attr('height', rowHeight - 2 * rowPadding)
      .attr('transform', p => `translate(${p.x}, ${rowPadding})`);
  }
}
