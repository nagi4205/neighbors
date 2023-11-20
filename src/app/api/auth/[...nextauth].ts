import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      // `credentials`は、サインインページでフォームを生成するために使用されます。
      credentials: {
        username: { label: "ユーザ名", type: "text" },
        password: { label: "パスワード", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const response = await axios.post("http://localhost/api/login", {
            email: credentials.email,
            password: credentials.password,
          });

          const user = response.data;

          if (user) {
            return user;
          } else {
            return null;
          }
        } catch (error) {
          throw new Error(error.response.data.message || "Login failed");
        }
      },
    }),
  ],
  pages: {
    // カスタムログインページを追加します。
    signIn: "/auth/signin",
  },
  callbacks: {
    // `jwt()`コールバックは`authorize()`の後に実行されます。
    // `user`に追加したプロパティ`role`と`backendToken`を`token`に設定します。
    jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.backendToken = user.backendToken;
      }
      return token;
    },
    // `session()`コールバックは`jwt()`の後に実行されます。
    // `token`に追加したプロパティ`role`と`backendToken`を`session`に設定します。
    session({ session, token }) {
      session.user.role = token.role;
      session.user.backendToken = token.backendToken;
      return session;
    },
  },
});
