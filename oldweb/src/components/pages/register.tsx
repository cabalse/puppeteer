import React from "react";
import PageTitle from "../atoms/pagetitle";
import Page from "../atoms/page";
import RegisterForm from "../organisms/registerform";

const Register = () => {
  return (
    <Page>
      <PageTitle title={"register"} />
      <RegisterForm />
    </Page>
  );
};

export default Register;
