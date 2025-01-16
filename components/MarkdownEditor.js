import { useState } from "react";
import dynamic from "next/dynamic";
const ReactMde = dynamic(() => import("react-mde"), { ssr: false });
import "react-mde/lib/styles/css/react-mde-all.css";
import * as Showdown from "showdown";

const MarkdownEditor = ({ value, onChange }) => {
  const [selectedTab, setSelectedTab] = useState("write");
  const converter = new Showdown.Converter();

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <ReactMde
        value={value}
        onChange={onChange}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={(markdown) =>
          Promise.resolve(converter.makeHtml(markdown))
        }
      />
    </div>
  );
};

export default MarkdownEditor;
