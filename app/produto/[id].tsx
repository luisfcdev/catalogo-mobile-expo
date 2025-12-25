import {View, Text, Image, StyleSheet, Pressable, ScrollView, ActivityIndicator,} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import api from "../../src/services/api";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  thumbnail: string;
}

export default function ProdutoDetalhe() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/products/${id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch(() => {
        alert("Erro ao carregar produto");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading || !product) {
    return <ActivityIndicator size="large" style={{ marginTop: 40 }} />;
  }

  // 👉 cálculo do preço com desconto (SEM exibir %)
  const discountedPrice =
    product.price -
    product.price * (product.discountPercentage / 100);

  return (
    <ScrollView style={styles.container}>
      {/* BOTÃO VOLTAR */}
      <Pressable onPress={() => router.back()}>
        <Text style={styles.back}>← Voltar</Text>
      </Pressable>

      {/* IMAGEM */}
      <Image source={{ uri: product.thumbnail }} style={styles.image} />

      {/* TÍTULO */}
      <Text style={styles.title}>{product.title}</Text>

      {/* PREÇO COM DESCONTO (DESTAQUE) */}
      <Text style={styles.discountPrice}>
        R$ {discountedPrice.toFixed(2)}
      </Text>

      {/* PREÇO ORIGINAL RISCADO */}
      <Text style={styles.originalPrice}>
        R$ {product.price.toFixed(2)}
      </Text>

      {/* DESCRIÇÃO */}
      <Text style={styles.description}>{product.description}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 16,
  },

  back: {
    fontSize: 16,
    color: "#2B65EC",
    marginBottom: 10,
  },

  image: {
    width: "100%",
    height: 280,
    borderRadius: 14,
    marginBottom: 16,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 8,
  },

  discountPrice: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2B65EC",
    marginBottom: 4,
  },

  originalPrice: {
    fontSize: 16,
    color: "#999",
    textDecorationLine: "line-through",
    marginBottom: 14,
  },

  description: {
    fontSize: 15,
    color: "#444",
    lineHeight: 22,
  },
});