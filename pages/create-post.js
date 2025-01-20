import { useSession, signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import MarkdownEditor from "../components/MarkdownEditor";

export default function CreatePost() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    console.log("Session status:", status);
    console.log("Session data:", session);
  }, [status, session]);

  if (status === "loading") {
    console.log("Loading component rendered");
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (!session) {
    console.log("Sign-in prompt rendered");
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl mb-4">
          You need to be signed in to create a post
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
      const response = await fetch("/api/createPost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content, userId: session.user.id }),
      });
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        const data = await response.json();
        if (response.ok) {
          alert(data.message);
          document.getElementById("viewPostButtonContainer").innerHTML =
            data.viewPostButton;
        } else {
          alert(data.message);
        }
      } else {
        alert("Unexpected response format. Please try again later.");
      }
    } catch (error) {
      console.error("Error creating post:", error);
      alert(
        "An error occurred while creating the post. Please try again later."
      );
    }
  };

  const handleSaveDraft = async (e) => {
    e.preventDefault();
    try {
      // Add logic to save the post as a draft
      console.log("Draft Title:", title);
      console.log("Draft Content:", content);
    } catch (error) {
      console.error("Error saving draft:", error);
    }
  };

  console.log("CreatePost component rendered");

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Create a new post</h1>
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
            Create Post
          </button>
          <button
            onClick={handleSaveDraft}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
          >
            Save as Draft
          </button>
        </div>
      </form>
      <div id="viewPostButtonContainer" className="mt-4"></div>
      <button
        onClick={() => router.push("/dashboard")}
        className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
      >
        Back to Dashboard
      </button>
    </div>
  );
}
