import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React, { useState } from "react";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const ProductDetailsScreen = ({ navigation, route }) => {
  const { product } = route.params;
  const [toggle, setToggle] = useState(false);

  const handleCart = () => {
    console.log("Added to Cart");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={product.image} style={styles.image}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign
            style={styles.icon}
            name="arrowleft"
            size={24}
            color="black"
          />
        </TouchableOpacity>
        <Text style={styles.headerText}></Text>
        <FontAwesome
          name={toggle ? "heart" : "heart-o"}
          size={24}
          color="black"
          onPress={() => setToggle(!toggle)}
        />
      </ImageBackground>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{product.name}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>${product.price}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={handleCart} style={styles.cartButton}>
        <Text style={styles.cartText}>Add to Cart</Text>
        <FontAwesome name="shopping-cart" size={24} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  image: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    height: "90%",
    objectFit: "fill",
    marginBottom: -90,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  name: {
    padding: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
  priceContainer: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: "black",
  },
  price: {
    fontSize: 18,
    color: "white",
  },
  cartButton: {
    backgroundColor: "black",
    marginTop: 10,
    padding: 12,
    borderRadius: 10,
    margin: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  cartText: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    marginRight: 10,
  },
});

export default ProductDetailsScreen;
