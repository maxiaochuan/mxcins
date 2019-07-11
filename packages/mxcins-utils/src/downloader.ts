import * as papaparse from 'papaparse';

export default class Downloader {
  public static csv<T extends { [x: string]: any }>(
    name: string,
    data: T[],
    maps?: { [k: string]: string },
  ) {
    const keys = maps ? Object.keys(maps) : Object.keys(data[0] || {});
    const fields = maps ? keys.map(k => maps[k]) : Object.keys(data[0] || {});

    const csv = papaparse.unparse({
      fields,
      data: data.map(item => keys.map(k => item[k])),
    });

    return Downloader.download(
      `${name}.csv`,
      new Blob(['\ufeff', csv], { type: 'text/csv;charset=utf-8' }),
    );
  }

  private static download(name: string, blob: Blob) {
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
        link.setAttribute('type', 'text/csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  }
}
