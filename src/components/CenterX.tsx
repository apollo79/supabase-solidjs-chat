import { hope } from '@hope-ui/solid';
import { Component, splitProps } from 'solid-js';
import { PropsWithChildren } from '~/types';

type CenterYProps = PropsWithChildren;

export const MyCenterX: Component<CenterYProps> = (props) => {
    const [{ children }] = splitProps(props, ['children']);

    return children;
};

export const CenterX = hope(MyCenterX, {
    baseStyle: {
        mx: 'auto',
    },
});
