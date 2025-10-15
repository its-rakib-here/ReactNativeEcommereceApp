import React, { useState } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Text, TextInput, Button, Divider } from 'react-native-paper';
import { useShop } from '../context/ShopContext';


export default function AdminPanelScreen() {
const { products, addProduct, updateProduct, deleteProduct } = useShop();
const [form, setForm] = useState({ name: '', price: '', image: '', category: '', rating: '' });


const submit = () => {
if (!form.name || !form.price) return;
addProduct({ ...form, price: Number(form.price), rating: Number(form.rating)||0, description: 'New product' });
setForm({ name: '', price: '', image: '', category: '', rating: '' });
};


return (
<ScrollView style={styles.wrap} contentContainerStyle={{ padding: 16 }}>
<Text variant="headlineSmall">Admin Panel</Text>
<Text style={{ marginBottom: 8 }}>Add / Update / Delete (frontend only)</Text>
<TextInput label="Name" value={form.name} onChangeText={(v)=>setForm((f)=>({...f,name:v}))} style={{ marginBottom: 8 }} />
<TextInput label="Price" value={form.price} onChangeText={(v)=>setForm((f)=>({...f,price:v}))} keyboardType='numeric' style={{ marginBottom: 8 }} />
<TextInput label="Image URL" value={form.image} onChangeText={(v)=>setForm((f)=>({...f,image:v}))} style={{ marginBottom: 8 }} />
<TextInput label="Category" value={form.category} onChangeText={(v)=>setForm((f)=>({...f,category:v}))} style={{ marginBottom: 8 }} />
<TextInput label="Rating" value={form.rating} onChangeText={(v)=>setForm((f)=>({...f,rating:v}))} keyboardType='numeric' style={{ marginBottom: 8 }} />
<Button mode="contained" onPress={submit}>Add Product</Button>
<Divider style={{ marginVertical: 12 }} />
{products.map((p) => (
<View key={p.id} style={{ backgroundColor: 'white', padding: 12, borderRadius: 16, marginBottom: 10 }}>
<Text variant="titleMedium">{p.name}</Text>
<Text>${p.price.toFixed(2)} • {p.category} • ⭐ {p.rating}</Text>
<View style={{ flexDirection:'row', gap: 8, marginTop: 8 }}>
<Button onPress={() => updateProduct(p.id, { price: p.price + 1 })}>+ $1</Button>
<Button onPress={() => deleteProduct(p.id)} textColor="#ff5a5f">Delete</Button>
</View>
</View>
))}
</ScrollView>
);
}
const styles = StyleSheet.create({ wrap: { flex: 1, backgroundColor: '#f5f5f5' } });