import React, { useState } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { RadioButton } from 'react-native-paper';

const ServiceScreen = ({navigation}) => {

  const [selectedValue, setSelectedValue] = useState(null);

  const handleRadioButtonChange = (value) => {
    setSelectedValue(value);
  };

  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <Image
                source={require('../assets/logo.png')}
                style={styles.logo}
            />
            <Text style={styles.text_header}>Clean, fast, and free pickup</Text>
            <Text style={styles.title}>Just Explore it.</Text>
        </View>
      
        <ScrollView style={styles.footer}>
            <View style={styles.footer_btn}>
                <RadioButton.Item
                label="Dry Cleaning"
                labelStyle={styles.label}
                value="option1"
                status={selectedValue === 'option1' ? 'checked' : 'unchecked'}
                onPress={() => handleRadioButtonChange('option1')}
                />
            </View>
        
            <View style={styles.footer_btn}>
                <RadioButton.Item
                label="Steam Ironing"
                labelStyle={styles.label}
                value="option2"
                status={selectedValue === 'option2' ? 'checked' : 'unchecked'}
                onPress={() => handleRadioButtonChange('option2')}
                />
            </View>
            
            <View style={styles.footer_btn}>
                <RadioButton.Item
                label="Shoe Cleaning"
                labelStyle={styles.label}
                value="option3"
                status={selectedValue === 'option3' ? 'checked' : 'unchecked'}
                onPress={() => handleRadioButtonChange('option3')}
                />
            </View>
            
            <View style={styles.footer_btn}>
                <RadioButton.Item
                label="Spot & Stain Removal"
                labelStyle={styles.label}
                value="option4"
                status={selectedValue === 'option4' ? 'checked' : 'unchecked'}
                onPress={() => handleRadioButtonChange('option4')}
                />
            </View>

            <View style={styles.footer_btn}>
                <RadioButton.Item
                label="Spot & Stain Removal"
                labelStyle={styles.label}
                value="option5"
                status={selectedValue === 'option5' ? 'checked' : 'unchecked'}
                onPress={() => handleRadioButtonChange('option5')}
                />
            </View>

            <View style={styles.footer_btn}>
                <RadioButton.Item
                label="Spot & Stain Removal"
                labelStyle={styles.label}
                value="option6"
                status={selectedValue === 'option6' ? 'checked' : 'unchecked'}
                onPress={() => handleRadioButtonChange('option6')}
                />
            </View>

            <TouchableOpacity onPress={()=>navigation.navigate('Pick Up')}
                style={[styles.continue,
                {
                    borderColor:'#fff',
                    borderWidth:1,
                }]}
                >
                <Text style={[styles.textContinue,
                {color:'black'}]}>Continue</Text>
            </TouchableOpacity>

        </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor:'#009387'
    },
    header:{
        alignItems:'center',
        paddingHorizontal:30,
        marginTop:50
    },
    title: {
        color: '#05375a',
        fontSize: 30,
        fontWeight: 'bold'
    },
    text_header:{
        color:'#fff',
        fontWeight:'bold',
        fontSize:30,
        textAlign:'center'
    },
    footer:{
        marginTop:60
    },
    footer_btn:{
        width:350,
        height:70,
        justifyContent:'center',
        borderWidth:3,
        borderRadius:10,
        marginBottom:30,
        borderColor:'#fff'
    },
    label:{
        fontSize:20,
        fontWeight:'bold',
        color:'#fff'
    },
    continue:{
        marginBottom:20,
        height:60,
        width:"80%",
        alignItems:'center',
        justifyContent:'center',
        borderRadius:30,
        backgroundColor:'#fff',
        marginLeft:"10%"
    },
    textContinue:{
        fontSize:18,
        fontWeight:'bold'
    }
});

export default ServiceScreen;
