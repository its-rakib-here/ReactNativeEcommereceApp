import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { useAuth } from '../context/AuthContext';


export default function LoginScreen({ navigation }) {
const { login } = useAuth();
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
return (
<View style={styles.wrap}>
<Text variant="headlineMedium" style={{ marginBottom: 8 }}>Welcome back</Text>
<TextInput label="Email" value={email} onChangeText={setEmail} autoCapitalize='none' style={{ marginBottom: 8 }} />
<TextInput label="Password" value={password} onChangeText={setPassword} secureTextEntry style={{ marginBottom: 16 }} />
<Button mode="contained" onPress={() => login(email, password)}>Login</Button>
<Button onPress={() => navigation.navigate('Signup')} style={{ marginTop: 8 }}>Create an account</Button>
</View>
);
}
const styles = StyleSheet.create({ wrap: { flex: 1, justifyContent: 'center', padding: 16 } });