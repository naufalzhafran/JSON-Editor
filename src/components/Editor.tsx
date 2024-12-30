"use client";

import { useState } from "react";

import JsonView from "@uiw/react-json-view";

import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import { materialLight } from "@uiw/codemirror-theme-material";

import { JSONBeautify, safeJsonParse } from "@/lib/utils";

export default function Editor() {
  const [code, setCode] = useState(``);

  return (
    <main>
      <button
        className="pretty-button"
        onClick={() => setCode(JSONBeautify(code))}
      >
        Beautify
      </button>
      <CodeMirror
        className="editor"
        basicSetup={{
          searchKeymap: false,
          foldKeymap: false,
          completionKeymap: false,
          lintKeymap: false,
          foldGutter: false,
          highlightActiveLine: false,
          highlightActiveLineGutter: false,
          rectangularSelection: false,
        }}
        value={code}
        height="100%"
        theme={materialLight}
        extensions={[json()]}
        onChange={(val) => setCode(val)}
      />

      <JsonView className="viewer" value={safeJsonParse(code) || {}} />
    </main>
  );
}
