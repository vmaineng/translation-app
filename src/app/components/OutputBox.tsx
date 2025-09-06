interface OutBoxValueProps {
  value: string;
}

export default function OutputBox({ value }: OutBoxValueProps) {
  return (
    <div className="flex flex-col">
      <label
        htmlFor="output"
        className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2"
      >
        Translated Text
      </label>
      <textarea
        id="output"
        value={value}
        readOnly
        placeholder="Translated text will appear here...."
        className="w-full h-40 p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 resize-none"
      />
    </div>
  );
}
