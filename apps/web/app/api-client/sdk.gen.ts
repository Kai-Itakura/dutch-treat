// This file is auto-generated by @hey-api/openapi-ts

import type {
  Options as ClientOptions,
  TDataShape,
  Client,
} from '@hey-api/client-next';
import type {
  SignupData,
  SignupResponse,
  LoginData,
  LoginResponse,
  LogoutData,
  LogoutResponse,
  RefreshData,
  RefreshResponse,
  FindByEmailData,
  FindByEmailResponse,
  GetAllGroupsData,
  GetAllGroupsResponse,
  CreateData,
  CreateResponse,
  DeleteGroupData,
  DeleteGroupResponse,
  GetGroupData,
  GetGroupResponse,
  AddMemberData,
  AddMemberResponse,
  DeleteMemberData,
  DeleteMemberResponse,
  AddExpenseData,
  AddExpenseResponse,
  UpdateExpenseData,
  UpdateExpenseResponse,
} from './types.gen';
import { client as _heyApiClient } from './client.gen';

export type Options<
  TData extends TDataShape = TDataShape,
  ThrowOnError extends boolean = boolean,
> = ClientOptions<TData, ThrowOnError> & {
  /**
   * You can provide a client instance returned by `createClient()` instead of
   * individual options. This might be also useful if you want to implement a
   * custom client.
   */
  client?: Client;
  /**
   * You can pass arbitrary values through the `meta` object. This can be
   * used to access values that aren't defined as part of the SDK function.
   */
  meta?: Record<string, unknown>;
};

export const signup = <ThrowOnError extends boolean = false>(
  options: Options<SignupData, ThrowOnError>,
) => {
  return (options.client ?? _heyApiClient).post<
    SignupResponse,
    unknown,
    ThrowOnError
  >({
    url: '/auth/signup',
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });
};

export const login = <ThrowOnError extends boolean = false>(
  options: Options<LoginData, ThrowOnError>,
) => {
  return (options.client ?? _heyApiClient).post<
    LoginResponse,
    unknown,
    ThrowOnError
  >({
    url: '/auth/login',
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });
};

export const logout = <ThrowOnError extends boolean = false>(
  options?: Options<LogoutData, ThrowOnError>,
) => {
  return (options?.client ?? _heyApiClient).post<
    LogoutResponse,
    unknown,
    ThrowOnError
  >({
    url: '/auth/logout',
    ...options,
  });
};

export const refresh = <ThrowOnError extends boolean = false>(
  options?: Options<RefreshData, ThrowOnError>,
) => {
  return (options?.client ?? _heyApiClient).post<
    RefreshResponse,
    unknown,
    ThrowOnError
  >({
    url: '/auth/refresh',
    ...options,
  });
};

export const findByEmail = <ThrowOnError extends boolean = false>(
  options: Options<FindByEmailData, ThrowOnError>,
) => {
  return (options.client ?? _heyApiClient).post<
    FindByEmailResponse,
    unknown,
    ThrowOnError
  >({
    url: '/user',
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });
};

export const getAllGroups = <ThrowOnError extends boolean = false>(
  options?: Options<GetAllGroupsData, ThrowOnError>,
) => {
  return (options?.client ?? _heyApiClient).get<
    GetAllGroupsResponse,
    unknown,
    ThrowOnError
  >({
    url: '/event-group',
    ...options,
  });
};

export const create = <ThrowOnError extends boolean = false>(
  options: Options<CreateData, ThrowOnError>,
) => {
  return (options.client ?? _heyApiClient).post<
    CreateResponse,
    unknown,
    ThrowOnError
  >({
    url: '/event-group',
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });
};

export const deleteGroup = <ThrowOnError extends boolean = false>(
  options: Options<DeleteGroupData, ThrowOnError>,
) => {
  return (options.client ?? _heyApiClient).delete<
    DeleteGroupResponse,
    unknown,
    ThrowOnError
  >({
    url: '/event-group/{groupId}',
    ...options,
  });
};

export const getGroup = <ThrowOnError extends boolean = false>(
  options: Options<GetGroupData, ThrowOnError>,
) => {
  return (options.client ?? _heyApiClient).get<
    GetGroupResponse,
    unknown,
    ThrowOnError
  >({
    url: '/event-group/{groupId}',
    ...options,
  });
};

export const addMember = <ThrowOnError extends boolean = false>(
  options: Options<AddMemberData, ThrowOnError>,
) => {
  return (options.client ?? _heyApiClient).put<
    AddMemberResponse,
    unknown,
    ThrowOnError
  >({
    url: '/event-group/{groupId}/member',
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });
};

export const deleteMember = <ThrowOnError extends boolean = false>(
  options: Options<DeleteMemberData, ThrowOnError>,
) => {
  return (options.client ?? _heyApiClient).delete<
    DeleteMemberResponse,
    unknown,
    ThrowOnError
  >({
    url: '/event-group/{groupId}/member/{memberId}',
    ...options,
  });
};

export const addExpense = <ThrowOnError extends boolean = false>(
  options: Options<AddExpenseData, ThrowOnError>,
) => {
  return (options.client ?? _heyApiClient).post<
    AddExpenseResponse,
    unknown,
    ThrowOnError
  >({
    url: '/event-group/{groupId}/expense-record',
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });
};

export const updateExpense = <ThrowOnError extends boolean = false>(
  options: Options<UpdateExpenseData, ThrowOnError>,
) => {
  return (options.client ?? _heyApiClient).patch<
    UpdateExpenseResponse,
    unknown,
    ThrowOnError
  >({
    url: '/event-group/{groupId}/expense-record/{expenseId}',
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });
};
