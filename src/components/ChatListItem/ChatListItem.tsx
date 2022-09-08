import { Avatar, AvatarBadge, Center, Grid, GridItem, Text } from '@hope-ui/solid';
import { Component, Show, splitProps } from 'solid-js';
import { useMessenger } from '~/context/messenger';
import { createStatusColor } from '~/hooks/createStatusColor';
import { useI18nContext } from '~/i18n/i18n-solid';
import { ChatId } from '~/types';
import { CenterY } from '~/components/CenterY';

export type ChatListItemProps = {
    chatId: ChatId;
};

export const ChatListItem: Component<ChatListItemProps> = (props) => {
    const statusColor = createStatusColor();
    const { chats, users } = useMessenger();

    const [{ chatId }] = splitProps(props, ['chatId']);
    const chat = chats.find((chat) => chat.id === chatId);
    const lastMsg = chat.messages.at(-1);
    const lastMsgTime = lastMsg.createdAt;
    const lastMsgUser = users.find(({ id }) => id === lastMsg.user);

    const { LL, locale } = useI18nContext();

    const now = new Date();

    const isToday =
        lastMsgTime.getDate() === now.getDate() &&
        lastMsgTime.getMonth() === now.getMonth() &&
        lastMsgTime.getFullYear() === now.getFullYear();

    // less than two minutes ago, 2 minutes is 2 * 60 * 1000 is 120000 ms
    const isNow = now.getTime() - 120_000 <= lastMsgTime.getTime();

    const dateTimeFormat = new Intl.DateTimeFormat(
        locale(),
        isToday
            ? {
                  minute: 'numeric',
                  hour: 'numeric',
              }
            : {
                  day: 'numeric',
                  month: 'short',
              },
    );

    return (
        <Grid
            templateColumns={'1fr 2fr 1fr'}
            templateRows={'repeat(1fr)'}
            minH={'$14'}
            fontWeight={chat.countUnread == 0 ? '$normal' : '$bold'}
        >
            <GridItem
                rowSpan={2}
                colStart={1}
            >
                <Center h={'$full'}>
                    <Avatar
                        h={'$10'}
                        w={'$10'}
                        name={chat.name}
                    >
                        <Show when={chat.user}>
                            <AvatarBadge
                                bg={statusColor()[lastMsgUser.status]}
                                boxSize={'$5'}
                            ></AvatarBadge>
                        </Show>
                    </Avatar>
                </Center>
            </GridItem>
            <GridItem
                rowStart={1}
                colStart={2}
            >
                <CenterY
                    h={'$full'}
                    as={Text}
                >
                    {chat.name || users.find(({ id }) => id === chat.user).name}
                </CenterY>
            </GridItem>
            <GridItem
                rowStart={2}
                colStart={2}
                colSpan={2}
            >
                <Text
                    size={'xs'}
                    noOfLines={1}
                >
                    {lastMsg.content}
                </Text>
            </GridItem>
            <GridItem
                rowStart={1}
                colStart={3}
            >
                <Center
                    h={'$full'}
                    as={Text}
                    size={'xs'}
                >
                    {/* {LL().messages.time[ago.epoch](ago.interval)} */}
                    <time datetime={lastMsgTime.toISOString()}>
                        {isNow ? LL().messages.time.now() : dateTimeFormat.format(lastMsgTime)}
                    </time>
                </Center>
            </GridItem>
        </Grid>
    );
};
