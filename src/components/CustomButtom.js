import React from "react";
import { Button, ButtonSpinner, ButtonText } from "@gluestack-ui/themed";

const CustomButton = ({
    isDisabled,
    isFocusVisible,
    variant,
    loading,
    onPress,
    text1,
    colorText1,
    text2,
    colorText2
}) => {
    return (
        <Button
            isDisabled={isDisabled}
            isFocusVisible={isFocusVisible}
            onPress={onPress}
            bgColor={variant === 'link' ? 'transparent' : "#ec6664"}
            variant={variant ? variant : "solid"}
        >
            {
                loading
                    ?
                    <ButtonSpinner />
                    :
                    <>
                        <ButtonText color={colorText1 ? colorText1 : 'white'}>{text1}</ButtonText>
                        <ButtonText color={colorText2 ? colorText2 : 'white'}>{text2}</ButtonText>
                    </>
            }
        </Button>
    )
};

export default CustomButton;