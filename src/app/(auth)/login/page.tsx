'use client';
import Head from 'next/head';
import Link from 'next/link';
// import Label from '@/components/label';
// import Input from '../components/input';
// import Button from '../components/button';
import Errors from '@/components/errors';
import { useState } from 'react';
import useAuth from '@/lib/tanstack-query/authQuery';
// import { FormLabel } from '@/components/ui/form';
import { toast } from 'sonner';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState([]);

  const { login, isUserLoading, user } = useAuth({ middleware: 'guest' });

  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // login({ email, password, remember });
    const loginPromise = login.mutateAsync({ email, password, remember });

    toast.promise(loginPromise, {
      loading: 'ログイン中...',
      success: 'ログインしました！',
      error: 'ログインに失敗しました。',
    });
  };

  // if (isUserLoading || user) {
  //   return <>Loading...</>;
  // }

  return (
    <>
      <Head>
        <title>ergodnc — Login</title>
      </Head>

      <div className={'w-1/2 mx-auto bg-white p-5 rounded-lg'}>
        <Errors className='mb-5' errors={errors} />

        <form onSubmit={submitForm} autoComplete='off'>
          <div>
            <label htmlFor='email'>Email</label>

            <input
              id='email'
              type='email'
              value={email}
              className='block mt-1 w-full outline-none border rounded border-gray-200 h-10 px-2'
              onChange={(event) => setEmail(event.target.value)}
              required
              autoFocus
              autoComplete='off'
            />
          </div>

          <div className='mt-4'>
            <label htmlFor='password'>Password</label>

            <input
              id='password'
              type='password'
              value={password}
              className='block mt-1 w-full'
              onChange={(event) => setPassword(event.target.value)}
              required
              autoComplete='current-password'
            />
          </div>

          <div className='block mt-4'>
            <label htmlFor='remember_me' className='inline-flex items-center'>
              <input
                id='remember_me'
                type='checkbox'
                name='remember'
                checked={remember}
                onChange={(event) => setRemember(!remember)}
                className='rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
              />

              <span className='ml-2 text-gray-600'>Remember me</span>
            </label>
          </div>

          <div className='flex items-center justify-end mt-4'>
            <Link href='/forgot-password'>
              <div className='underline text-sm text-gray-600 hover:text-gray-900'>
                Forgot your password?
              </div>
            </Link>

            <button className='ml-3 rounded inline-flex items-center px-4 py-2 bg-purple-700 border border-transparent font-semibold text-xs text-white uppercase tracking-widest hover:bg-purple-800 active:bg-purple-900 focus:outline-none focus:border-purple-900 focus:ring ring-purple-300 disabled:opacity-25 transition ease-in-out duration-150'>
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
