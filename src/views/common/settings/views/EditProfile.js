import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import { View, Avatar, AvatarImage, Button, ButtonText, HStack, Heading, Pressable, Text, VStack, Input, InputField, AvatarFallbackText } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { setProfile } from "../../../../state/profile/profileSlice";
import { editUser } from "../../../../state/users/usersSlice";
//icons
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImagePickerActions from "../../../../utils/ImagePickerActions";

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
            if (response.didCancel || response.errorCode) return;
            if (response.error) {
                Alert.alert('Error', 'Ocurrió un error al seleccionar la imagen');
            } else {
                if (response?.assets[0]?.uri) {
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
            if (response.didCancel || response.errorCode) return;
            if (response.error) {
                Alert.alert('Error', 'Ocurrió un error al seleccionar la imagen');
            } else {
                if (response?.assets[0]?.uri) {
                    let file = `data:${response.assets[0].type};base64,${response.assets[0].base64}`;
                    dispatch(setProfile({ ...profile, photo: file }));
                    dispatch(editUser({ ...profile, photo: file }));
                    setProfileInfo({ ...profileInfo, photo: file });
                }
            }
        });
    };

    const deletePhoto = () => {
        dispatch(setProfile({ ...profile, photo: '' }));
        dispatch(editUser({ ...profile, photo: '' }));
        setProfileInfo({ ...profileInfo, photo: '' });
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

            <ImagePickerActions
                showActionsheet={showActionsheet}
                handleClose={handleClose}
                takePhoto={takePhoto}
                selectPhoto={selectPhoto}
                deletePhoto={deletePhoto}
                profile={profile}
            />
        </VStack>
    )
};

export default EditProfile;