import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

export default function Profile() {
  const user = {
    name: "Piyu Gaonkar",
    email: "piyu@example.com",
    phone: "+91 98765 43210",
    address: "123 Green Avenue",
    area: "Near XYZ Park, Mangalore - 575001",
  };

  const payments = [
    { id: 1, date: "10 Oct 2025", amount: "₹300", status: "Paid" },
    { id: 2, date: "10 Sep 2025", amount: "₹300", status: "Paid" },
    { id: 3, date: "10 Aug 2025", amount: "₹300", status: "Pending" },
  ];

  const settings = [
    { id: 1, title: "Change Password", icon: "lock-closed-outline" },
    { id: 2, title: "Notification Settings", icon: "notifications-outline" },
    { id: 3, title: "Privacy Policy", icon: "document-text-outline" },
    { id: 4, title: "App Version", icon: "information-circle-outline", value: "1.0.0" },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 50 }}>
      {/* Header */}
      <Text style={styles.header}>My Profile</Text>

      {/* Profile Card */}
      <View style={styles.profileCard}>
        <Image
          source={{ uri: "https://in.images.search.yahoo.com/yhs/search;_ylt=AwrKAykWOfpoHAIA29bnHgx.;_ylu=Y29sbwNzZzMEcG9zAzEEdnRpZAMEc2VjA3BpdnM-?hspart=fc&hsimp=yhs-2461&type=fc_A7B54195D6A_s58_g_e_d040524_n9998_c999&param1=7&param2=eJwtT0tuwyAUvArLRML2Ax7EwCqpkwNUXRWxcDBxkH9R7MpVT185rWYzmo8006bGWf9eMQDUJTjqR2e91rp01G8WIEiOjvrwpzvq08NZzxG0QbhxI4BJ0yBXpgkSjboGZURTM8N0CI76Nk7O%2BjQ66r9qZ%2F0w%2FaS%2BrwuZA9mtaWymdSbjQhjkYMmaRoWWfCvck%2Frx6OMar11aCikOuVBk192XoaekT10kbQzdtCfh%2FpyGWDBkOWwgc32rn%2Bm%2Fsg2eXy%2B3AXN8vrgWB40VQiZKVWaMXSA7VmfI3i7nsz5gdTnCacuHLcyBywxkxvEDlBFguMwB8fMXVUdacw%3D%3D&p=user+image&fr=yhs-fc-2461&guccounter=1&guce_referrer=aHR0cHM6Ly9pbi5zZWFyY2gueWFob28uY29tL3locy9zZWFyY2g_cD11c2VyK2ltYWdlJmhzcGFydD1mYyZoc2ltcD15aHMtMjQ2MSZ0eXBlPWZjX0E3QjU0MTk1RDZBX3M1OF9nX2VfZDA0MDUyNF9uOTk5OF9jOTk5JnBhcmFtMT03JnBhcmFtMj1lSnd0VDB0dXd5QVV2QXJMUk1MMkF4N0V3Q3Fwa3dOVVhSV3hjREJ4a0g5UjdNcFZUMTg1cldZem1vODAwNmJHV2Y5ZU1RRFVKVGpxUjJlOTFycDAxRzhXSUVpT2p2cndwenZxMDhOWnp4RzBRYmh4STRCSjB5QlhwZ2tTamJvR1pVUlRNOE4wQ0k3Nk5rN08lMkJqUTY2cjlxWiUyRjB3JTJGYVMlMkJyd3VaQTltdGFXeW1kU2JqUWhqa1lNbWFSb1dXZkN2Y2slMkZyeDZPTWFyMTFhQ2lrT3VWQmsxOTJYb2Fla1QxMGtiUXpkdENmaCUyRnB5R1dEQmtPV3dnYzMycm4lMkJtJTJGc2cyZVh5JTJCM0FYTjh2cmdXQjQwVlFpWktWV2FNWFNBN1ZtZkkzaTduc3o1Z2RUbkNhY3VITGN5Qnl3eGt4dkVEbEJGZ3VNd0I4Zk1YVlVkYWN3JTNEJTNE&guce_referrer_sig=AQAAAAPULRGexVcne64VqcuSpTQ42Syvc5l5JQtssxeui5kIx98g296A-xm7aLrdCs0arfmhQ_IaViE_NA_IBoZmAlysXOIcYjfPDFh6amHnkuABXb-N5Le7UDqlW3CJzIrEYIqaTxdc6TJGQlXy35aZGrFD86ftPlMxljmauhUneb0D#id=5&iurl=https%3A%2F%2Fpng.pngtree.com%2Fpng-clipart%2F20190516%2Foriginal%2Fpngtree-users-vector-icon-png-image_3725294.jpg&action=click" }}
          style={styles.profileImage}
        />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
        <Text style={styles.address}>{user.address}, {user.area}</Text>
      </View>

      {/* Contact Info */}
      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Contact Info</Text>
        <View style={styles.infoRow}>
          <Ionicons name="call-outline" size={20} color="#25D366" />
          <Text style={styles.infoText}>{user.phone}</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="mail-outline" size={20} color="#25D366" />
          <Text style={styles.infoText}>{user.email}</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="location-outline" size={20} color="#25D366" />
          <Text style={styles.infoText}>{user.address}, {user.area}</Text>
        </View>
      </View>

      {/* Payment History */}
      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Payment History</Text>
        {payments.map((pay) => (
          <View key={pay.id} style={styles.paymentRow}>
            <Text style={styles.paymentText}>{pay.date}</Text>
            <Text style={styles.paymentText}>{pay.amount}</Text>
            <Text
              style={[
                styles.paymentStatus,
                { color: pay.status === "Paid" ? "#16a34a" : "#ef4444" },
              ]}
            >
              {pay.status}
            </Text>
          </View>
        ))}
      </View>

      {/* Account Settings */}
      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Account Settings</Text>
        {settings.map((item) => (
          <TouchableOpacity key={item.id} style={styles.settingRow}>
            <Ionicons name={item.icon} size={20} color="#25D366" />
            <Text style={styles.infoText}>{item.title}</Text>
            {item.value && <Text style={styles.settingValue}>{item.value}</Text>}
            <Ionicons name="chevron-forward" size={18} color="#4B5563" />
          </TouchableOpacity>
        ))}
      </View>

      {/* Logout */}
      <TouchableOpacity style={styles.logoutBtn}>
        <Ionicons name="log-out-outline" size={20} color="#fff" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAF9", paddingTop: 50, paddingHorizontal: 20 },
  header: { fontSize: 28, fontWeight: "bold", color: "#166534", textAlign: "center", marginBottom: 20 },

  profileCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 15,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 20,
  },
  profileImage: { width: 100, height: 100, borderRadius: 50, marginBottom: 10 },
  name: { fontSize: 20, fontWeight: "700", color: "#333" },
  email: { fontSize: 14, color: "#777", marginBottom: 4 },
  address: { fontSize: 14, color: "#555", textAlign: "center" },

  infoSection: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: { fontSize: 16, fontWeight: "700", color: "#16a34a", marginBottom: 10 },

  infoRow: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  infoText: { fontSize: 15, color: "#333", marginLeft: 10, flexShrink: 1 },

  paymentRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 8 },
  paymentText: { fontSize: 14, color: "#333" },
  paymentStatus: { fontSize: 14, fontWeight: "600" },

  settingRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 10 },
  settingValue: { fontSize: 14, color: "#555", marginRight: 8 },

  logoutBtn: {
    backgroundColor: "#16a34a",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 12,
  },
  logoutText: { color: "#fff", fontSize: 16, fontWeight: "600", marginLeft: 6 },
});
