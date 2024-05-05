import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../views/common/home/Home";
import Settings from "../views/common/settings/Settings";
import Chat from "../views/common/chat/Chat";
import Ionicons from 'react-native-vector-icons/Ionicons';
import EditProfile from "../views/common/settings/views/EditProfile";
import ArchivedChats from "../views/common/home/views/ArchivedChats";


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabNavigator() {

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    height: 60,
                    backgroundColor: "#edeef5"
                }
            }}
        >
            <Tab.Screen
                name="chatlist"
                component={Home}
                options={{
                    title: "Chats",
                    tabBarIcon: ({ focused }) => {
                        return (
                            <Ionicons name={focused ? "chatbubbles-sharp" : "chatbubbles-outline"} size={30} color={focused ? '#ec6664' : 'black'} />
                        )
                    },
                }}
            />
            <Tab.Screen
                name="settings"
                component={Settings}
                options={{
                    title: "Configuración",
                    tabBarIcon: ({ focused }) => {
                        return (
                            <Ionicons name={focused ? "settings-sharp" : "settings-outline"} size={30} color={focused ? '#ec6664' : 'black'} />
                        )
                    },
                }}
            />
        </Tab.Navigator>
    );
}

const CommonRoutes = () => {

    return (
        <Stack.Navigator
            screenOptions={() => ({
                headerShown: false,
            })}
        >
            <Stack.Screen
                name="Home"
                component={TabNavigator}
            />
            <Stack.Screen name="chat" component={Chat} />
            <Stack.Screen name="editprofile" component={EditProfile} />
            <Stack.Screen name="archived" component={ArchivedChats} />
        </Stack.Navigator>
    )
};

export default CommonRoutes;