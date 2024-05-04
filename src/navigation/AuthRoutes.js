import React from "react";
import Login from "../views/auth/login/Login";
import SignUp from "../views/auth/signUp/SignUp";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const AuthRoutes = () => {

    return (
        <Stack.Navigator>
            <Stack.Screen name="login" component={Login} />
            <Stack.Screen name="signup" component={SignUp} />
        </Stack.Navigator>
    )
};

export default AuthRoutes;