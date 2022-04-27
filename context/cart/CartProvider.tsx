import { FC, useEffect, useReducer } from "react";
import Cookies from "js-cookie";
import { ICartProduct, IOrder, ShippingAddress } from "../../interfaces";
import { CartContext, cartReducer } from "./";
import { tesloApi } from "../../api";
import axios from "axios";

export interface CartState {
  cart: ICartProduct[];
  numberOfItems: number;
  subTotal: number;
  tax: number;
  total: number;
  isLoaded: boolean;

  shippingAddress?: ShippingAddress;
}

// export interface ShippingAddress {
//   firstName: string;
//   lastName: string;
//   address: string;
//   address2?: string;
//   zip: string;
//   city: string;
//   country: string;
//   phone: string;
// }

const CART_INITIAL_STATE: CartState = {
  cart: [],
  numberOfItems: 0,
  subTotal: 0,
  tax: 0,
  total: 0,
  isLoaded: false,
};

export const CartProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

  useEffect(() => {
    try {
      const cookieProducts = Cookies.get("cart")
        ? JSON.parse(Cookies.get("cart")!)
        : [];

      dispatch({
        type: "[Cart] - LoadCart from cookies | storage",
        payload: cookieProducts,
      });
    } catch (error) {
      dispatch({
        type: "[Cart] - LoadCart from cookies | storage",
        payload: [],
      });
    }
  }, []);

  useEffect(() => {
    if (Cookies.get("firstName")) {
      const shippingAddress = {
        firstName: Cookies.get("firstName") || "",
        lastName: Cookies.get("lastName") || "",
        address: Cookies.get("address") || "",
        address2: Cookies.get("address2") || "",
        zip: Cookies.get("zip") || "",
        city: Cookies.get("city") || "",
        country: Cookies.get("country") || "",
        phone: Cookies.get("phone") || "",
      };

      dispatch({
        type: "[Cart] - LoadAddress from Cookies",
        payload: shippingAddress,
      });
    }
  }, []);

  useEffect(() => {
    Cookies.set("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  useEffect(() => {
    const numberOfItems = state.cart.reduce(
      (prev, current) => current.quantity + prev,
      0
    );
    const subTotal = state.cart.reduce(
      (prev, current) => current.price * current.quantity + prev,
      0
    );
    const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);

    const orderSummary = {
      numberOfItems,
      subTotal,
      tax: subTotal * taxRate,
      total: subTotal * (taxRate + 1),
    };

    dispatch({ type: "[Cart] - Update order summary", payload: orderSummary });
  }, [state.cart]);

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

  const updateCartQuantity = (product: ICartProduct) => {
    dispatch({
      type: "[Cart] - Change cart quantity",
      payload: product,
    });
  };
  const removeCartProduct = (product: ICartProduct) => {
    dispatch({
      type: "[Cart] - Remove product cart",
      payload: product,
    });
  };

  const updateAddress = (address: ShippingAddress) => {
    Cookies.set("firstName", address.firstName);
    Cookies.set("lastName", address.lastName);
    Cookies.set("address", address.address);
    Cookies.set("address2", address.address2 || "");
    Cookies.set("zip", address.zip);
    Cookies.set("city", address.city);
    Cookies.set("country", address.country);
    Cookies.set("phone", address.phone);

    dispatch({ type: "[Cart] - Update Address", payload: address });
  };

  //Crear orden
  const createOrder = async():Promise<{ hasError: boolean; message: string; }> => {

    if ( !state.shippingAddress ) {
        throw new Error('No hay dirección de entrega');
    }

    const body: IOrder = {
        orderItems: state.cart.map( p => ({
            ...p,
            size: p.size!
        })),
        shippingAddress: state.shippingAddress,
        numberOfItems: state.numberOfItems,
        subTotal: state.subTotal,
        tax: state.tax,
        total: state.total,
        isPaid: false
    }

    try {
        const { data } = await tesloApi.post<IOrder>('/orders', body);
        dispatch({ type: '[Cart] - Order complete' });

        return {
            hasError: false,
            message: data._id!
        }

    } catch (error) {
        if ( axios.isAxiosError(error) ) {
            return {
                hasError: true,
                message: error.response?.data.message
            }
        }
        return {
            hasError: true,
            message : 'Error no controlado, hable con el administrador'
        }
    }

}

  return (
    <CartContext.Provider
      value={{
        ...state,
        //methods
        addProductToCart,
        updateCartQuantity,
        removeCartProduct,
        updateAddress,
        createOrder
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
