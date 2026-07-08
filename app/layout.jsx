import './globals.css';
import { ContentProvider } from '@/lib/content';

const FAVICON =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='13' fill='%23C1121F'/%3E%3Cpath d='M15 49C22 32 32 21 49 13C39 26 31 38 27 49Z' fill='white'/%3E%3Ccircle cx='47' cy='47' r='5.5' fill='white'/%3E%3C/svg%3E";

export const metadata = {
  title: 'Kita Punya Project — Event Activation & Service Management',
  description:
    'PT Kita Punya Project — perusahaan penyelenggara acara dan pengelolaan layanan bisnis. Event Activation end-to-end serta Service Management: Marketing, HR, Finance, dan Legal.',
  icons: { icon: FAVICON },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        <ContentProvider>{children}</ContentProvider>
      </body>
    </html>
  );
}
