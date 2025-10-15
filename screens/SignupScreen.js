import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { useAuth } from '../context/AuthContext';


export default function SignupScreen() {
const { signup } = useAuth();
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
return (
<View style={styles.wrap}>
<Text variant="headlineMedium" style={{ marginBottom: 8 }}>Create account</Text>
<TextInput label="Name" value={name} onChangeText={setName} style={{ marginBottom: 8 }} />
<TextInput label="Email" value={email} onChangeText={setEmail} autoCapitalize='none' style={{ marginBottom: 8 }} />
<TextInput label="Password" value={password} onChangeText={setPassword} secureTextEntry style={{ marginBottom: 16 }} />
<Button mode="contained" onPress={() => signup(name, email, password)}>Sign up</Button>
</View>
);
}
const styles = StyleSheet.create({ wrap: { flex: 1, justifyContent: 'center', padding: 16 } });