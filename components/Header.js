import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
// import Image from "next/image";

export default function Header({ toggleTheme }) {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1
          className="text-2xl font-bold cursor-pointer"
          onClick={() => router.push("/")}
        >
          Blogging Platform
        </h1>
        <nav className="space-x-4 flex items-center">
          <button
            onClick={() => router.push("/dashboard")}
            className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-700"
          >
            Dashboard
          </button>
          <button
            onClick={() => router.push("/create-post")}
            className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-700"
          >
            Create Post
          </button>
          <button
            onClick={() => router.push("/edit-posts")}
            className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-700"
          >
            Edit Posts
          </button>
          <button
            onClick={() => router.push("/view-posts")}
            className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-700"
          >
            View Previous Posts
          </button>
          <button
            onClick={() => router.push("/explore")}
            className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-700"
          >
            Explore
          </button>
          <button
            onClick={() => router.push("/settings")}
            className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-700"
          >
            Settings
          </button>
          <button
            onClick={toggleTheme}
            className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-700 flex items-center"
          >
            {/* {theme === "light" ? (
              <Image
                src="/icons/sun.png"
                alt="Sun Icon"
                width={20}
                height={20}
              />
            ) : (
              <Image
                src="/icons/moon.png"
                alt="Moon Icon"
                width={20}
                height={20}
              />
            )} */}
          </button>
          {session ? (
            <button
              onClick={() => signOut({ callbackUrl: "/auth/signin" })}
              className="px-4 py-2 bg-red-500 rounded hover:bg-red-700"
            >
              Sign out
            </button>
          ) : (
            <button
              onClick={() => signIn()}
              className="px-4 py-2 bg-green-500 rounded hover:bg-green-700"
            >
              Sign in
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
