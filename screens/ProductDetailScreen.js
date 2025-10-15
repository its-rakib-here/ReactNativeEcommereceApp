import React, { useState } from "react";
import { View, Image, StyleSheet, ScrollView } from "react-native";
import {
  Text,
  Button,
  IconButton,
  Snackbar,
  Divider,
} from "react-native-paper";
import { useShop } from "../context/ShopContext";

export default function ProductDetailScreen({ route, navigation }) {
  const { product } = route.params;
  const { addToCart, toggleWishlist, wishlist, placeOrder } = useShop();
  const wished = wishlist.includes(product.id);
  const [qty, setQty] = useState(1);
  const [snack, setSnack] = useState("");

  const handleAddToCart = () => {
    addToCart(product, qty);
    setSnack("Added to cart!");
  };

  const handleWishlistToggle = () => {
    toggleWishlist(product.id);
    setSnack(wished ? "Removed from wishlist" : "Added to wishlist");
  };

  const handleBuyNow = () => {
    // Add item to cart first (for simulation)
    addToCart(product, qty);
    const order = placeOrder();
    navigation.replace("Orders", { highlight: order.id });
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Product Image Section */}
        <View style={styles.imageWrap}>
          <Image source={{ uri: product.image }} style={styles.image} />
          <IconButton
            icon={wished ? "heart" : "heart-outline"}
            iconColor={wished ? "#ff5a5f" : "#333"}
            size={26}
            onPress={handleWishlistToggle}
            style={styles.wishlistButton}
          />
        </View>

        {/* Content Section */}
        <View style={styles.content}>
          <Text variant="headlineSmall" style={styles.title}>
            {product.name}
          </Text>
          <Text style={styles.meta}>
            {product.category} • ⭐ {product.rating}
          </Text>

          <Text variant="titleLarge" style={styles.price}>
            ${product.price.toFixed(2)}
          </Text>

          <Divider style={{ marginVertical: 10 }} />

          <Text style={styles.description}>{product.description}</Text>

          {/* Quantity Selector */}
          <View style={styles.qtySection}>
            <IconButton
              icon="minus"
              size={22}
              onPress={() => setQty((q) => Math.max(1, q - 1))}
            />
            <Text style={styles.qtyText}>{qty}</Text>
            <IconButton icon="plus" size={22} onPress={() => setQty((q) => q + 1)} />
          </View>

          {/* Buttons Section */}
          <View style={styles.buttonRow}>
            <Button
              mode="outlined"
              onPress={handleAddToCart}
              textColor="#ff5a5f"
              style={[styles.button, styles.outlinedBtn]}
            >
              Add to Cart
            </Button>
            <Button
              mode="contained"
              onPress={handleBuyNow}
              style={[styles.button, styles.buyBtn]}
              contentStyle={{ paddingVertical: 6 }}
            >
              Buy Now
            </Button>
          </View>

          <Button
            mode="text"
            onPress={handleWishlistToggle}
            textColor={wished ? "#ff5a5f" : "#444"}
            style={{ marginTop: 8 }}
          >
            {wished ? "Remove from Wishlist" : "Add to Wishlist"}
          </Button>
        </View>
      </ScrollView>

      {/* Snackbar Feedback */}
      <Snackbar
        visible={!!snack}
        onDismiss={() => setSnack("")}
        duration={1500}
        style={{ backgroundColor: "#ff5a5f" }}
      >
        {snack}
      </Snackbar>
    </View>
  );
}

// -----------------------------
// Styles
// -----------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  imageWrap: {
    position: "relative",
    backgroundColor: "#fff",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  image: {
    width: "100%",
    height: 250, // reduced height for tighter layout
    resizeMode: "cover",
  },
  wishlistButton: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "white",
    elevation: 3,
    borderRadius: 50,
  },
  content: {
    padding: 16,
    backgroundColor: "white",
    borderRadius: 20,
    marginHorizontal: 10,
    marginTop: -20, // pull content up slightly to reduce top space
    elevation: 2,
  },
  title: {
    fontWeight: "600",
    marginBottom: 4,
  },
  meta: {
    color: "#666",
    marginBottom: 6,
  },
  price: {
    color: "#ff5a5f",
    fontWeight: "bold",
    marginBottom: 4,
  },
  description: {
    color: "#444",
    lineHeight: 20,
  },
  qtySection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 14,
  },
  qtyText: {
    fontSize: 18,
    fontWeight: "600",
    marginHorizontal: 10,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  button: {
    flex: 1,
    borderRadius: 10,
  },
  outlinedBtn: {
    borderColor: "#ff5a5f",
  },
  buyBtn: {
    backgroundColor: "#ff5a5f",
  },
});
