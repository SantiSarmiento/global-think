import React from "react";
import { AddIcon, Button, ButtonIcon, ButtonText, Center, HStack, Text } from "@gluestack-ui/themed";

const Profile = () => {

    return (
        <Center>
            <HStack>

                <Text color="red">
                Profile
                </Text>

                <Button size="md" variant="solid" action="primary" isDisabled={false} isFocusVisible={false} >
                    <ButtonText>Add </ButtonText>
                    <ButtonIcon as={AddIcon} />
                </Button>
            </HStack>

        </Center>
    )
}

export default Profile;