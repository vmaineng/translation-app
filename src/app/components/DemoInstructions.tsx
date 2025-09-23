export function DemoInstructions() {
  return (
    <div className="mt-8 p-4 bg-blue-800 rounded-lg border-l-4 border-blue-400">
      <h3 className="mb-2">How to use:</h3>
      <ul className="space-y-1 text-sm text-muted-foreground">
        <li>• Select source and target languages from the dropdowns</li>
        <li>
          • Type text directly or click the microphone icon to use voice input
        </li>
        <li>• Click "Translate" to convert your text</li>
        <li>• Use the speaker icon to hear the pronunciation</li>
        <li>• Copy translations with the copy button</li>
        <li>• Swap languages quickly with the swap button</li>
      </ul>
    </div>
  );
}
