import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import ProductsData from "../Data/ProductsData";

const setCart = async (products) => {
  try {
    await AsyncStorage.setItem("cart", JSON.stringify(products));
    console.log("Cart Updated");
  } catch (error) {
    console.log(error);
  }
};

const useCart = create((set, get) => ({
  products: [],
  getCart: async () => {
    try {
      const cart = await AsyncStorage.getItem("cart");
      if (cart) {
        //get products by comparing the cart items with the products data, and include quantity as well
        const productsList = JSON.parse(cart).map((cartItem) => {
          const product = ProductsData.find((item) => item.id === cartItem.id);
          return { ...product, quantity: cartItem.quantity };
        });
        set(() => ({
          products: productsList,
        }));
        return productsList;
      }
    } catch (error) {
      console.log(error);
    }
  },
  totalPrice: () => {
    const products = get().products;
    return products
      .reduce((total, product) => total + product.price * product.quantity, 0)
      .toFixed(2);
  },
  totalQuantity: () => {
    const products = get().products;
    return products.reduce((total, product) => total + product.quantity, 0);
  },
  addProduct: async (product) => {
    set((state) => {
      //if product is already in it then inc quantity of that product by 1
      const existingProduct = state.products.find(
        (item) => item.id === product.id
      );
      if (existingProduct) {
        const updatedProducts = state.products.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        setCart(updatedProducts);
        return { products: updatedProducts };
      }
      const newProduct = { id: product.id, price: product.price, quantity: 1 };
      const updatedProducts = [...state.products, newProduct];
      setCart(updatedProducts);
      return { products: updatedProducts };
    });
  },
  removeProduct: async (id) => {
    set((state) => {
      const updatedProducts = state.products.filter(
        (product) => product.id !== id
      );
      setCart(updatedProducts);
      return { products: updatedProducts };
    });
  },
  updateProduct: async (id, quantity) => {
    set((state) => {
      const updatedProducts = state.products.map((product) =>
        product.id === id ? { ...product, quantity } : product
      );
      setCart(updatedProducts);
      return { products: updatedProducts };
    });
  },
  clearCart: async () => {
    set(() => {
      setCart([]);
      return { products: [] };
    });
  },
  updateCart: async () => {
    await setCart(get().products);
  },
}));

export default useCart;
