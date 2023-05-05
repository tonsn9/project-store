import { useEffect, useState } from "react";
import {styles} from "./styles"
import {
  FlatList,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { httpClient } from "../../lib/axios";

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
}

interface NewProduct {
  product: Product;
}

function Item({ product }: NewProduct) {
  const navigation = useNavigation<{
    navigate: (screen: string, params: any) => void;
  }>();

  return (
    <View style={styles.container}>
      <View style={styles.header}></View>
      <TouchableOpacity
        onPress={() => navigation.navigate("ProductInfo", { id: product.id })}
      >
        <Text>
          {product.name} - {product.price}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isFetchingProducts, setIsFetchingProducts] = useState(true);

  async function getProducts() {
    try {
      const { data } = await httpClient.get("/products");
      setProducts(data);
    } catch (err) {
      console.log("error", err);
      setProducts([]);
    } finally {
      setIsFetchingProducts(false);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  if (isFetchingProducts) return <Text>Carregando produtos...</Text>;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <FlatList
          data={products}
          renderItem={({ item: product }) => <Item product={product} />}
          keyExtractor={(item) => String(item.id)}
        />
      </View>
    </SafeAreaView>
  );
}


