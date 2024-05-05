import React, { useState } from "react";
import { useSelector } from "react-redux";
import { AddIcon, Button, ButtonIcon, ButtonText, Input, EyeIcon, HStack, Heading, Text, VStack, InputField, EyeOffIcon, InputIcon, ButtonSpinner } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import Ionicons from 'react-native-vector-icons/Ionicons';

const SignUp = () => {

    const navigation = useNavigation();
    const users = useSelector(state => state.users.users);

    const [userInfo, setUserInfo] = useState({
        username: "",
        password: "",
        confirmPassword: ""
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const validateForm = () => {
        //validaciones basicas para simular un formulario real

        if (userInfo.username.includes(" ")) {
            setError("El nombre de usuario no puede contener espacios");
            return false;
        }

        if (userInfo.password !== userInfo.confirmPassword) {
            setError("Las contraseñas no coinciden");
            return false;
        }

        if (userInfo.password.length < 4) {
            setError("La contraseña debe tener al menos 4 caracteres");
            return false;
        }
        return true;
    }


    const handleSignUp = () => {
        if (error) setError(false);
        setLoading(true);

        // Simular una demora de 1 segundo antes de continuar
        setTimeout(() => {
            if (!validateForm()) {
                setLoading(false);
                return;
            } else {
                const user = users.find(user => user.username === userInfo.username);

                if (user) {
                    setError("Ya existe un usuario con ese nombre");
                } else {
                    navigation.navigate("endsignup", userInfo);
                }
            }
            setLoading(false);
        }, 1000);
    }

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
                        Registro
                    </Heading>
                </HStack>

                <Input
                    variant="underlined"
                    size="lg"
                    isInvalid={false}
                >
                    <InputField
                        placeholder="Usuario"
                        onChangeText={(e) => setUserInfo({ ...userInfo, username: e })}
                        value={userInfo.username}
                    />
                </Input>

                <Input
                    variant="underlined"
                    size="lg"
                    isInvalid={false}
                    alignItems="center"
                    mt={10}
                >
                    <InputField
                        placeholder="Contraseña"
                        onChangeText={(e) => setUserInfo({ ...userInfo, password: e })}
                        value={userInfo.password}
                        type={showPassword ? "text" : "password"}
                    />
                    <InputIcon
                        as={!showPassword ? EyeIcon : EyeOffIcon}
                        onPress={() => setShowPassword(!showPassword)} />
                </Input>

                <Input
                    variant="underlined"
                    size="lg"
                    isInvalid={false}
                    alignItems="center"
                    mt={10}
                >
                    <InputField
                        placeholder="Ingrese nuevamente la contraseña"
                        onChangeText={(e) => setUserInfo({ ...userInfo, confirmPassword: e })}
                        value={userInfo.confirmPassword}
                        type={showPassword ? "text" : "password"}
                    />
                    <InputIcon
                        as={!showPassword ? EyeIcon : EyeOffIcon}
                        onPress={() => setShowPassword(!showPassword)} />
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
                isDisabled={userInfo.name === "" || userInfo.password === "" || userInfo.confirmPassword === "" || loading}
                isFocusVisible={false}
                onPress={handleSignUp}
                width={'90%'}
            >
                {
                    loading
                        ?
                        <ButtonSpinner />
                        :
                        <ButtonText>Continuar </ButtonText>
                }
            </Button>
        </VStack>
    )
}

export default SignUp;