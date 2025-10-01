import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { AudioControls } from "./AudioControls";
import "@testing-library/jest-dom";

Object.defineProperty(window, "SpeechRecognition", {
  value: jest.fn(),
  writable: true,
});

Object.defineProperty(window, "webkitSpeechRecognition", {
  value: jest.fn(),
  writable: true,
});

// Mock SpeechSynthesisUtterance
Object.defineProperty(window, "SpeechSynthesisUtterance", {
  value: jest.fn(),
  writable: true,
});

describe("AudioControls", () => {
  const defaultProps = {
    onTranscript: jest.fn(),
    textToSpeak: "Hello world",
    language: "en",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Rendering icons", () => {
    it("renders both icons", () => {
      render(<AudioControls {...defaultProps} />);
      expect(screen.getByTestId("record-button")).toBeInTheDocument();
      expect(screen.getByTestId("speak-button")).toBeInTheDocument();
    });
  });
});
