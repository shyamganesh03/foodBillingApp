import React from 'react';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';

MIcon.loadFont();

export const IconSizes = {
    small: 13,
    medium: 18,
    large: 23,
    extraLarge: 27,
};

const VectorIcon = ({ size = 'small', name, color = '#000000' }) => {
    return (
        <MIcon name={name} size={IconSizes[size]} color={color} />
    )
}

export default VectorIcon