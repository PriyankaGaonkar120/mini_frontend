import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Animated,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default function Dashboard() {
  const router = useRouter();
  const BASE_URI= 'http://10.209.250.161:5000';
  const [phoneNumber, setPhoneNumber] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Get stored phone number
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

  // ✅ Fetch notifications + payment
  useEffect(() => {
    if (!phoneNumber) return;

    const fetchData = async () => {
      try {
        // 🔹 Get payment info
        const paymentRes = await axios.get(
          `${BASE_URI}/api/payments/current/${phoneNumber}`
        );
        setPayment(paymentRes.data);

        const notifRes = await axios.get(
          `${BASE_URI}/api/notifications/${phoneNumber}`
        );
        setNotifications(notifRes.data);
      } catch (err) {
        console.error("Error fetching data:", err.message);
        Alert.alert("Error", "Failed to load data from server.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [phoneNumber]);

  const handlePayment = () => {
    Alert.alert("Payment", "Payment functionality coming soon 💳");
  };

  const quickActions = [
    { id: 1, title: "Help & FAQ", icon: "help-circle-outline", color: "#15803d" },
    { id: 2, title: "Chat Support", icon: "chatbubbles-outline", color: "#15803d" },
    { id: 3, title: "Report Missed Pickup", icon: "alert-circle-outline", color: "#EF4444" },
    { id: 4, title: "Request Extra Pickup", icon: "add-circle-outline", color: "#10B981" },
    // { id: 5, title: "Check Payment Status", icon: "wallet-outline", color: "#3B82F6" },
  ];

  const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color="#16a34a" />
        <Text style={{ color: "#166534", marginTop: 10 }}>Loading dashboard...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Welcome 👋</Text>
          <Text style={styles.headerSubtitle}>
            Manage your payments, updates, and support
          </Text>
        </View>

        {/* ✅ Billing Summary Card */}
        {payment && (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Billing Summary</Text>
              <Ionicons name="wallet-outline" size={26} color="#166534" />
            </View>

            <View style={styles.cardContent}>
              <Text style={styles.cardText}>Monthly Fee: ₹{payment.amount}</Text>
              <Text style={styles.cardText}>Month: {payment.month}</Text>
              <Text style={styles.cardText}>
                Due Date: {new Date(payment.dueDate).toDateString()}
              </Text>
              <Text
                style={[
                  styles.cardText,
                  {
                    color:
                      payment.status === "Paid" ? "#16a34a" : "#dc2626",
                    fontWeight: "700",
                  },
                ]}
              >
                Status: {payment.status === "Paid" ? "✅ Paid" : "⏳ Pending"}
              </Text>
            </View>

            {/* 🔹 Show button only if Pending */}
            {payment.status === "Pending" && (
              <TouchableOpacity style={styles.cardButton} onPress={handlePayment}>
                <Ionicons name="cash-outline" size={20} color="#fff" />
                <Text style={styles.cardButtonText}>Make Payment</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        {/* Notifications */}
        {/* <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Notifications</Text>
            <Ionicons name="notifications-outline" size={24} color="#166534" />
          </View>

          {notifications.length > 0 ? (
            notifications.map((note, index) => (
              <View key={index} style={styles.notificationItem}>
                <Text style={styles.notificationTitle}>{note.title}</Text>
                <Text style={styles.notificationTime}>{note.time}</Text>
              </View>
            ))
          ) : (
            <>
              <View style={styles.notificationItem}>
                <Text style={styles.notificationTitle}>♻️ Waste Collection Scheduled</Text>
                <Text style={styles.notificationTime}>Tomorrow at 9:00 AM</Text>
              </View>
              <View style={styles.notificationItem}>
                <Text style={styles.notificationTitle}>⚠️ Payment Reminder</Text>
                <Text style={styles.notificationTime}>
                  Due on {new Date(payment?.dueDate).toDateString()}
                </Text>
              </View>
            </>
          )}

          <TouchableOpacity
            style={styles.viewAll}
            onPress={() => router.push("/dashboard/notification")}
          >
            <Text style={styles.viewAllText}>View All</Text>
            <Ionicons name="chevron-forward" size={18} color="#16a34a" />
          </TouchableOpacity>
        </View> */}

        {/* Quick Actions */}
        <View>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 20 }}>
            {quickActions.map((item) => (
              <AnimatedTouchable
                key={item.id}
                style={[styles.quickActionButton, { backgroundColor: `${item.color}20` }]}
                activeOpacity={0.7}
                onPress={() => alert(`${item.title} pressed!`)}
              >
                <Ionicons name={item.icon} size={28} color={item.color} />
                <Text style={[styles.quickActionText, { color: item.color }]}>{item.title}</Text>
              </AnimatedTouchable>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      {/* Floating Chat Button */}
      <AnimatedTouchable
        style={styles.fab}
        activeOpacity={0.8}
        onPress={() => alert("Chat Support pressed!")}
      >
        <Ionicons name="chatbubbles-outline" size={28} color="#fff" />
      </AnimatedTouchable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAF9", paddingTop: 50 },
  header: { marginBottom: 20, paddingHorizontal: 20 },
  headerTitle: { fontSize: 28, fontWeight: "800", color: "#166534" },
  headerSubtitle: { fontSize: 14, color: "#4B5563", marginTop: 4 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
  },
  cardHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  cardTitle: { fontSize: 18, fontWeight: "700", color: "#166534" },
  cardContent: { marginBottom: 15 },
  cardText: { fontSize: 14, color: "#4B5563", marginBottom: 3 },
  cardButton: {
    flexDirection: "row",
    backgroundColor: "#16a34a",
    paddingVertical: 12,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  cardButtonText: { color: "#fff", fontWeight: "600", fontSize: 16, marginLeft: 6 },
  notificationItem: { marginBottom: 12 },
  notificationTitle: { fontSize: 14, fontWeight: "600", color: "#374151" },
  notificationTime: { fontSize: 12, color: "#6B7280", marginTop: 2 },
  viewAll: { flexDirection: "row", alignItems: "center", marginTop: 6 },
  viewAllText: { color: "#16a34a", fontWeight: "600", fontSize: 14 },
  sectionTitle: { fontSize: 18, fontWeight: "700", color: "#166534", paddingHorizontal: 20, marginBottom: 10 },
  quickActionButton: {
    width: 140,
    height: 90,
    borderRadius: 18,
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  quickActionText: { fontSize: 12, fontWeight: "600", marginTop: 6, textAlign: "center" },
  fab: {
    position: "absolute",
    bottom: 25,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#16a34a",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 5,
  },
});
