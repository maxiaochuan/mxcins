import * as csv from './csv';

export default class Downloader {
  public static DOCUMENT_TYPES = {
    csv: 'text/csv',
  };

  public static csv<T extends Record<string, any>>(
    name: string,
    data: T[],
    fields?: { [k: string]: string },
  ) {
    const content = csv.encode(data, { fields: fields || Object.keys(data[0] || {}) });
    const blob = new Blob(['\ufeff', content], { type: 'text/csv;charset=utf-8' });

    return Downloader.download('csv', `${name}.csv`, blob);
  }

  private static download(type: 'csv', name: string, blob: Blob) {
    if (navigator.msSaveBlob) {
      // IE 10+
      navigator.msSaveBlob(blob, name);
    } else {
      const link = document.createElement('a');
      if (link.download !== undefined) {
        // feature detection
        // Browsers that support HTML5 download attribute
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', name);
        link.setAttribute('type', Downloader.DOCUMENT_TYPES[type]);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  }
}
