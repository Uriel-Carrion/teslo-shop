import { Typography } from "@mui/material";
import { NextPage } from "next";
import React from "react";
import { FullScreenLoading } from "../../components/ui";
import { ShopLayout } from "../../components/layouts/ShopLayout";
import { ProductList } from "../../components/products";
import { useProducts } from "../../hooks";

const WomenPage: NextPage = () => {
  const { products, isLoading } = useProducts("/products?gender=women");

  return (
    <ShopLayout
      title="Tesla - Shop - Women"
      pageDescription="Encuentra los mejores productos para ellas"
    >
      <Typography variant="h1" component={"h1"}>
        Mujeres
      </Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>
        Todos los productos
      </Typography>

      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default WomenPage;
