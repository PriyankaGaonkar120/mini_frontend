import React, { useRef } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Animated,
  StyleSheet,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function Index() {
  // Animation refs
  const loginScale = useRef(new Animated.Value(1)).current;
  const signupScale = useRef(new Animated.Value(1)).current;

  // Function for press in/out animations
  const animatePress = (scaleRef, toValue) => {
    Animated.spring(scaleRef, {
      toValue,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  return (
    <LinearGradient colors={["#ffffff", "#ffffff"]} style={styles.container}>
      <Text style={styles.title}>Welcome to Waste Management App</Text>
      <Text style={styles.subtitle}>Keep your city clean and green 🌿</Text>

      <View style={styles.buttonContainer}>
        {/* LOGIN BUTTON */}
        <TouchableWithoutFeedback
          onPressIn={() => animatePress(loginScale, 0.95)}
          onPressOut={() => animatePress(loginScale, 1)}
          onPress={() => router.push("/login")}
        >
          <Animated.View style={[styles.button, { transform: [{ scale: loginScale }] }]}>
            <Text style={styles.buttonText}>Login</Text>
            <Ionicons name="arrow-forward" size={20} color="black" style={styles.icon} />
          </Animated.View>
        </TouchableWithoutFeedback>

        {/* SIGNUP BUTTON */}
        <TouchableWithoutFeedback
          onPressIn={() => animatePress(signupScale, 0.95)}
          onPressOut={() => animatePress(signupScale, 1)}
          onPress={() => router.push("/signup")}
        >
          <Animated.View style={[styles.buttonOutline, { transform: [{ scale: signupScale }] }]}>
            <Text style={styles.buttonOutlineText}>Sign Up</Text>
            <Ionicons name="arrow-forward" size={20} color="black" style={styles.icon} />
          </Animated.View>
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
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#66BB6A",
    textAlign: "center",
    marginBottom: 40,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderColor: "#000",
    borderWidth: 2,
    paddingVertical: 15,
    width: "70%",
    borderRadius: 30,
    marginBottom: 20,
  },
  buttonText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 18,
    marginRight: 8,
  },
  buttonOutline: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#000",
    borderWidth: 2,
    paddingVertical: 15,
    width: "70%",
    borderRadius: 30,
    marginBottom: 20,
  },
  buttonOutlineText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 18,
    marginRight: 8,
  },
  icon: {
    marginLeft: 4,
  },
});
