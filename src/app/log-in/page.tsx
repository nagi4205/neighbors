"use client";
import { signIn, useSession } from "next-auth/react";
import { useState, useEffect } from "react";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { data: session } = useSession();

  // セッションが更新されるたびにコンソールにログを出力する
  useEffect(() => {
    if (session) {
      console.log("Logged in user:", session.user);
      console.log("session:", session);
    } else {
      console.log("No user logged in");
    }
  }, [session]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (result?.error) {
      // ログイン成功、リダイレクトやその他の処理をここで行います。
      console.log(result?.error);
      // window.location.href = "/";
    } else {
      // エラーメッセージを表示
      console.error("log-inできたってこと？");
    }
  };

  return (
    <div>
      <h1>
        {session ? (
          <p>Welcome, {session.user.name}!</p>
        ) : (
          <a href="/auth/signin">Sign in</a>
        )}
      </h1>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email: </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
      <button onClick={() => signIn()}>SignIn</button>
    </div>
  );
}

export default SignIn;
