import { useEffect } from "react";
import { useRouter } from 'next/router';
import Layout from '../components/Layout/Layout';
import '../styles/globals.css';
import { parseCookies } from "nookies";
import { useUserStore } from '@/store';
function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const isHomePage = router.pathname === '/';
const {hydrate} =useUserStore();
  useEffect(() => {
    const cookies = parseCookies();
    hydrate(cookies); // Initialize store with cookies if available
  }, []);

  return (
    <div>
      {/* {!isHomePage && (<Layout > <Component {...pageProps} /></Layout>)}
      {
        isHomePage && (<Component {...pageProps} />)
      } */}
      <Layout > <Component {...pageProps} /></Layout>
    </div>
  );
}

export default MyApp;
