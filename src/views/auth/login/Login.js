import React, { useState } from "react";
import { Heading, Text, VStack } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { setProfile } from "../../../state/profile/profileSlice";
import CustomInputs from "../../../components/CustomInputs";
import CustomButton from "../../../components/CustomButtom";

const Login = () => {

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const users = useSelector(state => state.users.users);

    const [userInfo, setUserInfo] = useState({
        name: "",
        password: ""
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const handleLogin = () => {
        if (error) setError(false);
        setLoading(true);

        // Simular una demora de 1 segundo antes de continuar
        setTimeout(() => {
            const user = users.find(user => user.username === userInfo.name && user.password === userInfo.password);
            if (!user) {
                setError(true);
            } else {
                dispatch(setProfile(user));
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
                <Heading
                    size="xl"
                    alignSelf="center"
                >
                    Ingresá tu usuario y contraseña
                </Heading>
                <CustomInputs
                    variant="underlined"
                    isDisabled={false}
                    isInvalid={false}
                    isReadOnly={false}
                    value={userInfo.name}
                    onChange={(e) => setUserInfo({ ...userInfo, name: e })}
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
                {
                    error
                    &&
                    <Text
                        color="red"
                        mt={10}
                        alignSelf="center"
                    >
                        Usuario y/o contraseña incorrectos
                    </Text>
                }
            </VStack>

            <VStack
                w={"90%"}
            >
                <CustomButton
                    isDisabled={userInfo.name === "" || userInfo.password === "" || loading}
                    isFocusVisible={false}
                    loading={loading}
                    onPress={handleLogin}
                    text1="Iniciar sesión"
                />

                <CustomButton
                    variant={"link"}
                    onPress={() => navigation.navigate("signup")}
                    text1="Es tu primer ingreso ?"
                    colorText1={'black'}
                    text2=" Registrate"
                    colorText2={'#ec6664'}
                />

            </VStack>
        </VStack>
    )
}

export default Login;