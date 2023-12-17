import UserProvider from '@/components/userData';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main>
      <UserProvider>{children}</UserProvider>
    </main>
  );
}
