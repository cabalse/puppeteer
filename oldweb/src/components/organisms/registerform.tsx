import React, { useState, useEffect } from "react";
import InputField from "../atoms/inputfield";
import Button from "../atoms/button";
import Product from "./../../models/product";
import Products from "./products";
import StatusMessage from "../molecules/statusmessage";

const RegisterForm = () => {
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [inputValue, setInputValue] = useState<Product>({
    productnumber: "",
    name: "",
  });

  const clearStatusMessage = () => {
    setStatusMessage("");
  };

  const sendRegistration = (productnumber: string, name: string) => {
    fetch("/api/products", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productnumber: productnumber, name: name }),
    })
      .then(() => {
        setStatusMessage("Ok");
      })
      .catch(() => {
        setStatusMessage("error");
      });
  };

  return (
    <div className="flex flex-col space-y-3">
      <InputField
        label={"product name"}
        onChange={(value) =>
          setInputValue<Product>((prevValue) => {
            return { ...prevValue, name: value };
          })
        }
      />
      <InputField
        label={"product number"}
        onChange={(value) =>
          setInputValue<Product>((prevValue) => {
            return { ...prevValue, productnumber: value };
          })
        }
      />
      <Button
        id="submitRegister"
        label={"Register"}
        onClick={() =>
          sendRegistration(inputValue.productnumber, inputValue.name)
        }
      />
      <StatusMessage
        text={statusMessage}
        type="status"
        timeOutcallback={clearStatusMessage}
      />
    </div>
  );
};

export default RegisterForm;
