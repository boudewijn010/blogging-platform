import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const fakePosts = [
  {
    id: 1,
    title: "Post 1",
    content: "This is the content of post 1.",
    username: "user1",
  },
  {
    id: 2,
    title: "Post 2",
    content: "This is the content of post 2.",
    username: "user2",
  },
  {
    id: 3,
    title: "Post 3",
    content: "This is the content of post 3.",
    username: "user3",
  },
  {
    id: 4,
    title: "Post 4",
    content: "This is the content of post 4.",
    username: "user4",
  },
  {
    id: 5,
    title: "Post 5",
    content: "This is the content of post 5.",
    username: "user5",
  },
  {
    id: 6,
    title: "Post 6",
    content: "This is the content of post 6.",
    username: "user6",
  },
];

export default function Explore() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState(fakePosts);

  useEffect(() => {
    console.log("Session status:", status);
    console.log("Session data:", session);
  }, [status, session]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl mb-4">
          You need to be signed in to explore posts
        </h1>
        <button
          onClick={() => signIn()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Sign in
        </button>
      </div>
    );
  }

  const handleView = (id) => {
    router.push(`/view-post/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Explore Posts</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-6xl">
        {posts.map((post) => (
          <div key={post.id} className="bg-white p-4 rounded shadow-md">
            <h2 className="text-2xl font-bold">{post.title}</h2>
            <p className="text-gray-700">{post.content}</p>
            <p className="text-sm text-gray-500">Posted by {post.username}</p>
            <button
              onClick={() => handleView(post.id)}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
              View
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={() => router.push("/dashboard")}
        className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
      >
        Back to Dashboard
      </button>
    </div>
  );
}
