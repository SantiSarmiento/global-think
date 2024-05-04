import React, { useEffect } from "react";
import { Platform, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { prueba } from "../../state/profile/profileSlice";

const Login = () => {

    const dispatch = useDispatch()
    const profile = useSelector((state) => state.profile)
    console.log(Platform.OS, profile)

    useEffect(() => {
        //dispatch(prueba({ name: 'ACA ES ANDROID' }))
    }, [])

    return (
        <View>
            <Text>qwdqw</Text>
        </View>
    )
}

export default Login;