import ReactMarkdown from "react-markdown";

const MarkdownViewer = ({ content }) => {
  return (
    <div className="prose max-w-none">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
};

export default MarkdownViewer;
