import { Session, User } from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    accessToken: string;
    user: {
      id: string;
      accessToken: string;
    } & Session['user'];
  }
  interface User {
    access_token: string;
  }
  interface JWT {
    access_token: string;
  }
}