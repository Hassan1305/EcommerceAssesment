import React, { useRef, useState } from "react";
import { View, Text, StyleSheet, Pressable, Animated } from "react-native";

const ProductCard = ({ product, navigation }) => {
  const [transition, setTransition] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    console.log("Product Pressed");
    navigation.navigate("ProductDetails", { product });
  };

  const handlePressIn = () => {
    setTransition(true);
    Animated.spring(scaleAnim, {
      toValue: 1.1,
      friction: 5,
      useNativeDriver: true,
    }).start(() => {
      scaleAnim.setValue(1.1);
    });
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 5,
      useNativeDriver: true,
    }).start(() => {
      scaleAnim.setValue(1);
      setTransition(false);
    });
  };

  return (
    <Pressable
      style={styles.card}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
    >
      <Animated.Image
        source={transition ? product.imageTransition : product.image}
        style={[styles.image, { transform: [{ scale: scaleAnim }] }]}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>${product.price}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    margin: 5,
    overflow: "hidden",
    width: "48%",
  },
  image: {
    width: "100%",
    height: 300,
    objectFit: "contain",
    marginTop: 5,
  },
  infoContainer: {
    flexDirection: "row",
    padding: 15,
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  name: {
    fontSize: 15,
    fontWeight: "bold",
  },
  price: {
    fontSize: 16,
    color: "#888",
  },
});

export default ProductCard;
