import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

export default function CollectorTasks() {
  const BASE_URI = 'http://localhost:5000';
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get(`${BASE_URI}/api/collector/tasks`);
        setTasks(res.data || []);
      } catch (err) {
        Alert.alert('Error', 'Unable to load tasks');
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const handleComplete = async (taskId) => {
    try {
      await axios.put(`${BASE_URI}/api/collector/tasks/${taskId}`, {
        status: 'Completed',
      });
      setTasks((prev) =>
        prev.map((t) => (t._id === taskId ? { ...t, status: 'Completed' } : t))
      );
      Alert.alert('Done ✅', 'Pickup marked as completed');
    } catch (err) {
      Alert.alert('Error', 'Could not update status');
    }
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator
          size='large'
          color='#166534'
        />
        <Text style={{ color: '#166534' }}>Loading assigned pickups...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={styles.header}>
          <Text style={styles.title}>My Assigned Tasks</Text>
          <Ionicons
            name='clipboard-outline'
            size={26}
            color='#166534'
          />
        </View>

        {tasks.length > 0 ? (
          tasks.map((task, index) => (
            <View
              key={index}
              style={styles.card}>
              <View style={styles.row}>
                <Text style={styles.address}>{task.address}</Text>
                <Ionicons
                  name={
                    task.status === 'Completed'
                      ? 'checkmark-circle-outline'
                      : 'time-outline'
                  }
                  size={22}
                  color={task.status === 'Completed' ? '#16a34a' : '#DC2626'}
                />
              </View>
              <Text style={styles.text}>Date: {task.date}</Text>
              <Text style={styles.text}>Resident: {task.userName}</Text>
              <Text style={styles.text}>Phone: {task.phone}</Text>

              {task.status !== 'Completed' && (
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleComplete(task._id)}>
                  <Ionicons
                    name='checkmark-done-outline'
                    size={18}
                    color='#fff'
                  />
                  <Text style={styles.buttonText}>Mark as Collected</Text>
                </TouchableOpacity>
              )}
            </View>
          ))
        ) : (
          <Text style={styles.empty}>No assigned tasks yet.</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAF9', paddingTop: 50 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  title: { fontSize: 24, fontWeight: '800', color: '#166534' },
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  address: { fontSize: 16, fontWeight: '700', color: '#166534' },
  text: { fontSize: 14, color: '#4B5563', marginTop: 4 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#16a34a',
    padding: 10,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonText: { color: '#fff', fontWeight: '700', marginLeft: 6 },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  empty: { textAlign: 'center', color: '#9CA3AF', marginTop: 40 },
});
