import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  FlatList,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import useCart from "../Store/useCart";
import CartItem from "../components/CartItem";
import EmptyCart from "../components/EmptyCart";

const CartScreen = ({ navigation }) => {
  const cartStore = useCart();

  const [products, setProducts] = useState([]);

  const [reload, setReload] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);

  const toggleReload = () => setReload(!reload);

  const handleClearCart = () => {
    Alert.alert("Clear Cart", "Are you sure you want to clear the cart?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Clear",
        onPress: async () => {
          await cartStore.clearCart();
          toggleReload();
        },
      },
    ]);
  };

  const handleCheckOut = () => {
    Alert.alert("Checkout", "Are you sure you want to checkout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Checkout",
        onPress: async () => {
          ToastAndroid.showWithGravity(
            "Checkout successful, Thank you for shopping with us!",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
          );
          await cartStore.clearCart();
          toggleReload();
        },
      },
    ]);
  };

  useEffect(() => {
    const getProducts = async () => {
      const res = await cartStore.getCart();
      setProducts(res);
    };

    getProducts();
  }, [reload]);

  const handleQuantity = async (item, action) => {
    if (action === "inc") {
      // Increment quantity
      item.quantity = item.quantity + 1;
    } else {
      if (item.quantity - 1 == 0) {
        await cartStore.removeProduct(item.id);
        toggleReload();
        ToastAndroid.showWithGravity(
          "Product removed from cart",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
        return;
      }
      // Decrement quantity
      item.quantity = item.quantity - 1;
    }
    await cartStore.updateProduct(item.id, item.quantity);

    toggleReload();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Cart</Text>
        <TouchableOpacity onPress={handleClearCart}>
          <AntDesign name="delete" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.cartDetails}>
        {products.length != 0 ? (
          <View style={styles.itemsContainer}>
            <FlatList
              data={products}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <CartItem
                  item={item}
                  toggleReload={toggleReload}
                  handleQuantity={handleQuantity}
                />
              )}
            />
            <View style={styles.totalPriceContainer}>
              <Text style={styles.totalPriceHeading}>Total Price: </Text>
              <Text style={styles.totalPriceValue}>
                ${cartStore.totalPrice()}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={handleCheckOut}
            >
              <Text style={styles.checkoutText}>Checkout</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <EmptyCart navigation={navigation} />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  cartDetails: {
    flex: 1,
    padding: 10,
  },
  itemsContainer: {
    flex: 1,
  },
  totalPriceContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  totalPriceHeading: {
    fontSize: 20,
    fontWeight: "bold",
  },
  totalPriceValue: {
    fontSize: 20,
    fontWeight: "bold",
  },
  checkoutButton: {
    backgroundColor: "black",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
  checkoutText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
});

export default CartScreen;
