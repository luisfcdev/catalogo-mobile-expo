import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";

export default function ProductCard({ product }: any) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/produto/${product.id}`)}
    >
      <Image source={{ uri: product.thumbnail }} style={styles.image} />

      <Text style={styles.title}>{product.title}</Text>
      <Text numberOfLines={2} style={styles.description}>
        {product.description}
      </Text>

      <Text style={styles.discountPrice}>R$ {product.price}</Text>
      <Text style={styles.originalPrice}>
        R$ {(product.price * 1.2).toFixed(2)}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFF",
    margin: 10,
    borderRadius: 12,
    padding: 12,
    elevation: 4,
  },
  image: {
    height: 140,
    borderRadius: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 8,
  },
  description: {
    color: "#666",
    marginVertical: 6,
  },
  discountPrice: {
    fontSize: 18,
    color: "#2B65EC",
    fontWeight: "bold",
  },
  originalPrice: {
    textDecorationLine: "line-through",
    color: "#999",
  },
});