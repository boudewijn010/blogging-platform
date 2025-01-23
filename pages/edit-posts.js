import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function EditPosts() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [drafts, setDrafts] = useState([]);

  useEffect(() => {
    console.log("Session status:", status);
    console.log("Session data:", session);

    const fetchDrafts = async () => {
      try {
        const response = await fetch("/api/get-drafts");
        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error fetching drafts:", errorData.message);
          throw new Error(
            `Network response was not ok: ${response.statusText}`
          );
        }
        const data = await response.json();
        setDrafts(data.drafts);
      } catch (error) {
        console.error("Error fetching drafts:", error);
      }
    };
    fetchDrafts();
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
          You need to be signed in to edit posts
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

  const handlePublish = (id) => {
    // Add logic to publish the post
    console.log(`Publishing post with id: ${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Edit Your Drafts</h1>
      <div className="w-full max-w-2xl bg-white p-8 rounded shadow-md">
        {drafts.map((draft) => (
          <div key={draft.id} className="mb-4">
            <h2 className="text-2xl font-bold">{draft.title}</h2>
            <p className="text-gray-700">{draft.content}</p>
            <div className="flex space-x-4 mt-2">
              <button
                onClick={() => handleEdit(draft.id)}
                className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-700"
              >
                Edit
              </button>
              <button
                onClick={() => handlePublish(draft.id)}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
              >
                Publish
              </button>
            </div>
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
