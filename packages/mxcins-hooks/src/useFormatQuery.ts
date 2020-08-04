import { useReducer, Reducer, useEffect, useCallback, useMemo } from 'react';
import { tuple } from '@mxcins/types';
import { DocumentNode } from 'graphql';
import { QueryResult } from '@apollo/react-common';
import { QueryHookOptions, useQuery } from '@apollo/react-hooks';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ANY = any;

interface IFormatQueryHookOptionsWithFormatter<D, Q, V>
  extends Omit<QueryHookOptions<V>, 'onCompleted'> {
  formatter: (data: Q) => D;
  onCompleted?: (data: D) => void;
}

interface IFormatQueryHookOptionsWithInit<Q, V> extends QueryHookOptions<V> {
  init: Q;
}

interface IFormatQueryHookOptionsWithBoth<D, Q, V>
  extends Omit<QueryHookOptions<V>, 'onCompleted'> {
  init: D;
  formatter: (data: Q) => D;
  onCompleted?: (data: D) => void;
}

interface IFormatQueryResultWithBoth<D, V> extends Omit<QueryResult<D, V>, 'data'> {
  data: D;
}

interface IFormatQueryResultWithFormatter<D, V> extends Omit<QueryResult<D, V>, 'data'> {
  data?: D;
}

interface IFormatQueryResultWIthInit<Q, V> extends Omit<QueryResult<Q, V>, 'data'> {
  data: Q;
}

export interface IQueryHookOptions<D, Q, V> extends Omit<QueryHookOptions<V>, 'onCompleted'> {
  init?: D;
  formatter?: (data: Q) => D;
  onCompleted?: (data: D) => void;
}

export interface UseFormatQuery {
  <D = ANY, Q = ANY, V = ANY>(
    service: DocumentNode,
    options: IFormatQueryHookOptionsWithBoth<D, Q, V>,
  ): IFormatQueryResultWithBoth<D, V>;

  <D = ANY, Q = ANY, V = ANY>(
    service: DocumentNode,
    options: IFormatQueryHookOptionsWithFormatter<D, Q, V>,
  ): IFormatQueryResultWithFormatter<D, V>;

  <Q = ANY, V = ANY>(
    service: DocumentNode,
    options: IFormatQueryHookOptionsWithInit<Q, V>,
  ): IFormatQueryResultWIthInit<Q, V>;

  <Q = ANY, V = ANY>(service: DocumentNode, options?: IQueryHookOptions<Q, Q, V>): QueryResult<
    Q,
    V
  >;
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
      return { ...prev, data: action.payload };
    case 'CHANGE_LOADING':
      return action.payload === prev.loading ? prev : { ...prev, loading: action.payload };
    default:
      return prev;
  }
};

export const useFormatQuery: UseFormatQuery = (
  service: DocumentNode,
  options: IQueryHookOptions<ANY, ANY, ANY> = {},
) => {
  const { formatter, init, onCompleted, ...query } = options;
  const [state, dispatch] = useReducer(reducer, { loading: false, data: init });

  const onQueryCompleted = useCallback<Required<IQueryHookOptions<ANY, ANY, ANY>>['onCompleted']>(
    ret => {
      const payload = (formatter && formatter(ret)) || ret;
      dispatch({ type: 'DATA', payload });
      if (onCompleted) {
        onCompleted(payload);
      }
    },
    [],
  );

  const result = useQuery(service, {
    notifyOnNetworkStatusChange: true,
    onCompleted: onQueryCompleted,
    ...query,
  });

  useEffect(() => dispatch({ type: 'CHANGE_LOADING', payload: result.loading }), [result.loading]);

  const returned = useMemo(() => ({ ...result, data: state.data, loading: state.loading }), [
    state.data,
    state.loading,
  ]);

  return returned;
};
