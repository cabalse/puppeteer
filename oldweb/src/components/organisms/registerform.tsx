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
    const body = JSON.stringify({ productnumber: productnumber, name: name });
    fetch("http://localhost:3000/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
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
        id="productName"
        label={"product name"}
        onChange={(value) =>
          setInputValue<Product>((prevValue) => {
            return { ...prevValue, name: value };
          })
        }
      />
      <InputField
        id="productNumber"
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
