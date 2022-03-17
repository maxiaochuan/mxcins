import type { PluginOption, ResolvedConfig } from 'vite';
import * as path from 'path';
import * as fs from 'fs';
import Mustache from 'mustache';
import mkdirp from 'mkdirp';

const OUTPUT_DIR = 'src/.mx';

const getMustacheView = (name: string) => fs.readFileSync(path.join(__dirname, '../mustaches', `${name}.mustache`), 'utf-8');

export interface Route {
  key?: string;
  index?: boolean;
  path?: string;
  component?: string;
  wrappers?: string[];
  routes?: Route[];
}

export interface RoutesOptions {
  loading?: string;
  dynamic?: boolean;
  routes: Route[];
}

export default function(opts: RoutesOptions): PluginOption {
  const packagePath = path.join(__dirname, '../package.json')
  const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf-8'));

  const views = {
    route:  getMustacheView('route'),
    export:  getMustacheView('export'),
    render:  getMustacheView('render'),
  };

  let conf: ResolvedConfig;
  let outputPath: string;

  return {
    name: pkg.name,
    configResolved(resolvedConfig) {
      conf = resolvedConfig;
      outputPath = path.join(conf.root, OUTPUT_DIR);
      const runtimeOutputPath = path.join(outputPath, 'runtime');
      mkdirp.sync(outputPath); 
      mkdirp.sync(runtimeOutputPath);
      fs.copyFileSync(path.join(__dirname, '../runtime/dynamic.tsx'), path.join(runtimeOutputPath, 'dynamic.tsx'));
    },
    buildStart() {
      const components: { name: string, path: string }[] = [];
      const make = (routes: Route[]): string => routes.map(route => {
        const sub = route.routes ? make(route.routes) : '';
        let componentPath: string = route.component || '';
        conf.resolve.alias.forEach(a => {
          componentPath = componentPath.replace(a.find, a.replacement);
        })

        const component = { name: route.component?.replace(/\//g, '_').replace('@', '$_component_') || '', path: componentPath };

        components.push(component);

        return Mustache.render(views.route, { ...route, key: route.key || route.path, component, sub, loading: !!opts.loading, dynamic: opts.dynamic })
      }).join('')

      const exported = Mustache.render(views.export, {
        dynamicPath: path.join(outputPath, 'runtime', 'dynamic'),
        imports: components,
        routes: make(opts.routes),
        loading: opts.loading,
      })

      fs.writeFileSync(path.join(outputPath, 'routes.ts'), exported);

      const render = Mustache.render(views.render, {
        routesPath: path.join(outputPath, 'routes'),
      })

      fs.writeFileSync(path.join(outputPath, 'render.tsx'), render);
    }
  }
}

