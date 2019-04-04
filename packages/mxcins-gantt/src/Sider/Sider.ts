import { Selection } from 'd3';
import { IRecord, IRequiredOpts, ISize } from '../Gantt';
// import Row from './Row';

interface ISiderRow {
  unique: string;
  text: string;
  level: number;
}

/**
 * 侧边栏
 * 包括 名称 树形结构 时间等基础属性
 */
export default class Sider {
  private options: IRequiredOpts;
  private parent: Selection<SVGGElement, any, any, any>;
  private container: Selection<SVGGElement, any, any, any>;
  private inner: Selection<SVGGElement, any, any, any>;
  // private rows: Row[] = [];
  // private rows: any[] = [];
  private data: ISiderRow[] = [];

  constructor(parent: Selection<SVGGElement, any, any, any>, options: IRequiredOpts) {
    this.parent = parent;
    this.options = options;
    this.container = this.parent
      .append('g')
      .classed('gantt-sider-container', true)
      .attr('transform', `translate(0, ${this.options.axisHeight})`);
    this.container.append('rect').classed('gantt-sider-background', true);
    this.inner = this.container.append('g').classed('gantt-sider-inner', true);
  }

  public init({ width, height }: ISize) {
    this.container
      .select('.gantt-sider-background')
      .attr('width', width)
      .attr('height', height)
      .attr('fill', '#FFFFFF');
  }

  public set(data: IRecord[]) {
    this.data = this.format(data);
  }

  public format(data: IRecord[]) {
    return data.map(row => {
      return {
        unique: row.id,
        text: row.name,
        level: row.level,
      };
    });
  }

  public draw(): void {
    this.inner.html('');
    const { rowHeight, siderWidth } = this.options;

    const rows = this.inner
      .selectAll()
      .data(this.data)
      .join('g')
      .classed('gantt-sider-row', true)
      .attr('transform', (_, i) => `translate(0, ${i * rowHeight})`);

    rows
      .append('rect')
      .classed('sider-row-background', true)
      .attr('width', siderWidth)
      .attr('height', rowHeight)
      .attr('fill', (_, i) => (i % 2 === 0 ? '#EEEEEE' : '#FFFFFF'));

    rows
      .append('text')
      .text(d => d.text)
      .classed('gantt-sider-text', true)
      .attr('x', d => d.level * 10)
      .attr('y', rowHeight / 2);
    // tslint:disable-next-line:no-this-assignment
    //   const self = this;
    //   const rows = this.container
    //     .selectAll('.gantt-sider-row')
    //     .data(this.data)
    //     .join('g')
    //     .classed('gantt-sider-row', true)
    //     .each(function(row, i) {
    //       self.drawRow(select(this) as Selection<SVGGElement, any, any, any>, row, i);
    //     });
  }

  // private drawRow(parent: Selection<SVGGElement, any, any, any>, data: ISiderRow, i: number) {
  //   const { rowHeight } = this.options;
  //   parent.attr('transform', `translate(0, ${i * rowHeight})`);
  //   parent
  //     .append('rect')
  //     .attr('width', 100)
  //     .attr('height', rowHeight)
  //     .attr('fill', i % 2 === 0 ? '#FFFFFF' : '#EEEEEE');
  //   const text = parent
  //     .append('text')
  //     .classed('gantt-sider-text', true)
  //     .attr('x', data.level * 10)
  //     .attr('y', rowHeight / 2)
  //     .text(data.text);
  //   console.log((text.node() as any).getBBox());
  // }
}
