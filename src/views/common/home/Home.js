import React, { useState } from "react";
import { Heading, SafeAreaView, VStack, View } from "@gluestack-ui/themed";
import ChatsList from "./components/ChatsList";
import CustomInputs from "../../../components/CustomInputs";

const Home = () => {

    const [searchCondition, setSearchCondition] = useState("");

    return (
        <SafeAreaView bgColor="blue" style={{ flex: 2 }}>
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
                    <View
                        mt={10}
                        width={'100%'}
                    >
                        <CustomInputs
                            search
                            value={searchCondition}
                            onChange={(text) => setSearchCondition(text)}
                            placeholder="Search"
                        />
                    </View>
                </VStack>
                <ChatsList searchCondition={searchCondition} />
            </VStack>
        </SafeAreaView>
    )
}

export default Home;