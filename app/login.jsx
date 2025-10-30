import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Animated,
  StyleSheet,
  Dimensions,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");

export default function Login() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const loginScale = new Animated.Value(1);

  const BASE_URI= `http://localhost:5000`;

  const animatePress = (toValue) => {
    Animated.spring(loginScale, {
      toValue,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  const handleSubmit = async () => {
    try {
      if (!phone) {
        return Alert.alert("Error", "Please enter your phone number");
      }
      if (!password) {
        return Alert.alert("Error", "Please enter your password");
      }

      const res = await fetch(`${BASE_URI}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, password }),
      });

      const data = await res.json();

      if (res.ok) {
        console.log("Token:", data.token);
        console.log("User:", data.user);
        Alert.alert("Welcome", `Hello ${data.user.name}!`);
        // Save user in AsyncStorage
        await AsyncStorage.setItem("user", JSON.stringify(data.user));
        router.replace("/dashboard");
      } else {
        Alert.alert("Error", data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Something went wrong");
    }
  };

  return (
    <LinearGradient colors={["#e8f5e9", "#ffffff"]} style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Login</Text>
        <Text style={styles.subtitle}>
          Welcome back! Manage your waste collection
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          placeholderTextColor="#999"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
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
          onPress={handleSubmit}
        >
          <Animated.View
            style={[styles.button, { transform: [{ scale: loginScale }] }]}
          >
            <Text style={styles.buttonText}>Login</Text>
            <Ionicons
              name="arrow-forward"
              size={20}
              color="#fff"
              style={{ marginLeft: 5 }}
            />
          </Animated.View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={() => router.push("/signup")}>
          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>
              Don't have an account?{" "}
              <Text style={styles.signupHighlight}>Sign Up</Text>
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
  signupContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  signupText: {
    color: "#555",
    fontSize: 14,
  },
  signupHighlight: {
    color: "#2E7D32",
    fontWeight: "bold",
  },
});
