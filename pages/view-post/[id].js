import { useRouter } from "next/router";
import { useSession, signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import MarkdownViewer from "../../components/MarkdownViewer";

const fakePosts = [
  {
    id: 1,
    title: "Published Post 1",
    content: "This is the content of published post 1.",
  },
  {
    id: 2,
    title: "Published Post 2",
    content: "This is the content of published post 2.",
  },
];

export default function ViewPost() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { id } = router.query;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    console.log("Session status:", status);
    console.log("Session data:", session);

    if (id) {
      const post = fakePosts.find((post) => post.id === parseInt(id));
      if (post) {
        setTitle(post.title);
        setContent(post.content);
      }
    }
  }, [status, session, id]);

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
          You need to be signed in to view this post
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

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">{title}</h1>
      <div className="w-full max-w-2xl bg-white p-8 rounded shadow-md">
        <MarkdownViewer content={content} />
      </div>
      <button
        onClick={() => router.push("/view-posts")}
        className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
      >
        Back to Posts
      </button>
    </div>
  );
}
