import { useEffect } from "react";
import { useRouter } from 'next/router';
import Layout from '../components/Layout/Layout';
import '../styles/globals.css';
import { parseCookies } from "nookies";
import { useUserStore, isTokenValid } from '@/store';
import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';
import axios from 'axios';
export async function getServerSideProps(context) {
  // Get cookies from the request headers
  const cookies = parseCookies(context);
  const accessToken = cookies.accessToken;
  const refreshToken = cookies.refreshToken;
  console.log("cookie",)
  let userData = null;

  // Check if both tokens exist
  if (accessToken && refreshToken) {
    try {
      // Verify if the access token is valid (you can add more validation here)
      const decoded = jwtDecode(accessToken);

      // Fetch user data from the server
      const response = await axios.get('/api/auth/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      });

      userData = response.data;
    } catch (error) {
      console.error("Failed to fetch user data", error);
      // You can handle the error, log the user out, or refresh tokens here
    }
  }

  return {
    props: {
      userData, // Pass the user data to the component
    },
  };
}
function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const isHomePage = router.pathname === '/';
  const { hydrateStore, setUser } = useUserStore();
  console.log("pageProps", pageProps)
  // useEffect(() => {
  //   // Check if access token and refresh token are in the cookies
  //   const accessToken = Cookies.get('accessToken');
  //   const refreshToken = Cookies.get('refreshToken');

  //   if (accessToken && refreshToken) {
  //     if (isTokenValid(accessToken)) {
  //       const decoded = jwtDecode(accessToken);

  //       // Hydrate the store with decoded token data
  //       hydrateStore({ id: decoded.id, email: decoded.email }, accessToken, refreshToken);

  //       // Fetch user data from /api/auth/me
  //       axios
  //         .get('/api/auth/me', { withCredentials: true })
  //         .then(response => {
  //           const { id, email } = response.data;
  //           // Update the store with the user data (id and email)
  //           setUser({ id, email });
  //         })
  //         .catch(error => {
  //           console.error("Failed to fetch user data", error);
  //           // Handle failed API request (e.g., log out or show an error)
  //         });
  //     } else {
  //       // Handle expired token (e.g., try to refresh it or log the user out)
  //       logout();
  //     }
  //   }
  // }, [hydrateStore, setUser]);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        console.log('Sending request to /api/auth/me');
        const response = await axios.get('/api/auth/me', { withCredentials: true });
       
        hydrateStore({ id: response.data.id, email: response.data.email });
        console.log('Response from /api/auth/me:', response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);
  return (
    <div>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  );
}

export default MyApp;
