import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    View,
    Text,
    FlatList
} from "react-native";
import { EnvironmentButton } from "../components/EnvironmentButton";
import { Header } from "../components/Header";
import { Load } from "../components/Load";
import { PlantCardPrimary } from "../components/PlantCardPrimary";
import { useNavigation } from "@react-navigation/core";

import api from "../services/api";
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import { PlantProps } from "../lib/storage";

interface EnvironmentProps {
    key: string;
    title: string;
}



export function PlantSelect() {

    const [environments, setEnvironments] = useState<EnvironmentProps[]>([]);
    const [plants, setPlants] = useState<PlantProps[]>([]);
    const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([]);
    const [environmentSelected, setEnvironmentSelected] = useState('all');
    const [loading, setloading] = useState(true);

    const navigator = useNavigation()

    async function selectPlant(plant: PlantProps) {
        navigator.navigate('PlantSave', { plant })
    }

    function handleEnvironmentSelected({ key }: EnvironmentProps) {
        setEnvironmentSelected(key)

        if (key === 'all') {
            return setFilteredPlants(plants)
        }
        const filtered = plants.filter(plant =>
            plant.environments.includes(key)
        )
        setFilteredPlants(filtered)
    }

    useEffect(() => {
        async function fetchEnvironments() {
            const { data } = await api.get('plants_environments?_sort=title&_order=asc')
            setEnvironments([
                {
                    key: 'all',
                    title: 'todos'
                },
                ...data
            ])
        }
        fetchEnvironments()
    }, [])

    useEffect(() => {
        async function fetchPlants() {
            const { data } = await api.get('plants?_sort=name&_order=asc');
            setPlants(data)
            setFilteredPlants(data)
            setloading(false)
        }

        fetchPlants();
    }, [])

    if (loading) {
        return <Load />
    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Header />
                <Text style={styles.heading}>
                    Em qual hambiente
                </Text>
                <Text style={styles.text}>
                    você quer colocar sua planta?
                </Text>
            </View>
            <View>
                <FlatList
                    data={environments}
                    keyExtractor={item => String(item.key)}
                    renderItem={({ item }) => (
                        <EnvironmentButton
                            title={item.title}
                            active={item.key === environmentSelected}
                            onPress={() => handleEnvironmentSelected(item)}
                        />
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.environmentList}
                />
            </View>
            <View style={styles.plants}>
                <FlatList
                    data={filteredPlants}
                    keyExtractor={item => String(item.id)}
                    renderItem={({ item }) => (
                        <PlantCardPrimary
                            data={item}
                            onPress={() => selectPlant(item)}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        paddingHorizontal: 30
    },
    heading: {
        fontSize: 17,
        fontFamily: fonts.heading,
        color: colors.heading,
        lineHeight: 20,
        marginTop: 15
    },
    text: {
        fontSize: 17,
        fontFamily: fonts.text,
        color: colors.heading,
        lineHeight: 20
    },
    environmentList: {
        height: 40,
        justifyContent: 'center',
        marginVertical: 32,
        paddingBottom: 5,
        paddingLeft: 32
    },
    plants: {
        flex: 1,
        paddingHorizontal: 32,
        justifyContent: 'center'
    }
})