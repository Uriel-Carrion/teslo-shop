import { stat } from "fs";
import { FC, useReducer } from "react";
import { ICartProduct } from "../../interfaces";
import { CartContext, cartReducer } from "./";

export interface CartState {
  cart: ICartProduct[];
}

const CART_INITIAL_STATE: CartState = {
  cart: [],
};

export const CartProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

  const addProductToCart = (product: ICartProduct) => {
    const productInCart = state.cart.some((p) => p._id === product._id);
    //Si no existe se agrega al carrito
    if (!productInCart)
      return dispatch({
        type: "[Cart] - Update products in cart",
        payload: [...state.cart, product],
      });

    //Existe el producto en el carrito
    const productInCartButDifferentSize = state.cart.some(
      (p) => p._id === product._id && p.size === product.size
    );
    //Si no existe se agrega al carrito con otra talla
    if (!productInCartButDifferentSize)
      return dispatch({
        type: "[Cart] - Update products in cart",
        payload: [...state.cart, product],
      });
    //Si existe se acumula la cantidad
    const updateProducts = state.cart.map((p) => {
      //Si es diferente el product se retorna así como esta
      if (p._id !== product._id) return p;
      if (p.size !== product.size) return p;

      //Si pasa se actualiza la cantidad
      p.quantity += product.quantity;
      return p;
    });
    dispatch({
      type: "[Cart] - Update products in cart",
      payload: updateProducts,
    });
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        //methods
        addProductToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
