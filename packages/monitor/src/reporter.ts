import { type ReportResult, type ReporterConfig } from './types';

export default class Reporter {
  private readonly conf: ReporterConfig;

  private stack: Array<() => Promise<Response>> = [];

  private isFlushing = false;

  constructor(conf: ReporterConfig) {
    this.conf = conf;
  }

  public send(data: ReportResult): void {
    const value = this.beacon(data);
    if (!value) {
      this.post(data);
    }
  }

  private post(data: ReportResult): void {
    const { reportURL } = this.conf;
    const fn = async (): Promise<Response> =>
      await fetch(reportURL, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });

    this.stack.push(fn);
    if (!this.isFlushing) {
      requestIdleCallback(() => {
        this.flush();
      });
    }
  }

  private flush(): void {
    const copy = this.stack.slice(0);
    this.stack = [];
    this.isFlushing = false;
    copy.forEach(fn => {
      void fn();
    });
  }

  private beacon(data: ReportResult): boolean {
    return navigator.sendBeacon(this.conf.reportURL, JSON.stringify(data));
  }
}
