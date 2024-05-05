import React, { useEffect, useState } from "react";
import { Actionsheet, Avatar, ActionsheetItem, AvatarFallbackText, ActionsheetContent, ActionsheetItemText, ActionsheetDragIndicator, AvatarImage, Divider, Heading, ActionsheetDragIndicatorWrapper, ActionsheetBackdrop, Button, ButtonText, ButtonIcon } from "@gluestack-ui/themed";
import { FlatList, HStack, Text, VStack } from "@gluestack-ui/themed";
import { TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
//icons
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { pinChat, archiveChat } from "../../../../state/chats/chatsSlice";
import { useNavigation } from "@react-navigation/native";

const ChatItem = ({ item, totalPinnedChats }) => {

    const dispatch = useDispatch();

    const [showActionsheet, setShowActionsheet] = useState(false);

    const handleClose = () => setShowActionsheet(false);

    const pinUpChat = () => {
        setShowActionsheet(false);
        dispatch(pinChat(item.id));
    };

    const archiveChats = () => {
        setShowActionsheet(false);
        dispatch(archiveChat(item.id));
    }

    return (
        <TouchableOpacity
            style={{
                width: '90%',
                alignSelf: 'center'
            }}
            onLongPress={() => setShowActionsheet(true)}
            onPress={() => console.log("Press on chat")}
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

                    {
                        item?.pinup
                            ?
                            <AntDesign
                                name={"pushpin"}
                                size={15}
                                color={'black'}
                                style={{ transform: [{ rotateY: '180deg' }] }}
                            />
                            :
                            <Text></Text>
                    }
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
                        {
                            (item.pinup || (totalPinnedChats < 2 && !item.pinup))
                            &&
                            <>
                                <ActionsheetItem
                                    onPress={pinUpChat}
                                >
                                    <HStack
                                        width={"100%"}
                                        alignItems="center"
                                        justifyContent="space-between"
                                    >
                                        <ActionsheetItemText>
                                            {item.pinup ? 'Desfijar' : 'Fijar chat'}
                                        </ActionsheetItemText>
                                        <MaterialCommunityIcons
                                            name={item.pinup ? 'pin-off-outline' : 'pin-outline'}
                                            size={25}
                                            color={'black'}
                                        />
                                    </HStack>
                                </ActionsheetItem>
                                <Divider my="$0.5" />
                            </>
                        }
                        <ActionsheetItem
                            onPress={archiveChats}
                        >
                            <HStack
                                width={"100%"}
                                alignItems="center"
                                justifyContent="space-between"
                            >
                                <ActionsheetItemText>
                                    Archivar
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

const ChatsList = ({ searchCondition }) => {

    const navigation = useNavigation();

    const chats = useSelector((state) => state.chats.chats);

    const [filteredChats, setFilteredChats] = useState([]);
    const [archivedChats, setArchivedChats] = useState([]);
    const totalPinnedChats = filteredChats.filter(chat => chat.pinup).length;

    useEffect(() => {
        // Filtrar los chats basados en el término de búsqueda
        let archived = [...chats.filter(chat => chat.archived)];
        let filtered = [...chats.filter(chat => !chat.archived)];
        if (searchCondition) {
            filtered = chats.filter(chat =>
                chat.contact.toLowerCase().includes(searchCondition.toLowerCase()) ||
                chat.lastMessage.toLowerCase().includes(searchCondition.toLowerCase())
            );
        }
        // Ordenar los chats según la propiedad pinup
        filtered.sort((a, b) => (a.pinup === b.pinup) ? 0 : a.pinup ? -1 : 1);
        setFilteredChats(filtered);
        setArchivedChats(archived);
    }, [searchCondition, chats]);

    return (
        <>
            {
                archivedChats.length > 0 &&
                <TouchableOpacity
                    onPress={() => navigation.navigate("archived")}
                    style={{
                        width: '90%',
                        alignSelf: 'center',
                        flexDirection: 'row',
                        alignItems: 'center',
                        padding: 10,
                        marginTop: 10
                    }}
                >
                    <AntDesign
                        name={"inbox"}
                        size={25}
                        color={'black'}
                    />
                    <Text
                        size="md"
                        color="black"
                        ml={10}
                    >
                        Archivados
                    </Text>
                </TouchableOpacity >
            }
            <FlatList
                mt={20}
                data={filteredChats}
                keyExtractor={(item) => item.id.toString()}
                ItemSeparatorComponent={() => <Divider my="$0.5" mt={10} mb={10} />}
                renderItem={({ item, index }) => <ChatItem item={item} totalPinnedChats={totalPinnedChats} index={index} />}
            />
        </>
    )
};

export default ChatsList;