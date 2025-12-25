import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { useAuth } from "../src/contexts/AuthContext";

export default function Login() {
  const { signIn, loading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleLogin() {
    setError("");

    if (!email || !password) {
      setError("Preencha todos os campos");
      return;
    }

    signIn(email, password).catch(() => {
      setError("Username ou senha inválidos");
    });
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <StatusBar style="light" backgroundColor="#2B65EC" />

      {/* HEADER AZUL */}
      <View style={styles.header}>
        <Text style={styles.title}>Bem-vindo de volta!</Text>
        <Text style={styles.subtitle}>
          Insira seus dados para entrar na sua conta.
        </Text>
      </View>

      {/* CARD */}
      <View style={styles.card}>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={[
              styles.input,
              error && !email && styles.inputError,
            ]}
            placeholder="Digite seu username"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={[
              styles.input,
              error && !password && styles.inputError,
            ]}
            placeholder="Digite sua senha"
            placeholderTextColor="#999"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
          activeOpacity={0.8}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Entrando..." : "Entrar"}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
  },

  header: {
    backgroundColor: "#2B65EC",
    paddingTop: 90,
    paddingBottom: 100,
    paddingHorizontal: 24,
    alignItems: "center",
  },

  title: {
    color: "#FFF",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },

  subtitle: {
    color: "#E0E7FF",
    fontSize: 16,
    lineHeight: 22,
    textAlign: "center",
  },

  card: {
    backgroundColor: "#FFF",
    marginHorizontal: 20,
    marginTop: -60,
    borderRadius: 16,
    padding: 20,

    // sombra iOS
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },

    // sombra Android
    elevation: 6,
  },

  inputGroup: {
    marginBottom: 16,
  },

  label: {
    fontSize: 14,
    color: "#555",
    marginBottom: 6,
  },

  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 10,
    paddingHorizontal: 14,
    fontSize: 16,
    backgroundColor: "#FFF",
  },

  inputError: {
    borderColor: "#E53935",
  },

  button: {
    height: 50,
    backgroundColor: "#2B65EC",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },

  errorText: {
    color: "#E53935",
    fontSize: 14,
    marginBottom: 12,
    textAlign: "center",
  },
});