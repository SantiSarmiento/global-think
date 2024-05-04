import React, { useState } from "react";
import { Button, ButtonSpinner, ButtonText, EyeIcon, EyeOffIcon, Heading, Input, InputField, InputIcon, Text, VStack } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { setProfile } from "../../../state/profile/profileSlice";

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
            const user = users.find(user => user.name === userInfo.name && user.password === userInfo.password);
            if (!user) {
                setError(true);
            } else {
                dispatch(setProfile(user));
            }
            setLoading(false);
        }, 500);
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
                <Heading
                    mt={10}
                    mb={20}
                    size="xl"
                    alignSelf="center"
                >
                    Ingresá tu usuario y contraseña
                </Heading>
                <Input
                    variant="underlined"
                    size="lg"
                    isDisabled={false}
                    isInvalid={false}
                    isReadOnly={false}
                >
                    <InputField
                        placeholder="Usuario"
                        onChangeText={(e) => setUserInfo({ ...userInfo, name: e })}
                        value={userInfo.name}
                    />
                </Input>
                <Input
                    variant="underlined"
                    size="lg"
                    isDisabled={false}
                    isInvalid={false}
                    isReadOnly={false}
                    alignItems="center"
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
                <Button
                    isDisabled={userInfo.name === "" || userInfo.password === "" || loading}
                    isFocusVisible={false}
                    onPress={handleLogin}
                >
                    {
                        loading
                            ?
                            <ButtonSpinner />
                            :
                            <ButtonText>Iniciar sesión </ButtonText>
                    }
                </Button>
                <Button
                    variant="link"
                    onPress={() => navigation.navigate("signup")}
                >
                    <ButtonText
                        color="black"
                    >
                        Es tu primer ingreso ?
                    </ButtonText>
                    <ButtonText> Registrate </ButtonText>
                </Button>

            </VStack>
        </VStack>
    )
}

export default Login;