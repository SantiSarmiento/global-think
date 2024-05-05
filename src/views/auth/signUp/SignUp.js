import React, { useState } from "react";
import { useSelector } from "react-redux";
import { HStack, Heading, Text, VStack } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomInputs from "../../../components/CustomInputs";
import CustomButton from "../../../components/CustomButtom";

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
                space="md"
            >
                <HStack
                    alignItems="center"
                    mt={10}
                    width={'90%'}
                    mb={20}
                >
                    <AntDesign
                        onPress={() => !loading && navigation.goBack()}
                        name={"left"}
                        size={20}
                        color={'#ec6664'}
                    />

                    <Heading
                        size="xl"
                        ml={5}
                    >
                        Registro
                    </Heading>
                </HStack>


                <CustomInputs
                    variant="underlined"
                    isDisabled={false}
                    isInvalid={false}
                    isReadOnly={false}
                    value={userInfo.username}
                    onChange={(e) => setUserInfo({ ...userInfo, username: e })}
                    placeholder="Usuario"
                />

                <CustomInputs
                    variant="underlined"
                    isDisabled={false}
                    isInvalid={false}
                    isReadOnly={false}
                    value={userInfo.password}
                    onChange={(e) => setUserInfo({ ...userInfo, password: e })}
                    placeholder="Contraseña"
                    isPassword
                    showPassword={showPassword}
                    setShowPassword={() => setShowPassword(!showPassword)}
                />

                <CustomInputs
                    variant="underlined"
                    isDisabled={false}
                    isInvalid={false}
                    isReadOnly={false}
                    value={userInfo.confirmPassword}
                    onChange={(e) => setUserInfo({ ...userInfo, confirmPassword: e })}
                    placeholder="Confirmar contraseña"
                    isPassword
                    showPassword={showPassword}
                    setShowPassword={() => setShowPassword(!showPassword)}
                />

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
            <VStack
                w={"90%"}
            >
                <CustomButton
                    isDisabled={userInfo.username === "" || userInfo.password === "" || userInfo.confirmPassword === "" || loading}
                    isFocusVisible={false}
                    loading={loading}
                    onPress={handleSignUp}
                    text1={'Continuar'}
                />
            </VStack>
        </VStack>
    )
}

export default SignUp;