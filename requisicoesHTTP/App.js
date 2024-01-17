import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList, Text } from "react-native";

import api from "./src/services/api";
import Movies from "./src/components/movies";

export default function App() {
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get("r-api/?api=filmes");
        setFilmes(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    }

    fetchData();
  }, []); // O array vazio assegura que o efeito é executado apenas uma vez (equivalente ao componentDidMount)

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.textLoading}>Carregando...</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <FlatList
          data={filmes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <Movies data={item} />}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  textLoading: {
    fontSize: 30,
  },
});
