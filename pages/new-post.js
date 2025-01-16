import { useState } from "react";
import MarkdownEditor from "../components/MarkdownEditor";

export default function NewPost() {
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    });
    if (res.ok) {
      // Handle successful post creation
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Create a New Post</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-2xl">
        <MarkdownEditor value={content} onChange={setContent} />
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
