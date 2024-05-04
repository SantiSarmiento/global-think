import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../views/common/home/Home";
import Settings from "../views/common/settings/Settings";
import Chat from "../views/common/chat/Chat";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabNavigator() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="chatlist" component={Home} />
            <Tab.Screen name="settings" component={Settings} />
        </Tab.Navigator>
    );
}

const CommonRoutes = () => {

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={TabNavigator}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="chat" component={Chat} />
        </Stack.Navigator>
    )
};

export default CommonRoutes;