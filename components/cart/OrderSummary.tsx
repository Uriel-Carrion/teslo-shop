import { Divider, Grid, Typography } from "@mui/material";
import React from "react";

export const OrderSummary = () => {
  return (
    <Grid container>
      <Grid item xs={6} sx={{ mt: 2 }}>
        <Typography>No. Productos</Typography>
      </Grid>
      <Grid item xs={6} sx={{ mt: 2 }} display="flex" justifyContent="end">
        <Typography>3 items</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>Subtotal</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{`$${155}`}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>Impuestos (16%)</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{`$${30}`}</Typography>
      </Grid>
      <Divider />
      <Grid item xs={6} sx={{ mt: 3 }}>
        <Typography variant="subtitle1">Total:</Typography>
      </Grid>
      <Grid item xs={6} sx={{ mt: 3 }} display="flex" justifyContent="end">
        <Typography variant="subtitle1">{`$${330}`}</Typography>
      </Grid>
    </Grid>
  );
};
