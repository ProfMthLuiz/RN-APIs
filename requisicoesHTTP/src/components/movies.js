import React, { Component } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

export default function Movies(props) {
  // const { nome, foto } = props.data;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.titulo}>{props.data.nome}</Text>
        <Image
          style={styles.capa}
          source={{ uri: props.data.foto }}
          resizeMode="cover"
        />
      </View>
      <View style={styles.areaButton}>
        <TouchableOpacity
          style={styles.moreButton}
          onPress={() => alert(props.data.nome)}
        >
          <Text style={styles.textButton}>Leia mais</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    shadowColor: "#000",
    color: "#FFF",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    borderRadius: 5,
    margin: 15,
  },
  titulo: {
    fontSize: 18,
    padding: 10,
  },
  capa: {
    height: 350,
    width: 400,
    zIndex: 1,
  },
  areaButton: {
    zIndex: 2,
    alignSelf: "flex-end",
    margin: 15,
    marginTop: -15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    borderRadius: 5,
  },
  moreButton: {
    width: 120,
    backgroundColor: "#000",
    padding: 10,
  },
  textButton: {
    textAlign: "center",
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
