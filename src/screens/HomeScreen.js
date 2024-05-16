import { View, Text, StyleSheet, FlatList } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import ProductCard from "../components/ProductCard";
import ProductsData from "../Data/ProductsData";
import useCart from "../Store/useCart";

const HomeScreen = ({ navigation }) => {
  const handleCartPress = () => {
    navigation.navigate("Cart");
  };

  // Get the cart store
  const cartStore = useCart();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View />
        <Text style={styles.headerText}>Shirts</Text>
        <View style={styles.shoppingCart}>
          <AntDesign
            style={styles.icon}
            name="shoppingcart"
            size={32}
            color="black"
            onPress={handleCartPress}
          />
          <Text style={styles.totalCartItems}>{cartStore.totalQuantity()}</Text>
        </View>
      </View>
      {/* Products */}
      <FlatList
        data={ProductsData}
        numColumns={2}
        renderItem={({ item }) => (
          <ProductCard product={item} navigation={navigation} />
        )}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        style={styles.productsContainer}
      />
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
    fontSize: 28,
    fontWeight: "bold",
  },
  shoppingCart: {
    alignItems: "center",
  },
  totalCartItems: {
    position: "absolute",
    right: -7,
    top: -7,
    backgroundColor: "black",
    color: "white",
    borderRadius: 50,
    width: 20,
    height: 20,
    textAlign: "center",
    fontSize: 16,
  },
  productsContainer: {
    marginTop: 10,
  },
});

export default HomeScreen;
