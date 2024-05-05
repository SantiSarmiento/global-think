import React from "react";
import Login from "../views/auth/login/Login";
import SignUp from "../views/auth/signUp/SignUp";
import { createStackNavigator } from "@react-navigation/stack";
import EndSignUp from "../views/auth/signUp/views/EndSignUp";

const Stack = createStackNavigator();

const AuthRoutes = () => {

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="login" component={Login} />
            <Stack.Screen name="signup" component={SignUp} />
            <Stack.Screen name="endsignup" component={EndSignUp} />
        </Stack.Navigator>
    )
};

export default AuthRoutes;