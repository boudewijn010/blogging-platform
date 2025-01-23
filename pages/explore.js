import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Explore() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    console.log("Session status:", status);
    console.log("Session data:", session);

    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/get-posts");
        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error fetching posts:", errorData.message);
          throw new Error(
            `Network response was not ok: ${response.statusText}`
          );
        }
        const data = await response.json();
        setPosts(data.posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    if (session) {
      fetchPosts();
    }
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
