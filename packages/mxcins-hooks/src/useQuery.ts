// eslint-disable-next-line import/no-extraneous-dependencies
import { useReducer, Reducer, useEffect } from 'react';
import { DocumentNode } from 'graphql';
import { tuple } from '@mxcins/types';
import { QueryHookOptions, QueryHookResult, useQuery as useBasicQuery } from 'react-apollo-hooks';

interface IQueryHookOptionsWithFormatter<D, Q, V> extends QueryHookOptions<V> {
  formatter: (data: Q) => D;
}

interface IQueryHookOptionsWithInit<Q, V> extends QueryHookOptions<V> {
  init: Q;
}

interface IQueryHookOptionsWithBoth<D, Q, V> extends QueryHookOptions<V> {
  init: D;
  formatter: (data: Q) => D;
}

export interface IQueryHookOptions<D, Q, V> extends QueryHookOptions<V> {
  init?: D;
  formatter?: (data: Q) => D;
}

export interface UseQuery {
  <Q = any, V = any>(service: DocumentNode, options?: QueryHookOptions<Q, V>): QueryHookResult<
    Q,
    V
  >;
  <Q = any, V = any>(service: DocumentNode, options: IQueryHookOptionsWithInit<Q, V>): Omit<
    QueryHookResult<Q, V>,
    'data'
  > & { data: Q };
  <T = any, Q = any, V = any>(
    service: DocumentNode,
    options: IQueryHookOptionsWithFormatter<T, Q, V>,
  ): QueryHookResult<T, V>;
  <T = any, Q = any, V = any>(
    service: DocumentNode,
    options: IQueryHookOptionsWithBoth<T, Q, V>,
  ): Omit<QueryHookResult<T, V>, 'data'> & { data: T };
}

const ACTION_TYPES = tuple('DATA', 'CHANGE_LOADING');
type ActionType = typeof ACTION_TYPES[number];

interface IS {
  data?: any;
  loading: boolean;
}

interface IA<R extends ActionType = ActionType> {
  type: R;
  payload: R extends 'INIT' ? any : R extends 'CHANGE_LOADING' ? boolean : never;
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

export const useQuery: UseQuery = <T = any, Q = any, V = any>(
  service: DocumentNode,
  options: IQueryHookOptions<T, Q, V> = {},
) => {
  const { formatter, init, ...query } = options;
  const { data, loading, networkStatus, ...others } = useBasicQuery(service, {
    notifyOnNetworkStatusChange: true,
    ...query,
  });
  const [state, dispatch] = useReducer(reducer, { loading, data: init });

  useEffect(() => {
    if (!loading && data && networkStatus === 7) {
      dispatch({ type: 'DATA', payload: formatter ? formatter(data) : data });
    } else {
      dispatch({ type: 'CHANGE_LOADING', payload: loading });
    }
  }, [loading, data, networkStatus]);

  return { ...others, networkStatus, ...state, data: state.data as any };
};
