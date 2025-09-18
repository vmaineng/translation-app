interface LanguageSelectorProps {
  value: string;
  onValueChange: (value: string) => void;
  placeholder: string;
}

const languages = [
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "it", name: "Italian" },
  { code: "pt", name: "Portuguese" },
  { code: "ru", name: "Russian" },
  { code: "ja", name: "Japanese" },
  { code: "ko", name: "Korean" },
  { code: "zh", name: "Chinese" },
  { code: "ar", name: "Arabic" },
  { code: "hi", name: "Hindi" },
  { code: "hm", name: "Hmong" },
];

export function LanguageSelector({
  value,
  onValueChange,
  placeholder,
}: LanguageSelectorProps) {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onValueChange(event.target.value);
  };

  return (
    <div className="relative">
      <select
        value={value}
        onChange={handleChange}
        className="w-[180px] h-9 px-3 py-1 rounded-md border border-input bg-background"
      >
        <option value="" disabled hidden>
          {placeholder}
        </option>
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
}
