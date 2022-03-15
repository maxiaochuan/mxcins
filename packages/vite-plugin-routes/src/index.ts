import type { Plugin, ResolvedConfig } from 'vite';
import * as path from 'path';
import * as fs from 'fs';
import Mustache from 'mustache';
import mkdirp from 'mkdirp';
import type { Route, RoutesOptions } from '../index';

const OUTPUT_DIR = 'src/.mx';

const getMustacheView = (name: string) => fs.readFileSync(path.join(__dirname, '../mustaches', `${name}.mustache`), 'utf-8');

export default function(opts: RoutesOptions): Plugin {
  const packagePath = path.join(__dirname, '../package.json')
  const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf-8'));
  let conf: ResolvedConfig;

  const views = {
    route:  getMustacheView('route'),
    export:  getMustacheView('export'),
  };

  return {
    name: pkg.name,
    configResolved(resolvedConfig) {
      conf = resolvedConfig;
    },
    buildStart() {
      const make = (routes: Route[]): string => routes.map(route => {
        const sub = route.routes ? make(route.routes) : '';
        return Mustache.render(views.route, { ...route, key: route.key || route.path, sub })
      }).join('')

      const exported = Mustache.render(views.export, { routes: make(opts.routes) })

      const outputPath = path.join(conf.root, OUTPUT_DIR);
      mkdirp.sync(outputPath); 
      fs.writeFileSync(outputPath, exported);
    }
  }
}

