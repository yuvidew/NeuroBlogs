import {  Animated } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { icons } from '@/constants/icons';

/**
 * Spinner component that displays a rotating loader icon when loading is true.
 *
 * @param {Object} props - Component props.
 * @param {boolean} props.loading - Determines whether the spinner should animate.
 * @returns {JSX.Element} The animated spinner image.
 */


const Spinner = ({ loading }: { loading: boolean }) => {
    const rotateAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (loading) {
            Animated.loop(
                Animated.timing(rotateAnim, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                })
            ).start();
        } else {
            rotateAnim.stopAnimation();
        }
    }, [loading]);

    const rotateInterpolate = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });
    
    return (
        <Animated.Image
            source={icons.loader}
            style={[{ transform: [{ rotate: rotateInterpolate }] }]}
            tintColor="#fff"
            className={"size-6"}
        />
    )
}

export default Spinner