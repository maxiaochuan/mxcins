import moment from 'moment';
import { IRecord } from "./Gantt";
import { ScaleTime, select, Selection } from "d3";

export default class Row {
  private origin: IRecord;
  private unique: string;
  public x0: number;
  public x1: number;

  private selection: Selection<SVGGElement, any, any, any>;
  private background: Selection<SVGRectElement, any, any, any>;
  private bkgColor: string;
  constructor(item: IRecord, i: number, x: ScaleTime<number, number>) {
    this.origin = item;
    this.unique = `.row-${this.origin.id}`;
    this.x0 = x(moment(item.start));
    this.x1 = x(moment(item.start));
    this.selection = select(this.unique).append('g').classed(this.unique, true);
    this.bkgColor = i % 2 ? '#FFFFFF' : '#EEEEEE';
  }

  draw() {
    this.drawBackground();
    return this.selection.node();
  }

  drawBackground() {
    const background = this.selection.append('rect').classed(`${this.unique}-background`, true);
    background.attr('fill', this.bkgColor);
  }
}