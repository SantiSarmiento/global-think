import React, { useEffect, useState } from "react";
import { VStack, Heading, HStack, Text, Avatar, FlatList, AvatarFallbackText, AvatarImage, View } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../../../state/specificChats/specificChatsSlice";
import CustomInputs from "../../../components/CustomInputs";

const ChatItem = ({ content, sender, time, photo }) => {

    return (
        <HStack
            alignSelf={sender === "You" ? "flex-end" : "flex-start"}
            bgColor={sender === "You" ? "white" : "#fea271"}
            borderRadius={10}
            p={10}
            m={10}
            w={"56%"}
        >
            <Text
                color={sender === "You" ? "black" : "white"}
                alignSelf="flex-start"
                p={5}
            >
                {content}
            </Text>
            <Text
                color={sender === "You" ? "gray" : "white"}
                fontSize="$xs"
                position="absolute"
                bottom={5}
                right={5}
            >
                {time}
            </Text>
        </HStack>
    )
};

const Chat = ({ route }) => {

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const { chatId, contact } = route.params;

    const chats = useSelector(state => state.chat.specificChats);
    const users = useSelector(state => state.chats.chats);

    const [chatInfo, setChatInfo] = useState([]);
    const [userInfo, setUserInfo] = useState({
        name: "",
        lastname: "",
        status: "",
        photo: ""
    });
    const [message, setMessage] = useState("");

    const sendMessage = () => {
        if (!message) return;
        let mensaje = {
            sender: "You",
            content: message,
            time: "Recien",
            photo: ""
        }
        dispatch(addMessage({ contact: contact, message: mensaje }));
        setMessage("");
    };

    useEffect(() => {
        setChatInfo(chats.find(chat => chat.contact === contact)?.messages);
        setUserInfo(users.find(user => user.id === chatId));
    }, [chats]);

    return (
        <VStack
            w={"100%"}
            h={"100%"}
            bgColor="#eaedf8"
            justifyContent="space-between"
        >
            <VStack
                w={"100%"}
                alignSelf="center"
            >
                <HStack
                    bgColor="white"
                    width={'100%'}
                    justifyContent="center"
                    p={10}
                >
                    <HStack
                        alignItems="center"
                        width={'90%'}
                        alignSelf="center"
                        space="xl"
                    >
                        <AntDesign
                            onPress={() => navigation.goBack()}
                            name={"left"}
                            size={20}
                            color={'#446589'}
                        />

                        <Avatar
                            bgColor='$amber600'
                            size="md"
                            borderRadius="$full"
                            alignSelf="center"
                        >
                            {
                                userInfo?.photo
                                    ?
                                    <AvatarImage
                                        source={{ uri: userInfo?.photo }}
                                        alt="Profile Image"
                                    />
                                    :
                                    <AvatarFallbackText>{userInfo?.contact}</AvatarFallbackText>
                            }
                        </Avatar>
                        <VStack>
                            <Heading
                                size="sm"
                            >
                                {userInfo?.contact}
                            </Heading>
                            <Text
                                size="xs"
                                color="gray"
                            >
                                {userInfo?.lastSeen}
                            </Text>
                        </VStack>
                    </HStack>
                </HStack>

                <FlatList
                    mt={20}
                    data={chatInfo}
                    keyExtractor={(item, i) => i.toString()}
                    renderItem={({ item, index }) => <ChatItem content={item.content} sender={item.sender} time={item.time} photo={item.photo} />}
                />

            </VStack>

            <HStack
                w={"100%"}
                alignSelf="center"
                padding={10}
                alignItems="center"
                space="md"
            >
                <AntDesign
                    onPress={() => { }}
                    name={"plus"}
                    size={25}
                    color={'#446589'}
                />
                <View flex={1} >
                    <CustomInputs
                        value={message}
                        onChange={(text) => setMessage(text)}
                        placeholder=""
                    />
                </View>
                <Ionicons
                    onPress={sendMessage}
                    name={"send"}
                    size={25}
                    color={'#446589'}
                />
            </HStack>
        </VStack>
    )
}

export default Chat;