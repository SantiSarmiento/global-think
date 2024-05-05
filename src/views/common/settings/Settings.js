import React from "react";
import { Button, ButtonText, Heading, VStack } from "@gluestack-ui/themed";
import { useDispatch, useSelector } from "react-redux";
import ProfileInfoCard from "./components/ProfileInfoCard";
import { resetProfile } from "../../../state/profile/profileSlice";

const Settings = () => {

    const dispatch = useDispatch();

    const profile = useSelector(state => state.profile);

    const handleSignOut = () => {
        dispatch(resetProfile());
    }

    return (
        <VStack
            w={"100%"}
            alignSelf="center"
            justifyContent="space-between"
            h={"100%"}
            bgColor="white"
        >
            <VStack
                w={'90%'}
                alignSelf="center"
            >
                <Heading
                    size="2xl"
                    mt={10}
                >
                    Configuración
                </Heading>
                <ProfileInfoCard profile={profile} />
            </VStack>

            <Button
                variant="link"
                onPress={handleSignOut}
            >
                <ButtonText
                    color="black"
                >
                    Cerrar sesión
                </ButtonText>
            </Button>

        </VStack>
    )
}

export default Settings;