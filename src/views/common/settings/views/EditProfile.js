import React, { useEffect, useState } from "react";
import { ActionsheetBackdrop, ActionsheetItemText, Avatar, AvatarImage, Button, ButtonText, HStack, Heading, Pressable, Text, VStack, Divider, ActionsheetItem, Input, InputField, AvatarFallbackText, Actionsheet, ActionsheetContent } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { setProfile } from "../../../../state/profile/profileSlice";
import { editUser } from "../../../../state/users/usersSlice";
//icons
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Alert } from "react-native";
import { View } from "@gluestack-ui/themed";

const optionsPhotos = {
    title: 'Seleccione una imagen',
    quality: 0.4,
    maxWidth: 420,
    maxHeight: 560,
    includeBase64: true
};

const EditProfile = () => {

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const profile = useSelector(state => state.profile);

    const [profileInfo, setProfileInfo] = useState({
        name: profile?.name,
        lastname: profile?.lastname,
        status: profile?.status,
        photo: profile?.photo,
        phone: profile?.phone
    });
    const [isModified, setIsModified] = useState(false);
    const [showActionsheet, setShowActionsheet] = useState(false)

    const hanldeEditProfile = () => {
        let updatedProfile = {
            ...profile,
            name: profileInfo.name ? profileInfo.name : profile.name,
            lastname: profileInfo.lastname ? profileInfo.lastname : profile.lastname,
            status: profileInfo.status ? profileInfo.status : profile.status
        }
        dispatch(setProfile(updatedProfile));
        dispatch(editUser(updatedProfile))
        navigation.goBack();
    }

    const handleClose = () => setShowActionsheet(!showActionsheet)

    const takePhoto = () => {
        launchCamera(optionsPhotos, (response) => {
            if (response.didCancel) return;
            if (response.error) {
                Alert.alert('Error', 'Ocurrió un error al seleccionar la imagen');
            } else {
                if (response.assets[0].uri) {
                    let file = `data:${response.assets[0].type};base64,${response.assets[0].base64}`;
                    dispatch(setProfile({ ...profile, photo: file }));
                    dispatch(editUser({ ...profile, photo: file }));
                    setProfileInfo({ ...profileInfo, photo: file });
                }
            }
        });

    };

    const selectPhoto = () => {
        launchImageLibrary(optionsPhotos, (response) => {
            if (response.didCancel) return;
            if (response.error) {
                Alert.alert('Error', 'Ocurrió un error al seleccionar la imagen');
            } else {
                if (response.assets[0].uri) {
                    let file = `data:${response.assets[0].type};base64,${response.assets[0].base64}`;
                    dispatch(setProfile({ ...profile, photo: file }));
                    dispatch(editUser({ ...profile, photo: file }));
                    setProfileInfo({ ...profileInfo, photo: file });
                }
            }
        });
    };

    const deletePhoto = () => {
        console.log('eliminar foto');
    };

    useEffect(() => {
        if (profileInfo.name !== profile.name || profileInfo.lastname !== profile.lastname || profileInfo.status !== profile.status) {
            setIsModified(true);
        } else {
            setIsModified(false);
        }
    }, [profileInfo]);

    return (
        <VStack
            w={"90%"}
            alignSelf="center"
            h={"100%"}
        >
            <HStack
                alignItems="center"
                justifyContent="space-between"
                mt={10}
            >
                <HStack
                    alignItems="center"
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
                        Editar perfil
                    </Heading>
                </HStack>
                {
                    isModified
                    &&
                    <Button
                        variant="link"
                        onPress={hanldeEditProfile}
                    >
                        <ButtonText
                        >
                            OK
                        </ButtonText>
                    </Button>
                }
            </HStack>

            <View
                alignSelf="center"
            >
                <Pressable
                    onPress={() => setShowActionsheet(!showActionsheet)}
                >
                    <Avatar
                        bgColor='$amber600'
                        size="xl"
                        borderRadius="$full"
                        alignSelf="center"
                        mt={20}
                    >
                        {
                            profileInfo?.photo !== ''
                                ?
                                <AvatarImage
                                    source={{ uri: profileInfo?.photo }}
                                    alt="Profile Image"
                                />
                                :
                                <AvatarFallbackText>{profileInfo?.name + ' ' + profileInfo?.lastname}</AvatarFallbackText>
                        }
                    </Avatar>
                </Pressable>
            </View>

            <VStack
                mt={20}
            >
                <Text
                    m={5}
                >
                    INFORMACIÓN PERSONAL
                </Text>
                <Input
                    variant="outline"
                    bg="white"
                    size="lg"
                    isDisabled={false}
                    isInvalid={false}
                    isReadOnly={false}
                >
                    <InputField
                        placeholder="Nombre"
                        onChangeText={(e) => setProfileInfo({ ...profileInfo, name: e })}
                        value={profileInfo.name}
                        onBlur={() => {
                            if (profileInfo.name === "") {
                                setProfileInfo({ ...profileInfo, name: profile.name });
                            }
                        }}
                    />
                </Input>
                <Input
                    variant="outline"
                    bg="white"
                    size="lg"
                    isDisabled={false}
                    isInvalid={false}
                    isReadOnly={false}
                    mt={5}
                >
                    <InputField
                        placeholder="Apellido"
                        onChangeText={(e) => setProfileInfo({ ...profileInfo, lastname: e })}
                        value={profileInfo.lastname}
                        onBlur={() => {
                            if (profileInfo.lastname === "") {
                                setProfileInfo({ ...profileInfo, lastname: profile.lastname });
                            }
                        }}
                    />
                </Input>
            </VStack>

            <VStack
                mt={20}
            >
                <Text
                    m={5}
                >
                    NÚMERO DE TELÉFONO
                </Text>
                <Input
                    variant="outline"
                    bg="white"
                    size="lg"
                    isDisabled={true}
                >
                    <InputField
                        placeholder="Apellido"
                        onChangeText={(e) => setProfileInfo({ ...profileInfo, phone: e })}
                        value={profileInfo.phone}
                    />
                </Input>
            </VStack>

            <VStack
                mt={20}
            >
                <Text
                    m={5}
                >
                    ESTADO
                </Text>
                <Input
                    variant="outline"
                    bg="white"
                    size="lg"
                    isDisabled={false}
                    isInvalid={false}
                    isReadOnly={false}
                >
                    <InputField
                        placeholder="Estado"
                        onChangeText={(e) => setProfileInfo({ ...profileInfo, status: e })}
                        value={profileInfo.status}
                        onBlur={() => {
                            if (profileInfo.status === "") {
                                setProfileInfo({ ...profileInfo, status: profile.status });
                            }
                        }}
                    />
                </Input>
            </VStack>

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
                    <HStack
                        alignItems="center"
                        w={"90%"}
                        justifyContent="space-between"
                        p={5}
                        mb={20}
                    >
                        <Heading>
                            Editar la foto de perfil
                        </Heading>
                        <Ionicons
                            onPress={handleClose}
                            name={"close"}
                            size={25}
                            color={'black'}
                        />
                    </HStack>

                    <VStack
                        w={"90%"}
                        bgColor="white"
                        borderRadius={10}
                    >
                        <ActionsheetItem
                            onPress={takePhoto}
                        >
                            <HStack
                                width={"100%"}
                                alignItems="center"
                                justifyContent="space-between"
                            >
                                <ActionsheetItemText>
                                    Tomar foto
                                </ActionsheetItemText>
                                <Ionicons
                                    name={"camera-outline"}
                                    size={25}
                                    color={'black'}
                                />
                            </HStack>
                        </ActionsheetItem>
                        <Divider my="$0.5" />
                        <ActionsheetItem
                            onPress={selectPhoto}
                        >
                            <HStack
                                width={"100%"}
                                alignItems="center"
                                justifyContent="space-between"
                            >
                                <ActionsheetItemText>
                                    Seleccionar foto
                                </ActionsheetItemText>
                                <AntDesign
                                    name={"picture"}
                                    size={25}
                                    color={'black'}
                                />
                            </HStack>
                        </ActionsheetItem>
                        {
                            profile?.photo !== ''
                            &&
                            <>
                                <Divider my="$0.5" />
                                <ActionsheetItem
                                    onPress={deletePhoto}
                                >
                                    <HStack
                                        width={"100%"}
                                        alignItems="center"
                                        justifyContent="space-between"
                                    >
                                        <ActionsheetItemText
                                            color="red"
                                        >
                                            Eliminar foto
                                        </ActionsheetItemText>
                                        <Ionicons
                                            name={"trash-outline"}
                                            size={25}
                                            color={'red'}
                                        />
                                    </HStack>
                                </ActionsheetItem>
                            </>
                        }
                    </VStack>

                </ActionsheetContent>
            </Actionsheet>
        </VStack>
    )
};

export default EditProfile;