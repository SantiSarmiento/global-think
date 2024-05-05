import React, { useState } from "react";
import { Button, ButtonText, Input, HStack, Heading, Text, VStack, InputField, ButtonSpinner, Toast, ToastDescription } from "@gluestack-ui/themed";
//icons
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ImagePickerActions from "../../../../utils/ImagePickerActions";
import { View } from "@gluestack-ui/themed";
import { Pressable } from "@gluestack-ui/themed";
import { Avatar } from "@gluestack-ui/themed";
import { AvatarImage } from "@gluestack-ui/themed";
import { AvatarFallbackText } from "@gluestack-ui/themed";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../../../state/users/usersSlice";
import { useToast } from "@gluestack-ui/themed";
import { ToastTitle } from "@gluestack-ui/themed";

const optionsPhotos = {
    title: 'Seleccione una imagen',
    quality: 0.4,
    maxWidth: 420,
    maxHeight: 560,
    includeBase64: true
};

const EndSignUp = ({ route }) => {

    const navigation = useNavigation();
    const toast = useToast();

    const dispatch = useDispatch();
    const lastID = useSelector(state => state.users.lastId)

    const [userInfo, setUserInfo] = useState({
        username: route.params.username,
        password: route.params.password,
        name: "",
        lastname: "",
        phone: "",
        photo: "",
        status: 'Disponible',
        lastSeen: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showActionsheet, setShowActionsheet] = useState(false)

    const handleClose = () => setShowActionsheet(!showActionsheet)

    const takePhoto = () => {
        launchCamera(optionsPhotos, (response) => {
            if (response.didCancel) return;
            if (response.error) {
                Alert.alert('Error', 'Ocurrió un error al seleccionar la imagen');
            } else {
                if (response.assets[0].uri) {
                    let file = `data:${response.assets[0].type};base64,${response.assets[0].base64}`;
                    setUserInfo({ ...userInfo, photo: file });
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
                    setUserInfo({ ...userInfo, photo: file });
                }
            }
        });
    };

    const deletePhoto = () => {
        setUserInfo({ ...userInfo, photo: '' });
    };

    const validateForm = () => {
        //validaciones basicas para simular un formulario real

        if (userInfo.name.length < 3) {
            setError("El nombre debe tener al menos 3 caracteres");
            return false;
        }

        if (userInfo.lastname.length < 3) {
            setError("El apellido debe tener al menos 3 caracteres");
            return false;
        }

        if (isNaN(userInfo.phone)) {
            setError("El teléfono debe ser un número válido");
            return false;
        }
        return true;
    };

    const handleSignUp = () => {
        if (error) setError(false);
        setLoading(true);
        // Simular una demora de 1 segundo antes de continuar
        setTimeout(() => {
            if (!validateForm()) {
                setLoading(false);
                return;
            } else {
                toast.show({
                    placement: "top",
                    duration: 2000,
                    render: ({ id }) => {
                        const toastId = "toast-" + id
                        return (
                            <Toast nativeID={toastId} action="success" variant="solid">
                                <VStack space="xs">
                                    <ToastTitle>Usuario creado correctamente</ToastTitle>
                                </VStack>
                            </Toast>
                        )
                    },
                })
                dispatch(addUser({ ...userInfo, id: lastID + 1 }));
                navigation.navigate("login");
            }
            setLoading(false);
        }, 1000);
    };

    return (
        <VStack
            h={"100%"}
            alignItems="center"
            justifyContent="space-between"
            bgColor="white"
            p={10}
        >
            <VStack
                w={"90%"}
            >
                <HStack
                    alignItems="center"
                    mt={10}
                    width={'90%'}
                    mb={20}
                >
                    <Ionicons
                        onPress={() => !loading && navigation.goBack()}
                        name={"arrow-back"}
                        size={25}
                        color={'black'}
                    />

                    <Heading
                        size="xl"
                        ml={5}
                    >
                        Terminar registro
                    </Heading>
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
                                userInfo?.photo !== ''
                                    ?
                                    <AvatarImage
                                        source={{ uri: userInfo?.photo }}
                                        alt="Profile Image"
                                    />
                                    :
                                    <AvatarFallbackText>{userInfo?.name + ' ' + userInfo?.lastname}</AvatarFallbackText>
                            }
                        </Avatar>
                    </Pressable>
                </View>

                <Input
                    variant="underlined"
                    size="lg"
                    isInvalid={false}
                >
                    <InputField
                        placeholder="Nombre"
                        onChangeText={(e) => setUserInfo({ ...userInfo, name: e })}
                        value={userInfo.name}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                </Input>

                <Input
                    variant="underlined"
                    size="lg"
                    isInvalid={false}
                    mt={10}
                >
                    <InputField
                        placeholder="Apellido"
                        onChangeText={(e) => setUserInfo({ ...userInfo, lastname: e })}
                        value={userInfo.lastname}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                </Input>

                <Input
                    variant="underlined"
                    size="lg"
                    isInvalid={false}
                    mt={10}
                >
                    <InputField
                        placeholder="Teléfono"
                        onChangeText={(e) => setUserInfo({ ...userInfo, phone: e })}
                        value={userInfo.phone}
                        keyboardType="phone-pad"
                    />
                </Input>

                {
                    error
                    &&
                    <Text
                        color="red"
                        mt={10}
                        alignSelf="center"
                    >
                        {error}
                    </Text>
                }
            </VStack>
            <Button
                isDisabled={userInfo.name === "" || userInfo.lastname === "" || userInfo.phone === "" || loading}
                isFocusVisible={false}
                onPress={handleSignUp}
                width={'90%'}
            >
                {
                    loading
                        ?
                        <ButtonSpinner />
                        :
                        <ButtonText>Registrar</ButtonText>
                }
            </Button>

            <ImagePickerActions
                showActionsheet={showActionsheet}
                handleClose={handleClose}
                takePhoto={takePhoto}
                selectPhoto={selectPhoto}
                deletePhoto={deletePhoto}
                profile={userInfo}
            />
        </VStack>
    )
};

export default EndSignUp;