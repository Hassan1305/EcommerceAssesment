import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

const CartItem = ({ item, toggleReload, handleQuantity }) => {
  return (
    <View style={styles.card}>
      <View style={styles.rowContainer}>
        <Image source={item.image} style={styles.image} />
        <View style={styles.itemDetailsContainer}>
          <View style={styles.infoContainer}>
            <Text style={styles.name}>{item.name}</Text>
            <View style={styles.rowContainer}>
              <TouchableOpacity
                onPress={() => handleQuantity(item, "inc")}
                style={styles.button}
              >
                <AntDesign name="plus" size={24} color="black" />
              </TouchableOpacity>
              <Text style={styles.quantity}>{item.quantity}</Text>
              <TouchableOpacity
                onPress={() => handleQuantity(item, "dec")}
                style={styles.button}
              >
                <AntDesign name="minus" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.priceContainer}>
            <View />
            <Text style={styles.price}>${item.price}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: "white",
    borderRadius: 10,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemDetailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "75%",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  infoContainer: {
    marginLeft: 10,
    justifyContent: "space-between",
    padding: 5,
    height: 100,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  quantity: {
    fontSize: 18,
    marginHorizontal: 15,
  },
  button: {
    borderWidth: 1,
    borderRadius: 50,
    padding: 5,
  },
  priceContainer: {
    display: "flex",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
export default CartItem;
