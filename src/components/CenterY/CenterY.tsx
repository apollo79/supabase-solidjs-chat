import { hope } from '@hope-ui/solid';
import { Component, splitProps } from 'solid-js';
import { PropsWithChildren } from '~/types';

type CenterYProps = PropsWithChildren;

export const MyCenterY: Component<CenterYProps> = (props) => {
    const [{ children }] = splitProps(props, ['children']);

    return children;
};

export const CenterY = hope(MyCenterY, {
    baseStyle: {
        display: 'flex',
        alignItems: 'center',
    },
});
