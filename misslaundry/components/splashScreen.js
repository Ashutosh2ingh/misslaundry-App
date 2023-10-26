import React, { useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({ navigation }) => {

    useEffect(() => {
        const timer = setTimeout(() => {
            checkOTPAndNavigate();
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    const checkOTPAndNavigate = async () => {
        try {
            const otpCode = await AsyncStorage.getItem('otp_code');

            if (otpCode) {
                navigation.navigate('Drawer');
            } 
            else {
                navigation.navigate('RegisterScreen');
            }
        } 
        catch (error) {
            console.error('Error checking OTP:', error);
        }
    };

    return (
        <View style={styles.container} >
            <View style={styles.header}>
                <Animatable.Image
                    animation="bounceIn"
                    source={require('../assets/logo.png')}
                    style={styles.logo}
                    resizeMode="stretch"
                />
            </View>
            <Animatable.View style={styles.footer} animation="fadeInUpBig">
                <Text style={styles.title}>A better you start with clean clothes</Text>
                <Text style={styles.text}>Sign in with account</Text>
            </Animatable.View>
        </View>
    );
};

export default SplashScreen;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:  '#9dd49d'
       
    },
    header: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        flex: 1,
        backgroundColor: '#f5f0ed',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 30
    },
    logo: {
        width: height_logo,
        height: height_logo
    },
    title: {
        color: '#05375a',
        fontSize: 30,
        fontWeight: 'bold'
    },
    text: {
        color: 'grey',
        marginTop: 5
    },
    button: {
        alignItems: 'flex-end',
        marginTop: 30,
        color: '#01ab9d'
        
    },
    signIn: {
        width: 150,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        flexDirection: 'row'
    },
    textSign: {
        color: 'white',
        fontWeight: 'bold'
    }
});