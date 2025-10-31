import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
  Animated,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage"; // ✅ added
import { router } from "expo-router";

export default function Contact() {
  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  
  
  const BASE_URI = 'http://10.209.250.161:5000';

  // ✅ Fetch phone number from AsyncStorage when screen opens
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
    } finally {
      setLoading(false);
    }
  };
  getUserPhone();
}, []);


  const contactOptions = [
    {
      id: 1,
      title: "WhatsApp Support",
      message: "Chat with us instantly on WhatsApp.",
      icon: "logo-whatsapp",
      color: "#25D366",
      action: () => Linking.openURL("https://wa.me/919876543210"),
    },
    {
      id: 2,
      title: "Email Support",
      message: "Send us an email at support@yourapp.com.",
      icon: "mail-outline",
      color: "#2563EB",
      action: () => Linking.openURL("mailto:support@yourapp.com"),
    },
    {
      id: 3,
      title: "Call Us",
      message: "Reach us directly at +91 98765 43210.",
      icon: "call-outline",
      color: "#EAB308",
      action: () => Linking.openURL("tel:+919876543210"),
    },
    {
      id: 4,
      title: "Office Address",
      message: "Srinivas University, Mangalore, Karnataka - 575001",
      icon: "location-outline",
      color: "#22C55E",
      action: () =>
        Linking.openURL(
          "https://www.google.com/maps/search/?api=1&query=Srinivas+University+Mangalore"
        ),
    },
  ];

const quickActions = [
    {
      id: 1,
      title: 'Help & FAQ',
      icon: 'help-circle-outline',
      color: '#15803d',
    },
    {
      id: 2,
      title: 'Chat Support',
      icon: 'chatbubbles-outline',
      color: '#15803d',
    },
    {
      id: 3,
      title: 'Report Missed Pickup',
      icon: 'alert-circle-outline',
      color: '#EF4444',
    },
    {
      id: 4,
      title: 'Request Extra Pickup',
      icon: 'add-circle-outline',
      color: '#10B981',
    },
  ];

  const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

  // ✅ Feedback submission with phone number
  const handleFeedbackSubmit = async () => {
    if (!phoneNumber.trim()) {
      return Alert.alert("Error", "Phone number not found in your account.");
    }
    if (!feedbackText.trim()) {
      return Alert.alert("Error", "Please enter your feedback.");
    }

    try {
      setLoading(true);
      await axios.post(`${BASE_URI}/api/feedback`, {
        phoneNumber,
        message: feedbackText,
      });
      Alert.alert("✅ Thank you!", "Your feedback has been submitted.");
      setFeedbackText("");
      setFeedbackVisible(false);
    } catch (err) {
      Alert.alert("Error", err.response?.data?.error || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Support & Contact</Text>

      {/* Contact Cards */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {contactOptions.map((item) => (
          <AnimatedTouchable
            key={item.id}
            style={[styles.card, { borderColor: `${item.color}50` }]}
            activeOpacity={0.8}
            onPress={item.action}
          >
            <View style={[styles.iconContainer, { backgroundColor: `${item.color}15` }]}>
              <Ionicons name={item.icon} size={28} color={item.color} />
            </View>
            <View style={styles.textContainer}>
              <Text style={[styles.title, { color: item.color }]}>{item.title}</Text>
              <Text style={styles.message}>{item.message}</Text>
            </View>
          </AnimatedTouchable>
        ))}

        {/* Feedback Card */}
        <AnimatedTouchable
          style={[styles.card, styles.feedbackCard]}
          activeOpacity={0.8}
          onPress={() => setFeedbackVisible(true)}
        >
          <View style={[styles.iconContainer, { backgroundColor: "#DCFCE7" }]}>
            <MaterialIcons name="feedback" size={26} color="#22C55E" />
          </View>
          <View style={styles.textContainer}>
            <Text style={[styles.title, { color: "#22C55E" }]}>Send Feedback</Text>
            <Text style={styles.message}>Have suggestions or issues? Let us know!</Text>
          </View>
        </AnimatedTouchable>

        {/* Quick Actions */}
        <View style={{ marginBottom: 20 }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingHorizontal: 15 }}>
            {quickActions.map((item) => (
              <AnimatedTouchable
                key={item.id}
                style={[styles.quickActionButton, { backgroundColor: `${item.color}20` }]}
                activeOpacity={0.7}
                onPress={item.action}
              >
                <Ionicons name={item.icon} size={28} color={item.color} />
                <Text style={[styles.quickActionText, { color: item.color }]}>{item.title}</Text>
              </AnimatedTouchable>
            ))}
          </ScrollView>
        </View>

      </ScrollView>

      {/* Feedback Popup Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={feedbackVisible}
        onRequestClose={() => setFeedbackVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Send Feedback</Text>

            <Text style={styles.modalLabel}>Phone Number</Text>
            <TextInput
              style={[styles.textInput, { backgroundColor: "#f0f0f0" }]}
              value={phoneNumber}
              editable={false} // ✅ Read-only
            />

            <Text style={styles.modalLabel}>Your Feedback</Text>
            <TextInput
              style={[styles.textInput, { height: 100 }]}
              placeholder="Type your feedback..."
              value={feedbackText}
              onChangeText={setFeedbackText}
              multiline
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: "#ccc" }]}
                onPress={() => setFeedbackVisible(false)}
              >
                <Text style={{ color: "#333" }}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: "#22C55E" }]}
                onPress={handleFeedbackSubmit}
                disabled={loading}
              >
                <Text style={{ color: "#fff" }}>
                  {loading ? "Sending..." : "Submit"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Floating WhatsApp Button */}
      <AnimatedTouchable
        style={styles.fab}
        activeOpacity={0.8}
        onPress={() => Linking.openURL("https://wa.me/919876543210")}
      >
        <Ionicons name="logo-whatsapp" size={28} color="#fff" />
      </AnimatedTouchable>
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
  quickActionsScroll: { paddingHorizontal: 15, marginBottom: 20 },
  quickActionButton: {
    width: 160,
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
  scrollContainer: { paddingHorizontal: 15, paddingBottom: 80 },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    marginBottom: 12,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  textContainer: { flex: 1 },
  title: { fontSize: 16, fontWeight: "600", marginBottom: 4 },
  message: { fontSize: 14, color: "#555" },
  feedbackCard: {
    backgroundColor: "#F0FDF4",
    borderColor: "#BBF7D0",
    borderWidth: 1,
  },
  fab: {
    position: "absolute",
    bottom: 25,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#25D366",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    width: "85%",
  },
  modalTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 10, color: "#2e7d32" },
  modalLabel: { fontSize: 14, fontWeight: "500", color: "#333", marginBottom: 5 },
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    textAlignVertical: "top",
    marginBottom: 15,
  },
  modalButtons: { flexDirection: "row", justifyContent: "space-between" },
  modalButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 8,
    marginHorizontal: 5,
  },
});
