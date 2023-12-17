import { IndexNavbar } from '@/components/shared/Navbar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <IndexNavbar />
      <div>{children}</div>
    </>
  );
}
