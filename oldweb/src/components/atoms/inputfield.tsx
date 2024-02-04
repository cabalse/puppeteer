import React, { useState } from "react";

type Props = {
  label: string;
  onChange: (value: string) => void;
  id?: string;
  type?: string;
};

const InputField = ({ label, onChange, id = "", type = "text" }: Props) => {
  const [value, setValue] = useState("");

  return (
    <div>
      <label for={label} className="capitalize text-sm font-bold">
        {label}
      </label>
      <input
        id={id}
        type={type}
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
