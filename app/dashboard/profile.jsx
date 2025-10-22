import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

export default function Profile() {
  const user = {
    name: "Piyu Gaonkar",
    email: "piyu@example.com",
    location: "Mangalore, India",
    phone: "+91 98765 43210",
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Profile</Text>

      <View style={styles.profileCard}>
        <View style={styles.iconContainer}>
          <Ionicons name="person-circle-outline" size={70} color="#25D366" />
        </View>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>

      <View style={styles.infoSection}>
        <View style={styles.infoRow}>
          <Ionicons name="call-outline" size={20} color="#25D366" />
          <Text style={styles.infoText}>{user.phone}</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="location-outline" size={20} color="#25D366" />
          <Text style={styles.infoText}>{user.location}</Text>
        </View>
      </View>

      <View style={styles.sectionTitleContainer}>
        <MaterialIcons name="receipt-long" size={22} color="#25D366" />
        <Text style={styles.sectionTitle}>Payment History</Text>
      </View>

      <View style={styles.paymentCard}>
        <Text style={styles.paymentText}>No payments yet.</Text>
      </View>

      <TouchableOpacity style={styles.logoutBtn}>
        <Ionicons name="log-out-outline" size={20} color="#fff" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9", paddingTop: 50, paddingHorizontal: 20 },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2e7d32",
    textAlign: "center",
    marginBottom: 20,
  },
  profileCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    alignItems: "center",
    paddingVertical: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 20,
  },
  iconContainer: { marginBottom: 10 },
  name: { fontSize: 20, fontWeight: "700", color: "#333" },
  email: { fontSize: 14, color: "#777" },

  infoSection: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    marginBottom: 25,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  infoText: { fontSize: 15, color: "#333", marginLeft: 10 },

  sectionTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#25D366",
    marginLeft: 8,
  },
  paymentCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    marginBottom: 25,
  },
  paymentText: { color: "#777", fontSize: 14, textAlign: "center" },

  logoutBtn: {
    backgroundColor: "#25D366",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 12,
  },
  logoutText: { color: "#fff", fontSize: 16, fontWeight: "600", marginLeft: 6 },
});
