import React from "react";
import { EyeOffIcon, InputField, InputIcon, SearchIcon, Input, EyeIcon } from "@gluestack-ui/themed";

const CustomInputs = ({
    variant,
    isDisabled,
    isInvalid,
    isReadOnly,
    value,
    onChange,
    onBlur,
    placeholder,
    isPassword,
    showPassword,
    setShowPassword,
    keyboardType,
    search
}) => {
    return (
        <Input
            variant={variant ? variant : "outline"}
            bg="white"
            size="lg"
            isDisabled={isDisabled}
            isInvalid={isInvalid}
            isReadOnly={isReadOnly}
            alignItems="center"
            borderRadius={variant ? 0 : 10}
            $focus-borderBlockColor="#ec6664"
            $focus-borderColor="#ec6664"
        >
            {
                search &&
                <InputIcon
                    marginLeft={10}
                >
                    <SearchIcon />
                </InputIcon>
            }
            <InputField
                placeholder={placeholder}
                onChangeText={onChange}
                value={value}
                onBlur={onBlur}
                autoCapitalize="none"
                autoCorrect={false}
                type={isPassword && !showPassword ? "password" : "text"}
                keyboardType={keyboardType ? keyboardType : "default"}
            />
            {
                isPassword &&
                <InputIcon
                    as={!showPassword ? EyeIcon : EyeOffIcon}
                    onPress={setShowPassword}
                />
            }
        </Input>
    )
};

export default CustomInputs;