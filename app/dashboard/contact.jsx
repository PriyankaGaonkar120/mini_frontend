import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
  Animated,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

export default function Contact() {
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
      title: "Report Missed Collection",
      icon: "alert-circle-outline",
      color: "#EF4444",
      action: () => alert("Report submitted!"),
    },
    {
      id: 2,
      title: "Request Extra Pickup",
      icon: "add-circle-outline",
      color: "#10B981",
      action: () => alert("Request submitted!"),
    },
    {
      id: 3,
      title: "Check Payment Status",
      icon: "wallet-outline",
      color: "#3B82F6",
      action: () => alert("Payment status displayed!"),
    },
  ];

  const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

  const animatePress = (scale) => {
    return {
      transform: [
        {
          scale: scale,
        },
      ],
    };
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Support & Contact</Text>

      {/* Quick Actions */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.quickActionsScroll}
      >
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
          onPress={() => alert("Feedback sent!")}
        >
          <View style={[styles.iconContainer, { backgroundColor: "#DCFCE7" }]}>
            <MaterialIcons name="feedback" size={26} color="#22C55E" />
          </View>
          <View style={styles.textContainer}>
            <Text style={[styles.title, { color: "#22C55E" }]}>Send Feedback</Text>
            <Text style={styles.message}>
              Have suggestions or issues? Let us know at feedback@yourapp.com.
            </Text>
          </View>
        </AnimatedTouchable>
      </ScrollView>

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
  quickActionsScroll: {
    paddingHorizontal: 15,
    marginBottom: 20,
  },
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
  quickActionText: {
    fontSize: 12,
    fontWeight: "600",
    marginTop: 6,
    textAlign: "center",
  },
  scrollContainer: {
    paddingHorizontal: 15,
    paddingBottom: 80,
  },
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
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
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
});
