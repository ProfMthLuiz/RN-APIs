import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";

import Conversor from "./src/components/currencyConverter";
import api from "./src/services/api";
const BASE_URL = "http://api.exchangeratesapi.io/v1/";

export default function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

  let toAmount, fromAmount;
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get(
          "latest?access_key=32031feb677de9ca4efa3f2f2ea4f2dd"
        );

        const firstCurrency = Object.keys(response.data.rates)[0];

        setCurrencyOptions(Object.keys(response.data.rates));
        setFromCurrency(response.data.base);
        setToCurrency(firstCurrency);
        setExchangeRate(response.data.rates[firstCurrency]);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    }

    fetchData();
  }, []); // O array vazio assegura que o efeito é executado apenas uma vez (equivalente ao componentDidMount)

  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      const requestUrl = `${BASE_URL}latest?access_key=32031feb677de9ca4efa3f2f2ea4f2dd&base=${fromCurrency}&symbols=${toCurrency}`;
      fetch(requestUrl)
        .then((res) => res.json())
        .then((data) => {
          if (data.rates && data.rates[toCurrency] !== undefined) {
            setExchangeRate(data.rates[toCurrency]);
          } else {
            console.error(`Exchange rate for ${toCurrency} not available.`);
          }
        })
        .catch((error) => {
          console.error("Error fetching exchange rate:", error);
        });
    }
  }, [fromCurrency, toCurrency]);

  function handleFromAmountChange(value) {
    setAmount(value);
    setAmountInFromCurrency(true);
  }

  function handleToAmountChange(value) {
    setAmount(value);
    setAmountInFromCurrency(false);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Conversor</Text>
      {/* Component */}
      <Conversor
        currencyOptions={currencyOptions}
        selectedCurrency={fromCurrency}
        onChangeCurrency={(value) => setFromCurrency(value)}
        onChangeAmount={handleFromAmountChange}
        amount={fromAmount}
      />

      <Text>=</Text>

      {/* Component */}
      <Conversor
        currencyOptions={currencyOptions}
        selectedCurrency={toCurrency}
        onChangeCurrency={(value) => setToCurrency(value)}
        onChangeAmount={handleToAmountChange}
        amount={toAmount}
      />
      <Text style={styles.textConverter}></Text>
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  areaButton: {
    marginTop: 15,
    backgroundColor: "#07E533",
    justifyContent: "center",
    alignItems: "center",
    width: 150,
    height: 45,
    borderRadius: 10,
    padding: 10,
    elevation: 5, // Sombreamento para Android
    shadowColor: "#000", // Sombreamento para iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
  },
  textButton: {
    color: "#fff",
    fontSize: 15,
    fontStyle: "italic",
  },
  textConverter: {
    marginTop: 15,
    fontSize: 25,
    fontWeight: "bold",
  },
});
