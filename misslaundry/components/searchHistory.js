import React, { useEffect, useState, useCallback } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

const History = () => {
  const [data, setData] = useState(null);
  const [registration_id, setRegistrationId] = useState("");


  const refreshContent = () => {
    console.log("Screen is focused, refreshing content...");
  };

  useFocusEffect(
    useCallback(() => {
      refreshContent();
    }, [])
  );

  useEffect(() => {
    AsyncStorage.getItem("registration_id")
      .then((value) => {
        if (value) {
          setRegistrationId(value);
        }
      })
      .catch((error) => {
        console.error("Error retrieving registration_id:", error);
      });
  }, []);

  const apiUrl = `https://laundry-api.techpath.pro/servicehistory/${registration_id}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl, {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        // console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [apiUrl]);

  return (
    <ScrollView style={styles.container}>
      {data && data.length > 0 ? (
        data.map((item, index) => (
          <View style={styles.card} key={index}>
            <View style={styles.cardDetails}>
              <Text style={styles.cardName}>Name: {item.service_name}</Text>
              <Text style={styles.cardStatus}>Status: {item.completion_status}</Text>
              <Text style={styles.cardDescription}>Date: {item.date}</Text>
            </View>
          </View>
        ))
      ) : (
        <Text>No service history available.</Text>
      )}
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#9dd49d",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: 20,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
    resizeMode: "contain",
  },
  appName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  cardContainer: {
    flex: 1,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    margin: 20,
    padding: 10,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 15,
  },
  cardImage: {
    width: 80,
    height: 80,
    marginRight: 10,
    resizeMode: "cover",
  },
  cardDetails: {
    flex: 1,
    flexDirection: "column",
  },
  cardName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cardStatus: {
    fontSize: 16,
    fontWeight: "bold",
    color: "red",
    alignSelf: "flex-end",
  },
  cardDescription: {
    fontSize: 14,
  },
});

export default History;
