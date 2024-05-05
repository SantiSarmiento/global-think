import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";
import CommonRoutes from "./CommonRoutes";
import AuthRoutes from "./AuthRoutes";
import { SafeAreaView } from "@gluestack-ui/themed";

const AppNavigator = () => {

    const profile = useSelector(state => state.profile);

    return (
        <>
            <SafeAreaView style={{ flex: 0, backgroundColor: 'white' }} />
            <SafeAreaView style={{ flex: 1, backgroundColor: profile.id ? '#edeef5' : 'white' }}>
                <NavigationContainer>
                    {
                        profile.id
                            ?
                            <CommonRoutes />
                            :
                            <AuthRoutes />
                    }
                </NavigationContainer>
            </SafeAreaView>
        </>
    )
};

export default AppNavigator;