"use client";

import { useState } from "react";

import { linter, lintGutter } from "@codemirror/lint";
import { json, jsonParseLinter } from "@codemirror/lang-json";

import JsonView from "@uiw/react-json-view";
import CodeMirror from "@uiw/react-codemirror";
import { materialLight } from "@uiw/codemirror-theme-material";

import { JSONBeautify, safeJsonParse } from "@/lib/utils";

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
        value={code}
        height="100%"
        theme={materialLight}
        extensions={[json(), jsonLinter(), lintGutter()]}
        onChange={(val) => setCode(val)}
      />

      <JsonView className="viewer" value={safeJsonParse(code) || {}} />
    </main>
  );
}
