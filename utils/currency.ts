export const format = (value: number) => {
  //crear formateador
  const formatter = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return formatter.format(value);
};
