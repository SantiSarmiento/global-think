import React, { useEffect, useRef, useState } from "react";
import { VStack, Heading, HStack, Text, Avatar, FlatList, AvatarFallbackText, AvatarImage, View } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../../../state/specificChats/specificChatsSlice";
import CustomInputs from "../../../components/CustomInputs";
import ImagePickerActions from "../../../utils/ImagePickerActions";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { Image } from "@gluestack-ui/themed";
import { updateChat } from "../../../state/chats/chatsSlice";

const optionsPhotos = {
    title: 'Seleccione una imagen',
    quality: 0.4,
    maxWidth: 420,
    maxHeight: 560,
    includeBase64: true
};

const ChatItem = ({ content, sender, time, photo }) => {

    return (
        <HStack
            alignSelf={sender === "You" ? "flex-end" : "flex-start"}
            bgColor={sender === "You" ? "white" : "#ec6664"}
            borderRadius={10}
            p={10}
            m={10}
            maxWidth={"70%"}
        >
            {
                photo
                    ?
                    <VStack
                        p={2}
                        space="md"
                    >
                        <Image
                            size="2xl"
                            borderRadius="$none"
                            alt="Profile Image"
                            source={{
                                uri: photo,
                            }}
                        />
                        <Text
                            color={sender === "You" ? "gray" : "white"}
                            fontSize="$xs"
                            alignSelf="flex-end"
                        >
                            {time}
                        </Text>
                    </VStack>
                    :
                    <VStack
                        space="xs"
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
                            alignSelf="flex-end"
                        >
                            {time}
                        </Text>
                    </VStack>

            }
        </HStack>
    )
};

const Chat = ({ route }) => {

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const { chatId, contact } = route.params;
    const scrollRef = useRef(null);

    const chats = useSelector(state => state.chat.specificChats);
    const users = useSelector(state => state.chats.chats);

    const [showActionsheet, setShowActionsheet] = useState(false)
    const [chatInfo, setChatInfo] = useState([]);
    const [userInfo, setUserInfo] = useState({
        name: "",
        lastname: "",
        status: "",
        photo: ""
    });
    const [message, setMessage] = useState("");

    const handleClose = () => setShowActionsheet(!showActionsheet)

    const takePhoto = () => {
        launchCamera(optionsPhotos, (response) => {
            if (response.didCancel || response.errorCode) return;
            if (response.error) {
                Alert.alert('Error', 'Ocurrió un error al seleccionar la imagen');
            } else {
                if (response?.assets[0]?.uri) {
                    let file = `data:${response.assets[0].type};base64,${response.assets[0].base64}`;
                    sendPhoto(file);
                }
            }
        });
        setShowActionsheet(!showActionsheet);
    };

    const selectPhoto = () => {
        launchImageLibrary(optionsPhotos, (response) => {
            if (response.didCancel || response.errorCode) return;
            if (response.error) {
                Alert.alert('Error', 'Ocurrió un error al seleccionar la imagen');
            } else {
                if (response?.assets[0]?.uri) {
                    let file = `data:${response.assets[0].type};base64,${response.assets[0].base64}`;
                    sendPhoto(file);
                }
            }
        });
        setShowActionsheet(!showActionsheet);
    };

    const sendPhoto = (file) => {
        let newMessage = {
            sender: "You",
            content: "",
            time: "Recien",
            photo: file
        }
        dispatch(addMessage({ contact: contact, message: newMessage }));
        dispatch(updateChat({ contact: contact, message: { ...newMessage, photo: true } }))
    };

    const sendMessage = () => {
        if (!message) return;
        let newMessage = {
            sender: "You",
            content: message,
            time: "Recien",
            photo: ""
        }
        dispatch(addMessage({ contact: contact, message: newMessage }));
        dispatch(updateChat({ contact: contact, message: newMessage }))
        setMessage("");
    };

    useEffect(() => {
        setChatInfo(chats.find(chat => chat.contact === contact)?.messages);
        setUserInfo(users.find(user => user.id === chatId));

        // Desplazar automáticamente el FlatList al final cuando se carga por primera vez
        if (scrollRef.current) {
            scrollRef.current.scrollToEnd({ animated: true });
            // Forzar una actualización de la interfaz de usuario
            setTimeout(() => {
                scrollRef.current.scrollToEnd({ animated: true });
            }, 100);
        }
    }, [chats]);


    return (
        <VStack
            w={"100%"}
            bgColor="#eaedf8"
            justifyContent="space-between"
        >
            <VStack
                w={"100%"}
                alignSelf="center"
                height="90%"
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
                            color={'#ec6664'}
                        />

                        <Avatar
                            bgColor='#ec6664'
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
                    ref={scrollRef}
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
                height="10%"
            >
                <AntDesign
                    onPress={() => setShowActionsheet(!showActionsheet)}
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

            <ImagePickerActions
                showActionsheet={showActionsheet}
                handleClose={handleClose}
                takePhoto={takePhoto}
                selectPhoto={selectPhoto}
                text={"Adjunta o toma una foto"}
            />
        </VStack>
    )
}

export default Chat;