import React from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { Text, Divider, IconButton } from "react-native-paper";
import { useShop } from "../context/ShopContext";

export default function OrderHistoryScreen({ route, navigation }) {
  const { orders } = useShop();
  const highlight = route?.params?.highlight;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
    >
      <Text variant="headlineSmall" style={styles.header}>
        Order History
      </Text>

      {orders.length === 0 && (
        <View style={styles.emptyWrap}>
          <IconButton icon="cart-outline" size={40} iconColor="#ccc" />
          <Text style={styles.emptyText}>You have no orders yet.</Text>
        </View>
      )}

      {orders.map((o) => (
        <View
          key={o.id}
          style={[
            styles.card,
            highlight === o.id && styles.highlightCard,
          ]}
        >
          <View style={styles.rowBetween}>
            <Text style={styles.orderId}>Order #{o.id}</Text>
            <Text style={styles.orderDate}>
              {new Date(o.date).toLocaleDateString()}
            </Text>
          </View>

          <Divider style={{ marginVertical: 6 }} />

          {o.items.map((it) => (
            <View key={it.id} style={styles.itemRow}>
              <Text style={styles.itemName}>{it.product.name}</Text>
              <Text style={styles.itemQty}>× {it.qty}</Text>
              <Text style={styles.itemPrice}>
                ${(it.product.price * it.qty).toFixed(2)}
              </Text>
            </View>
          ))}

          <Divider style={{ marginVertical: 6 }} />

          <View style={styles.rowBetween}>
            <Text style={styles.totalLabel}>Total:</Text>
            <Text style={styles.totalPrice}>${o.total.toFixed(2)}</Text>
          </View>

          <View style={styles.footerRow}>
            <Text style={styles.statusText}>Status: Delivered</Text>
            <IconButton
              icon="chevron-right"
              size={22}
              iconColor="#ff5a5f"
              onPress={() => navigation.navigate("ProductDetail")}
            />
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    marginBottom: 10,
    color: "#333",
    fontWeight: "600",
  },
  emptyWrap: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100,
  },
  emptyText: {
    color: "#888",
    fontSize: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 3,
  },
  highlightCard: {
    borderColor: "#ff5a5f",
    borderWidth: 1.2,
    backgroundColor: "#fffafa",
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  orderId: {
    fontWeight: "600",
    color: "#222",
  },
  orderDate: {
    color: "#666",
    fontSize: 13,
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },
  itemName: {
    color: "#333",
    flex: 1,
  },
  itemQty: {
    color: "#777",
    width: 40,
    textAlign: "center",
  },
  itemPrice: {
    color: "#333",
    width: 80,
    textAlign: "right",
  },
  totalLabel: {
    fontWeight: "600",
    color: "#444",
  },
  totalPrice: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#ff5a5f",
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 6,
  },
  statusText: {
    color: "#008000",
    fontSize: 13,
    fontWeight: "500",
  },
});
