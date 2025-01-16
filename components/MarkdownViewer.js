import ReactMarkdown from "react-markdown";
import { useEffect } from "react";

const MarkdownViewer = ({ content }) => {
  useEffect(() => {
    console.log("MarkdownViewer content:", content);
  }, [content]);

  return (
    <div className="prose max-w-none">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
};

export default MarkdownViewer;
