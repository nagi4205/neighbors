// "use client";

// import { SessionProvider } from "next-auth/react";
// import { ReactNode } from "react";

// const NextAuthProvider = ({ children }: { children: ReactNode }) => {
//   return <SessionProvider>{children}</SessionProvider>;
// };

// export default NextAuthProvider;

"use client";

import { SessionProvider } from "next-auth/react";

type Props = {
  children?: React.ReactNode;
};

export const NextAuthProvider = ({ children }: Props) => {
  return <SessionProvider>{children}</SessionProvider>;
};
