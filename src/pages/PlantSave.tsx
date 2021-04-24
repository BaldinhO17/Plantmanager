import React, { useEffect, useState } from "react";
import { useRoute, useNavigation } from "@react-navigation/core";
import {
    StyleSheet,
    View,
    Text,
    Alert,
    Image,
    Platform,
    TouchableOpacity,
    ScrollView,
} from "react-native";

import { getBottomSpace } from "react-native-iphone-x-helper";
import { SvgFromUri } from "react-native-svg";
import DateTimePicker, { Event } from "@react-native-community/datetimepicker";
import { format, isBefore } from "date-fns";

import { PlantProps, savePlant } from "../lib/storage";

import { Button } from "../components/Button";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

import waterdrop from '../assets/waterdrop.png'


interface Params {
    plant: PlantProps

}

export function PlantSave() {
    const navigator = useNavigation()
    const route = useRoute()
    const { plant } = route.params as Params

    const [selectedDateTime, setSelectedDateTime] = useState(new Date())
    const [showDateTimePicker, setShowDateTimePicker] = useState(false)

    useEffect(() => {
        setShowDateTimePicker(Platform.OS === 'ios')
    }, [])

    function handleChangeTime(event: Event, dateTime: Date | undefined) {
        if (Platform.OS === 'android') {
            setShowDateTimePicker(oldState => !oldState)
        }

        if (dateTime && isBefore(dateTime, new Date())) {
            setSelectedDateTime(new Date())
            return Alert.alert('Escolha uma hora no futuro. ⏰')
        }

        if (dateTime) {
            setSelectedDateTime(dateTime)
        }
    }
    function handleShowDateTimePickerAndroid() {
        setShowDateTimePicker(oldState => !oldState);
    }

    async function handleSavePlant() {
        try {
            await savePlant({
                ...plant,
                dateTimeNotification: selectedDateTime
            })
            navigator.navigate('Confirmation', {
                emoji: 'hug',
                title: 'Tudo certo',
                subtitle: 'Fique tranquilo que sempre vamos lembrar você de cuidar da sua plantinha com muito cuidado.',
                buttonTitle: 'Muito Obrigado :D',
                nextScreen: 'MyPlants'

            })
        } catch (error) {
            Alert.alert('Não foi possível salvar. 😢')
        }
    }



    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ flex: 1 }}
        >
            <View style={styles.container}>
                <View style={styles.plantInfo}>
                    <SvgFromUri
                        uri={plant.photo}
                        height={150}
                        width={150}
                    />
                    <Text style={styles.plantName}>
                        {plant.name}
                    </Text>
                    <Text style={styles.plantAbout}>
                        {plant.about}
                    </Text>
                </View>
                <View style={styles.controller}>
                    <View style={styles.tipContainer}>
                        <Image
                            source={waterdrop}
                            style={styles.tipImage}
                        />
                        <Text style={styles.tipText}>
                            {plant.water_tips}
                        </Text>
                    </View>
                    <Text style={styles.alertLabel}>
                        Escolha o melhor horario para ser lembrado:
                    </Text>
                    {
                        showDateTimePicker && (
                            <DateTimePicker
                                value={selectedDateTime}
                                mode="time"
                                display="spinner"
                                onChange={handleChangeTime}
                            />
                        )
                    }

                    {
                        Platform.OS === 'android' && (
                            <TouchableOpacity
                                style={styles.dateTimePickerAndroidButton}
                                onPress={handleShowDateTimePickerAndroid}
                            >
                                <Text style={styles.dateTimePickerAndroidText}>
                                    {`Mudar Horário ${format(selectedDateTime, 'HH:mm')}`}
                                </Text>
                            </TouchableOpacity>
                        )
                    }

                    <Button
                        title="Cadastrar planta"
                        onPress={handleSavePlant}
                    />
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: colors.shape
    },
    plantInfo: {
        flex: 1,
        paddingHorizontal: 30,
        paddingVertical: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.shape
    },
    controller: {
        backgroundColor: colors.white,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: getBottomSpace() || 20
    },
    plantName: {
        fontFamily: fonts.heading,
        fontSize: 24,
        color: colors.heading,
        marginTop: 15
    },
    plantAbout: {
        textAlign: 'center',
        fontFamily: fonts.text,
        color: colors.heading,
        fontSize: 17,
        marginTop: 10
    },
    tipContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.blue_light,
        padding: 20,
        borderRadius: 20,
        position: 'relative',
        bottom: 60
    },
    tipImage: {
        width: 56,
        height: 56
    },
    tipText: {
        flex: 1,
        marginLeft: 20,
        fontFamily: fonts.text,
        color: colors.blue,
        fontSize: 17,
        textAlign: 'justify'
    },
    alertLabel: {
        textAlign: 'center',
        fontFamily: fonts.complement,
        color: colors.heading,
        fontSize: 12,
        marginBottom: 5
    },
    dateTimePickerAndroidButton: {
        width: '100%',
        alignItems: 'center',
        paddingVertical: 40
    },
    dateTimePickerAndroidText: {
        color: colors.heading,
        fontSize: 24,
        fontFamily: fonts.text
    }
})