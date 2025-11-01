import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

export default function ReportsScreen() {
  const BASE_URI = "http://localhost:5000";
  const [reports, setReports] = useState([]);
  const [collectors, setCollectors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const reportsRes = await axios.get(`${BASE_URI}/api/admin/reports`);
        const collectorsRes = await axios.get(`${BASE_URI}/api/admin/collectors`);
        setReports(reportsRes.data || []);
        setCollectors(collectorsRes.data || []);
      } catch (err) {
        Alert.alert("Error", "Failed to load reports or collectors.");
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  // ✅ Assign collector to report
  const handleAssignCollector = async (reportId, collectorId) => {
    try {
      await axios.put(`${BASE_URI}/api/admin/reports/${reportId}`, {
        assignedTo: collectorId,
        status: "Assigned",
      });
      setReports((prev) =>
        prev.map((r) =>
          r._id === reportId ? { ...r, assignedTo: collectorId, status: "Assigned" } : r
        )
      );
      Alert.alert("Assigned ✅", "Collector has been assigned successfully.");
    } catch (err) {
      Alert.alert("Error", "Failed to assign collector.");
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#16a34a" />
        <Text style={{ color: "#166534", marginTop: 10 }}>
          Loading reports...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Reports </Text>
          <Ionicons name="document-text-outline" size={26} color="#166534" />
        </View>

        {reports.length > 0 ? (
          reports.map((report, index) => (
            <View key={index} style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>
                  {report.type === "missed"
                    ? "🚫 Missed Pickup"
                    : report.type === "extra"
                    ? "♻️ Extra Pickup"
                    : "💬 Feedback"}
                </Text>
                <Ionicons
                  name={
                    report.status === "Resolved"
                      ? "checkmark-circle-outline"
                      : report.status === "Assigned"
                      ? "briefcase-outline"
                      : "time-outline"
                  }
                  size={22}
                  color={
                    report.status === "Resolved"
                      ? "#16a34a"
                      : report.status === "Assigned"
                      ? "#2563EB"
                      : "#DC2626"
                  }
                />
              </View>

              <Text style={styles.cardText}>
                From: {report.userName} ({report.phone})
              </Text>
              <Text style={styles.cardText}>Address: {report.address}</Text>
              <Text style={styles.cardText}>Message: {report.message}</Text>

              <Text
                style={[
                  styles.cardText,
                  {
                    color:
                      report.status === "Resolved"
                        ? "#16a34a"
                        : report.status === "Assigned"
                        ? "#2563EB"
                        : "#DC2626",
                    fontWeight: "700",
                  },
                ]}
              >
                Status: {report.status}
              </Text>

              {/* ✅ Assign Collector */}
              {report.status === "Pending" && (
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={{ marginTop: 10 }}
                >
                  {collectors.map((collector, i) => (
                    <TouchableOpacity
                      key={i}
                      style={styles.assignButton}
                      onPress={() =>
                        handleAssignCollector(report._id, collector._id)
                      }
                    >
                      <Ionicons
                        name="person-add-outline"
                        size={16}
                        color="#fff"
                      />
                      <Text style={styles.assignButtonText}>
                        {collector.name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              )}
            </View>
          ))
        ) : (
          <Text style={styles.emptyText}>No reports found.</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAF9", paddingTop: 50 },
  loaderContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  headerTitle: { fontSize: 26, fontWeight: "800", color: "#166534" },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 18,
    marginHorizontal: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  cardHeader: { flexDirection: "row", justifyContent: "space-between" },
  cardTitle: { fontSize: 16, fontWeight: "700", color: "#166534" },
  cardText: { fontSize: 14, color: "#4B5563", marginTop: 4 },
  assignButton: {
    flexDirection: "row",
    backgroundColor: "#16a34a",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16,
    alignItems: "center",
    marginRight: 8,
  },
  assignButtonText: { color: "#fff", fontWeight: "600", marginLeft: 5 },
  emptyText: { textAlign: "center", color: "#9CA3AF", fontSize: 14 },
});
