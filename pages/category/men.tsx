import { Typography } from "@mui/material";
import { NextPage } from "next";
import React from "react";
import { FullScreenLoading } from "../../components/ui";
import { ShopLayout } from "../../components/layouts/ShopLayout";
import { ProductList } from "../../components/products";
import { useProducts } from "../../hooks";

const MenPage: NextPage = () => {
  const { products, isLoading } = useProducts("/products?gender=men");

  return (
    <ShopLayout
      title="Tesla - Shop - Men"
      pageDescription="Encuentra los mejores productos para hombres"
    >
      <Typography variant="h1" component={"h1"}>
        Hombres
      </Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>
        Todos los productos
      </Typography>

      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default MenPage;
