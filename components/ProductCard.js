import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Card, Text, Button, IconButton } from 'react-native-paper';
import { useShop } from '../context/ShopContext';


export default function ProductCard({ item, onPress }) {
const { addToCart, toggleWishlist, wishlist } = useShop();
const wished = wishlist.includes(item.id);
return (
<Card style={styles.card} onPress={onPress}>
<View>
<Image source={{ uri: item.image }} style={styles.image} />
<IconButton
icon={wished ? 'heart' : 'heart-outline'}
iconColor={wished ? '#ff5a5f' : '#333'}
size={20}
style={styles.heart}
onPress={() => toggleWishlist(item.id)}
/>
</View>
<Card.Content>
<Text variant="titleMedium">{item.name}</Text>
<Text variant="bodySmall" style={{ color: '#777' }}>{item.category} • ⭐ {item.rating}</Text>
<View style={styles.row}>
<Text variant="titleMedium" style={{ color: '#ff5a5f' }}>${item.price.toFixed(2)}</Text>
<Button mode="contained" onPress={() => addToCart(item)}>
Add
</Button>
</View>
</Card.Content>
</Card>
);
}


const styles = StyleSheet.create({
card: { marginBottom: 12, overflow: 'hidden', borderRadius: 16 },
image: { width: '100%', height: 160 },
heart: { position: 'absolute', right: 6, top: 6, backgroundColor: 'white' },
row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }
});
