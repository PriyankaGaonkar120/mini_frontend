import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Notifications() {
  const notifications = [
    {
      id: 1,
      title: "Pickup Reminder",
      message: "Your waste collection is scheduled for tomorrow at 9:00 AM.",
      icon: "calendar-outline",
      time: "2 hrs ago",
    },
    {
      id: 2,
      title: "Payment Successful",
      message: "You paid ₹120 for the monthly waste collection service.",
      icon: "checkmark-circle-outline",
      time: "5 hrs ago",
    },
    {
      id: 3,
      title: "New Update",
      message: "A new version of the app is available. Update now for better performance!",
      icon: "arrow-up-circle-outline",
      time: "1 day ago",
    },
    {
      id: 4,
      title: "Feedback Received",
      message: "Thanks for sharing your feedback with us!",
      icon: "chatbubble-ellipses-outline",
      time: "2 days ago",
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Notifications</Text>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {notifications.map((item) => (
          <View key={item.id} style={styles.card}>
            <View style={styles.iconContainer}>
              <Ionicons name={item.icon} size={26} color="#25D366" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.message}>{item.message}</Text>
              <Text style={styles.time}>{item.time}</Text>
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
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginBottom: 4,
  },
  message: { fontSize: 14, color: "#555", marginBottom: 6 },
  time: { fontSize: 12, color: "#999" },
});
