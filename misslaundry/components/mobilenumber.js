import React, { useState } from "react";
import { View, Text, StatusBar, StyleSheet, TextInput, Platform, TouchableOpacity, Dimensions, Alert } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Mobile = ({ navigation }) => {

  const [phoneNumber, setPhoneNumber] = useState('');

  const setotpPhoneNumber = (text) => {
    if (!text.startsWith("+91")) {
      setPhoneNumber("+91" + text);
    } else {
      setPhoneNumber(text);
    }
  };

  const handleGenerateOTP = () => {
    const apiUrl = `https://laundry-api.techpath.pro/generate_otp?phone_number=${encodeURIComponent(phoneNumber)}`;

    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        else {
          throw new Error('Network response was not ok');
        }

      })
      .then((data) => {
        if (data) {
          console.log(data);
        }

        else {
          console.warn('Data is undefined');
        }

        Alert.alert('OTP Sent', 'OTP has been sent successfully!', [
          {
            text: 'OK',
            onPress: () => {
              navigation.navigate('OtpScreen', { phone_number: phoneNumber });
            },
          },
        ]);
      })

      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#9dd49d"
        barStyle="light-content"
      />
      <View style={styles.header}>
        <Text style={styles.text_header}>MissLaundry</Text>
      </View>
      <Animatable.View
        animation="fadeInUpBig"
        style={styles.footer}>
        <View style={styles.footer_img}>
          <Animatable.Image
            animation="bounceIn"
            source={require('../assets/logo.png')}
            style={styles.logo}
            resizeMode="stretch"
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
            value={phoneNumber}
            onChangeText={(text) => setotpPhoneNumber(text)}
          />
        </View>
        <View style={styles.button}>
          <TouchableOpacity
            style={[styles.continue,
            {
              borderColor: '#009387',
              borderWidth: 1,
              marginTop: 15
            }]}
            onPress={handleGenerateOTP}
          ><LinearGradient colors={['#9dd49d', '#01ab9d']} style={styles.continue}>
              <Text style={[styles.textContinue, { color: '#fff' }]}>Send OTP</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default Mobile;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.15;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9dd49d'
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50
  },
  footer_img: {
    alignItems: 'center'
  },
  logo: {
    width: height_logo,
    height: height_logo,
  },
  footer: {
    flex: 6,
    backgroundColor: '#f5f0ed',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
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
    marginTop: 70,
    fontWeight: 'bold'
  },
  action: {
    flexDirection: 'row',
    marginTop: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'android' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a'
  },
  button: {
    alignItems: 'center',
    marginTop: 50
  },
  continue: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  textContinue: {
    fontSize: 22,
    fontWeight: 'bold'
  }
});