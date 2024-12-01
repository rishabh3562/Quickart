import { useEffect } from "react";
import { useRouter } from 'next/router';
import Layout from '../components/Layout/Layout';
import '../styles/globals.css';
import { parseCookies } from "nookies";
import { useUserStore ,isTokenValid} from '@/store';
import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';
function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const isHomePage = router.pathname === '/';
  // const {hydrate} =useUserStore();
  //   useEffect(() => {
  //     const cookies = parseCookies();
  //     hydrate(cookies); // Initialize store with cookies if available
  //   }, []);
  const { hydrateStore } = useUserStore();
  useEffect(() => {
    // Check if access token and refresh token are in the cookies
    const accessToken = Cookies.get('accessToken');
    const refreshToken = Cookies.get('refreshToken');

    if (accessToken && refreshToken) {
      if (isTokenValid(accessToken)) {
        const decoded = jwtDecode(accessToken);
        hydrateStore({ id: decoded.id, email: decoded.email }, accessToken, refreshToken);
      } else {
        // Handle expired token (e.g., try to refresh it or log the user out)
        logout();
      }
    }
  }, [hydrateStore]);
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
