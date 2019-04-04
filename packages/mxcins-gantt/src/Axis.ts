import { Axis as IAxis, axisTop, max, min, ScaleTime, scaleTime, Selection } from 'd3';
import moment from 'moment';
import { IRecord as IBaseRecord, IRequiredOpts, ISize } from './Gantt';

const DEFAULT_START = moment('2011-01-01');
const DEFAULT_FINISH = moment('2011-12-31');

export default class Axis {
  public scale: ScaleTime<number, number>;

  private options: IRequiredOpts;
  private parent: Selection<SVGGElement, any, any, any>;
  private container: Selection<SVGGElement, any, any, any>;
  private g: Selection<SVGGElement, any, any, any>;
  private axis: IAxis<Date | number | { valueOf(): number }>;

  // private start: number = 0;
  // private finish: number = 0;
  private width: number = 0;

  constructor(parent: Selection<SVGGElement, any, any, any>, options: IRequiredOpts) {
    this.options = options;
    this.parent = parent;
    this.container = this.parent
      .append('g')
      .classed('gantt-axis-container', true)
      .attr('transform', `translate(${this.options.siderWidth}, 0)`);
    this.container.append('rect').classed('gantt-axis-background', true);
    this.g = this.container.append('g').attr('id', 'gantt-canvas-g');

    this.scale = scaleTime();
    this.axis = axisTop(this.scale);
  }

  public init({ width, height }: ISize) {
    this.container
      .select('.gantt-canvas-background')
      .attr('width', width)
      .attr('height', height)
      .style('fill', '#B4B4B4');

    this.width = width;
    this.scale
      .domain([DEFAULT_START, DEFAULT_FINISH])
      .nice()
      .range([0, width]);

    this.g.attr('transform', `translate(0, ${this.options.axisHeight / 2})`).call(this.axis);
  }

  public draw() {
    this.g.call(this.axis);
  }

  public set(data: IBaseRecord[]) {
    const start = min(data, record => moment(record.start).valueOf());
    const end = max(data, record => moment(record.finish).valueOf());

    if (start && end) {
      this.scale
        .domain([start, end])
        .nice()
        .range([0, this.width]);
      // const [s, e] = this.scale.domain();
      // this.start = s.getTime();
      // this.finish = e.getTime();
    }
  }
}
