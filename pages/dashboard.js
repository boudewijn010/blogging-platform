import { useSession, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [drafts, setDrafts] = useState([]);
  const [explorePosts, setExplorePosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Session status:", status);
    console.log("Session data:", session);

    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/get-posts");
        const data = await response.json();
        if (response.ok) {
          setExplorePosts(data.posts);
        } else {
          setError(data.message);
        }
      } catch {
        setError("Failed to fetch posts");
      }
    };

    if (session) {
      fetchPosts();
    }
  }, [session, status]);

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
          You need to be signed in to access the dashboard
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

  const handleEdit = (id) => {
    router.push(`/edit-post/${id}`);
  };

  const handlePost = (id) => {
    // Add logic to publish the post
    console.log(`Publishing post with id: ${id}`);
  };

  const handleRead = (id) => {
    router.push(`/view-post/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-4">
        Welcome to your Dashboard, {session.user?.name || "User"}
      </h1>
      {error && (
        <div className="mb-4 px-4 py-2 bg-red-500 text-white rounded">
          {error}
        </div>
      )}
      <button
        onClick={() => router.push("/create-post")}
        className="mb-8 px-6 py-3 bg-blue-600 text-white text-lg font-bold rounded hover:bg-blue-800"
      >
        Create Post
      </button>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-6xl">
        <div className="bg-white dark:bg-gray-800 p-8 rounded shadow-md">
          <h2 className="text-2xl font-bold mb-4">Recent Drafts</h2>
          {drafts.map((draft) => (
            <div
              key={draft.id}
              className="flex justify-between items-center mb-4"
            >
              <div>
                <h3 className="text-xl font-bold">{draft.title}</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {draft.content}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(draft.id)}
                  className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handlePost(draft.id)}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
                >
                  Post
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white dark:bg-gray-800 p-8 rounded shadow-md">
          <h2 className="text-2xl font-bold mb-4">Explore Posts</h2>
          {explorePosts.map((post) => (
            <div
              key={post.id}
              className="flex justify-between items-center mb-4"
            >
              <div>
                <h3 className="text-xl font-bold">{post.title}</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {post.content}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Posted by {post.username}
                </p>
              </div>
              <button
                onClick={() => handleRead(post.id)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
              >
                Read
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
