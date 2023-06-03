import { ReporterOptions } from "./types";

export default class Reporter {
  private options: ReporterOptions;

  constructor(options: ReporterOptions) {
    this.options = options;
  }

  public send(data: any) {
    const { reportURL } = this.options;
    navigator.sendBeacon(reportURL, JSON.stringify(data));
  }
}
