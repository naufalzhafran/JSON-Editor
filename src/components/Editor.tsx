"use client";

import { useState } from "react";

import { linter, lintGutter } from "@codemirror/lint";
import { json, jsonParseLinter } from "@codemirror/lang-json";

import JsonView from "@uiw/react-json-view";
import CodeMirror from "@uiw/react-codemirror";
import { materialLight } from "@uiw/codemirror-theme-material";

import { JSONBeautify, JSONMinify, safeJsonParse } from "@/lib/utils";

const jsonLinter = () => linter(jsonParseLinter());

export default function Editor() {
  const [code, setCode] = useState(`{}`);

  const isJSONValid = Boolean(safeJsonParse(code));

  return (
    <main>
      <button
        className="pretty-button"
        onClick={() => setCode(JSONBeautify(code))}
        disabled={!isJSONValid}
      >
        {isJSONValid ? "Beautify" : "Invalid"}
      </button>
      <button
        className="minify-button"
        onClick={() => setCode(JSONMinify(code))}
        disabled={!isJSONValid}
      >
        {isJSONValid ? "Minify" : "Invalid"}
      </button>
      <div className="editor-container">
        <CodeMirror
          className="editor"
          basicSetup={{
            searchKeymap: false,
            foldKeymap: false,
            completionKeymap: false,
            foldGutter: false,
            highlightActiveLine: false,
            highlightActiveLineGutter: false,
            rectangularSelection: false,
          }}
          height="100%"
          value={code}
          theme={materialLight}
          extensions={[json(), jsonLinter(), lintGutter()]}
          onChange={(val) => setCode(val)}
        />
      </div>

      <JsonView className="viewer" value={safeJsonParse(code) || {}} />
    </main>
  );
}
