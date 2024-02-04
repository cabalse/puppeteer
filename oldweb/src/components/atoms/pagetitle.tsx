import React from "react";

type Props = {
  title: string;
};

const PageTitle = ({ title }: Props) => {
  return <div className="text-xl uppercase mb-3">{title}</div>;
};

export default PageTitle;
