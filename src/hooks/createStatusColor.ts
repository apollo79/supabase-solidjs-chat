import { useColorModeValue } from '@hope-ui/solid';
import { grass, red, yellow, grassDark, redDark, yellowDark } from '@radix-ui/colors';
import { Status } from '~/types';

export const createStatusColor = () => {
    const color = useColorModeValue<Record<Status, string>>(
        {
            offline: red.red11,
            online: grass.grass11,
            working: yellow.yellow10,
        },
        {
            offline: redDark.red11,
            online: grassDark.grass9,
            working: yellowDark.yellow11,
        },
    );

    return color;
};

export default createStatusColor;
