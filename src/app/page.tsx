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
        <div className="flex items-center justify-between">
          <span>Translation Tool</span>
          <div className="flex gap-2">
            <button onClick={handleSwapLanguages} className="gap-2">
              <FaArrowRightArrowLeft className="h-4 w-4" />
              Swap
            </button>
            <button onClick={handleClear} className="gap-2">
              <FaRegTrashCan className="h-4 w-4" /> Clear
            </button>
          </div>
        </div>
        Select languages, enter text or use voice input, then translate
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center justify-between">
              <LanguageSelector
                value={input}
                onValueChange={setInput}
                placeholder="source language"
              />
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
              <LanguageSelector
                value={output}
                onValueChange={setOutput}
                placeholder="source language"
              />
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
        <div className="flex justify-center">
          <button
            onClick={handleTranslate}
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md transition-colors"
          >
            Translate
          </button>
        </div>
        <DemoInstructions />
      </div>
    </div>
  );
}

//add in OpenAPI AI for text's translation
//think about how to add audio as the next layer
