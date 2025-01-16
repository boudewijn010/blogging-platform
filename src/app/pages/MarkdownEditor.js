import { useState } from "react";

const MarkdownEditor = ({ onChange }) => {
  const [markdown, setMarkdown] = useState("");

  const handleInputChange = (e) => {
    setMarkdown(e.target.value);
    if (onChange) onChange(e.target.value);
  };

  return (
    <textarea
      value={markdown}
      onChange={handleInputChange}
      className="w-full h-64 p-4 border rounded-lg"
      placeholder="Write your post in Markdown..."
    />
  );
};

export default MarkdownEditor;
