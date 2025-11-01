import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function AdminDashboard() {
  const router = useRouter();
  const BASE_URI = 'http://localhost:5000';
  const [adminName, setAdminName] = useState('');
  const [collectors, setCollectors] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch Admin info
  useEffect(() => {
    const getAdminData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          setAdminName(userData.name || 'Admin');
        } else {
          router.replace('/login');
        }
      } catch (err) {
        console.error(err);
      }
    };
    getAdminData();
  }, []);

  // ✅ Fetch all collectors and users
  useEffect(() => {
    const fetchData = async () => {
      try {
        const collectorsRes = await axios.get(
          `${BASE_URI}/api/admin/collectors`
        );
        const usersRes = await axios.get(`${BASE_URI}/api/admin/users`);
        setCollectors(collectorsRes.data || []);
        setUsers(usersRes.data || []);
      } catch (err) {
        Alert.alert('Error', 'Failed to fetch admin data.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleRefresh = async () => {
    setLoading(true);
    try {
      const collectorsRes = await axios.get(`${BASE_URI}/api/admin/collectors`);
      const usersRes = await axios.get(`${BASE_URI}/api/admin/users`);
      setCollectors(collectorsRes.data || []);
      setUsers(usersRes.data || []);
    } catch (err) {
      Alert.alert('Error', 'Failed to refresh data.');
    } finally {
      setLoading(false);
    }
  };

  const handleSendNotification = async () => {
    Alert.prompt(
      'Send Notification',
      'Enter a message to send to all users:',
      async (text) => {
        if (!text) return;
        try {
          await axios.post(`${BASE_URI}/api/admin/notify-all`, {
            message: text,
          });
          Alert.alert('Success', 'Notification sent to all users!');
        } catch (err) {
          Alert.alert('Error', 'Failed to send notification.');
        }
      }
    );
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator
          size='large'
          color='#16a34a'
        />
        <Text style={{ color: '#166534', marginTop: 10 }}>
          Loading admin data...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {/* ✅ Header */}
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <Text style={styles.headerTitle}>Welcome, {adminName} 👋</Text>
            <TouchableOpacity onPress={handleRefresh}>
              <Ionicons
                name='reload'
                size={26}
                color='#166534'
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.headerSubtitle}>
            Manage collectors, users & notifications
          </Text>
        </View>

        {/* ✅ Collectors Section */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Collectors</Text>
            <Ionicons
              name='people-outline'
              size={26}
              color='#166534'
            />
          </View>
          {collectors.length > 0 ? (
            collectors.map((collector, i) => (
              <View
                key={i}
                style={styles.listItem}>
                <Text style={styles.listText}>
                  {collector.name} ({collector.phone})
                </Text>
              </View>
            ))
          ) : (
            <Text style={styles.emptyText}>No collectors found.</Text>
          )}
        </View>

        {/* ✅ Users Section */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Users</Text>
            <Ionicons
              name='home-outline'
              size={26}
              color='#166534'
            />
          </View>
          {users.length > 0 ? (
            users.map((user, i) => (
              <View
                key={i}
                style={styles.listItem}>
                <Text style={styles.listText}>
                  {user.name} ({user.phone})
                </Text>
              </View>
            ))
          ) : (
            <Text style={styles.emptyText}>No users found.</Text>
          )}
        </View>

        {/* ✅ Actions */}
        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleSendNotification}>
          <Ionicons
            name='notifications-outline'
            size={20}
            color='#fff'
          />
          <Text style={styles.actionText}>Send Notification</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: '#2563eb' }]}
          onPress={() => router.push('/admin/reports')}>
          <Ionicons
            name='document-text-outline'
            size={20}
            color='#fff'
          />
          <Text style={styles.actionText}>View Reports</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAF9', paddingTop: 50 },
  loaderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { marginBottom: 20, paddingHorizontal: 20 },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: { fontSize: 28, fontWeight: '800', color: '#166534' },
  headerSubtitle: { fontSize: 14, color: '#4B5563', marginTop: 4 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: { fontSize: 18, fontWeight: '700', color: '#166534' },
  listItem: { paddingVertical: 6 },
  listText: { fontSize: 14, color: '#374151' },
  emptyText: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
    marginTop: 10,
  },
  actionButton: {
    flexDirection: 'row',
    backgroundColor: '#16a34a',
    paddingVertical: 14,
    marginHorizontal: 20,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  actionText: { color: '#fff', fontWeight: '600', fontSize: 16, marginLeft: 8 },
});
