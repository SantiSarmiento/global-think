import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import { View, Avatar, AvatarImage, HStack, Heading, Pressable, Text, VStack, AvatarFallbackText } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { setProfile } from "../../../../state/profile/profileSlice";
import { editUser } from "../../../../state/users/usersSlice";
import AntDesign from 'react-native-vector-icons/AntDesign';
import ImagePickerActions from "../../../../utils/ImagePickerActions";
import CustomInputs from "../../../../components/CustomInputs";
import CustomButton from "../../../../components/CustomButtom";

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
            w={"100%"}
            alignSelf="center"
            h={"100%"}
            bgColor="#edeef5"
        >
            <HStack
                alignItems="center"
                justifyContent="space-between"
                mt={10}
                w={"90%"}
                alignSelf="center"
            >
                <HStack
                    alignItems="center"
                >
                    <AntDesign
                        onPress={() => navigation.goBack()}
                        name={"left"}
                        size={20}
                        color={'#ec6664'}
                    />

                    <Heading
                        size="lg"
                        ml={5}
                    >
                        Editar perfil
                    </Heading>
                </HStack>
                {
                    isModified
                    &&

                    <CustomButton
                        variant={'link'}
                        onPress={hanldeEditProfile}
                        text1={'OK'}
                        colorText1={'#ec6664'}
                    />

                }
            </HStack>

            <View
                alignSelf="center"
            >
                <Pressable
                    onPress={() => setShowActionsheet(!showActionsheet)}
                >
                    <Avatar
                        bgColor='#ec6664'
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
                space="sm"
                w={"90%"}
                alignSelf="center"
            >
                <Text>INFORMACIÓN PERSONAL</Text>
                <CustomInputs
                    isDisabled={false}
                    isInvalid={false}
                    isReadOnly={false}
                    value={profileInfo.name}
                    placeholder="Nombre"
                    onChange={(e) => setProfileInfo({ ...profileInfo, name: e })}
                    onBlur={() => {
                        if (profileInfo.name === "") {
                            setProfileInfo({ ...profileInfo, name: profile.name });
                        }
                    }}
                />
                <CustomInputs
                    isDisabled={false}
                    isInvalid={false}
                    isReadOnly={false}
                    value={profileInfo.lastname}
                    placeholder="Apellido"
                    onChange={(e) => setProfileInfo({ ...profileInfo, lastname: e })}
                    onBlur={() => {
                        if (profileInfo.lastname === "") {
                            setProfileInfo({ ...profileInfo, lastname: profile.lastname });
                        }
                    }}
                />
            </VStack>

            <VStack
                mt={20}
                space="sm"
                w={"90%"}
                alignSelf="center"
            >
                <Text>NÚMERO DE TELÉFONO</Text>
                <CustomInputs
                    isDisabled={true}
                    isInvalid={false}
                    isReadOnly={false}
                    value={profileInfo.phone}
                />
            </VStack>

            <VStack
                mt={20}
                space="sm"
                w={"90%"}
                alignSelf="center"
            >
                <Text>ESTADO</Text>
                <CustomInputs
                    isDisabled={false}
                    isInvalid={false}
                    isReadOnly={false}
                    value={profileInfo.status}
                    placeholder="Estado"
                    onChange={(e) => setProfileInfo({ ...profileInfo, status: e })}
                    onBlur={() => {
                        if (profileInfo.status === "") {
                            setProfileInfo({ ...profileInfo, status: profile.status });
                        }
                    }}
                />
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