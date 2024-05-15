import { View, Text, StyleSheet, FlatList } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import ProductCard from "../components/ProductCard";
import ProductsData from "../Data/ProductsData";

const HomeScreen = ({ navigation }) => {
  const handleCartPress = () => {
    navigation.navigate("Cart");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View />
        <Text style={styles.headerText}>Clothes</Text>
        <FontAwesome
          style={styles.icon}
          name="shopping-cart"
          size={24}
          color="black"
          onPress={handleCartPress}
        />
      </View>
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
  icon: {
    alignSelf: "flex-end",
  },
  productsContainer: {
    marginTop: 10,
  },
});

export default HomeScreen;
