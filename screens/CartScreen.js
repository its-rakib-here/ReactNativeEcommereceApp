import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useShop } from '../context/ShopContext';
import CartItem from '../components/CartItem';


export default function CartScreen({ navigation }) {
const { cartDetailed, changeQty, removeFromCart, cartTotal } = useShop();
const empty = cartDetailed.length === 0;
return (
<ScrollView style={styles.wrap} contentContainerStyle={{ padding: 16 }}>
<Text variant="headlineSmall" style={{ marginBottom: 8 }}>Your Cart</Text>
{empty && <Text>Your cart is empty.</Text>}
{cartDetailed.map((ci) => (
<CartItem
key={ci.id}
item={ci}
onInc={() => changeQty(ci.id, ci.qty + 1)}
onDec={() => changeQty(ci.id, Math.max(1, ci.qty - 1))}
onRemove={() => removeFromCart(ci.id)}
/>
))}
{!empty && (
<View style={{ marginTop: 8 }}>
<Text variant="titleLarge" style={{ color: '#ff5a5f' }}>Total: ${cartTotal.toFixed(2)}</Text>
<Button mode="contained" style={{ marginTop: 8 }} onPress={() => navigation.navigate('Checkout')}>Proceed to Checkout</Button>
</View>
)}
</ScrollView>
);
}
const styles = StyleSheet.create({ wrap: { flex: 1, backgroundColor: '#f5f5f5' } });