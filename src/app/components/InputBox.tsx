import React from "react";

interface InputValueProps {
  text: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function InputBox({ text, onChange }: InputValueProps) {
  return (
    <div className="flex flex-col">
      <textarea
        id="input"
        value={text}
        onChange={onChange}
        placeholder="Enter text to translate"
        className="w-full h-40 p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
      />
    </div>
    //add button for reset input
  );
}
