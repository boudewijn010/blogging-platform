import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ViewPost() {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/get-post?id=${id}`);
        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error fetching post:", errorData.message);
          throw new Error(
            `Network response was not ok: ${response.statusText}`
          );
        }
        const data = await response.json();
        setPost(data.post);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [id]);

  if (!post) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white dark:bg-gray-800 p-8 rounded shadow-md">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <p className="text-gray-700 dark:text-gray-300 mb-4">{post.content}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Posted by {post.username}
        </p>
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
