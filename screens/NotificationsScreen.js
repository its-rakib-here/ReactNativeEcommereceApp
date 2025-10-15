import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Text, Switch, Button } from 'react-native-paper';


export default function NotificationsScreen() {
const [promo, setPromo] = useState(true);
const [order, setOrder] = useState(true);
const [system, setSystem] = useState(false);


const test = () => Alert.alert('Mock Notification', 'This is what a push notification might look like.');


return (
<View style={styles.wrap}>
<Text variant="headlineSmall" style={{ marginBottom: 8 }}>Notifications</Text>
<Row label="Promotions & discounts" value={promo} onValueChange={setPromo} />
<Row label="Order status updates" value={order} onValueChange={setOrder} />
<Row label="System messages" value={system} onValueChange={setSystem} />
<Button mode="contained" style={{ marginTop: 12 }} onPress={test}>Send Test Notification</Button>
</View>
);
}


function Row({ label, value, onValueChange }) {
return (
<View style={{ flexDirection:'row', justifyContent:'space-between', alignItems:'center', paddingVertical: 12 }}>
<Text>{label}</Text>
<Switch value={value} onValueChange={onValueChange} />
</View>
);
}


const styles = StyleSheet.create({ wrap: { flex: 1, padding: 16 } });