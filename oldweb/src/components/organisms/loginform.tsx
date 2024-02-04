import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../authcontext";
import InputField from "../atoms/inputfield";
import Button from "../atoms/button";
import LoginInformation from "../../models/logininformation";
import StatusMessage from "../molecules/statusmessage";

const Loginform = () => {
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [inputValue, setInputValue] = useState<LoginInformation>({
    username: "",
    password: "",
  });
  const authctx = useContext(AuthContext);
  const nav = useNavigate();

  const clearStatusMessage = () => {
    setStatusMessage("");
  };

  const login = () => {
    const ret = authctx.signin(inputValue.username, inputValue.password, () =>
      nav("/")
    );
    if (ret !== "") {
      setStatusMessage(ret);
    }
  };

  return (
    <div className="flex flex-col space-y-3">
      <InputField
        label={"username"}
        onChange={(value) =>
          setInputValue<LoginInformation>((prevValue) => {
            return { ...prevValue, username: value };
          })
        }
      />
      <InputField
        label={"password"}
        onChange={(value) =>
          setInputValue<LoginInformation>((prevValue) => {
            return { ...prevValue, password: value };
          })
        }
      />
      <Button id="submitLogin" label={"Login"} onClick={login} />
      <StatusMessage
        text={statusMessage}
        type="error"
        timeOutcallback={clearStatusMessage}
      />
    </div>
  );
};

export default Loginform;
