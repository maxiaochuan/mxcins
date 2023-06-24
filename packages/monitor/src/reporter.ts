import { type ReporterConfig } from './types';

export default class Reporter {
  private readonly conf: ReporterConfig;

  constructor(conf: ReporterConfig) {
    this.conf = conf;
  }

  public send(data: any): void {
    this.beacon(data);
  }

  private beacon(data: any): boolean {
    return navigator.sendBeacon(this.conf.reportURL, JSON.stringify(data));
  }
}
