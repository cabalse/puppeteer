import React from "react";
import Product from "../../models/product";

type Props = {
  product: Product;
};

const ProductRow = ({ product }: Props) => {
  return (
    <div id={product.productnumber} className="flex flex-row product">
      <p className="font-bold me-8 ms-2 prodNr">{product.productnumber}</p>
      <p className="prodName">{product.name}</p>
    </div>
  );
};

export default ProductRow;
