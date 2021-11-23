/* eslint-disable import/prefer-default-export */
import { useMemo, useRef } from 'react';
import { Loadable, RecoilValue, useRecoilRefresher_UNSTABLE, useRecoilValueLoadable } from 'recoil';

interface UseAsyncLoadableOptions<T> {
  state: RecoilValue<T>;
}

export const useAsyncLoadable = <T>(
  opts: UseAsyncLoadableOptions<T>,
): Loadable<T> & {
  data: T | undefined;
  error: Error | undefined;
  loading: boolean;
  refresh: () => void;
} => {
  const { state: s } = opts;
  const { state, ...rest } = useRecoilValueLoadable(s);
  const refresh = useRecoilRefresher_UNSTABLE(s);
  const cacehRef = useRef<T>();
  const errorRef = useRef<Error>();

  return useMemo(() => {
    if (state === 'hasValue') {
      cacehRef.current = rest.contents;
    }
    if (state === 'hasError') {
      errorRef.current = rest.contents;
    }
    const loading = state === 'loading';
    return {
      ...rest,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      state: state as any,
      data: cacehRef.current,
      error: errorRef.current,
      loading,
      refresh,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, refresh]);
};
