import { NextPage } from "next";
import { GetServerSideProps } from "next";
import { Box, Typography } from "@mui/material";
import { ShopLayout } from "../../components/layouts/ShopLayout";
import { ProductList } from "../../components/products";
import { dbProducts } from "../../database";
import { IProduct } from "../../interfaces";

interface Props {
  products: IProduct[];
  existProducts: boolean;
  query: string;
}

const SearchPage: NextPage<Props> = ({ products, existProducts, query }) => {
  return (
    <ShopLayout
      title="Tesla - Shop - Search"
      pageDescription="Encuentra los mejores productos aquí"
    >
      <Typography variant="h1" component={"h1"}>
        Buscar productos
      </Typography>

      {existProducts ? (
        <Typography variant="h2" sx={{ mb: 1 }} textTransform="capitalize">
          Término: {query}
        </Typography>
      ) : (
        <Box display="flex">
          <Typography variant="h2" sx={{ mb: 1 }}>
            No encontramos ningún producto
          </Typography>

          <Typography
            sx={{ ml: 1 }}
            variant="h2"
            color="secondary"
            textTransform="capitalize"
          >
            {query}
          </Typography>
        </Box>
      )}

      <ProductList products={products} />
    </ShopLayout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { query = "" } = params as { query: string };

  if (query.length === 0) {
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };
  }
  //No sé encontraron resultados
  let products = await dbProducts.getProductsByTerm(query);
  const existProducts = products.length > 0;
  //TODO: retornar otro productos
  if (!existProducts) {
    products = await dbProducts.getProductsByTerm("shirt");
  }

  return {
    props: {
      products,
      existProducts,
      query,
    },
  };
};

export default SearchPage;
