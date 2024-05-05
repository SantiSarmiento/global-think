import React from "react";
import { ActionsheetBackdrop, ActionsheetItemText, HStack, Heading, VStack, Divider, ActionsheetItem, Actionsheet, ActionsheetContent } from "@gluestack-ui/themed";
//icons
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

const ImagePickerActions = ({
    showActionsheet,
    handleClose,
    takePhoto,
    selectPhoto,
    deletePhoto,
    profile,
    text
}) => {
    return (
        <Actionsheet
            isOpen={showActionsheet}
            onClose={handleClose}
            zIndex={999}
        >
            <ActionsheetBackdrop />
            <ActionsheetContent
                zIndex={999}
                paddingBottom={30}
                backgroundColor="#f3f2f8"
            >
                <HStack
                    alignItems="center"
                    w={"90%"}
                    justifyContent="space-between"
                    p={5}
                    mb={20}
                >
                    <Heading>
                        {text ? text : 'Editar la foto de perfil'}
                    </Heading>
                    <Ionicons
                        onPress={handleClose}
                        name={"close"}
                        size={25}
                        color={'black'}
                    />
                </HStack>

                <VStack
                    w={"90%"}
                    bgColor="white"
                    borderRadius={10}
                >
                    <ActionsheetItem
                        onPress={takePhoto}
                    >
                        <HStack
                            width={"100%"}
                            alignItems="center"
                            justifyContent="space-between"
                        >
                            <ActionsheetItemText>
                                Tomar foto
                            </ActionsheetItemText>
                            <Ionicons
                                name={"camera-outline"}
                                size={25}
                                color={'black'}
                            />
                        </HStack>
                    </ActionsheetItem>
                    <Divider my="$0.5" />
                    <ActionsheetItem
                        onPress={selectPhoto}
                    >
                        <HStack
                            width={"100%"}
                            alignItems="center"
                            justifyContent="space-between"
                        >
                            <ActionsheetItemText>
                                Seleccionar foto
                            </ActionsheetItemText>
                            <AntDesign
                                name={"picture"}
                                size={25}
                                color={'black'}
                            />
                        </HStack>
                    </ActionsheetItem>
                    {
                        profile && profile?.photo !== ''
                        &&
                        <>
                            <Divider my="$0.5" />
                            <ActionsheetItem
                                onPress={deletePhoto}
                            >
                                <HStack
                                    width={"100%"}
                                    alignItems="center"
                                    justifyContent="space-between"
                                >
                                    <ActionsheetItemText
                                        color="red"
                                    >
                                        Eliminar foto
                                    </ActionsheetItemText>
                                    <Ionicons
                                        name={"trash-outline"}
                                        size={25}
                                        color={'red'}
                                    />
                                </HStack>
                            </ActionsheetItem>
                        </>
                    }
                </VStack>

            </ActionsheetContent>
        </Actionsheet>
    )
};

export default ImagePickerActions;