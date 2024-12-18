// pages/register.js
import { useState } from "react";
import { useRegister } from "@/hooks/useRegister";
import { useRouter } from "next/router";
import { useUserStore } from "@/store";
import SEO from "@/components/SEO";
import { ROUTES } from "@/lib/routes";
const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const register = useRegister();
  const router = useRouter();
  const { user } = useUserStore();
  // console.log("user in register", user);
  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await register(email, password); // Call register hook
      router.push(ROUTES.CLIENT.PRODUCT); // Redirect to a private route (e.g., dashboard)
    } catch (err) {
      setError("Failed to register. Please try again.");
    }
  };

  return (
    <>
      <SEO
        title="Sign Up for Quickart"
        description="Create an account on Quickart to start shopping and enjoy exclusive benefits."
        url="https://coneixement-assignment-frontend.vercel.app/signup"
      />
      <div className="flex justify-center items-center min-h-screen">
        <form
          onSubmit={handleRegister}
          className="p-6 bg-white rounded shadow-md w-96"
        >
          <h2 className="text-2xl mb-4">Register</h2>
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
            className="w-full p-2 bg-green-500 text-white rounded"
          >
            Register
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
