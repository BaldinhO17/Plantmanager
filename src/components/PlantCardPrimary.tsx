import React from 'react';
import {
    StyleSheet,
    Text
} from 'react-native';
import { SvgFromUri } from "react-native-svg";
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface PlantCardPrimaryProps extends RectButtonProps {
    data: {
        name: string,
        photo: string
    }
}

export const PlantCardPrimary = ({ data, ...rest }: PlantCardPrimaryProps) => {
    return (
        <RectButton
            style={styles.container}
            {...rest}
        >
            <SvgFromUri
                uri={data.photo}
                width={70}
                height={70}
            />
            <Text style={styles.text}>{data.name}</Text>
        </RectButton>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        maxWidth: '45%',
        backgroundColor: colors.shape,
        paddingVertical: 10,
        borderRadius: 20,
        alignItems: 'center',
        margin: 10
    },
    photo: {

    },
    text: {
        marginVertical: 16,
        fontFamily: fonts.heading,
        color: colors.green_dark
    }
})