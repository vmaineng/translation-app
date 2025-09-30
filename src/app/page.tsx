"use client";
import InputBox from "./components/InputBox";
import OutputBox from "./components/OutputBox";
import { useState } from "react";
import { LanguageSelector } from "./components/LanguageSelector";
import { AudioControls } from "./components/AudioControls";
import { translateText } from "./components/TranslationService";
import { DemoInstructions } from "./components/DemoInstructions";
import {
  FaArrowRightArrowLeft,
  FaRegCopy,
  FaRegTrashCan,
} from "react-icons/fa6";
import { toast } from "sonner";

export default function Home() {
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [sourceLang, setSourceLang] = useState<string>("en");
  const [targetLang, setTargetLang] = useState<string>("es");
  const [isTranslating, setIsTranslating] = useState<boolean>(false);

  const handleTranslate = async () => {
    if (!input.trim()) {
      toast.error("Please enter text to translate");
      return;
    }

    if (sourceLang === targetLang) {
      toast.error("Please select difference source and target languages");
    }

    setIsTranslating(true);
    try {
      const result = await translateText(input, sourceLang, targetLang);
      setOutput(result);
      toast.success("Translation completed!");
    } catch (error) {
      toast.error("Translation failed. Please try again.");
    } finally {
      setIsTranslating(false);
    }
  };

  const handleSwapLanguages = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setInput(output);
    setOutput(input);
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy text");
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
  };

  const handleSourceTranscript = (transcript: string) => {
    setInput(transcript);
    toast.success("Speech recognized!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-3xl bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 space-y-6">
        <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100">
          🌐 Translation App
        </h1>
        <div className="text-center text-gray-600 dark:text-gray-400 mb-4">
          Enter text or use voice input, then translate
        </div>
        <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 text-center">
            Select Languages
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Source Language
              </label>
              <LanguageSelector
                value={sourceLang}
                onValueChange={setSourceLang}
                placeholder="Select source language"
              />
            </div>
            <button
              onClick={handleSwapLanguages}
              className="p-3 bg-gray-200 dark:bg-gray-600 rounded-full hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors mt-6"
              title="Swap languages"
            >
              <FaArrowRightArrowLeft className="h-5 w-5" />
            </button>

            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Target Language
              </label>
              <LanguageSelector
                value={targetLang}
                onValueChange={setTargetLang}
                placeholder="Select target language"
              />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Input Text
              </div>
              <AudioControls
                onTranscript={handleSourceTranscript}
                textToSpeak={input}
                language={sourceLang}
              />
            </div>
            <div className="relative">
              <InputBox
                text={input}
                onChange={(e) => setInput(e.target.value)}
              />
              {input && (
                <button
                  onClick={() => handleCopy(input)}
                  className="absolute top-2 right-2 opacity-70 hover:opacity-100"
                >
                  <FaRegCopy className="w-4 h-4" />
                </button>
              )}
            </div>
            <div className="text-sm text-muted-foreground">
              {input.length} characters
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Translation
              </div>
              <AudioControls
                onTranscript={() => {}}
                textToSpeak={output}
                language={targetLang}
              />
            </div>
            <div className="relative">
              <OutputBox value={output} />
            </div>
            {output && (
              <button onClick={() => handleCopy(output)}>
                <FaRegCopy className="h-4 w-4" />
              </button>
            )}
            <div className="text-sm text-muted-foreground">
              {output.length} characters
            </div>
          </div>
        </div>

        <div className="flex justify-between pt-4">
          <button
            onClick={handleClear}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
          >
            <FaRegTrashCan className="h-4 w-4" />
            Clear All
          </button>
          <button
            onClick={handleTranslate}
            disabled={isTranslating}
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md transition-colors"
          >
            {isTranslating ? "Translating..." : "Translate"}
          </button>
        </div>
        <DemoInstructions />
      </div>
    </div>
  );
}

//add in OpenAPI AI for text's translation
//think about how to add audio as the next layer
