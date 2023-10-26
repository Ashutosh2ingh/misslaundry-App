import React, { useState } from "react";
import { View, Text, StatusBar, StyleSheet, TextInput, Platform, TouchableOpacity, Dimensions, Alert } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OtpScreen = ({ navigation, route }) => {

    const [otp, setOtp] = useState('');
    const phoneNumber = route.params.phone_number;

    const handleContinue = async () => {
        try {
            const apiUrl = `https://laundry-api.techpath.pro/otp-verification?phone_number=${encodeURIComponent(phoneNumber)}&otp=${encodeURIComponent(otp)}`;

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();

            if (response.ok) {
                if (data.message === "user verified") {
                    await AsyncStorage.setItem("otp_code", otp);
                    await AsyncStorage.setItem("registration_id", data.registration_id);
                    Alert.alert('OTP Verified', 'Verification Successful!', [
                        {
                            text: 'OK',
                            onPress: () => {
                                navigation.navigate('Drawer');
                            },
                        },
                    ]);
                }

                else if (data.message === "OTP verification failed") {
                    Alert.alert('Invalid OTP', 'Please enter a valid OTP and try again.');
                }
            }

            else {
                console.error('Error calling API:', data.message);
            }
        }

        catch (error) {
            console.error('Error calling API:', error);
        }
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
                <Text style={styles.text_footer}>OTP</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="key"
                        color="#05375a"
                        size={22}
                    />
                    <TextInput
                        placeholder="Enter OTP"
                        style={styles.textInput}
                        autoCapitalize="none"
                        value={otp}
                        onChangeText={(text) => setOtp(text)}
                    />
                </View>
                <View style={styles.button}>
                    <TouchableOpacity onPress={handleContinue}
                        style={[styles.continue,
                        {
                            borderColor: '#009387',
                            borderWidth: 1,
                            marginTop: 15
                        }]}
                    >
                        <LinearGradient colors={['#9dd49d', '#01ab9d']} style={styles.continue}>
                            <Text style={[styles.textContinue, { color: '#fff' }]}>Verify</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </View>
    );
};

export default OtpScreen;

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
        backgroundColor: '#fff',
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
        color: '#05375a',
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