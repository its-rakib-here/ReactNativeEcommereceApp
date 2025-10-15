import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { useShop } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';


export default function WishlistScreen({ navigation }) {
const { products, wishlist } = useShop();
const items = products.filter((p) => wishlist.includes(p.id));
return (
<ScrollView style={styles.wrap} contentContainerStyle={{ padding: 16 }}>
<Text variant="headlineSmall" style={{ marginBottom: 8 }}>Wishlist</Text>
{items.length === 0 && <Text>No favorites yet.</Text>}
{items.map((item) => (
<ProductCard key={item.id} item={item} onPress={() => navigation.navigate('ProductDetail', { product: item })} />
))}
</ScrollView>
);
}
const styles = StyleSheet.create({ wrap: { flex: 1 } });