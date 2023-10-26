import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  TextInput,
  Platform,
  TouchableOpacity,
  Pressable,
  Modal,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { ScrollView } from "react-native-gesture-handler";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PickUpScreen = ({ navigation, route }) => {
  const [name, setName] = useState("");
  const [registration_id, setRegistrationId] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const { cardTitle } = route.params;
  const [selectDate, setSelectDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [mobileNumberError, setMobileNumberError] = useState("");

  const setPhoneNumber = (text) => {
    if (!text.startsWith("+91")) {
      setMobileNumber("+91" + text);
    } else {
      setMobileNumber(text);
    }

    if (text.length !== 13) {
      setMobileNumberError("Must be 10 characters.");
    } else {
      setMobileNumberError("");
    }
  };

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

  const toggleDatepicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  const toggleTimePicker = () => {
    setShowTimePicker(!showTimePicker);
  };

  const onDateChange = (event, selectedDate) => {
    if (event.type === "set") {
      const currentDate = selectedDate || selectDate;
      setSelectDate(currentDate);
      setDate(currentDate.toDateString());
      toggleDatepicker();
    } else {
      toggleDatepicker();
    }
  };

  const OnTimeChange = (event, selectedTime) => {
    if (event.type === "set") {
      const currentTime = new Date();
      const selectedDateTime = new Date(selectedTime);
      const currentDateTime = new Date();
      currentDateTime.setHours(currentDateTime.getHours() + 1);
      const formattedTime = selectedDateTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      setTime(formattedTime);
      toggleTimePicker();
    } else {
      toggleTimePicker();
    }
  };

  const handleFormSubmit = () => {
    const pickUpData = {
      name,
      date,
      time,
      contact_number: mobileNumber,
      delivery_address: deliveryAddress,
      registration_id,
      service_type: cardTitle,
    };

    axios
      .post("https://laundry-api.techpath.pro/pickupforms/", pickUpData)

      .then((response) => {
        setModalVisible(true);
      })

      .catch((error) => {
        Alert.alert(
          "Pickup Failed",
          "An error occurred while registering Pickup. Please fill the details ."
        );
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text_header}>Pick up</Text>
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <ScrollView>
          <Text style={styles.text_footer}>Name</Text>
          <View style={styles.action}>
            <View style={styles.icon}>
              <FontAwesome name="user-o" color="#05375a" size={20} />
            </View>
            <TextInput
              placeholder="Your Name"
              style={styles.textInput}
              autoCapitalize="none"
              value={name}
              onChangeText={setName}
            />
          </View>
          <Text style={styles.text_footer}>Date</Text>
          <View style={styles.action}>
            <View style={styles.icon}>
              <FontAwesome name="calendar" color="#05375a" size={20} />
            </View>
            {showDatePicker && (
              <DateTimePicker
                mode="date"
                display="spinner"
                value={selectDate}
                onChange={onDateChange}
                minimumDate={new Date()}
              />
            )}
            {!showDatePicker && (
              <Pressable onPress={toggleDatepicker}>
                <TextInput
                  placeholder="Enter Date"
                  style={styles.textInput}
                  autoCapitalize="none"
                  value={date}
                  onChangeText={setDate}
                  editable={false}
                />
              </Pressable>
            )}
          </View>
          <Text style={styles.text_footer}>Time</Text>
          <View style={styles.action}>
            <View style={styles.icon}>
              <FontAwesome name="hourglass" color="#05375a" size={22} />
            </View>
            {showTimePicker && (
              <DateTimePicker
                mode="time"
                display="spinner"
                value={new Date()}
                onChange={OnTimeChange}
                minimumDate={new Date()}
              />
            )}
            {!showTimePicker && (
              <Pressable onPress={toggleTimePicker}>
                <TextInput
                  placeholder="Enter Time"
                  style={styles.textInput}
                  autoCapitalize="characters"
                  value={time}
                  onChangeText={setTime}
                  editable={false}
                />
              </Pressable>
            )}
          </View>
          <Text style={styles.text_footer}>Mobile Number</Text>
          <View style={styles.action}>
            <View style={styles.icon}>
              <FontAwesome name="mobile" color="#05375a" size={22} />
            </View>
            <TextInput
              placeholder="Enter Mobile Number"
              style={styles.textInput}
              autoCapitalize="none"
              value={mobileNumber}
              onChangeText={setPhoneNumber}
            />
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "red", padding: 0, textAlign: "center" }}>
                {mobileNumberError}
              </Text>
            </View>
          </View>
          <Text style={styles.text_footer}>Pickup Address</Text>
          <View style={styles.action}>
            <View style={styles.icon}>
              <FontAwesome name="home" color="#05375a" size={22} />
            </View>
            <TextInput
              placeholder="Enter Delivery Address"
              style={styles.textInput}
              autoCapitalize="none"
              value={deliveryAddress}
              onChangeText={setDeliveryAddress}
            />
          </View>
          <Text style={styles.text_footer}>Service Type</Text>
          <View style={styles.action}>
            <View style={styles.icon}>
              <FontAwesome name="truck" color="#05375a" size={22} />
            </View>
            <TextInput
              placeholder="Enter Service Type"
              style={styles.textInput}
              autoCapitalize="none"
              value={cardTitle}
              editable={false}
            />
          </View>
          <View style={styles.button}>
            <LinearGradient
              colors={["#9dd49d", "#01ab9d"]}
              style={styles.signIn}
            >
              <TouchableOpacity onPress={handleFormSubmit}>
                <Text style={[styles.textSign, { color: "#fff" }]}>
                  Continue
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </ScrollView>
      </Animatable.View>
      <Modal animationType="slide" transparent visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Your Pickup has been registered successfully. We will contact you
              shortly.
            </Text>
            <Pressable
              style={[styles.buttons, styles.buttonClose]}
              onPress={() => {
                navigation.reset({
                  index: 0,
                  routes: [{ name: "Drawer" }],
                });
              }}
            >
              <Text style={styles.textStyle}>OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default PickUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#9dd49d",
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 5,
    backgroundColor: "#f5f0ed",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center",
  },
  text_footer: {
    color: "#080808",
    fontSize: 18,
    marginTop: 10,
  },
  icon: {
    justifyContent: "center",
    marginLeft: 10,
  },
  action: {
    flexDirection: "row",
    marginTop: 15,
    borderWidth: 1,
    borderColor: "#c0c0c0",
    paddingBottom: 5,
    height: 50,
    borderRadius: 15,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "android" ? 0 : -12,
    paddingLeft: 10,
    fontSize: 15,
    color: "#05375a",
  },
  button: {
    alignItems: "center",
    marginTop: 50,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "#f5f0ed",
    borderRadius: 20,
    padding: 35,
  },
  buttons: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#9dd49d",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 22,
  },
});
