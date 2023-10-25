import { useEffect, useRef } from "react";
import MonacoEditor from "react-monaco-editor";

const CodeEditor = ({ code, onChange }) => {
  // const codeEditorRef = useRef();

  // useEffect(() => {
  //   codeEditorRef.current.editor.focus();
  // }, []);

  // console.log(codeEditorRef)

  const options = {
    selectOnLineNumbers: true,
    fontSize: 18,
    padding: { top: 10, right: 10, bottom: 10, left: 10 },
  };

  return (
    <MonacoEditor
      // ref={codeEditorRef}
      width="100%"
      height="calc(100vh - 180px)"
      language="javascript"
      theme="monokai"
      value={code}
      options={options}
      onChange={onChange}
    />
  );
};

export default CodeEditor;
