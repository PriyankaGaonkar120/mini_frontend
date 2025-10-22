import React from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Dashboard() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Welcome 👋</Text>
        <Text style={styles.headerSubtitle}>
          Manage your payments, updates, and support
        </Text>
      </View>

      {/* Billing Summary Card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Billing Summary</Text>
          <Ionicons name="wallet-outline" size={26} color={styles.cardIcon.color} />
        </View>

        <View style={styles.cardContent}>
          <Text style={styles.cardText}>Monthly Fee: ₹300</Text>
          <Text style={styles.cardText}>Due Date: 25 Oct 2025</Text>
          <Text style={styles.cardText}>Status: ✅ Paid</Text>
        </View>

        <TouchableOpacity style={styles.cardButton}>
          <Ionicons name="cash-outline" size={20} color="#fff" />
          <Text style={styles.cardButtonText}>Make Payment</Text>
        </TouchableOpacity>
      </View>

      {/* Notifications Section */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Notifications</Text>
          <Ionicons name="notifications-outline" size={24} color={styles.cardIcon.color} />
        </View>

        <View style={styles.notificationItem}>
          <Text style={styles.notificationTitle}>♻️ Waste Collection Scheduled</Text>
          <Text style={styles.notificationTime}>Tomorrow at 9:00 AM</Text>
        </View>

        <View style={styles.notificationItem}>
          <Text style={styles.notificationTitle}>⚠️ Payment Reminder</Text>
          <Text style={styles.notificationTime}>Due on 25 Oct 2025</Text>
        </View>

        <TouchableOpacity style={styles.viewAll}>
          <Text style={styles.viewAllText}>View All</Text>
          <Ionicons name="chevron-forward" size={18} color={styles.viewAllText.color} />
        </TouchableOpacity>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActionsRow}>
          <TouchableOpacity style={styles.quickActionButton}>
            <Ionicons name="help-circle-outline" size={30} color="#15803d" />
            <Text style={styles.quickActionText}>Help & FAQ</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickActionButton}>
            <Ionicons name="chatbubbles-outline" size={30} color="#15803d" />
            <Text style={styles.quickActionText}>Chat Support</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

// ========================
// CSS Styles
// ========================
const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: "#F8FAF9",
  },
  header: {
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#166534",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#4B5563",
    marginTop: 4,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#166534",
  },
  cardIcon: {
    color: "#166534",
  },
  cardContent: {
    marginBottom: 15,
  },
  cardText: {
    fontSize: 14,
    color: "#4B5563",
    marginBottom: 3,
  },
  cardButton: {
    flexDirection: "row",
    backgroundColor: "#16a34a",
    paddingVertical: 12,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  cardButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
    marginLeft: 6,
  },
  notificationItem: {
    marginBottom: 12,
  },
  notificationTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
  },
  notificationTime: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 2,
  },
  viewAll: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  viewAllText: {
    color: "#16a34a",
    fontWeight: "600",
    fontSize: 14,
  },
  quickActions: {
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#166534",
    marginBottom: 10,
  },
  quickActionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  quickActionButton: {
    width: "47%",
    backgroundColor: "#DCFCE7",
    paddingVertical: 20,
    borderRadius: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  quickActionText: {
    color: "#15803d",
    fontWeight: "600",
    marginTop: 8,
    fontSize: 14,
    textAlign: "center",
  },
});
