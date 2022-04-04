import NextLink from "next/link";
import { Box, Button, CardActionArea, CardMedia, Grid } from "@mui/material";
import { Link, Typography } from "@mui/material";
import { initialData } from "../../database/products";
import { ItemCounter } from "../ui";
import { FC } from "react";

const productsInCard = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

interface Props {
  editable?: boolean;
}

export const CardList: FC<Props> = ({ editable }) => {
  return (
    <>
      {productsInCard.map((product) => (
        <Grid container spacing={2} key={product.slug} sx={{ mb: 1 }}>
          <Grid item xs={3}>
            <NextLink href="/product/slug" passHref>
              <Link>
                <CardActionArea>
                  <CardMedia
                    image={`/products/${product.images[0]}`}
                    component="img"
                    sx={{ borderRadius: 5 }}
                  />
                </CardActionArea>
              </Link>
            </NextLink>
          </Grid>
          <Grid item xs={7}>
            <Box display="flex" flexDirection="column">
              <Typography variant="body1">{product.title}</Typography>
              <Typography variant="body1">
                Talla: <b>M</b>
              </Typography>

              {editable ? (
                <ItemCounter />
              ) : (
                <Typography variant="h6">3 item</Typography>
              )}
            </Box>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="subtitle1">{`$${product.price}`}</Typography>

            {editable && (
              <Button variant="text" color="secondary">
                Remover
              </Button>
            )}
          </Grid>
        </Grid>
      ))}
    </>
  );
};