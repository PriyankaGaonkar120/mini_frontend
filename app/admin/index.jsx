import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Modal,
  TextInput,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

// Enable animation for Android
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function AdminDashboard() {
  const router = useRouter();
  const BASE_URI = 'http://localhost:5000';
  const [adminName, setAdminName] = useState('');
  const [adminPhone, setAdminPhone] = useState('');
  const [collectors, setCollectors] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // modals
  const [showCollectorModal, setShowCollectorModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);

  // collapsible sections
  const [showCollectors, setShowCollectors] = useState(false);
  const [showUsers, setShowUsers] = useState(false);

  const [collectorForm, setCollectorForm] = useState({ name: '', phone: '' });
  const [userForm, setUserForm] = useState({
    name: '',
    phone: '',
    area: '',
    houseNumber: '',
    password: '',
  });

  useEffect(() => {
    const getAdminData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          setAdminName(userData.name || 'Admin');
          setAdminPhone(userData.phone || ''); // ✅ store admin phone
        } else {
          router.replace('/login');
        }
      } catch (err) {
        console.error(err);
      }
    };
    getAdminData();
  }, []);

  // ✅ Separate effect to run fetchData only when adminPhone is ready
  useEffect(() => {
    if (adminPhone) fetchData();
  }, [adminPhone]);

  const fetchData = async () => {
    try {
      const collectorsRes = await axios.get(
        `${BASE_URI}/api/collectors/${adminPhone}`
      );
      const usersRes = await axios.get(
        `${BASE_URI}/api/admin/houses/${adminPhone}`
      );

      setCollectors(collectorsRes.data || []);
      setUsers(usersRes.data.users || []);
    } catch (err) {
      Alert.alert('Error', 'Failed to fetch admin data.');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => fetchData();

  const handleAddCollector = async () => {
    if (!collectorForm.name || !collectorForm.phone)
      return Alert.alert('Error', 'Please fill all collector details.');
    try {
      await axios.post(`${BASE_URI}/api/collectors/add`, {
        name: collectorForm.name,
        phone: collectorForm.phone,
        password: collectorForm.password || '123456', // default if you want
        adminPhone: adminPhone,
      });

      Alert.alert('Success', 'Collector added!');
      setCollectorForm({ name: '', phone: '' });
      setShowCollectorModal(false);
      fetchData();
    } catch (err) {
      Alert.alert('Error', 'Failed to add collector.');
    }
  };

  const handleAddUser = async () => {
    if (
      !userForm.name ||
      !userForm.phone ||
      !userForm.area ||
      !userForm.houseNumber ||
      !userForm.password 
    )
      return Alert.alert('Error', 'Please fill all fields.');

    try {
      await axios.post(`${BASE_URI}/api/admin/add-house`, {
        name: userForm.name,
        phone: userForm.phone,
        password: userForm.password || '123456', // optional: set default
        area: userForm.area,
        houseNumber: userForm.houseNumber,
        adminPhone: adminPhone,
      });

      Alert.alert('Success', 'House added successfully!');
      setUserForm({
        name: '',
        phone: '',
        area: '',
        houseNumber: '',
        password: '',
      });
      setShowUserModal(false);
      fetchData();
    } catch (err) {
      console.error('Add House Error:', err);
      Alert.alert('Error', 'Failed to add house.');
    }
  };

  const toggleSection = (section) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (section === 'collectors') setShowCollectors(!showCollectors);
    else setShowUsers(!showUsers);
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
        {/* Header */}
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
          <Text style={styles.headerSubtitle}>Manage collectors & houses</Text>
        </View>

        {/* Collectors Section */}
        <View style={styles.card}>
          <TouchableOpacity
            style={styles.cardHeader}
            onPress={() => toggleSection('collectors')}>
            <Text style={styles.cardTitle}>Collectors</Text>
            <View style={styles.headerRight}>
              <TouchableOpacity
                onPress={() => setShowCollectorModal(true)}
                style={styles.addButton}>
                <Ionicons
                  name='add-circle-outline'
                  size={22}
                  color='#166534'
                />
              </TouchableOpacity>
              <Ionicons
                name={showCollectors ? 'chevron-up' : 'chevron-down'}
                size={24}
                color='#166534'
              />
            </View>
          </TouchableOpacity>

          {showCollectors && (
            <>
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
            </>
          )}
        </View>

        {/* Houses Section */}
        <View style={styles.card}>
          <TouchableOpacity
            style={styles.cardHeader}
            onPress={() => toggleSection('users')}>
            <Text style={styles.cardTitle}>Houses / Users</Text>
            <View style={styles.headerRight}>
              <TouchableOpacity
                onPress={() => setShowUserModal(true)}
                style={styles.addButton}>
                <Ionicons
                  name='add-circle-outline'
                  size={22}
                  color='#166534'
                />
              </TouchableOpacity>
              <Ionicons
                name={showUsers ? 'chevron-up' : 'chevron-down'}
                size={24}
                color='#166534'
              />
            </View>
          </TouchableOpacity>

          {showUsers && (
            <>
              {users.length > 0 ? (
                users.map((user, i) => (
                  <View
                    key={i}
                    style={styles.listItem}>
                    <Text style={styles.listText}>
                      {user.name} {user.houseNumber}
                    </Text>
                  </View>
                ))
              ) : (
                <Text style={styles.emptyText}>No houses found.</Text>
              )}
            </>
          )}
        </View>
      </ScrollView>

      {/* Collector Modal */}
      <Modal
        visible={showCollectorModal}
        transparent
        animationType='slide'>
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Add Collector</Text>

            <TextInput
              placeholder='Name'
              value={collectorForm.name}
              onChangeText={(t) =>
                setCollectorForm({ ...collectorForm, name: t })
              }
              style={styles.input}
            />
            <TextInput
              placeholder='Phone'
              keyboardType='phone-pad'
              value={collectorForm.phone}
              onChangeText={(t) =>
                setCollectorForm({ ...collectorForm, phone: t })
              }
              style={styles.input}
            />
            <TextInput
              placeholder='Password'
              secureTextEntry
              value={collectorForm.password}
              onChangeText={(t) =>
                setCollectorForm({ ...collectorForm, password: t })
              }
              style={styles.input}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setShowCollectorModal(false)}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.submitBtn}
                onPress={handleAddCollector}>
                <Text style={styles.submitText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* User Modal */}
      <Modal
        visible={showUserModal}
        transparent
        animationType='slide'>
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Add House / User</Text>

            <TextInput
              placeholder='Name'
              value={userForm.name}
              onChangeText={(t) => setUserForm({ ...userForm, name: t })}
              style={styles.input}
            />

            <TextInput
              placeholder='Phone'
              keyboardType='phone-pad'
              value={userForm.phone}
              onChangeText={(t) => setUserForm({ ...userForm, phone: t })}
              style={styles.input}
            />

            <TextInput
              placeholder='Area'
              value={userForm.area}
              onChangeText={(t) => setUserForm({ ...userForm, area: t })}
              style={styles.input}
            />

            <TextInput
              placeholder='House Number'
              value={userForm.houseNumber}
              onChangeText={(t) => setUserForm({ ...userForm, houseNumber: t })}
              style={styles.input}
            />

            <TextInput
              placeholder='Password'
              secureTextEntry
              value={userForm.password}
              onChangeText={(t) => setUserForm({ ...userForm, password: t })}
              style={styles.input}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setShowUserModal(false)}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.submitBtn}
                onPress={handleAddUser}>
                <Text style={styles.submitText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#166534',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  cancelBtn: { padding: 10, marginRight: 10 },
  cancelText: { color: '#9CA3AF', fontWeight: '600' },
  submitBtn: {
    backgroundColor: '#16a34a',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  submitText: { color: '#fff', fontWeight: '700' },
});
