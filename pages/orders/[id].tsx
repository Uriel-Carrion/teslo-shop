import NextLink from "next/link";
import { CardContent, Chip, Divider } from "@mui/material";
import { Grid, Link, Typography } from "@mui/material";
import { Box, Card } from "@mui/material";
import { ShopLayout } from "../../components/layouts";
import { CardList, OrderSummary } from "../../components/cart";
import {
  CreditCardOffOutlined,
  CreditScoreOutlined,
} from "@mui/icons-material";

const OrderPage = () => {
  return (
    <ShopLayout
      title="Resumen de la orden #89494"
      pageDescription="Resumen de la orden"
    >
      <Typography variant="h1" component="h1">
        Orden: ASASA
      </Typography>

      {/* <Chip
        sx={{ my: 2 }}
        label="Pendiente de pago"
        variant="outlined"
        color="error"
        icon={<CreditCardOffOutlined />}
      /> */}

      <Chip
        sx={{ my: 2 }}
        label="Orden ya pagada"
        variant="outlined"
        color="success"
        icon={<CreditScoreOutlined />}
      />

      <Grid container>
        <Grid item xs={12} sm={7}>
          <CardList />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">Resumen (3 productos)</Typography>

              <Divider sx={{ my: 1 }} />

              <Box display="flex" justifyContent="space-between">
                <Typography variant="subtitle1">
                  Dirección de entrega
                </Typography>
                <NextLink href="/checkout/address" passHref>
                  <Link underline="always">Editar</Link>
                </NextLink>
              </Box>

              <Typography>Uriel</Typography>
              <Typography>sdsdsddsd</Typography>
              <Typography>sdsdsddsd</Typography>
              <Typography>México</Typography>
              <Typography>84984984</Typography>

              <Divider sx={{ my: 1 }} />
              <Box display="flex" justifyContent="end">
                <NextLink href="/cart" passHref>
                  <Link underline="always">Editar</Link>
                </NextLink>
              </Box>
              {/* Order Summary */}
              <OrderSummary />

              <Box sx={{ mt: 2 }}>
                <h2>Pagar</h2>
                <Chip
                  sx={{ my: 2 }}
                  label="Orden ya pagada"
                  variant="outlined"
                  color="success"
                  icon={<CreditScoreOutlined />}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default OrderPage;
