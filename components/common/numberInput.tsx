import { useEffect, useState } from "react";
import { Input } from "@nextui-org/react";

export default function NumberInput({
  name,
  propValue,
  variant,
  color,
  className,
  placeholder,
  onChange,
  decimal,
  isRequired,
  isInvalid,
  errorMessage,
}: any) {
  const [value, setValue] = useState(propValue);

  useEffect(() => {
    setValue(propValue);
  }, [propValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const regexPattern = new RegExp(`^-?\\d*\\.?\\d{0,${decimal}}$`);
    const isValid = regexPattern.test(e.target.value);

    const isFirstDot =
      e.target.value.startsWith(".") && !/\d/.test(e.target.value);

    if (isValid && !isFirstDot) {
      setValue(e.target.value);
      onChange(e);
    } else {
      setValue(value);
    }
  };

  const handleBlur = () => {
    if (typeof value === "string" && decimal > 0 && value.endsWith(".")) {
      setValue(value.slice(0, -1));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (decimal === 0 && e.key === ".") {
      e.preventDefault();
    }
  };

  return (
    <Input
      name={name}
      variant={variant}
      color={color}
      className={className}
      placeholder={placeholder || ""}
      type="text"
      value={value || value === 0 ? value : ""}
      onChange={handleChange}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      isRequired={isRequired}
      isInvalid={isInvalid}
      errorMessage={errorMessage}
      maxLength={decimal > 0 ? decimal + 4 : 3}
    />
  );
}
