import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Animated,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const buttonScale = useRef(new Animated.Value(1)).current;

  const animatePress = (toValue) => {
    Animated.spring(buttonScale, {
      toValue,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  const handleSignup = () => {
    if (!name.trim()) {
      Alert.alert("Missing Name", "Please enter your name");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address");
      return;
    }
    if (password.length < 8) {
      Alert.alert("Weak Password", "Password must be at least 8 characters");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.replace("/dashboard");
    }, 1500);
  };

  return (
    <LinearGradient colors={["#e8f5e9", "#ffffff"]} style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Sign Up</Text>
        <Text style={styles.subtitle}>Create your account to manage your waste collection</Text>

        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="#999"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#999"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableWithoutFeedback
          onPressIn={() => animatePress(0.95)}
          onPressOut={() => animatePress(1)}
          onPress={handleSignup}
        >
          <Animated.View style={[styles.button, { transform: [{ scale: buttonScale }] }]}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <>
                <Text style={styles.buttonText}>Sign Up</Text>
                <Ionicons name="arrow-forward" size={20} color="#fff" style={{ marginLeft: 5 }} />
              </>
            )}
          </Animated.View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={() => router.push("/login")}>
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>
              Already have an account? <Text style={styles.loginHighlight}>Login</Text>
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: width * 0.08,
    backgroundColor: "#e8f5e9",
  },
  card: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 25,
    padding: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2E7D32",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#388E3C",
    marginBottom: 25,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#f1f8e9",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 30,
    marginBottom: 15,
    color: "#000",
    borderWidth: 1,
    borderColor: "#81C784",
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2E7D32",
    paddingVertical: 15,
    borderRadius: 30,
    marginBottom: 15,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  loginContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  loginText: {
    color: "#555",
    fontSize: 14,
  },
  loginHighlight: {
    color: "#2E7D32",
    fontWeight: "bold",
  },
});
