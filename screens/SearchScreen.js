import React, { useMemo, useState } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Text, Searchbar } from 'react-native-paper';
import { useShop } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';


export default function SearchScreen({ navigation }) {
const { products } = useShop();
const [q, setQ] = useState('');
const list = useMemo(() => !q ? products : products.filter((p) => p.name.toLowerCase().includes(q.toLowerCase())), [q, products]);


return (
<ScrollView style={styles.wrap} contentContainerStyle={{ padding: 16 }}>
<Text variant="headlineSmall" style={{ marginBottom: 8 }}>Search</Text>
<Searchbar placeholder="Try 'Speaker'" value={q} onChangeText={setQ} style={{ marginBottom: 8 }} />
{list.map((item) => (
<ProductCard key={item.id} item={item} onPress={() => navigation.navigate('ProductDetail', { product: item })} />
))}
</ScrollView>
);
}
const styles = StyleSheet.create({ wrap: { flex: 1 } });