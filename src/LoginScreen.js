import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator
} from "react-native";

import {
  collection,
  query,
  where,
  getDocs
} from "firebase/firestore";

import { db } from "./firebaseConfig";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateEmail = (value) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const validate = () => {
    let valid = true;

    setEmailError("");
    setPasswordError("");
    setLoginError("");

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      valid = false;
    }

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
      valid = false;
    }

    return valid;
  };

  const handleLogin = async () => {
    if (!validate()) {
      return;
    }

    try {
      setLoading(true);

      const usersRef = collection(db, "users");

      const q = query(
        usersRef,
        where("email", "==", email.trim().toLowerCase()),
        where("password", "==", password)
      );

      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        setLoginError("Invalid credentials. Please signup first.");
        return;
      }

      navigation.replace("Home");
    } catch (error) {
      console.log(error);
      setLoginError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const isValid =
    validateEmail(email) && password.length >= 6;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>Login to your account</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          setEmailError("");
          setLoginError("");
        }}
      />

      {emailError ? (
        <Text style={styles.error}>{emailError}</Text>
      ) : null}

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setPasswordError("");
            setLoginError("");
          }}
        />

        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
        >
          <Text style={styles.showText}>
            {showPassword ? "Hide" : "Show"}
          </Text>
        </TouchableOpacity>
      </View>

      {passwordError ? (
        <Text style={styles.error}>{passwordError}</Text>
      ) : null}

      {loginError ? (
        <Text style={styles.error}>{loginError}</Text>
      ) : null}

      <TouchableOpacity
        style={[
          styles.button,
          !isValid && styles.disabledButton
        ]}
        disabled={!isValid || loading}
        onPress={handleLogin}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("Signup")}
      >
        <Text style={styles.link}>
          Don't have an account? Signup
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 25,
    backgroundColor: "#fff"
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 8
  },

  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 30
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 14,
    marginBottom: 5,
    fontSize: 16
  },

  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginTop: 15
  },

  passwordInput: {
    flex: 1,
    padding: 14,
    fontSize: 16
  },

  showText: {
    color: "#2563eb",
    fontWeight: "600",
    marginRight: 15
  },

  error: {
    color: "#dc2626",
    marginTop: 4,
    marginBottom: 5
  },

  button: {
    backgroundColor: "#2563eb",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20
  },

  disabledButton: {
    backgroundColor: "#9ca3af"
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold"
  },

  link: {
    textAlign: "center",
    color: "#2563eb",
    marginTop: 20,
    fontSize: 15
  }
});