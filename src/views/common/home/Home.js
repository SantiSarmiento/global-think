import React, { useState } from "react";
import { AddIcon, Button, ButtonIcon, ButtonText, Center, HStack, Heading, Input, InputField, InputIcon, SearchIcon, Text, VStack } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import ChatsList from "./components/ChatsList";

const Home = () => {

    const navigation = useNavigation();

    const [searchCondition, setSearchCondition] = useState("");

    return (
        <VStack
            w={"100%"}
            h={"100%"}
            bgColor="white"
        >
            <VStack
                w={"90%"}
                alignSelf="center"
            >
                <Heading
                    size="2xl"
                    mt={10}
                >
                    Chats
                </Heading>
                <HStack
                    mt={10}
                >
                    <Input
                        variant="outline"
                        size="md"
                        isDisabled={false}
                        isInvalid={false}
                        isReadOnly={false}
                        bgColor="#eeeeef"
                        w={"100%"}
                        alignItems="center"
                    >
                        <InputIcon
                            marginLeft={10}
                        >
                            <SearchIcon />
                        </InputIcon>
                        <InputField
                            placeholder="Buscar"
                            onChangeText={(e) => setSearchCondition(e)}
                            value={searchCondition}
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                    </Input>
                </HStack>
            </VStack>
            <ChatsList searchCondition={searchCondition} />
        </VStack>
    )
}

export default Home;