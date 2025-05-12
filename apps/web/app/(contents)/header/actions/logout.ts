'use server';

import { client } from '@/openapi.config';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import {
  ACCESS_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_NAME,
} from '../../constants/token';

export const logout = async () => {
  const { error } = await client.POST('/auth/logout');

  if (!error) {
    const requestCookies = await cookies();
    requestCookies.delete(ACCESS_TOKEN_COOKIE_NAME);
    requestCookies.delete(REFRESH_TOKEN_COOKIE_NAME);

    redirect('/login');
  }
};
