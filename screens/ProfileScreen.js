import React from 'react';
import { ScrollView, View, StyleSheet, Image } from 'react-native';
import { Text, Button, List, useTheme, Avatar, Divider } from 'react-native-paper';
import { useAuth } from '../context/AuthContext';

export default function ProfileScreen({ navigation }) {
  const { user, logout } = useAuth();
  const theme = useTheme();

  return (
    <ScrollView
      style={styles.wrap}
      contentContainerStyle={styles.container}
    >
      <Text variant="headlineMedium" style={styles.header}>
        Profile
      </Text>

      {user ? (
        <View style={[styles.profileCard, { backgroundColor: theme.colors.surface }]}>
          <View style={styles.avatarSection}>
            <Avatar.Image
              size={80}
              source={{ uri: `https://api.dicebear.com/8.x/identicon/svg?seed=${user.email}` }}
            />
            <View style={styles.userInfo}>
              <Text variant="titleMedium">{user.name}</Text>
              <Text style={styles.email}>{user.email}</Text>
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.emptyState}>
          <Text variant="bodyLarge" style={{ textAlign: 'center', color: theme.colors.onSurfaceVariant }}>
            You’re not logged in.
          </Text>
          <Button
            mode="contained"
            style={{ marginTop: 12 }}
            onPress={() => navigation.navigate('Login')}
          >
            Go to Login
          </Button>
        </View>
      )}

      <Divider style={{ marginVertical: 16 }} />

      <List.Section>
        <List.Subheader>Account Settings</List.Subheader>

        <List.Item
          title="Order History"
          left={(props) => <List.Icon {...props} icon="history" />}
          onPress={() => navigation.navigate('Orders')}
        />
        <List.Item
          title="Notifications"
          left={(props) => <List.Icon {...props} icon="bell-outline" />}
          onPress={() => navigation.navigate('Notifications')}
        />
        <List.Item
          title="Admin Panel"
          left={(props) => <List.Icon {...props} icon="cog" />}
          onPress={() => navigation.navigate('Admin')}
        />
      </List.Section>

      <Button
        mode="outlined"
        style={styles.logoutButton}
        onPress={logout}
      >
        Logout
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
  },
  container: {
    padding: 16,
  },
  header: {
    marginBottom: 12,
    fontWeight: '600',
  },
  profileCard: {
    borderRadius: 20,
    padding: 16,
    elevation: 2,
    marginBottom: 16,
  },
  avatarSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userInfo: {
    marginLeft: 16,
  },
  email: {
    color: 'gray',
  },
  emptyState: {
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutButton: {
    marginTop: 24,
    borderRadius: 12,
  },
});
