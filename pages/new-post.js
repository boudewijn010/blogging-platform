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
    <div>
      <h1>Create a New Post</h1>
      <form onSubmit={handleSubmit}>
        <MarkdownEditor value={content} onChange={setContent} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
