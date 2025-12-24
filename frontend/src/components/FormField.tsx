import React from "react";

export const FormField = ({
  label,
  value,
  setValue,
}: {
  label: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className="grid grid-cols-2">
      <label>{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="border p-2"
      />
    </div>
  );
};
