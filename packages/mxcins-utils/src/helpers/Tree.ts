/* eslint-disable no-underscore-dangle */

import omit from '../omit';

type TreeNode<T extends Record<string, any>> = Node<T> & T;

type Omited<T> = Omit<T, 'parent' | 'children' | 'ancestors' | 'proletariats'>;

const uuid = <T>(o: T, func: string | ((r: T) => string | undefined)): string | undefined => {
  if (typeof func === 'string') {
    return func.split('.').reduce<any>((prev, k) => prev && prev[k], o) as string | undefined;
  }
  return func(o);
};

export class Node<T extends Record<string, any>> {
  public parent?: TreeNode<T>;

  public children?: Array<TreeNode<T>>;

  public ancestors?: Array<TreeNode<T>>;

  public proletariats?: Array<TreeNode<T>>;

  constructor(init: T) {
    Object.keys(init).forEach(key => {
      if (!/^(children|parent|ancestors|proletariats)$/.test(key)) {
        Object.defineProperty(this, key, {
          enumerable: true,
          configurable: true,
          writable: true,
          value: init[key],
        });
      }
    });
  }
}

type Mode = 'parent' | 'children';

export interface ITreeOpts<T> {
  uid?: string | ((r: T) => string | undefined);
  puid?: string | ((r: T) => string | undefined);
  mode?: Mode;

  ancestors?: boolean;
  proletariats?: boolean;
}

const DEFAULT_UID = 'id';
const DEFAULT_PUID = 'parent.id';
// const DEFAULT_MODE = '';

export default class Tree<T extends Record<string, any>> {
  public opts: Required<ITreeOpts<T>>;

  public roots: Array<TreeNode<T>> = [];

  public nodes: Partial<Record<string, TreeNode<T>>> = {};

  constructor(data: T[], opts: ITreeOpts<T> = {}) {
    const { uid = DEFAULT_UID, puid = DEFAULT_PUID, mode, ancestors, proletariats } = opts;
    this.opts = {
      uid,
      puid,
      ancestors: !!ancestors,
      proletariats: !!proletariats,
      mode: mode || Tree.guess({ data, puid }),
    };
    this.bind(data);
    this.reschedule();
  }

  private static guess<T>({
    data,
    puid,
  }: {
    data: T[];
    puid: string | ((r: T) => string | undefined);
  }): Mode {
    const one = data[0];
    const pid = uuid(one, puid);

    if (typeof pid !== 'undefined') {
      return 'parent';
    }

    if (one && Object.prototype.hasOwnProperty.call(one, 'children')) {
      return 'children';
    }

    throw new Error('tree init options error');
  }

  public update(id: string, extra: Partial<T>) {
    const node = this.nodes[id];
    if (!node) {
      throw new Error(`node id: ${id} is not exist.`);
    }

    this.nodes[id] = Object.assign(node, extra);
  }

  public insert( data: Omited<T> | Omited<T>[], pid?: string) {
    if (Array.isArray(data)) {
      data.forEach(one => this.insertOne(one, pid));
    } else {
      this.insertOne(data, pid);
    }

    if (pid) {
      this.reschedule();
    }
  }

  private reschedule() {
    const { ancestors, proletariats } = this.opts;
    if (ancestors) {
      const forAncestors = (node: TreeNode<T>): TreeNode<T>[] | undefined =>
        node.parent ? (forAncestors(node.parent) || []).concat([node.parent]) : undefined;

      Object.values(this.nodes).forEach(node => {
        if (node) {
          node.ancestors = forAncestors(node);
        }
      });
    }

    if (proletariats) {
      const forProletariats = (node: TreeNode<T>): TreeNode<T>[] | undefined =>
        node.children?.length
          ? node.children.map(c => (c.children?.length ? forProletariats(c) : c)).flat()
          : undefined;

      Object.values(this.nodes).forEach(node => {
        if (node) {
          node.proletariats = forProletariats(node);
        }
      });
    }
  }

  public toJSON() {
    const hide = (node: TreeNode<T>): TreeNode<T> =>
      omit(node, ['parent', 'children', 'ancestors', 'proletariats']) as T;

    const loop = (nodes: TreeNode<T>[]): TreeNode<T>[] =>
      nodes.map(node => {
        const next = hide(node);
        next.children = next.children && loop(next.children);
        next.ancestors = next.ancestors && loop(next.ancestors);
        next.proletariats = next.proletariats && loop(next.proletariats);

        return next;
      });

    return loop(this.roots);
  }

  private bind(data: T[]) {
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
      const loop = (d: T[], parent?: TreeNode<T>) => {
        d.forEach(one => {
          const id = uuid(one, uid) || '';
          const node = new Node(one) as TreeNode<T>;

          if (parent) {
            node.parent = parent;
            parent.children = parent.children || [];
            parent.children.push(node);
          }
          this.nodes[id] = node;

          if (one.children && one.children.length) {
            loop(one.children, node);
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

      loop(data);
    }
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
