import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  TextInput,
  Platform,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import React, { useState } from "react";
import axios from "axios";
import { ScrollView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [currentAddress, setCurrentAddress] = useState("");

  const saveData = () => {
    const customerData = {
      username,
      email,
      contact_number: contactNumber,
      otp_code:"",
      current_address: currentAddress,
    };

    axios
      .post("https://laundry-api.techpath.pro/registrations/", customerData)

      .then((response) => {
        Alert.alert(
          "Registration Successful",
          "You have successfully registered!",
          [
            {
              text: "OK",
              onPress: () => {
                navigation.navigate("OtpScreen", {
                  phone_number: contactNumber,
                });
              },
            },
          ]
        );
      })

      .catch((error) => {
        Alert.alert(
          "Registration Failed",
          "An error occurred while registering. Please try again."
        );
      });
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#9dd49d"
        barStyle="light-content"
      />
      <View style={styles.header}>
        <Text style={styles.text_header}>Register Now !</Text>
      </View>
      
      <Animatable.View
        animation="fadeInUpBig"
        style={styles.footer}>
        <ScrollView>
          <Text style={styles.text_footer}>Name</Text>
          <View style={styles.action}>
            <FontAwesome
              name="user-o"
              color="#080808"
              size={20}
            />
            <TextInput
              placeholder="Your Name"
              style={styles.textInput}
              autoCapitalize="none"
              value={username}
              onChangeText={(text) => setUsername(text)}
            />
          </View>
          <Text style={styles.text_footer}>Email</Text>
          <View style={styles.action}>
            <FontAwesome
              name="envelope"
              color="#080808"
              size={20}
            />
            <TextInput
              placeholder="Your Email"
              style={styles.textInput}
              autoCapitalize="none"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </View>
          <Text style={styles.text_footer}>Mobile Number</Text>
          <View style={styles.action}>
            <FontAwesome
              name="phone"
              color="#080808"
              size={22}
            />
            <TextInput
              placeholder="Enter Mobile number"
              style={styles.textInput}
              autoCapitalize="none"
              value={contactNumber}
              onChangeText={(text) => setContactNumber(text)}
              defaultValue="+91"
            />
          </View>
          <Text style={styles.text_footer}>Address</Text>
          <View style={styles.action}>
            <FontAwesome
              name="home"
              color="#080808"
              size={22}
            />
            <TextInput
              placeholder="Enter Current Address"
              style={styles.textInput}
              autoCapitalize="none"
              value={currentAddress}
              onChangeText={(text) => setCurrentAddress(text)}
            />
          </View>
          <View style={styles.button}>
            <LinearGradient colors={['#9dd49d', '#01ab9d']} style={styles.signIn}>
              <TouchableOpacity onPress={saveData}>
                <Text style={[styles.textSign, { color: "#fff" }]}>
                  Register
                </Text>
              </TouchableOpacity>
            </LinearGradient>
            <TouchableOpacity onPress={() => navigation.navigate('Mobile')}
              style={[styles.signIn,
              {
                borderColor: '#009387',
                
                borderWidth: 1,
                marginTop: 15
              }]}
            >
              <Text style={[styles.textSign,
              { color: '#009387' }]}>Login with OTP</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animatable.View>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9dd49d'
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 5,
    backgroundColor: '#f5f0ed',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center'
  },
  text_footer: {
    color: '#080808',
    fontSize: 18,
    marginTop: 10
  },
  action: {
    flexDirection: 'row',
    marginTop: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5

  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'android' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a'
  },
  button: {
    alignItems: 'center',
    marginTop: 70
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold'
  }
});
