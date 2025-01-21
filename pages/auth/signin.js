import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function SignIn() {
  const router = useRouter();
  const { callbackUrl } = router.query;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("SignIn page loaded");
  }, []);

  const handleTestLogin = async () => {
    // Simulate a successful login with username "root" and password "root"
    const result = await signIn("credentials", {
      redirect: false,
      username: "root",
      password: "root",
      callbackUrl: callbackUrl || "/dashboard",
    });
    if (result.ok) {
      router.push(result.url);
    } else {
      console.error("Test login failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      username,
      password,
      callbackUrl: callbackUrl || "/dashboard",
    });

    if (result.error) {
      setError(result.error);
    } else {
      router.push(result.url);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Sign In</h1>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded shadow-md"
      >
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
            autoComplete="username"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
            autoComplete="current-password"
          />
          {error && <div className="text-red-500 mt-2">{error}</div>}
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Sign In
        </button>
      </form>
      <button
        onClick={() => signIn("google", { callbackUrl: callbackUrl || "/" })}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Sign in with Google
      </button>
      <button
        onClick={handleTestLogin}
        className="mt-4 ml-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
      >
        Test Login
      </button>
      <button
        onClick={() => router.push("/register_form")}
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
      >
        Create Account
      </button>
    </div>
  );
}
