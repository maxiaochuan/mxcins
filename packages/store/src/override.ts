import {
  //
  atom as a,
  selector as s,
  atomFamily as af,
  selectorFamily as sf,
} from 'recoil';
import { nanoid } from 'nanoid';
import type {
  AtomOptions as AO,
  RecoilState,
  ReadWriteSelectorOptions as RWSO,
  ReadOnlySelectorOptions as ROSO,
  RecoilValueReadOnly,
  SerializableParam,
  AtomFamilyOptions as AFO,
  ReadWriteSelectorFamilyOptions as RWSFO,
  ReadOnlySelectorFamilyOptions as ROSFO,
} from 'recoil';

export interface AtomOptions<T> extends Omit<AO<T>, 'key'> {
  key?: string;
}

export function atom<T>(options: AtomOptions<T>): RecoilState<T> {
  const { key = nanoid(), ...rest } = options;
  return a({ key, ...rest });
}

export interface AtomFamilyOptions<T, P extends SerializableParam> extends Omit<AFO<T, P>, 'key'> {
  key?: string;
}

export function atomFamily<T, P extends SerializableParam>(
  options: AtomFamilyOptions<T, P>,
): (param: P) => RecoilState<T> {
  const { key = nanoid(), ...rest } = options;
  return af({ key, ...rest });
}

export interface ReadWriteSelectorOptions<T> extends Omit<RWSO<T>, 'key'> {
  key?: string;
}

export interface ReadOnlySelectorOptions<T> extends Omit<ROSO<T>, 'key'> {
  key?: string;
}

export function selector<T>(options: ReadWriteSelectorOptions<T>): RecoilState<T>;
export function selector<T>(options: ReadOnlySelectorOptions<T>): RecoilValueReadOnly<T>;
export function selector<T>(
  options: ReadOnlySelectorOptions<T> | ReadWriteSelectorOptions<T>,
): RecoilState<T> | RecoilValueReadOnly<T> {
  const { key = nanoid(), ...rest } = options;
  return s({ key, ...rest });
}

export interface ReadWriteSelectorFamilyOptions<T, P extends SerializableParam>
  extends Omit<RWSFO<T, P>, 'key'> {
  key?: string;
}

export interface ReadOnlySelectorFamilyOptions<T, P extends SerializableParam>
  extends Omit<ROSFO<T, P>, 'key'> {
  key?: string;
}

export function selectorFamily<T, P extends SerializableParam>(
  options: ReadWriteSelectorFamilyOptions<T, P>,
): (param: P) => RecoilState<T>;
export function selectorFamily<T, P extends SerializableParam>(
  options: ReadOnlySelectorFamilyOptions<T, P>,
): (param: P) => RecoilValueReadOnly<T>;
export function selectorFamily<T, P extends SerializableParam>(
  options: ReadWriteSelectorFamilyOptions<T, P> | ReadOnlySelectorFamilyOptions<T, P>,
): ((param: P) => RecoilState<T>) | ((param: P) => RecoilValueReadOnly<T>) {
  const { key = nanoid(), ...rest } = options;
  return sf({ key, ...rest });
}
