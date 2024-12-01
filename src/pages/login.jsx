import { useState } from "react";
import { useLogin } from "@/hooks/useLogin";
import { useUserStore } from "@/store";
import { useRouter } from "next/router";
import Link from "next/link";
import { jwtDecode } from "jwt-decode";
// jwtDecode(token, options)
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const login = useLogin();
  const router = useRouter();
  const { user } = useUserStore();

  if (user) {
    router.push("/products");
    // console.log("if user wlae mai", user);
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const { accessToken, refreshToken } = await login(email, password);
      console.log("accessToken in login.jsx", accessToken);
      // Decode the access token and set the user in the store
      const decoded = jwtDecode(accessToken); // Import jwtDecode if not done
      console.log("decode login wale mai", decoded);
 

      router.push("/products"); // Redirect to a private route (e.g., dashboard)
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleLogin}
        className="p-6 bg-white rounded shadow-md w-96"
      >
        <h2 className="text-2xl mb-4">Login</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded"
        >
          Login
        </button>
        <div className="mt-4 text-center">
          <Link href="/register" className="text-blue-500 hover:underline">
            Don&apost have an account? Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
