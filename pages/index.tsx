import { Typography } from "@mui/material";
import { NextPage } from "next";
import React from "react";
import { ShopLayout } from "../components/layouts/ShopLayout";
import { ProductList } from "../components/products";
import { initialData } from "../database/products";

const Home: NextPage = () => {
  return (
    <ShopLayout
      title="Tesla - Shop - Home"
      pageDescription="Encuentra los mejores productos"
    >
      <Typography variant="h1" component={"h1"}>
        Tienda
      </Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>
        Todos los productos
      </Typography>

      <ProductList products={initialData.products} />
    </ShopLayout>
  );
};

export default Home;
