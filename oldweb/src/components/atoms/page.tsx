import React, { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

const Page = ({ children }: Props) => {
  return (
    <div className="border-2 border-solid border-indigo-200 rounded-lg bg-white p-2 mb-3">
      {children}
    </div>
  );
};

export default Page;
