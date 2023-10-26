import MonacoEditor from "react-monaco-editor";

const CodeEditor = ({ code, onChange }) => {


  const options = {
    selectOnLineNumbers: true,
    fontSize: 18,
    padding: { top: 10, right: 10, bottom: 10, left: 10 },
    wordWrap: "on",
  };

  return (
    <MonacoEditor
      width="100%"
      height="calc(100vh - 180px)"
      language="javascript"
      theme="vs-light"
      value={code}
      options={options}
      onChange={onChange}
    />
  );
};

export default CodeEditor;
