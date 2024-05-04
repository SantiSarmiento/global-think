import React from "react";
import { Avatar, AvatarFallbackText, AvatarImage, Text, VStack } from "@gluestack-ui/themed";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const ProfileInfoCard = ({ profile }) => {

    const navigation = useNavigation();

    return (
        <TouchableOpacity
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 10,
                backgroundColor: 'white',
                borderRadius: 10,
                marginTop: 20
            }}
            onPress={() => navigation.navigate('editprofile')}
        >
            <Avatar
                bgColor='$amber600'
                size="md"
                borderRadius="$full"
            >
                {
                    profile?.photo !== ''
                        ?
                        <AvatarImage
                            source={{ uri: profile?.photo }}
                            alt="Profile Image"
                        />
                        :
                        <AvatarFallbackText>{profile?.name + ' ' + profile?.lastname}</AvatarFallbackText>
                }
            </Avatar>
            <VStack
                ml={10}
            >
                <Text
                    size="lg"
                    color="black"
                >
                    {profile?.name} {profile?.lastname}
                </Text>
                <Text
                    size="sm"
                    color="gray"
                >
                    {profile?.status}
                </Text>
            </VStack>
        </TouchableOpacity>
    )
};

export default ProfileInfoCard;