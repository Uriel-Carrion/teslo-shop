import React, { useContext } from "react";
import { useRouter } from "next/router";
import { Box, Button, Card, CardContent, Divider } from "@mui/material";
import { Grid, Typography } from "@mui/material";
import { CardList, OrderSummary } from "../../components/cart";
import { ShopLayout } from "../../components/layouts";
import { CartContext } from "../../context";
import { useEffect } from "react";

const CardPage = () => {
  const { numberOfItems, isLoaded, cart } = useContext(CartContext);
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && cart.length === 0) {
      router.replace("/cart/empty");
    }
  }, [isLoaded, cart, router]);

  if (!isLoaded || cart.length === 0) {
    return <></>;
  }

  return (
    <ShopLayout
      title={numberOfItems > 0 ? `Carrito - ${numberOfItems}` : "Carrito"}
      pageDescription="Carrito de compras de la tienda"
    >
      <Typography variant="h1" component="h1">
        Carrito
      </Typography>

      <Grid container>
        <Grid item xs={12} sm={7}>
          <CardList editable />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">Orden</Typography>
              <Divider sx={{ mt: 2 }} />

              {/* Order Summary */}
              <OrderSummary />

              <Box sx={{ mt: 3 }}>
                <Button
                  color="secondary"
                  className="circular-btn"
                  fullWidth
                  href="/checkout/address"
                >
                  Pagar
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default CardPage;
