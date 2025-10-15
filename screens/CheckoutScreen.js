import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, RadioButton, Divider } from 'react-native-paper';
import { useShop } from '../context/ShopContext';


export default function CheckoutScreen({ navigation }) {
const { placeOrder, cartTotal } = useShop();
const [method, setMethod] = useState('stripe');


const pay = () => {
const order = placeOrder();
navigation.replace('Orders', { highlight: order.id });
};


return (
<View style={styles.wrap}>
<Text variant="headlineSmall">Payment</Text>
<RadioButton.Group onValueChange={setMethod} value={method}>
<RadioButton.Item label="Stripe (mock)" value="stripe" />
<RadioButton.Item label="bKash (mock)" value="bkash" />
</RadioButton.Group>
<Divider style={{ marginVertical: 8 }} />
<Text>Total to pay: ${cartTotal.toFixed(2)}</Text>
<Button mode="contained" style={{ marginTop: 12 }} onPress={pay}>Pay & Place Order</Button>
</View>
);
}
const styles = StyleSheet.create({ wrap: { flex: 1, padding: 16 } });