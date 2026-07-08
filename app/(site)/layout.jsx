import Header from '@/components/site/Header';
import Footer from '@/components/site/Footer';
import RevealManager from '@/components/site/RevealManager';

export default function SiteLayout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <RevealManager />
    </>
  );
}
