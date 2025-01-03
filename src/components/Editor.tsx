"use client";

import { useState } from "react";

import { linter, lintGutter } from "@codemirror/lint";
import { json, jsonParseLinter } from "@codemirror/lang-json";

import JsonView from "@uiw/react-json-view";
import CodeMirror from "@uiw/react-codemirror";
import { materialLight } from "@uiw/codemirror-theme-material";
import { historyField } from "@codemirror/commands";

import { JSONBeautify, JSONMinify, safeJsonParse } from "@/lib/utils";

const jsonLinter = () => linter(jsonParseLinter());

const stateFields = { history: historyField };

export default function Editor() {
  const serializedState =
    typeof window !== "undefined" && localStorage.getItem("editorstate");
  const value =
    (typeof window !== "undefined" && localStorage.getItem("code")) || "";
  const [code, setCode] = useState(value || `{}`);

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
          initialState={
            serializedState
              ? {
                  json: JSON.parse(serializedState || ""),
                  fields: stateFields,
                }
              : undefined
          }
          onChange={(value, viewUpdate) => {
            setCode(value);
            localStorage.setItem("code", value);

            const state = viewUpdate.state.toJSON(stateFields);
            localStorage.setItem("editorstate", JSON.stringify(state));
          }}
        />
      </div>

      <JsonView className="viewer" value={safeJsonParse(code) || {}} />
    </main>
  );
}
