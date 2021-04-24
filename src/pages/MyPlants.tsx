import React, { useEffect, useState } from "react";

import {
    StyleSheet,
    View,
    Text,
    Image,
    FlatList,
    Alert
} from "react-native";


import { Header } from "../components/Header";
import { PlantCardSecondary } from "../components/PlantCardSecondary";

import colors from "../styles/colors";

import waterdrop from '../assets/waterdrop.png'
import { loadPlant, PlantProps, removePlant } from "../lib/storage";
import { formatDistance } from "date-fns";
import { pt } from "date-fns/locale";
import fonts from "../styles/fonts";
import { Load } from "../components/Load";

export function MyPlants() {
    const [plants, setPlants] = useState<PlantProps[]>([])
    const [loading, setLoading] = useState(true)
    const [nextWateredAlert, setNextWateredAlert] = useState<string>()

    async function loadStoragedPlants() {
        const plantsStorageds = await loadPlant()

        const nextTime = formatDistance(
            new Date(plantsStorageds[0].dateTimeNotification).getTime(),
            new Date().getTime(),
            { locale: pt }
        )
        setNextWateredAlert(
            `Não esuqeça de regar ${plantsStorageds[0].name} daqui à ${nextTime}`
        )
        setPlants(plantsStorageds)
        setLoading(false)
    }

    useEffect(() => {
        try {
            loadStoragedPlants()
        } catch {
            return Alert.alert('Não foi possível carregar suas plantas. 😢')
        }

    }, [plants])

    function handleRemove(plant: PlantProps) {
        Alert.alert('Remover', `Deseja remover a ${plant.name}?`, [{
            text: 'Não',
            style: 'cancel'
        },
        {
            text: 'Sim',
            style: 'destructive',
            onPress: async () => {
                setLoading(true)
                try {
                    await removePlant(plant.id)
                    setPlants(
                        oldData => (
                            oldData.filter(
                                ({ id }) => (id != plant.id)
                            )
                        )
                    )
                    setLoading(false)
                } catch {
                    setLoading(false)
                    return Alert.alert('Não foi possível remover a plantas. 😢')

                }
            }
        }
        ])
    }

    if (loading) {
        return <Load />
    }

    return (
        <View style={styles.container}>
            <Header />

            <View style={styles.spotLight}>
                <Image
                    source={waterdrop}
                    style={styles.spotLightImage}
                />
                <Text style={styles.spotLightText}>
                    {nextWateredAlert}
                </Text>

            </View>
            <View style={styles.plants}>
                <Text style={styles.plantsTitle}>
                    Próximas regadas
                </Text>
                <View style={{ flex: 1 }}>
                    <FlatList
                        data={plants}
                        keyExtractor={item => String(item.id)}
                        renderItem={({ item }) =>
                            <PlantCardSecondary
                                data={item}
                                handleRemove={() => handleRemove(item)}
                            />
                        }
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        backgroundColor: colors.background
    },
    spotLight: {
        backgroundColor: colors.blue_light,
        paddingHorizontal: 20,
        borderRadius: 20,
        height: 110,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

    },
    spotLightImage: {
        height: 60,
        width: 60
    },
    spotLightText: {
        flex: 1,
        color: colors.blue,
        paddingHorizontal: 20,
        fontFamily: fonts.text
    },
    plants: {
        flex: 1,
        width: '100%'
    },
    plantsTitle: {
        fontSize: 20,
        fontFamily: fonts.heading,
        color: colors.heading,
        marginVertical: 20
    }
})