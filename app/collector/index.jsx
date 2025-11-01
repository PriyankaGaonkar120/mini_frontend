import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useRouter } from "expo-router";

export default function CollectorDashboard() {
  const router = useRouter();
  const BASE_URI = "http://localhost:5000";
  const [collector, setCollector] = useState(null);
  const [assignedHomes, setAssignedHomes] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [collectedCount, setCollectedCount] = useState(0);

  // ✅ Get Collector Info from AsyncStorage
  useEffect(() => {
    const getCollector = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          setCollector(userData);
        } else {
          Alert.alert("Error", "No collector found. Please login again.");
          router.replace("/login");
        }
      } catch (err) {
        Alert.alert("Error", "Failed to fetch collector data.");
      }
    };
    getCollector();
  }, []);

  // ✅ Fetch Assigned Homes and Notifications
  useEffect(() => {
    if (!collector?.phone) return;

    const fetchData = async () => {
      try {
        const homesRes = await axios.get(
          `${BASE_URI}/api/collector/homes/${collector.phone}`
        );
        const notifRes = await axios.get(
          `${BASE_URI}/api/notifications/${collector.phone}`
        );

        setAssignedHomes(homesRes.data || []);
        setNotifications(notifRes.data || []);
        const collected = homesRes.data.filter((h) => h.status === "Collected").length;
        setCollectedCount(collected);
      } catch (err) {
        console.error(err.message);
        Alert.alert("Error", "Failed to load data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [collector]);

  // ✅ Mark Home as Collected
  const handleMarkCollected = async (homeId) => {
    try {
      await axios.put(`${BASE_URI}/api/collector/collect/${homeId}`, {
        status: "Collected",
      });
      const updatedHomes = assignedHomes.map((h) =>
        h._id === homeId ? { ...h, status: "Collected" } : h
      );
      setAssignedHomes(updatedHomes);
      setCollectedCount(updatedHomes.filter((h) => h.status === "Collected").length);
      Alert.alert("Success", "Marked as collected ✅");
    } catch (err) {
      Alert.alert("Error", "Failed to update status.");
    }
  };

  const handleReload = async () => {
    setLoading(true);
    try {
      const homesRes = await axios.get(
        `${BASE_URI}/api/collector/homes/${collector.phone}`
      );
      setAssignedHomes(homesRes.data);
      const collected = homesRes.data.filter((h) => h.status === "Collected").length;
      setCollectedCount(collected);
    } catch (err) {
      Alert.alert("Error", "Failed to reload data.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#16a34a" />
        <Text style={{ color: "#166534", marginTop: 10 }}>
          Loading collector dashboard...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        {/* ✅ Header */}
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <Text style={styles.headerTitle}>
              Hello, {collector?.name || "Collector"} 👋
            </Text>
            <TouchableOpacity onPress={handleReload}>
              <Ionicons name="reload" size={26} color="#166534" />
            </TouchableOpacity>
          </View>
          <Text style={styles.headerSubtitle}>
            Manage your assigned homes & collection tasks
          </Text>
        </View>

        {/* ✅ Summary Card */}
        <View style={styles.summaryCard}>
          <View style={styles.cardHeader}>
            <Ionicons name="stats-chart-outline" size={26} color="#166534" />
            <Text style={styles.cardTitle}>Today's Summary</Text>
          </View>
          <Text style={styles.cardText}>
            Total Assigned Homes: {assignedHomes.length}
          </Text>
          <Text style={styles.cardText}>Collected: {collectedCount}</Text>
          <Text style={styles.cardText}>
            Pending: {assignedHomes.length - collectedCount}
          </Text>
        </View>

        {/* ✅ Assigned Homes */}
        <Text style={styles.sectionTitle}>Assigned Homes</Text>
        {assignedHomes.length > 0 ? (
          assignedHomes.map((home, i) => (
            <View key={i} style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{home.name}</Text>
                <Ionicons
                  name={
                    home.status === "Collected"
                      ? "checkmark-circle-outline"
                      : "time-outline"
                  }
                  size={22}
                  color={home.status === "Collected" ? "#16a34a" : "#dc2626"}
                />
              </View>
              <Text style={styles.cardText}>Address: {home.address}</Text>
              <Text style={styles.cardText}>Phone: {home.phone}</Text>
              <Text
                style={[
                  styles.cardText,
                  {
                    color:
                      home.status === "Collected" ? "#16a34a" : "#dc2626",
                    fontWeight: "700",
                  },
                ]}
              >
                Status: {home.status}
              </Text>

              {home.status !== "Collected" && (
                <TouchableOpacity
                  style={styles.cardButton}
                  onPress={() => handleMarkCollected(home._id)}
                >
                  <Ionicons name="checkmark-done-outline" size={20} color="#fff" />
                  <Text style={styles.cardButtonText}>Mark Collected</Text>
                </TouchableOpacity>
              )}
            </View>
          ))
        ) : (
          <Text style={styles.emptyText}>No homes assigned yet.</Text>
        )}
      </ScrollView>

      {/* Floating Notifications Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => alert("Notifications feature coming soon!")}
      >
        <Ionicons name="notifications-outline" size={26} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAF9", paddingTop: 50 },
  loaderContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: { marginBottom: 20, paddingHorizontal: 20 },
  headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  headerTitle: { fontSize: 28, fontWeight: "800", color: "#166534" },
  headerSubtitle: { fontSize: 14, color: "#4B5563", marginTop: 4 },
  summaryCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 18,
    marginHorizontal: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  cardHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  cardTitle: { fontSize: 16, fontWeight: "700", color: "#166534" },
  cardText: { fontSize: 14, color: "#4B5563", marginTop: 4 },
  cardButton: {
    flexDirection: "row",
    backgroundColor: "#16a34a",
    paddingVertical: 10,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  cardButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
    marginLeft: 6,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#166534",
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  emptyText: { textAlign: "center", color: "#9CA3AF", fontSize: 14 },
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
