import { Component, splitProps } from 'solid-js';

import { Box, hope } from '@hope-ui/solid';

import { PropsWithChildren } from '~/types';

type CenterYProps = PropsWithChildren;

export const MyCenterY: Component<CenterYProps> = (props) => {
    const [{ children }, boxprops] = splitProps(props, ['children']);

    return <Box {...boxprops}>{children}</Box>;
};

export const CenterY = hope(MyCenterY, {
    baseStyle: {
        display: 'flex',
        alignItems: 'center',
    },
});
