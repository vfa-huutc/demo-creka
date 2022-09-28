/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface IQuery {
  sayHello(): string | Promise<string>;
}

export interface Error {
  errorCode: string;
  message?: Nullable<string>;
  details: Nullable<ErrorDetail>[];
}

export interface ErrorDetail {
  message?: Nullable<string>;
  type?: Nullable<string>;
  key?: Nullable<string>;
  value?: Nullable<string>;
}

export interface PagerInformation {
  pageTotal?: Nullable<number>;
  totalCount?: Nullable<number>;
  currentPage?: Nullable<number>;
  pageSize?: Nullable<number>;
}

export type JSON = any;
type Nullable<T> = T | null;
