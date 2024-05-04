import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";
import CommonRoutes from "./CommonRoutes";
import AuthRoutes from "./AuthRoutes";

const AppNavigator = () => {

    const profile = useSelector(state => state.profile);

    return (
        <NavigationContainer>
            {
                profile.id
                    ?
                    <CommonRoutes />
                    :
                    <AuthRoutes />
            }
        </NavigationContainer>
    )
};

export default AppNavigator;