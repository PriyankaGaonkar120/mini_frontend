import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

export default function Contact() {
  const contactOptions = [
    {
      id: 1,
      title: "WhatsApp Support",
      message: "Chat with us instantly on WhatsApp.",
      icon: "logo-whatsapp",
      color: "#25D366",
      action: () => Linking.openURL("https://wa.me/919876543210"), // your number
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
        Linking.openURL("https://www.google.com/maps/search/?api=1&query=Srinivas+University+Mangalore"),
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Contact Us</Text>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {contactOptions.map((item) => (
          <TouchableOpacity key={item.id} style={styles.card} onPress={item.action}>
            <View style={[styles.iconContainer, { backgroundColor: `${item.color}15` }]}>
              <Ionicons name={item.icon} size={28} color={item.color} />
            </View>

            <View style={styles.textContainer}>
              <Text style={[styles.title, { color: item.color }]}>{item.title}</Text>
              <Text style={styles.message}>{item.message}</Text>
            </View>
          </TouchableOpacity>
        ))}

        {/* Feedback Card */}
        <View style={[styles.card, styles.feedbackCard]}>
          <View style={[styles.iconContainer, { backgroundColor: "#DCFCE7" }]}>
            <MaterialIcons name="feedback" size={26} color="#22C55E" />
          </View>
          <View style={styles.textContainer}>
            <Text style={[styles.title, { color: "#22C55E" }]}>Send Feedback</Text>
            <Text style={styles.message}>
              Have suggestions or issues? Let us know at feedback@yourapp.com.
            </Text>
          </View>
        </View>
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
});
