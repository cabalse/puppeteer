import React from "react";
import Page from "../atoms/page";
import PageTitle from "../atoms/pagetitle";
import ProductRow from "../molecules/productrow";
import Products from "../organisms/products";

const Index = () => {
  return (
    <Page>
      <PageTitle title={"Main"} />
      <Products />
    </Page>
  );
};

export default Index;
