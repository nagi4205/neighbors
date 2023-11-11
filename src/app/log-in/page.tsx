'use client';
import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { data: session } = useSession();

  const router = useRouter();
  // セッションが更新されるたびにコンソールにログを出力する
  useEffect(() => {
    if (session) {
      console.log('Logged in user:', session.user);
      console.log('session:', session);
    } else {
      console.log('No user logged in');
    }
  }, [session]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('ログインボタン押した');
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });
    if (result?.error) {
      // ログイン成功、リダイレクトやその他の処理をここで行います。
      console.log(result);
      // window.location.href = "/";
    } else {
      // エラーメッセージを表示
      console.log(result);
      console.error('log-inできたってこと？');
      // router.push('/home');
    }
  };

  return (
    <div>
      <div>
        {session ? (
          <>
            <p className='text-light-1'>Welcome, {session.user.name}!</p>
            <Image
              src={session.user.image}
              alt='User Profile Image'
              width={500}
              height={500}
            />
          </>
        ) : (
          <a href='/auth/signin'>Sign in</a>
        )}
      </div>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email: </label>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password: </label>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button type='submit'>Login</button>
        </div>
      </form>
      {/* <button onClick={() => signIn()}>SignIn</button> */}
    </div>
  );
}

export default SignIn;
