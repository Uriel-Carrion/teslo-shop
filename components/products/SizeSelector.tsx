import { FC } from "react";
import { ISize } from "../../interfaces";
import { Box, Button } from "@mui/material";

interface Props {
  selectedSize?: ISize;
  sizes: ISize[];
}

export const SizeSelector: FC<Props> = ({ selectedSize, sizes }) => {
  return (
    <Box>
      {sizes.map((size, i) => (
        <Button
          key={i}
          size="small"
          color={selectedSize === size ? "primary" : "info"}
        >
          {size}
        </Button>
      ))}
    </Box>
  );
};
