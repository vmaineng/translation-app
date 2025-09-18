import { useState, useRef } from "react";
import { FaMicrophone, FaSquare } from "react-icons/fa";
import { FiVolume2 } from "react-icons/fi";

interface AudioControlsProps {
  onTranscript: (text: string) => void;
  textToSpeak: string;
  language: string;
}

export function AudioControls({
  onTranscript,
  textToSpeak,
  language,
}: AudioControlsProps) {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const recognitionRef = useRef<any | null>(null);

  const startRecording = () => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition =
        (window as any).webkitSpeechRecognition ||
        (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();

      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang =
        language === "zh"
          ? "zh-CN"
          : language === "ja"
          ? "ja-JP"
          : language === "ko"
          ? "ko-KR"
          : `${language}-${language.toUpperCase()}`;

      recognitionRef.current.onstart = () => {
        setIsRecording(true);
      };

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        onTranscript(transcript);
      };

      recognitionRef.current.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
        setIsRecording(false);
      };

      recognitionRef.current.start();
    } else {
      alert("Speech recognition not supported in this browser");
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  const speakText = () => {
    if ("speechSynthesis" in window && textToSpeak.trim()) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang =
        language === "zh"
          ? "zh-CN"
          : language === "ja"
          ? "ja-JP"
          : language === "ko"
          ? "ko-KR"
          : `${language}-${language.toUpperCase()}`;
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={isRecording ? stopRecording : startRecording}
        className={isRecording ? "bg-red-100 border-red-300" : ""}
      >
        {isRecording ? (
          <FaSquare className="h-4 w-4" />
        ) : (
          <FaMicrophone className="h-4 w-4" />
        )}
      </button>
      <button onClick={speakText} disabled={!textToSpeak.trim()}>
        <FiVolume2 className="h-4 w-4" />
      </button>
    </div>
  );
}
