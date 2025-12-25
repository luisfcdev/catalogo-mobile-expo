import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useAuth } from "../../src/contexts/AuthContext";

export default function Settings() {
  const { signOut } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configurações</Text>

      <TouchableOpacity style={styles.button} onPress={signOut}>
        <Text style={styles.buttonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F2F2F2",
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#E53935",
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 10,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});