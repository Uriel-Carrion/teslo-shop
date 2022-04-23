import React, { useContext, useState } from "react";
import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { Box, Button, Chip, Grid, Typography } from "@mui/material";
import { ShopLayout } from "../../components/layouts";
import { ProductSlideshow, SizeSelector } from "../../components/products";
import { ItemCounter } from "../../components/ui";
import { IProduct, ICartProduct, ISize } from "../../interfaces";
import { dbProducts } from "../../database";
import { CartContext } from "../../context";

interface Props {
  product: IProduct;
}

const ProductPage: NextPage<Props> = ({ product }) => {
  const router = useRouter();
  const { addProductToCart } = useContext(CartContext);

  const [temCartProduct, setTemCartProduct] = useState<ICartProduct>({
    _id: product._id,
    images: product.images[0],
    price: product.price,
    size: undefined,
    slug: product.slug,
    title: product.title,
    gender: product.gender,
    quantity: 1,
  });

  const selectedSize = (size: ISize) => {
    setTemCartProduct((currentProduct) => ({
      ...currentProduct,
      size,
    }));
  };

  const onUpdateQuantity = (quantity: number) => {
    setTemCartProduct((currentProduct) => ({
      ...currentProduct,
      quantity,
    }));
  };

  const onAddProduct = () => {
    if (!temCartProduct.size) return;
    //Llamar la acción del context para agregar al carrito
    addProductToCart(temCartProduct);
    router.push("/cart");
  };

  return (
    <ShopLayout title={product.title} pageDescription={product.description}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          {/* slidesshow */}
          <ProductSlideshow images={product.images} />
        </Grid>

        <Grid item xs={12} sm={5}>
          <Box display={"flex"} flexDirection="column">
            {/* titulos */}
            <Typography variant="h1" component={"h1"}>
              {product.title}
            </Typography>
            <Typography
              variant="subtitle1"
              component={"h2"}
            >{`$${product.price}`}</Typography>

            {/* Cantidad.. */}
            <Box sx={{ my: 2 }}>
              <Typography variant="subtitle2">Cantidad:</Typography>

              {/* ItemCounter */}
              <ItemCounter
                currentValue={temCartProduct.quantity}
                updatedQuantity={onUpdateQuantity}
                maxValue={product.inStock > 10 ? 10 : product.inStock}
              />

              {/* SizeSelector */}
              <SizeSelector
                sizes={product.sizes}
                selectedSize={temCartProduct.size}
                onSelectedSize={selectedSize}
              />
            </Box>

            {/* Agregar al carrito si hay disponible*/}
            {product.inStock > 0 ? (
              <Button
                color="secondary"
                className="circular-btn"
                onClick={onAddProduct}
              >
                {temCartProduct.size
                  ? " Agregar al carrito "
                  : "Seleccione una talla"}
              </Button>
            ) : (
              <Chip
                label="No hay disponibles"
                color="error"
                variant="outlined"
              />
            )}

            {/* Descripción */}
            <Box sx={{ my: 3 }}>
              <Typography variant="subtitle2">Descripción:</Typography>
              <Typography variant="body2">{product.description}</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

//getServerSideProps
// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
//No usar......
// export const getServerSideProps: GetServerSideProps = async ({ params }) => {
//   const { slug = "" } = params as { slug: string };
//   const product = await dbProducts.getProductBySlug(slug);

//   //Si el producto no existe se sale de la página
//   if (!product) {
//     return {
//       redirect: {
//         destination: "/",
//         permanent: false,
//       },
//     };
//   }
//   return {
//     props: {
//       product,
//     },
//   };
// };

//getstaticPaths
// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes
//Para generar todas las rutas de manera estatica
export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const productsSlug = await dbProducts.getAllProductsSlug();

  return {
    paths: productsSlug.map(({ slug }) => ({
      params: {
        slug,
      },
    })),
    fallback: "blocking",
    //Debe de volver la siguiente estructura
    // [
    //   {
    //     params: {

    //     }
    //   }
    // ],
  };
};

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.
//Para generar la página estatica en dado caso que se haya creado un nuevo producto despues de hacer el build
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug = "" } = params as { slug: string };
  const product = await dbProducts.getProductBySlug(slug);

  if (!product) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      product,
    },
    //60*60*24
    revalidate: 86400,
  };
};

export default ProductPage;
