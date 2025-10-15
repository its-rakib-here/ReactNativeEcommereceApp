import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Modal, Portal, Text, Button, Checkbox, TextInput } from 'react-native-paper';
import { CATEGORIES } from '../data/mockProducts';


export default function FilterModal({ visible, onDismiss, onApply }) {
const [selected, setSelected] = useState([]);
const [min, setMin] = useState('');
const [max, setMax] = useState('');
const [minRating, setMinRating] = useState('');


const toggle = (cat) => setSelected((p) => p.includes(cat) ? p.filter((c) => c !== cat) : [...p, cat]);
const apply = () => onApply({ categories: selected, min: Number(min)||0, max: Number(max)||999999, minRating: Number(minRating)||0 });


return (
<Portal>
<Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={styles.modal}>
<Text variant="titleLarge" style={{ marginBottom: 8 }}>Filters</Text>
{CATEGORIES.map((c) => (
<View key={c} style={styles.row}>
<Checkbox status={selected.includes(c) ? 'checked' : 'unchecked'} onPress={() => toggle(c)} />
<Text>{c}</Text>
</View>
))}
<TextInput label="Min Price" value={min} onChangeText={setMin} keyboardType="numeric" style={{ marginTop: 8 }} />
<TextInput label="Max Price" value={max} onChangeText={setMax} keyboardType="numeric" style={{ marginTop: 8 }} />
<TextInput label="Min Rating" value={minRating} onChangeText={setMinRating} keyboardType="numeric" style={{ marginTop: 8 }} />
<Button mode="contained" style={{ marginTop: 12 }} onPress={apply}>Apply</Button>
</Modal>
</Portal>
);
}
const styles = StyleSheet.create({ modal: { backgroundColor: 'white', padding: 16, margin: 16, borderRadius: 16 }, row: { flexDirection: 'row', alignItems: 'center' }});