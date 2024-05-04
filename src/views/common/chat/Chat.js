import React from "react";
import { AddIcon, Button, ButtonIcon, ButtonText, Center, HStack, Text } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";

const Chat = () => {

    const navigation = useNavigation();

    return (
        <Center>
            <HStack>

                <Text color="red">
                    Chat
                </Text>

                <Button
                    onPress={() => navigation.navigate('signup')}
                    size="md"
                    variant="solid"
                    action="primary"
                    isDisabled={false}
                    isFocusVisible={false}
                >
                    <ButtonText>Add </ButtonText>
                    <ButtonIcon as={AddIcon} />
                </Button>
            </HStack>

        </Center>
    )
}

export default Chat;