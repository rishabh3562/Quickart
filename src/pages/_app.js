import { useRouter } from 'next/router';
import Layout from '../components/Layout/Layout';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const isHomePage = router.pathname === '/';

  return (
    <div>
      {!isHomePage && (<Layout > <Component {...pageProps} /></Layout>)}
      {
        isHomePage && (<Component {...pageProps} />)
      }
    </div>
  );
}

export default MyApp;
