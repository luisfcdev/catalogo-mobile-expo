import {View, Text, FlatList, Image, StyleSheet, Pressable,} from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import api from "../../src/services/api";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  thumbnail: string;
  category: string;
}

const categories = [
  { key: "mens-shirts", title: "Camisas Masculinas" },
  { key: "mens-shoes", title: "Calçados Masculinos" },
  { key: "mens-watches", title: "Relógios Masculinos" },
];

export default function MasculinoScreen() {
  const [sections, setSections] = useState<
    { title: string; data: Product[] }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function loadProducts() {
      try {
        const requests = categories.map((cat) =>
          api.get(`/products/category/${cat.key}`)
        );

        const responses = await Promise.all(requests);

        const formatted = responses.map((response, index) => ({
          title: categories[index].title,
          data: response.data.products,
        }));

        setSections(formatted);
      } catch {
        alert("Erro ao carregar produtos");
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  if (loading) {
    return <Text style={styles.loading}>Carregando...</Text>;
  }

  return (
    <FlatList
      data={sections}
      keyExtractor={(item) => item.title}
      renderItem={({ item }) => (
        <View>
          <Text style={styles.sectionTitle}>{item.title}</Text>

          {item.data.map((product) => {
            const discountedPrice =
              product.price -
              product.price * (product.discountPercentage / 100);

            return (
              <Pressable
                key={product.id}
                onPress={() => router.push(`/produto/${product.id}`)}
              >
                <View style={styles.card}>
                  <Image
                    source={{ uri: product.thumbnail }}
                    style={styles.image}
                  />

                  <Text style={styles.title}>{product.title}</Text>

                  <Text style={styles.description} numberOfLines={2}>
                    {product.description}
                  </Text>

                  <Text style={styles.discountPrice}>
                    R$ {discountedPrice.toFixed(2)}
                  </Text>

                  <Text style={styles.originalPrice}>
                    R$ {product.price.toFixed(2)}
                  </Text>
                </View>
              </Pressable>
            );
          })}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  loading: {
    textAlign: "center",
    marginTop: 20,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 10,
    color: "#000",
  },

  card: {
    backgroundColor: "#FFF",
    marginHorizontal: 16,
    marginBottom: 14,
    borderRadius: 12,
    padding: 12,
    elevation: 4,
  },

  image: {
    width: "100%",
    height: 160,
    borderRadius: 10,
    marginBottom: 10,
  },

  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },

  description: {
    fontSize: 13,
    color: "#666",
    marginVertical: 6,
  },

  discountPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2B65EC",
  },

  originalPrice: {
    fontSize: 13,
    color: "#999",
    textDecorationLine: "line-through",
  },
});