import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    View,
    Text,
    Image
} from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

export function Header() {

    const [userName, setUserName] = useState<string>()

    useEffect(() => {
        async function getName() {
            const name = await AsyncStorage.getItem('@plantmanager:user')
            setUserName(name || '')
        }
        getName()
    }, [])

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.hello}>
                    Olá,
                </Text>
                <Text style={styles.name}>
                    {userName}
                </Text>
            </View>
            <Image
                style={styles.photo}
                source={{ uri: "https://lh3.googleusercontent.com/fife/ABSRlIo1oPXmZQa00ZDug426e394ETHRxNMo39ZcfYSp2zL8FDCDcqyGAAL0lobAKZ0NNYYPjIXEWT_yHY3-W911VoPpA2SacWRpflZBo9lp8zfsixVq2KWaIZBoqmAbCJomkvVuVkTptwZrQEVOqsI3CRKkyMpOJDzHUbZLDenIuCgYHVv9SoPgjLj58c_erKsr3lN50dlmTsXjGH9TMbKoTmotkWH9bfTeKCwLtP193aZZIsiNBlAdqy_IL5gtMYhs2KFEmqJZb6jZSevWXMn7d-J8m0qBxsmrDz0-Vf3Pcd0Oowk9nuRLnbHtn66FjDPZqZGNAx47-fi--xpPwJqCaDFvICr5Aiwyz3p2OPI_NDsVKxTQKm-dKDwDCM45l6sdI2pFcoW6shIbF5ZCDUzvoLxmCvVP22qbJS-JoPv3Eo3xzYzvj-Y9QhrO2efx5XSAP1EhWVNKPYN1SqIy0zh7krMBsuzdhjy4CTTSbI9rFNE9EwNj6kNyb0ileQOJ0yvGNqx5Hyrso7Ds90-yAMLo5W9PG7x92u4VJifkbpfsO9xfOzVN7TNfWZ4SpyezwCY6RXjs1S8phdTPrWaViWC3sX2QGkVqRLvnn6gmyhOwZDxdcoQUW4pchHAUzVY-HZyu2QrgqVBjEMuYHLEQ6-72neCBoL4KXbuagjtG9YWcsxSYqR3RoO7v2zSFOVFgy8k5Yy7oNviRxh3Hnyhljb0dTXtppkdbmCdx8w_rShsF71HEUQ=s83-c" }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 20,
        marginTop: getStatusBarHeight()
    },
    hello: {
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.text
    },
    name: {
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 40
    },
    photo: {
        width: 56,
        height: 56,
        borderRadius: 28
    }
})