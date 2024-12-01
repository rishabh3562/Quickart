import { useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout/Layout";
import "../styles/globals.css";
import { useUserStore } from "@/store";
import axios from "axios";
import { ROUTES } from "@/lib/routes";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const { hydrateStore } = useUserStore();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(ROUTES.API.ME, { withCredentials: true });
        hydrateStore({ id: response.data.id, email: response.data.email });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [hydrateStore]);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
