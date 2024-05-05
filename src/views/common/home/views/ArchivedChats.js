import React, { useEffect, useState } from "react";
import { Actionsheet, Avatar, VStack, HStack, ActionsheetItem, AvatarFallbackText, ActionsheetContent, ActionsheetItemText, ActionsheetDragIndicator, AvatarImage, Divider, Heading, ActionsheetDragIndicatorWrapper, ActionsheetBackdrop, Button, ButtonText, ButtonIcon } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
//icons
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from "react-redux";
import { FlatList, Text } from "@gluestack-ui/themed";
import { archiveChat } from "../../../../state/chats/chatsSlice";
import { TouchableOpacity } from "react-native";
//icons
import AntDesign from 'react-native-vector-icons/AntDesign';

const ChatItem = ({ item }) => {

    const dispatch = useDispatch();

    const [showActionsheet, setShowActionsheet] = useState(false);

    const handleClose = () => setShowActionsheet(false);

    const archiveChats = () => {
        setShowActionsheet(false);
        dispatch(archiveChat(item.id));
    }

    return (
        <TouchableOpacity
            style={{
                width: '100%',
                alignSelf: 'center'
            }}
            onPress={() => setShowActionsheet(true)}
        >
            <HStack
                justifyContent="space-between"
                alignItems="center"
            >
                <HStack
                    alignItems="center"
                >
                    <Avatar
                        bgColor='$amber600'
                        size="md"
                        borderRadius="$full"
                    >
                        {
                            item?.photo
                                ?
                                <AvatarImage
                                    source={{ uri: item?.photo }}
                                    alt="Profile Image"
                                />
                                :
                                <AvatarFallbackText>{item?.contact}</AvatarFallbackText>
                        }
                    </Avatar>
                    <VStack
                        ml={10}
                    >
                        <Heading
                            size="md"
                        >
                            {item?.contact}
                        </Heading>
                        <Text
                            size="sm"
                            color="gray"
                        >
                            {item?.lastMessage}
                        </Text>
                    </VStack>
                </HStack>
                <VStack>
                    <Text
                        size="sm"
                        color="gray"
                    >
                        {item?.lastMessageTime}
                    </Text>
                </VStack>
            </HStack>

            <Actionsheet
                isOpen={showActionsheet}
                onClose={handleClose}
                zIndex={999}
            >
                <ActionsheetBackdrop />
                <ActionsheetContent
                    zIndex={999}
                    paddingBottom={30}
                    backgroundColor="#f3f2f8"
                >
                    <ActionsheetDragIndicatorWrapper>
                        <ActionsheetDragIndicator />
                    </ActionsheetDragIndicatorWrapper>
                    <VStack
                        w={"90%"}
                        bgColor="white"
                        borderRadius={10}
                        mt={10}
                    >
                        <ActionsheetItem
                            onPress={archiveChats}
                        >
                            <HStack
                                width={"100%"}
                                alignItems="center"
                                justifyContent="space-between"
                            >
                                <ActionsheetItemText>
                                    Desarchivar
                                </ActionsheetItemText>
                                <AntDesign
                                    name={"inbox"}
                                    size={25}
                                    color={'black'}
                                />
                            </HStack>
                        </ActionsheetItem>
                    </VStack>

                </ActionsheetContent>
            </Actionsheet>
        </TouchableOpacity>
    )
};

const ArchivedChats = () => {

    const navigation = useNavigation();

    const chats = useSelector((state) => state.chats.chats);

    useEffect(() => {
        if (chats?.filter((chat) => chat.archived).length === 0) navigation.goBack();
    }, [chats]);

    return (
        <VStack
            w={"100%"}
            h={"100%"}
            bgColor="white"
        >
            <VStack
                w={"90%"}
                alignSelf="center"
            >
                <HStack
                    alignItems="center"
                    justifyContent="flex-start"
                    mt={10}
                >
                    <Ionicons
                        onPress={() => navigation.goBack()}
                        name={"arrow-back"}
                        size={25}
                        color={'black'}
                    />

                    <Heading
                        size="xl"
                        ml={5}
                    >
                        Archivados
                    </Heading>
                </HStack>

                <FlatList
                    mt={20}
                    data={chats?.filter((chat) => chat.archived)}
                    keyExtractor={(item) => item.id.toString()}
                    ItemSeparatorComponent={() => <Divider my="$0.5" mt={10} mb={10} />}
                    renderItem={({ item, index }) => <ChatItem item={item} index={index} />}
                />
            </VStack>
        </VStack>
    )
}

export default ArchivedChats;