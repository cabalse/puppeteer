import React from "react";

type Props = {
  id: string;
  label: string;
  onClick: VoidFunction;
};

const Button = ({ id, label, onClick }: Props) => {
  return (
    <button
      id={id}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
