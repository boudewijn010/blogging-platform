import Head from "next/head";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    } else if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <Head>
        <title>Blogging Platform</title>
        <meta
          name="description"
          content="A blogging platform with Markdown editor"
        />
      </Head>
      <main className="text-center">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to the Blogging Platform
        </h1>
        <p className="text-lg">
          Start writing your posts using the Markdown editor.
        </p>
        {!session && (
          <button
            onClick={() => signIn()}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Login
          </button>
        )}
      </main>
    </div>
  );
}
