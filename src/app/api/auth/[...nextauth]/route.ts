import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';
import { Anuphan } from 'next/font/google';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Email and Password',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'Your Email' },
        password: { label: 'Password', type: 'password' },
      },
      // async authorize(credentials) {
      //   const res = await fetch("http://localhost/sanctum/csrf-cookie", {
      //     method: "GET",
      //   });

      //   const setCookieHeader = res.headers.get("set-cookie");
      //   console.log("setCookieHeader", setCookieHeader);
      //   // you'll find your_site_session key in this console log

      //   const cookies = setCookieHeader?.split(", ");
      //   console.log("cookies", cookies);
      //   let sessionKey = null;
      //   let xsrfToken = null;

      //   for (const cookie of cookies!) {
      //     if (cookie.startsWith("laravel_session=")) {
      //       sessionKey = cookie.split("=")[1];
      //     } else if (cookie.startsWith("XSRF-TOKEN=")) {
      //       xsrfToken = cookie.split("=")[1];
      //     }

      //     if (sessionKey && xsrfToken) {
      //       break;
      //     }
      //   }
      //   const data = {
      //     email: credentials?.email,
      //     password: credentials?.password,
      //   };
      //   const headers = new Headers({
      //     Cookie: `laravel_session=${sessionKey}`,
      //     "Content-Type": "application/json",
      //   });

      //   if (xsrfToken) {
      //     headers.append("X-XSRF-TOKEN", xsrfToken);
      //   }

      //   const options = {
      //     method: "POST",
      //     headers,
      //     body: JSON.stringify(data),
      //   };
      //   try {
      //     // console.log(options)
      //     const response = await fetch("http://localhost/api/login", options);

      //     if (response.ok) {
      //       const res = await response.json();
      //       console.log("response", res);
      //       return res;
      //     } else {
      //       console.log("HTTP error! Status:", response.status);
      //       // Handle non-successful response here, return an appropriate JSON response.
      //       return { error: "Authentication failed" };
      //     }
      //   } catch (error) {
      //     console.log("Error", error);
      //   }

      //   return null;
      // }

      async authorize(credentials) {
        try {
          // CSRFトークン取得
          const response = await axios.get(
            'http://localhost/sanctum/csrf-cookie'
          );

          const setCookieHeader = response.headers['set-cookie'];
          const cookies = setCookieHeader
            ? setCookieHeader.join(', ').split(', ')
            : [];

          let sessionKey = null;
          let xsrfToken = null;

          // クッキーからlaravel_sessionとXSRF-TOKENを取得
          for (const cookie of cookies) {
            if (cookie.startsWith('laravel_session=')) {
              sessionKey = cookie.split('=')[1];
            } else if (cookie.startsWith('XSRF-TOKEN=')) {
              xsrfToken = cookie.split('=')[1];
            }

            if (sessionKey && xsrfToken) {
              break;
            }
          }

          const data = {
            email: credentials?.email,
            password: credentials?.password,
          };

          // クッキーとXSRF-TOKENを含むヘッダーを設定
          const headers = {
            Cookie: `laravel_session=${sessionKey}`,
            'Content-Type': 'application/json',
            'X-XSRF-TOKEN': xsrfToken, // xsrfTokenは常に存在することを想定
          };

          // ログインリクエストの実行
          const authResponse = await axios.post(
            'http://localhost/api/login',
            data,
            {
              headers: headers,
              withCredentials: true,
            }
          );

          console.log('authResponse', authResponse);
          if (authResponse.status === 200) {
            return authResponse.data;
          } else {
            return { error: 'Authentication failed' };
          }
        } catch (error) {
          console.log('!!!!!Error', error);
          return null;
        }
      },
    }),
  ],
  pages: {
    // カスタムログインページを追加します。
    signIn: '/log-in',
  },
  callbacks: {
    async jwt({ token, account, user }) {
      if (user) {
        token.user = user;
        token.accessToken = user.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.access_token;
      session.user = token.user;
      return session;
    },
  },
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
