"use client";
import InputBox from "./components/InputBox";
import OutputBox from "./components/OutputBox";
import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleTranslate = () => {
    if (!input.trim()) {
      setError("Please enter something...");
      return;
    }
    setError("");
    setOutput(input.split("").reverse().join(""));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-3xl bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 space-y-6">
        <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100">
          🌐 Translation App
        </h1>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <InputBox text={input} onChange={(e) => setInput(e.target.value)} />
            {error && (
              <p className="mt-2 text-sm text-red-500 font-medium">{error}</p>
            )}
          </div>
          <OutputBox value={output} />
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleTranslate}
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md transition-colors"
          >
            Translate
          </button>
        </div>
      </div>
    </div>
  );
}

//add in OpenAPI AI for text's translation
//think about how to add audio as the next layer
