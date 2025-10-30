import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        } else {
          Alert.alert("Error", "No user found. Please login again.");
          router.replace("/login");
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
        Alert.alert("Error", "Something went wrong. Please login again.");
        router.replace("/login");
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, []);

  const pickImage = async () => {
  const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (!permissionResult.granted) {
    Alert.alert("Permission required", "You need to grant photo permissions.");
    return;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.7,
  });

  if (!result.canceled) {
    const selectedImage = result.assets[0].uri;
    const updatedUser = { ...user, avatar: selectedImage };
    setUser(updatedUser);
    await AsyncStorage.setItem("user", JSON.stringify(updatedUser));
  }
};


  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("user");
      router.replace("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      Alert.alert("Error", "Could not logout. Please try again.");
    }
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#16a34a" />
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.loader}>
        <Text>No user data available. Please login again.</Text>
      </View>
    );
  }

  const payments = user.payments || [
    { id: 1, date: "10 Oct 2025", amount: "₹300", status: "Paid" },
  ];

  const settings = [
    { id: 1, title: "Change Password", icon: "lock-closed-outline" },
    { id: 2, title: "Notification Settings", icon: "notifications-outline" },
    { id: 3, title: "Privacy Policy", icon: "document-text-outline" },
    { id: 4, title: "App Version", icon: "information-circle-outline", value: "1.0.0" },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 50 }}>
      <Text style={styles.header}>My Profile</Text>

      <View style={styles.profileCard}>
        <TouchableOpacity onPress={pickImage}>
          {user?.avatar ? (
            <Image
              source={{ uri: user.avatar }}
              style={styles.profileImage}
            />
          ) : (
            <View style={styles.blackCircle} />
          )}
          <Ionicons
            name="camera-outline"
            size={22}
            color="#16a34a"
            style={styles.cameraIcon}
          />
        </TouchableOpacity>

        <Text style={styles.name}>{user?.name || "N/A"}</Text>
        <Text style={styles.email}>{user?.email || "N/A"}</Text>
        <Text style={styles.address}>
          {user?.address || "N/A"}, {user?.area || ""}
        </Text>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Contact Info</Text>
        <View style={styles.infoRow}>
          <Ionicons name="call-outline" size={20} color="#25D366" />
          <Text style={styles.infoText}>{user?.phone || "N/A"}</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="mail-outline" size={20} color="#25D366" />
          <Text style={styles.infoText}>{user?.email || "N/A"}</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="location-outline" size={20} color="#25D366" />
          <Text style={styles.infoText}>
            {user?.address || "N/A"}, {user?.area || ""}
          </Text>
        </View>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Payment History</Text>
        {payments.length > 0 ? (
          payments.map((pay) => (
            <View key={pay.id} style={styles.paymentRow}>
              <Text style={styles.paymentText}>{pay.date || "N/A"}</Text>
              <Text style={styles.paymentText}>{pay.amount || "N/A"}</Text>
              <Text
                style={[
                  styles.paymentStatus,
                  { color: pay.status === "Paid" ? "#16a34a" : "#ef4444" },
                ]}
              >
                {pay.status || "Pending"}
              </Text>
            </View>
          ))
        ) : (
          <Text style={{ textAlign: "center", color: "#777" }}>No payment history</Text>
        )}
      </View>

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

      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={20} color="#fff" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAF9", paddingTop: 50, paddingHorizontal: 20 },
  header: { fontSize: 28, fontWeight: "bold", color: "#166534", textAlign: "center", marginBottom: 20 },
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },

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
    cameraIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 4,
    elevation: 2,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  blackCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "black",
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
