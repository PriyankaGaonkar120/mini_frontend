import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Notifications() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Pickup Reminder",
      message: "Your waste collection is scheduled for tomorrow at 9:00 AM.",
      icon: "calendar-outline",
      time: "2 hrs ago",
      unread: true,
    },
    {
      id: 2,
      title: "Payment Successful",
      message: "You paid ₹120 for the monthly waste collection service.",
      icon: "checkmark-circle-outline",
      time: "5 hrs ago",
      unread: true,
    },
    {
      id: 3,
      title: "New Update",
      message: "A new version of the app is available. Update now for better performance!",
      icon: "arrow-up-circle-outline",
      time: "1 day ago",
      unread: false,
    },
    {
      id: 4,
      title: "Feedback Received",
      message: "Thanks for sharing your feedback with us!",
      icon: "chatbubble-ellipses-outline",
      time: "2 days ago",
      unread: false,
    },
  ]);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, unread: false } : notif
      )
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Notifications</Text>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {notifications.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[styles.card, item.unread && styles.unreadCard]}
            onPress={() => markAsRead(item.id)}
          >
            <View style={styles.iconContainer}>
              <Ionicons name={item.icon} size={26} color="#25D366" />
              {item.unread && <View style={styles.unreadDot} />}
            </View>

            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.message}>{item.message}</Text>
              <Text style={styles.time}>{item.time}</Text>
            </View>
          </TouchableOpacity>
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
  scrollContainer: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
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
  unreadCard: {
    borderLeftWidth: 4,
    borderLeftColor: "#16a34a",
  },
  iconContainer: {
    width: 50,
    height: 50,
    backgroundColor: "#e8f5e9",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
    position: "relative",
  },
  unreadDot: {
    position: "absolute",
    top: 5,
    right: 5,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#EF4444",
  },
  textContainer: { flex: 1 },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000",
    marginBottom: 4,
  },
  message: { fontSize: 14, color: "#555", marginBottom: 6 },
  time: { fontSize: 12, color: "#999" },
});
