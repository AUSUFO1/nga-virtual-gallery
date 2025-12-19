import Navbar from '@/src/components/NavBar';
import Footer from '@/src/components/Footer';

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
