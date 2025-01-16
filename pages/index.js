import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

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
          <>
            <button
              onClick={() => signIn()}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
              Login
            </button>
            <button
              onClick={() => signIn()}
              className="mt-4 ml-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
            >
              Create Account
            </button>
          </>
        )}
        {session && (
          <>
            <button
              onClick={() => signOut()}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
            >
              Logout
            </button>
          </>
        )}
      </main>
    </div>
  );
}
