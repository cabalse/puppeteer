import React, { useState } from "react";

type Props = {
  label: string;
  onChange: (value: string) => void;
};

const InputField = ({ label, onChange }: Props) => {
  const [value, setValue] = useState("");

  return (
    <div>
      <label for={label} className="capitalize text-sm font-bold">
        {label}
      </label>
      <input
        id={label}
        type="text"
        className="border border-gray-400 p-2 w-full"
        value={value}
        onChange={(e) =>
          setValue(() => {
            onChange(e.target.value);
            return e.target.value;
          })
        }
      />
    </div>
  );
};

export default InputField;
