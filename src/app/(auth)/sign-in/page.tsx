'use client';

import { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useAuthContext } from '../../context/auth';

type FormData = {
  email: string;
  password: String;
};

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const getXSRFTokenFromCookie = () => {
    const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
    return match ? match[1] : null;
  };

  const { name, ref, onChange, onBlur } = register('email');

  const onSubmit = handleSubmit((data) => console.log(data));

  // if (!useContext(AuthContext)) {
  //   throw new Error("Component is not wrapped with AuthProvider");
  // }

  // const { isLoggedIn, setIsLoggedIn } = useAuthContext();
  // console.log(isLoggedIn);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [users, setUsers] = useState<{ email: string; name: string }[]>([]);
  const router = useRouter();
  const http = axios.create({
    baseURL: 'http://localhost',
    withCredentials: true,
  });

  const login = () => {
    console.log(email);
    console.log(password);
    http.get('/sanctum/csrf-cookie').then((res) => {
      console.log(res);
      http.post('/api/login', { email, password }).then((res) => {
        console.log(res);
        if (res.status == 200) {
          // setIsLoggedIn(true);
          console.log(res.status);
          setTimeout(() => {
            // router.push('/home');
            console.log('ログイン成功');
          }, 1000);
        }
      });
    });
  };

  const logout = () => {
    http.post('/api/logout').then((res) => {
      console.log(res.data.message);
    });
  };

  const getUsers = async () => {
    try {
      // sessionが存在しない場合、またはaccessTokenが存在しない場合にはエラーをスローするか、リターンする
      // if (!session || !session.accessToken) {
      //   // if (session) {
      //   console.log(session);
      //   console.error('No session or accessToken found');
      //   return;
      // }
      const xsrfToken = getXSRFTokenFromCookie();

      if (!xsrfToken) {
        throw new Error("Couldn't retrieve the XSRF token from cookie.");
      }

      const response = await fetch('http://localhost/api/users', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'X-XSRF-TOKEN': xsrfToken,
        },
      });
      console.log('Response Status:', response.status);
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched Data:', data);
        setUsers(data);
      } else {
        console.error('Failed to fetch users, Status:', response.status);
        // Handle error
        console.error('Failed to fetch users');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const reset = () => {
    setUsers([]);
  };

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    console.log(email);
  };
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    console.log(password);
  };

  return (
    <>
      <div className='App'>
        <h1>ログイン</h1>
        <form onSubmit={onSubmit}>
          <div>
            <label htmlFor='email'>Email</label>
            <input
              id='email'
              name={name}
              onChange={onChange}
              onBlur={onBlur}
              ref={ref}
            />
          </div>
          <div>
            <label htmlFor='password'>Password</label>
            <input id='password' {...register('password')} type='password' />
          </div>
          <button type='submit'>ログイン</button>
        </form>
      </div>

      <div>
        <div>
          <input
            type='email'
            value={email}
            onChange={onChangeEmail}
            name='email'
            id='email'
            className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            placeholder='name@company.com'
          />
        </div>
        <div>
          <label
            htmlFor='password'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            Password
          </label>
          <input
            type='password'
            value={password}
            onChange={onChangePassword}
            name='password'
            id='password'
            placeholder='••••••••'
            className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          />
        </div>
        <div className='flex items-center justify-between'>
          <div className='flex items-start'>
            <div className='flex items-center h-5'>
              <input
                id='remember'
                aria-describedby='remember'
                type='checkbox'
                className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800'
              />
            </div>
            <div className='ml-3 text-sm'>
              <label
                htmlFor='remember'
                className='text-gray-500 dark:text-gray-300'
              >
                Remember mee
              </label>
            </div>
          </div>
          <a
            href='/'
            className='text-sm font-medium text-primary-600 hover:underline dark:text-primary-500'
          >
            Forgot password?
          </a>
        </div>
        <button
          type='button'
          onClick={login}
          className='w-full text-gray-800 bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
        >
          ログイン
        </button>
        <div className='flex flex-col'>
          <button onClick={getUsers}>ユーザー一覧</button>
          <button onClick={logout}>ログアウト</button>
        </div>
      </div>

      {/* <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            Flowbite
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="remember"
                        className="text-gray-500 dark:text-gray-300"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                  <a
                    href="#"
                    className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Forgot password?
                  </a>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Sign in
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?{" "}
                  <a
                    href="#"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign up
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section> */}
    </>
  );
};

export default SignIn;
