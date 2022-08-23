import { Box, Center, hope, HopeProps } from '@hope-ui/solid';
import { Component, mergeProps, splitProps } from 'solid-js';
import { ExtendPropsWithChildren } from '~/types';
import { CenterX } from './CenterX';
import { CenterY } from './CenterY';

export const defaultProps: HopeProps = {
    maxW: '$containerMd',
    borderWidth: '2px',
    borderColor: '$neutral6',
    borderRadius: '$md',
    px: '$6',
    py: '$4',
    boxShadow: '$2xl',
    w: { '@initial': '$full', '@sm': '$sm' },
};

export type CardProps = ExtendPropsWithChildren<{ center?: boolean; centerX?: boolean; centerY?: boolean }>;

export const MyCard: Component<CardProps> = (props) => {
    const [{ children, center }, box] = splitProps(props, ['children', 'center']);

    const boxProps: HopeProps = mergeProps(defaultProps, box);

    const card = <Box {...boxProps}>{children}</Box>;

    if (center) {
        return <Center>{card}</Center>;
    } else if (props.centerX) {
        return <CenterX>{card}</CenterX>;
    } else if (props.centerY) {
        return <CenterY>{card}</CenterY>;
    } else {
        return card;
    }
};

export const Card = hope(MyCard, {
    baseStyle: {
        maxW: '$containerMd',
        borderWidth: '2px',
        borderColor: '$neutral6',
        borderRadius: '$md',
        px: '$6',
        py: '$4',
        boxShadow: '$2xl',
        w: { '@initial': '$full', '@sm': '$sm' },
    },
});
