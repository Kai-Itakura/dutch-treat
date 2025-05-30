'use server';

import { setRequestCookies } from '@/app/util/set-request-cookies';
import { client } from '@/openapi.config';
import {
  FORM_STATUS,
  FormActionState,
} from '../../(contents)/actions/form-state';
import { loginFormSchema } from '../schema/login-form.schema';

export async function login(
  _prevState: FormActionState,
  formData: FormData,
): Promise<FormActionState> {
  const body = Object.fromEntries(formData);
  const parsed = loginFormSchema.safeParse(body);
  if (!parsed.success) {
    return {
      status: FORM_STATUS.ERROR,
      message: parsed.error.message,
    };
  }

  const { error, data } = await client.POST('/auth/login', {
    body: parsed.data,
  });

  if (error) {
    return {
      status: FORM_STATUS.ERROR,
      message: error.message,
    };
  }

  // Cookieをセット
  await setRequestCookies(data);

  return {
    status: FORM_STATUS.SUCCESS,
    message: 'Successfully login!',
  };
}
