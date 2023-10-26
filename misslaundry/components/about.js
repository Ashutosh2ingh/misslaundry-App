import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import React from "react";

const Aboutscreen = () => {
  return (
    <ScrollView>
      <View style={styles.aboutContainer}>
        <View>
          <Image
            style={styles.imgStyle}
            source={require("../assets/logo.png")}
          />
        </View>
        <View>
          <Text style={styles.brandname}>MissLaundry</Text>
        </View>
        <View style={styles.aboutLayout}>
          <Text style={[styles.paraStyle, styles.aboutPara]}>
            An average human speeds between 12000 hours of their adult life in
            cleaning and managing their clothes. We have all grown up on a heavy
            dose of detergent commercials propagating the idea of ‘ whiter the
            better ‘. But none of these commercials talked about the hours of
            hardwork required to get that blinding whiteness. Do the words
            ‘enzyme soak’, hot water cleaning, ‘bluing’ ring a bell ? How we
            wash maintaining our white clothes was easy as watching these
            commercials. With Miss Laundry, it is Easier! At Miss Laundry, we
            bring the best-in-class Laundry Dry Cleaning Service at your
            doorstep!
          </Text>
        </View>
      </View>

      {/* <View style={styles.container}>
        <View style={styles.center}>
          <Image
            source={require("../assets/logo.png")}
            style={styles.ceoImage}
          />
          <View style={styles.ceoInfo}>
            <Text style={styles.ceoName}>xxx xxxxx xxxxx</Text>
            <Text style={styles.ceoDescription}> our white clothes was easy as watching these
            commercials. With Miss Laundry, it is Easier! At Miss Laundry, we
            bring the best-in-class Laundry</Text>
          </View>
        </View>
      </View> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  aboutContainer: {
    display: "flex",
    alignItems: "center",
  },

  imgStyle: {
    width: 150,
    height: 150,
  },

  brandname: {
    fontSize: 40,
  },

  mainHeader: {
    fontSize: 38,
    color: "#344055",
    textTransform: "uppercase",
    fontWeight: "500",
    marginTop: 50,
    marginBottom: 10,
  },

  paraStyle: {
    fontSize: 20,
    color: "#7d7d7d",
    paddingBottom: 10,
    paddingTop: 15,
    width: "auto",
    textAlign: 'justify'
  },

  aboutLayout: {
    backgroundColor: "#9dd49d",
    paddingHorizontal: 30,
    marginVertical: 30,
    borderRadius: 20,
    marginLeft: 20,
    marginRight: 20,
  },

  aboutPara: {
    color: "#fff",
  },

  mainContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },

  container: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  center: {
    flexDirection: "row",
  },

  ceoImage: {
    width: 100,
    height: 100,
    marginRight: 20,
  },
  ceoInfo: {
    flex: 1,
  },
  ceoName: {
    fontSize: 24,
    fontWeight: "bold",
  },
  ceoDescription: {
    fontSize: 16,
    textAlign: 'justify'
  },
});

export default Aboutscreen;
