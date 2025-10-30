import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useRouter } from "expo-router";

export default function Notifications() {
  const router = useRouter();
  const BASE_URI = "http://localhost:5000";
  const [phoneNumber, setPhoneNumber] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch stored phone number
  useEffect(() => {
    const getUserPhone = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          if (userData.phone) {
            setPhoneNumber(userData.phone);
          } else {
            Alert.alert("Error", "Phone number not found in your account.");
          }
        } else {
          Alert.alert("Error", "No user found. Please login again.");
          router.replace("/login");
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
        Alert.alert("Error", "Something went wrong. Please login again.");
        router.replace("/login");
      }
    };
    getUserPhone();
  }, []);

  // ✅ Fetch notifications when phone is available
  useEffect(() => {
    if (!phoneNumber) return;

    const fetchNotifications = async () => {
      try {
        const res = await axios.get(`${BASE_URI}/api/notifications/${phoneNumber}`);
        setNotifications(res.data);
      } catch (err) {
        console.error("Error fetching notifications:", err.message);
        Alert.alert("Error", "Failed to load notifications.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [phoneNumber]);

  // ✅ Loading state
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#16a34a" />
        <Text style={{ marginTop: 10 }}>Loading notifications...</Text>
      </View>
    );
  }

  // ✅ Empty state (no dummy data)
  if (notifications.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="notifications-off-outline" size={64} color="#9ca3af" />
        <Text style={styles.emptyText}>No notifications yet</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Notifications</Text>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {notifications.map((item) => (
          <View key={item._id} style={styles.card}>
            <View style={styles.iconContainer}>
              <Ionicons
                name={
                  item.type === "payment"
                    ? "checkmark-circle-outline"
                    : item.type === "reminder"
                    ? "calendar-outline"
                    : "notifications-outline"
                }
                size={26}
                color="#25D366"
              />
            </View>

            <View style={styles.textContainer}>
              <Text style={styles.message}>{item.message}</Text>
              <Text style={styles.type}>{item.type}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9", paddingTop: 50 },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2e7d32",
    textAlign: "center",
    marginBottom: 15,
  },
  scrollContainer: { paddingHorizontal: 15, paddingBottom: 20 },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    width: 50,
    height: 50,
    backgroundColor: "#e8f5e9",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  textContainer: { flex: 1 },
  message: { fontSize: 15, color: "#333", marginBottom: 6 },
  type: { fontSize: 12, color: "#777" },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#9ca3af",
    marginTop: 8,
  },
});