import React, { useCallback } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';

import { loginUser } from '@/lib/api';
import { FormGenerator } from '@/components';
import { FormFields, LoginFormInterface } from '@/interfaces';

const formBuilder: FormFields[] = [
  {
    id: 'username',
    type: 'text',
    label: 'Username',
    formOptions: {
      required: 'required'
    }
  },
  {
    id: 'password',
    type: 'password',
    label: 'Password',
    formOptions: {
      required: 'required',
      minLength: {
        value: 3,
        message: 'Min length is 3'
      }
    }
  }
];

const submitButtonStyles =
  'w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300';

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<LoginFormInterface>({
    defaultValues: {}
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<LoginFormInterface> = useCallback(
    async (data) => {
      try {
        const userData = await loginUser(data);
        if (userData.length > 0) {
          toast.success('Welcome to the dashboard.');
          await router.push('/expenses');
        } else {
          reset();
          toast.error('Invalid username or password. Please try again.');
        }
      } catch (error) {
        toast.error('We encountered an error. Please try again later.');
        console.error('LoginForm - onSubmit Error:', error);
      }
    },
    [router, reset]
  );

  const submitButtonLabel = isSubmitting ? 'Loading...' : 'Submit';

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {formBuilder.map((field, index) => (
        <FormGenerator key={index} {...field} register={register} errors={errors} />
      ))}

      <button type="submit" className={submitButtonStyles} disabled={isSubmitting}>
        {submitButtonLabel}
      </button>
    </form>
  );
}
