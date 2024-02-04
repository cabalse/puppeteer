import React, { useState, useEffect } from "react";

type Props = {
  text: string;
  type: "error" | "status";
  timeOutcallback: () => void;
};

const StatusMessage = ({ text, timeOutcallback, type = "status" }: Props) => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    setMessage(text);
    setTimeout(() => {
      setMessage("");
      timeOutcallback();
    }, 3000);
  }, [text]);

  return (
    <>
      {message !== "" ? (
        <>
          {type === "error" ? (
            <div className="text-red-900 border border-red-900 rounded p-1 statusMessage">
              {message}
            </div>
          ) : (
            <div className="text-green-900 border border-green-900 rounded p-1 statusMessage">
              {message}
            </div>
          )}
        </>
      ) : null}
    </>
  );
};

export default StatusMessage;
