import React from "react";
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,

} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/core";

import colors from "../styles/colors";
import fonts from "../styles/fonts";
import { Button } from "../components/Button";

interface Params {
    emoji: 'hug' | 'smile'
    title: string
    subtitle: string
    buttonTitle: string
    nextScreen: string
}


export function Confirmation() {

    const emojis = {
        'hug': '🤗',
        'smile': '😄'
    }

    const route = useRoute()
    const navigator = useNavigation()
    const {
        emoji,
        title,
        subtitle,
        buttonTitle,
        nextScreen
    } = route.params as Params

    function handleNextPage() {
        navigator.navigate(nextScreen)
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.emoji}>
                    {emojis[emoji]}
                </Text>
                <Text style={styles.title}>
                    {title}
                </Text>
                <Text style={styles.subtitle}>
                    {subtitle}
                </Text>
                <View style={styles.footer}>
                    <Button
                        title={buttonTitle}
                        onPress={handleNextPage}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    content: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30
    },
    emoji: {
        fontSize: 78
    },
    title: {
        fontSize: 22,
        lineHeight: 38,
        textAlign: 'center',
        color: colors.heading,
        fontFamily: fonts.heading,
        marginTop: 15
    },
    subtitle: {
        fontSize: 17,
        textAlign: 'center',
        color: colors.heading,
        fontFamily: fonts.text,
        paddingVertical: 10
    },
    footer: {
        marginTop: 20,
        width: '100%',
        paddingHorizontal: 50
    }
})