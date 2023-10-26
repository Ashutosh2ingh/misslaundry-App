import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import StarRating from 'react-native-star-rating';
import AsyncStorage from "@react-native-async-storage/async-storage";

const FeedbackScreen = ({ navigation }) => {

    const [rating, setRating] = useState(0);
    const [comments, setComments] = useState('');
    const [registration_id, setRegistrationId] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    const currentDateTime = new Date();
    const formattedDateTime = `${currentDateTime.toISOString().split('T')[0]} ${currentDateTime.toTimeString().split(' ')[0]}`;

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

    const submitFeedback = () => {
        const apiUrl = 'https://laundry-api.techpath.pro/feedbackform';

        const feedbackData = {
            rating,
            comments,
            registration_id,
            timestamp: formattedDateTime,
        };

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(feedbackData),
        })
            .then((response) => {
                if (response.ok) {
                    Alert.alert('Success', 'Feedback submitted successfully', [
                        {
                            text: 'OK',
                            onPress: () => {
                                setIsSubmitted(true);
                                navigation.navigate('HomeScreen');
                            },
                        },
                    ]);
                }
                else {
                    response.text().then((errorText) => {
                        console.error('Error submitting feedback. Server response:', errorText);
                    });
                }
            })
            .catch((error) => {
                console.error('Network error:', error);
            });
    };


    return (
        <View style={styles.container}>
            <TextInput
                style={styles.textbox}
                placeholder="Write your feedback here..."
                onChangeText={(text) => setComments(text)}
                multiline={true}
            />
            <View style={styles.starRatingContainer}>
                <StarRating
                    disabled={false}
                    maxStars={5}
                    rating={rating}
                    selectedStar={(rating) => setRating(rating)}
                    fullStarColor="#FFD700"
                    emptyStarColor='#f5f0ed'
                />
            </View>
            <TouchableOpacity onPress={submitFeedback}
                style={[styles.continue,
                {
                    borderColor: '#fff',
                    borderWidth: 1,
                }]}
                disabled={isSubmitted}
            >
                <Text style={[styles.textContinue,
                { color: 'black' }]}> {isSubmitted ? 'Submitted' : 'Submit'}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#9dd49d',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -150
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: 10,
        marginBottom: 20
    },
    logo: {
        width: 60,
        height: 40,
        marginRight: 10,
        resizeMode: 'contain',
    },
    appName: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    card: {
        alignSelf: 'center',
        flexDirection: 'row',
        marginBottom: 20,
        width: '90%',
        borderWidth: 1,
        padding: 10,
        borderColor: '#fff',
        backgroundColor: '#fff',
        borderRadius: 15,
        overflow: 'hidden',
    },
    imageContainer: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -80,
    },
    textbox: {
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#fff',
        borderRadius: 20,
        height: 200,
        width: '90%',
        padding: 20
    },
    starRatingContainer: {
        marginTop: 30,
        marginBottom: 20,
        width: '60%',
        alignSelf: 'center',
    },
    continue: {
        alignSelf: 'center',
        width: "80%",
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        backgroundColor: '#fff',
        height: 60,
    },
    textContinue: {
        fontSize: 18,
        fontWeight: 'bold',
    },


});


export default FeedbackScreen;
