import React from "react";

type Props = {
  children?: React.ReactNode;
  onClick?: () => void;
  selected?: boolean;
  id?: string;
};

const MenuItem = ({ children, onClick, selected = false, id = "" }: Props) => {
  let classes = "px-2 cursor-pointer ";
  if (selected)
    classes += "text-slate-600 border-solid border-b border-slate-400";
  else classes += "text-slate-300";

  return (
    <div id={id} class={classes} onClick={onClick}>
      {children}
    </div>
  );
};

export default MenuItem;
