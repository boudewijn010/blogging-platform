import { useRouter } from "next/router";
import { useSession, signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import MarkdownEditor from "../../components/MarkdownEditor";

const fakeDrafts = [
  {
    id: 1,
    title: "Draft Post 1",
    content: "This is the content of draft post 1.",
  },
  {
    id: 2,
    title: "Draft Post 2",
    content: "This is the content of draft post 2.",
  },
];

export default function EditPost() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { id } = router.query;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    console.log("Session status:", status);
    console.log("Session data:", session);

    if (id) {
      const draft = fakeDrafts.find((draft) => draft.id === parseInt(id));
      if (draft) {
        setTitle(draft.title);
        setContent(draft.content);
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
          You need to be signed in to edit a post
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Add logic to save the edited post
      console.log("Edited Title:", title);
      console.log("Edited Content:", content);
    } catch (error) {
      console.error("Error editing post:", error);
    }
  };

  const handlePost = async (e) => {
    e.preventDefault();
    try {
      // Add logic to publish the post
      console.log("Posting Title:", title);
      console.log("Posting Content:", content);
    } catch (error) {
      console.error("Error posting:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Edit Post</h1>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white p-8 rounded shadow-md"
      >
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="content"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Content
          </label>
          <MarkdownEditor value={content} onChange={setContent} />
        </div>
        <div className="flex space-x-4">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Save Changes
          </button>
          <button
            onClick={handlePost}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
          >
            Post
          </button>
        </div>
      </form>
      <button
        onClick={() => router.push("/edit-posts")}
        className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
      >
        Back to Drafts
      </button>
    </div>
  );
}
