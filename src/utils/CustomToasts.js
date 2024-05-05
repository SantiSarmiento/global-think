import React from "react";
import { useToast } from "@gluestack-ui/themed";

const CustomToasts = ({ placement, title, description }) => {
  const toast = useToast();

  const showToast = () => {
    toast.show({
      placement: placement || "top",
      render: ({ id }) => {
        const toastId = "toast-" + id;
        return (
          <Toast nativeID={toastId} action="success" variant="solid">
            <VStack space="xs">
              <ToastTitle>{title || "New Message"}</ToastTitle>
              <ToastDescription>{description || "Default Description"}</ToastDescription>
            </VStack>
          </Toast>
        );
      },
    });
  };

  return showToast; // Devolver la función showToast para que se pueda llamar desde fuera del componente
};

export default CustomToasts;
