import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function Conversor(props) {
  const {
    currencyOptions,
    selectedCurrency,
    onChangeCurrency,
    amount,
    onChangeAmount,
  } = props;

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedCurrency}
        onValueChange={(value) => onChangeCurrency(value)}
        style={styles.picker}
      >
        {currencyOptions.map((currency) => (
          <Picker.Item key={currency} label={currency} value={currency} />
        ))}
      </Picker>

      <TextInput
        style={styles.input}
        placeholder="Digite um valor"
        inputMode="numeric"
        value={amount.toString()}
        onChangeText={(text) => onChangeAmount(text)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: 215,
    height: 45,
    backgroundColor: "#F9F9F9",
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    textAlign: "center",
    marginLeft: 5,
  },
});
