import React, { useRef, useState } from "react";
import { Divider, HStack, Heading, ModalBackdrop, Text, ModalFooter, VStack, Modal, ModalContent, ModalHeader, ModalCloseButton, Icon, CloseIcon, ModalBody, } from "@gluestack-ui/themed";
import { useDispatch, useSelector } from "react-redux";
import ProfileInfoCard from "./components/ProfileInfoCard";
import { resetProfile } from "../../../state/profile/profileSlice";
import CustomButton from "../../../components/CustomButtom";

const Settings = () => {

    const dispatch = useDispatch();

    const ref = useRef(null)
    const profile = useSelector(state => state.profile);

    const [showModal, setShowModal] = useState(false)

    const handleSignOut = () => {
        dispatch(resetProfile());
    }

    return (
        <VStack
            w={"100%"}
            alignSelf="center"
            justifyContent="space-between"
            h={"100%"}
            bgColor="white"
        >
            <VStack
                w={'90%'}
                alignSelf="center"
            >
                <Heading
                    size="2xl"
                    mt={10}
                >
                    Configuración
                </Heading>
                <ProfileInfoCard profile={profile} />
                <Divider my={5} />
                <CustomButton
                    text1="Cerrar Sesión"
                    onPress={() => setShowModal(true)}
                    variant={'link'}
                    colorText1={'black'}
                />
            </VStack>

            <Modal
                isOpen={showModal}
                onClose={() => {
                    setShowModal(false)
                }}
                finalFocusRef={ref}
            >
                <ModalBackdrop />
                <ModalContent>
                    <ModalHeader>
                        <Heading size="lg">Atención</Heading>
                        <ModalCloseButton>
                            <Icon as={CloseIcon} />
                        </ModalCloseButton>
                    </ModalHeader>
                    <ModalBody>
                        <Text>
                            ¿Está seguro que desea cerrar sesión?
                        </Text>
                    </ModalBody>
                    <ModalFooter>
                        <HStack
                            space="md"
                        >
                            <CustomButton
                                isFocusVisible={false}
                                onPress={() => setShowModal(false)}
                                text1="Cancelar"
                                variant={'link'}
                                colorText1={'black'}
                            />
                            <CustomButton
                                isFocusVisible={false}
                                onPress={handleSignOut}
                                text1="Aceptar"
                            />
                        </HStack>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </VStack>
    )
}

export default Settings;