import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Text, IconButton, Button } from 'react-native-paper';


export default function CartItem({ item, onInc, onDec, onRemove }) {
const { product, qty } = item;
return (
<View style={styles.wrap}>
<Image source={{ uri: product.image }} style={styles.image} />
<View style={{ flex: 1 }}>
<Text variant="titleMedium">{product.name}</Text>
<Text>${product.price.toFixed(2)} × {qty}</Text>
<Text style={{ marginTop: 4, color: '#ff5a5f' }}>${(product.price * qty).toFixed(2)}</Text>
<View style={styles.row}>
<IconButton icon="minus" onPress={onDec} />
<Text>{qty}</Text>
<IconButton icon="plus" onPress={onInc} />
<Button onPress={onRemove}>Remove</Button>
</View>
</View>
</View>
);
}
const styles = StyleSheet.create({
wrap: { flexDirection: 'row', gap: 12, padding: 12, backgroundColor: 'white', borderRadius: 16, marginBottom: 10 },
image: { width: 80, height: 80, borderRadius: 12 },
row: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 6 }
});