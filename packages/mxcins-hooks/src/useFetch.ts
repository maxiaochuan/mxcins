import { useReducer, Reducer, useEffect } from 'react';
import request, { RequestOptions } from '@mxcins/request';
import { tuple } from '@mxcins/types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ANY = any;

interface IFetchCommonOptions<V = Record<string, ANY>> extends Omit<RequestOptions, 'params'> {
  variables?: V;
  params?: V;
  skip?: boolean;
  client?: (...args: ANY[]) => Promise<ANY>;
}

interface IFetchHookResult<T, V extends Record<string, ANY>> {
  data?: T;
  loading?: boolean;
  refetch: (vars?: V) => Promise<void>;
}

interface IFetchHookOptionsWithFormatter<D, Q, V> extends IFetchCommonOptions<V> {
  formatter: (data: Q) => D;
}

interface IFetchHookOptionsWithInit<Q, V> extends IFetchCommonOptions<V> {
  init: Q;
}

interface IFetchHookOptionsWithBoth<D, Q, V> extends IFetchCommonOptions<V> {
  init: D;
  formatter: (data: Q) => D;
}

export interface IFetchHookOptions<D, Q, V> extends IFetchCommonOptions<V> {
  init?: D;
  formatter?: (data: Q) => D;
}

export interface UseFetch {
  <T = ANY, Q = ANY, V = ANY>(
    service: string | string[],
    options: IFetchHookOptionsWithBoth<T, Q, V>,
  ): Omit<IFetchHookResult<T, V>, 'data'> & { data: T };
  <T = ANY, Q = ANY, V = ANY>(
    service: string | string[],
    options: IFetchHookOptionsWithFormatter<T, Q, V>,
  ): IFetchHookResult<T, V>;
  <Q = ANY, V = ANY>(service: string | string[], options: IFetchHookOptionsWithInit<Q, V>): Omit<
    IFetchHookResult<Q, V>,
    'data'
  > & { data: Q };
  <Q = ANY, V = ANY>(
    service: string | string[],
    options?: IFetchHookOptions<Q, Q, V>,
  ): IFetchHookResult<Q, V>;
}

const ACTION_TYPES = tuple('DATA', 'CHANGE_LOADING');
type ActionType = typeof ACTION_TYPES[number];

interface IS {
  data?: ANY;
  loading: boolean;
}

interface IA<R extends ActionType = ActionType> {
  type: R;
  payload: R extends 'INIT' ? ANY : R extends 'CHANGE_LOADING' ? boolean : never;
}

const reducer: Reducer<IS, IA> = (prev, action) => {
  switch (action.type) {
    case 'DATA':
      return {
        ...prev,
        data: action.payload,
        loading: false,
      };
    case 'CHANGE_LOADING': {
      return {
        ...prev,
        loading: action.payload,
      };
    }
    default:
      return prev;
  }
};

export const useFetch: UseFetch = (
  service: string | string[],
  options: IFetchHookOptions<ANY, ANY, ANY> = {},
) => {
  const { formatter, init, client = request, skip, variables, params, ...others } = options;
  const [state, dispatch] = useReducer(reducer, { loading: false, data: init });

  const refetch = async <V = ANY>(parameters: V) => {
    const opts = { params: parameters, ...others };
    dispatch({ type: ACTION_TYPES[1], payload: true });
    try {
      const resp = await (typeof service === 'string'
        ? client(service, opts)
        : Promise.all(service.map(i => client(i, opts))));
      dispatch({ type: ACTION_TYPES[0], payload: formatter ? formatter(resp) : resp });
    } catch (error) {
      dispatch({ type: ACTION_TYPES[1], payload: false });
      throw error;
    }
  };

  useEffect(() => {
    if (!skip) {
      refetch({ ...variables, ...params });
    }
  }, [skip]);

  return { ...state, data: state.data as ANY, refetch };
};
