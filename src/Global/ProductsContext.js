import React, { useState, createContext } from "react";
import applewatch from "../assets/applewatch.jpeg";
import imac from "../assets/imac.jpeg";
import iphone11 from "../assets/iphone11.jpeg";
import macbookair from "../assets/macbookair.jpeg";

export const ProductsContext = createContext();

const ProductsContextProvider = (props) => {
  const [products] = useState([
    { id: 1, name: "applewatch", price: 300, image: applewatch, status: "hot" },
    { id: 2, name: "imac2", price: 3500, image: imac, status: "new" },
    { id: 3, name: "iphone11", price: 1500, image: iphone11, status: "hot" },
    {id: 4,name: "macbookair",price: 2200,image: macbookair,status: "new", },
  ]);
  return (
    <ProductsContext.Provider value={{ products: [...products] }}>
      {props.children}
    </ProductsContext.Provider>
  );
};

export default ProductsContextProvider;
