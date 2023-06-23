import { type ReporterConfig } from './types';

export default class Reporter {
  private readonly conf: ReporterConfig;

  constructor(conf: ReporterConfig) {
    this.conf = conf;
  }

  public send(data: any): void {
    const { reportURL } = this.conf;
    navigator.sendBeacon(reportURL, JSON.stringify(data));
  }
}
