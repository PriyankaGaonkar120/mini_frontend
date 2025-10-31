import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useRouter } from "expo-router";

export default function Notifications() {
  const router = useRouter();
  const BASE_URI = 'http://10.209.250.161:5000';
  const [phoneNumber, setPhoneNumber] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

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

  // ✅ Fetch notifications
  const fetchNotifications = async () => {
    if (!phoneNumber) return;
    try {
      const res = await axios.get(`${BASE_URI}/api/notifications/${phoneNumber}`);
      setNotifications(res.data);
    } catch (err) {
      console.error("Error fetching notifications:", err.message);
      Alert.alert("Error", "Failed to load notifications.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [phoneNumber]);

  // auto reload time ago 
  useEffect(() => {
    const interval = setInterval(() => {
      setNotifications((prev) => [...prev]); // triggers re-render
    }, 60000); // every 1 minute
    return () => clearInterval(interval);
  }, []);


  // 🔄 Handle reload
  const handleReload = async () => {
    setRefreshing(true);
    await fetchNotifications();
  };

  // time 
  const timeAgo = (dateString) => {
  const now = new Date();
  const date = new Date(dateString);
  const diff = Math.floor((now - date) / 1000); // difference in seconds

  if (diff < 60) return `${diff} sec ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hr ago`;
  return `${Math.floor(diff / 86400)} day${Math.floor(diff / 86400) > 1 ? "s" : ""} ago`;
};


  // ✅ Loading state
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#16a34a" />
        <Text style={{ marginTop: 10, color: "#166534" }}>Loading notifications...</Text>
      </View>
    );
  }

  // ✅ Empty state
  if (notifications.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="notifications-off-outline" size={80} color="#9ca3af" />
        <Text style={styles.emptyText}>No notifications yet</Text>
        <TouchableOpacity style={styles.reloadButton} onPress={handleReload}>
          {refreshing ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <>
              <Ionicons name="reload" size={18} color="#fff" />
              <Text style={styles.reloadText}>Reload</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header with reload icon */}
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Notifications</Text>
        <TouchableOpacity onPress={handleReload}>
          {refreshing ? (
            <ActivityIndicator size="small" color="#166534" />
          ) : (
            <Ionicons name="reload" size={26} color="#166534" />
          )}
        </TouchableOpacity>
      </View>

      {/* Notifications list */}
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
                color="#16a34a"
              />
            </View>

            <View style={styles.textContainer}>
              <Text style={styles.message}>{item.message}</Text>
              <Text style={styles.type}>
                {item.type.charAt(0).toUpperCase() + item.type.slice(1)} • {timeAgo(item.createdAt)}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAF9", paddingTop: 50 },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  header: {
    fontSize: 28,
    fontWeight: "800",
    color: "#166534",
  },
  scrollContainer: { paddingHorizontal: 15, paddingBottom: 20 },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  iconContainer: {
    width: 50,
    height: 50,
    backgroundColor: "#DCFCE7",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  textContainer: { flex: 1, justifyContent: "center" },
  message: { fontSize: 15, color: "#1F2937", fontWeight: "500", marginBottom: 6 },
  type: { fontSize: 12, color: "#6B7280" },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 16,
    color: "#9ca3af",
    marginTop: 8,
    marginBottom: 15,
  },
  reloadButton: {
    flexDirection: "row",
    backgroundColor: "#16a34a",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 25,
    alignItems: "center",
  },
  reloadText: { color: "#fff", fontWeight: "600", fontSize: 14, marginLeft: 6 },
});
