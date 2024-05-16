import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const EmptyCart = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/empty-cart.png")}
        style={styles.image}
      />
      <Text style={styles.message}>Your cart is empty!</Text>
      <Text style={styles.subMessage}>
        Looks like you haven't added anything to your cart yet.
      </Text>
      <TouchableOpacity
        style={styles.shoppingButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.shoppingButtonText}>Start Shopping</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
    height: "50%",
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  message: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  subMessage: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  shoppingButton: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  shoppingButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default EmptyCart;
