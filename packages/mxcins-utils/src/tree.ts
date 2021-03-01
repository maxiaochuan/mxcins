/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable max-classes-per-file */
import { tuple } from '@mxcins/types';
import omit from './omit';

const BUILTIN_KEYS = tuple('parent', 'children', 'ancestors', 'proletariats');

type BuiltinKeyType = typeof BUILTIN_KEYS[number];

type Omited<T> = Omit<T, BuiltinKeyType>;

const hide = <T>(node: TreeNode<Omited<T>>): Omited<T> => omit(node, BUILTIN_KEYS) as Omited<T>;

const uuid = <T>(o: T, func: string | ((r: T) => string | undefined)): string | undefined => {
  if (typeof func === 'string') {
    return func.split('.').reduce<any>((prev, k) => prev && prev[k], o) as string | undefined;
  }
  return func(o);
};

export type TreeNode<T extends object = {}> = Omited<T> & Node<T>;

export class Node<T extends object = {}> {
  public parent?: TreeNode<T>;

  public children?: TreeNode<T>[];

  public ancestors?: TreeNode<T>[];

  public proletariats?: TreeNode<T>[];

  constructor(init: T) {
    Object.keys(init).forEach(key => {
      if (!/^(children|parent|ancestors|proletariats)$/.test(key)) {
        Object.defineProperty(this, key, {
          enumerable: true,
          configurable: true,
          writable: true,
          value: init[key as keyof T],
        });
      }
    });
  }
}

type Mode = 'parent' | 'children';

export interface TreeOpts<T> {
  uid?: string | ((r: T) => string | undefined);
  puid?: string | ((r: T) => string | undefined);
  mode?: Mode;

  ancestors?: boolean;
  proletariats?: boolean;
}

const DEFAULT_UID = 'id';
const DEFAULT_PUID = 'parent.id';

export default class Tree<T extends Record<string, unknown>> {
  public opts: Required<TreeOpts<T>>;

  public roots: Array<TreeNode<T>> = [];

  public nodes: Partial<Record<string, TreeNode<T>>> = {};

  constructor(data: T[], opts: TreeOpts<T> = {}) {
    const { uid = DEFAULT_UID, puid = DEFAULT_PUID, mode, ancestors, proletariats } = opts;
    this.opts = {
      uid,
      puid,
      ancestors: !!ancestors,
      proletariats: !!proletariats,
      mode: mode || Tree.guess({ data, puid }),
    };
    if (data?.length) {
      this.bind(data);
    }
  }

  private static guess<T>({
    data,
    puid,
  }: {
    data: T[];
    puid: string | ((r: T) => string | undefined);
  }): Mode {
    const one = data[0];
    if (!one) {
      return 'parent';
    }
    const pid = uuid(one, puid);

    if (typeof pid !== 'undefined') {
      return 'parent';
    }

    if (one && Object.prototype.hasOwnProperty.call(one, 'children')) {
      return 'children';
    }

    throw new Error('tree init options error');
  }

  public update(id: string, extra: Partial<Omited<T>>): this {
    const node = this.nodes[id];
    if (!node) {
      throw new Error(`node id: ${id} is not exist.`);
    }

    this.nodes[id] = Object.assign(node, extra);
    return this;
  }

  public insert(data: Omited<T> | Omited<T>[], pid?: string): this {
    if (Array.isArray(data)) {
      data.forEach(one => this.insertOne(one, pid));
    } else {
      this.insertOne(data, pid);
    }

    if (pid) {
      this.reschedule();
    }
    return this;
  }

  private reschedule() {
    const { ancestors, proletariats } = this.opts;
    if (ancestors) {
      const reAncestors = (node: TreeNode<T>): TreeNode<T>[] | undefined =>
        node.parent ? (reAncestors(node.parent) || []).concat([node.parent]) : undefined;

      Object.values(this.nodes).forEach(node => {
        if (node) {
          node.ancestors = reAncestors(node);
        }
      });
    }

    if (proletariats) {
      const reProletariats = (node: TreeNode<T>): TreeNode<T>[] | undefined =>
        node.children?.length
          ? node.children
              .map(c => (c.children?.length ? (reProletariats(c) as TreeNode<T>[]) : [c]))
              .flat()
          : undefined;

      Object.values(this.nodes).forEach(node => {
        if (node) {
          node.proletariats = reProletariats(node);
        }
      });
    }
  }

  public toJSON(): TreeNode<T>[] {
    const map = (nodes: TreeNode<T>[]): TreeNode<T>[] =>
      nodes.map(node => {
        const next = hide<T>(node) as TreeNode<T>;
        next.children = node.children && map(node.children);
        next.ancestors = node.ancestors && map(node.ancestors);
        next.proletariats = node.proletariats && map(node.proletariats);

        return next;
      });

    return map(this.roots);
  }

  public bind(data: T[]): this {
    /* ------ 2020-04-22 14:14:55 clear ------*/
    this.roots = [];
    this.nodes = {};
    /* ------ 2020-04-22 14:14:55 clear ------*/
    const { mode } = this.opts;
    const { uid = DEFAULT_UID, puid = DEFAULT_PUID } = this.opts;
    if (mode === 'parent') {
      this.nodes = data.reduce<Record<string, TreeNode<T>>>((prev, one) => {
        const id = uuid(one, uid);
        if (id) {
          prev[id] = new Node(one) as TreeNode<T>;
        }
        return prev;
      }, {});

      data.forEach(one => {
        const id = uuid(one, uid) || '';
        const pid = uuid(one, puid) || '';
        const node = this.nodes[id];
        if (node) {
          const parent = this.nodes[pid];
          if (parent) {
            node.parent = parent;
            parent.children = parent.children || [];
            parent.children.push(node);
          } else {
            this.roots.push(node);
          }
        }
      });
    }

    if (mode === 'children') {
      const map = (d: T[], parent?: TreeNode<T>) => {
        d.forEach(one => {
          const id = uuid(one, uid) || '';
          const node = new Node(one) as TreeNode<T>;

          if (parent) {
            node.parent = parent;
            // eslint-disable-next-line no-param-reassign
            parent.children = parent.children || [];
            parent.children.push(node);
          }
          this.nodes[id] = node;

          if ((one.children as T[])?.length) {
            map(one.children as T[], node);
          }
        });

        d.forEach(one => {
          const id = uuid(one, uid) || '';
          const node = this.nodes[id];
          if (node) {
            if (!node.parent) {
              this.roots.push(node);
            }
          }
        });
      };

      map(data);
    }

    this.reschedule();
    return this;
  }

  private insertOne(one: Omited<T>, pid?: string) {
    const { uid } = this.opts;
    const id = uuid(one as T, uid) || '';
    if (this.nodes[id]) {
      throw new Error(`node id: ${id} is exist.`);
    }

    const node = new Node(one) as TreeNode<T>;
    this.nodes[id] = node;
    if (pid) {
      const parent = this.nodes[pid];
      if (parent) {
        parent.children = parent.children || [];
        parent.children.push(node);
      }
    } else {
      this.roots.push(node);
    }
  }
}
