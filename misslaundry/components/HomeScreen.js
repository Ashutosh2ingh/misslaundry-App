import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFocusEffect } from "@react-navigation/native";

const HomeScreen = () => {
  const refreshContent = () => {
    // console.log("HomeScreen is focused, refreshing content...");
  };

  useFocusEffect(
    useCallback(() => {
      refreshContent();
    }, [])
  );

  const cardData = [
    {
      title: "Dry Cleaning",
      imageSource: require("../assets/dry-cleanning.png"),
      price: "₹10",
      features: [
        "Our company has professional workers. They clean any type of clothes or materials safely. Many of them have a lot of experience in cleaning any clothes safely. You should be able to maintain the quality of your clothes when you use our professionals laundry service.",
      ],
    },

    {
      title: "Premium Laundry",
      imageSource: require("../assets/premium-laundry.png"),
      price: "₹15",
      features: [
        "Our company has professional workers. They clean any type of clothes or materials safely. Many of them have a lot of experience in cleaning any clothes safely. You should be able to maintain the quality of your clothes when you use our professionals laundry service",
      ],
    },

    {
      title: "Laundry",
      imageSource: require("../assets/laundry.png"),
      price: "₹15",
      features: [
        "Our company has professional workers. They clean any type of clothes or materials safely. Many of them have a lot of experience in cleaning any clothes safely. You should be able to maintain the quality of your clothes when you use our professionals laundry service",
      ],
    },

    {
      title: "Steam Ironing",
      imageSource: require("../assets/steam-iron.png"),
      price: "₹15",
      features: [
        "Our company has professional workers. They clean any type of clothes or materials safely. Many of them have a lot of experience in cleaning any clothes safely. You should be able to maintain the quality of your clothes when you use our professionals laundry service",
      ],
    },

    {
      title: "Shoe Cleaning",
      imageSource: require("../assets/shoes.png"),
      price: "₹15",
      features: [
        "Our company has professional workers. They clean any type of clothes or materials safely. Many of them have a lot of experience in cleaning any clothes safely. You should be able to maintain the quality of your clothes when you use our professionals laundry service",
      ],
    },

    {
      title: "Bag Cleaning",
      imageSource: require("../assets/bag.png"),
      price: "₹15",
      features: [
        "Our company has professional workers. They clean any type of clothes or materials safely. Many of them have a lot of experience in cleaning any clothes safely. You should be able to maintain the quality of your clothes when you use our professionals laundry service",
      ],
    },

    {
      title: "Spot & Stain Removal",
      imageSource: require("../assets/stain.png"),
      price: "₹15",
      features: [
        "Our company has professional workers. They clean any type of clothes or materials safely. Many of them have a lot of experience in cleaning any clothes safely. You should be able to maintain the quality of your clothes when you use our professionals laundry service",
      ],
    },

    {
      title: "Carpet Cleaning",
      imageSource: require("../assets/stain.png"),
      price: "₹15",
      features: [
        "Our company has professional workers. They clean any type of clothes or materials safely. Many of them have a lot of experience in cleaning any clothes safely. You should be able to maintain the quality of your clothes when you use our professionals laundry service",
      ],
    },
  ];

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCard, setSelectedCard] = useState(cardData[0]);
  const openModal = (card) => {
    setSelectedCard(card);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const onContinuePress = () => {
    navigation.navigate("PickUpScreen", { cardTitle: selectedCard.title });
  };

  const windowWidth = Dimensions.get("window").width;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.cardContainer}>
        {cardData.map((card, index) => (
          <View key={index} style={styles.card}>
            <TouchableOpacity
              style={styles.cardTouchable}
              onPress={() => openModal(card)}
            >
              <Image source={card.imageSource} style={styles.cardImage} />

              <Text style={styles.cardText}>{card.title}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* Modal */}

      <Modal visible={modalVisible} transparent animationType="slide">
        <TouchableOpacity
          style={styles.modalContainer}
          activeOpacity={1}
          onPress={closeModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                <Text style={styles.closeButtonText}>X</Text>
              </TouchableOpacity>

              <View style={styles.modalImageContainer}>
                <Image
                  source={selectedCard.imageSource}
                  style={styles.modalImage}
                />
              </View>

              <Text style={styles.title}>{selectedCard.title}</Text>

              <View style={{ flexDirection: "row-reverse" }}>
                <Text style={styles.price}>Price: {selectedCard.price}</Text>
              </View>

              <Text style={styles.boldText}>Features:</Text>

              <Text style={styles.points}>
                {"\n"}

                {selectedCard.features.map((feature, index) => (
                  <Text key={index}>
                    {feature}
                    {"\n"}
                  </Text>
                ))}
              </Text>

              <View style={styles.button}>
                <LinearGradient
                  colors={["#9dd49d", "#01ab9d"]}
                  style={styles.signIn}
                >
                  <TouchableOpacity onPress={onContinuePress}>
                    <Text style={[styles.textSign, { color: "#fff" }]}>
                      Continue
                    </Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
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
  logoContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#f5f0ed",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  logo: {
    width: 50,
    height: 60,
    marginRight: 10,
    resizeMode: "contain",
  },
  appName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
  searchBox: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#f5f0ed",
    margin: 20,
    borderRadius: 10,
  },

  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 15,
  },

  card: {
    width: "46%",
    marginVertical: 5,
    marginHorizontal: 4,
  },

  cardTouchable: {
    flexDirection: "column",
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#f5f0ed",
    borderRadius: 10,
  },

  cardImage: {
    width: "80%",
    height: 100,
    marginBottom: 10,
    resizeMode: "cover",
  },

  cardText: {
    fontSize: 16,
  },

  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },

  closeButtonText: {
    fontSize: 25,
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },

  modalContent: {
    backgroundColor: "#f5f0ed",
    padding: 20,
    borderRadius: 15,
    marginHorizontal: 15,
  },

  modalImageContainer: {
    alignItems: "center",
  },

  modalImage: {
    width: 200,
    height: 200,
    resizeMode: "cover",
  },

  title: {
    fontSize: 25,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 5,
  },

  price: {
    color: "red",
    fontSize: 20,
    marginBottom: 10,
  },

  points: {
    fontSize: 18,
    marginBottom: 20,
    fontStyle: "italic",
  },

  button: {
    alignItems: "center",
  },

  signIn: {
    width: "60%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },

  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },

  backButton: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
  },

  boldText: {
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default HomeScreen;
