import { AvatarImage, Divider, Heading } from "@gluestack-ui/themed";
import { Avatar } from "@gluestack-ui/themed";
import { AvatarFallbackText } from "@gluestack-ui/themed";
import { FlatList, HStack, Text, VStack } from "@gluestack-ui/themed";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";

const ChatItem = ({ item }) => {

    return (
        <TouchableOpacity
            style={{
                width: '90%',
                alignSelf: 'center'
            }}
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
                        size="md"
                        color="gray"
                    >
                        {item?.lastMessageTime}
                    </Text>
                </VStack>
            </HStack>
        </TouchableOpacity>
    )
};

const ChatsList = ({ searchCondition }) => {

    const chats = useSelector((state) => state.chats.chats);

    const [filteredChats, setFilteredChats] = useState([]);

    useEffect(() => {
        // Filtrar los chats basados en el término de búsqueda
        if (searchCondition) {
            const filtered = chats.filter(chat =>
                chat.contact.toLowerCase().includes(searchCondition.toLowerCase()) ||
                chat.lastMessage.toLowerCase().includes(searchCondition.toLowerCase())
            );
            setFilteredChats(filtered);
        } else {
            setFilteredChats(chats);
        }
    }, [searchCondition, chats]);

    return (
        <FlatList
            data={filteredChats}
            mt={30}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={() => <Divider my="$0.5" mt={10} mb={10} />}
            renderItem={({ item, index }) => <ChatItem item={item} index={index} />}
        />
    )
};

export default ChatsList;