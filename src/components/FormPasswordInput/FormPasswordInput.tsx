import { MaterialIcons } from '@expo/vector-icons'
import { FormControl, Icon, Input, Pressable, WarningOutlineIcon } from 'native-base'
import React from 'react'
import { Control, Controller } from 'react-hook-form'

interface Props {
  name: string
  label: string
  control: Control
  placeholder?: string
  errorMessage?: string
}

export const FormPasswordInput: React.FC<Props> = ({
  control,
  label,
  name,
  placeholder,
  errorMessage,
}) => {
  const [isPasswordShow, setIsPasswordShow] = React.useState(false)
  return (
    <FormControl isInvalid={!!errorMessage}>
      <FormControl.Label>{label}</FormControl.Label>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            type={isPasswordShow ? 'text' : 'password'}
            placeholder={placeholder}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            InputRightElement={
              <Pressable onPress={() => setIsPasswordShow((prevState) => !prevState)}>
                <Icon
                  as={<MaterialIcons name={isPasswordShow ? 'visibility' : 'visibility-off'} />}
                  size={5}
                  mr="2"
                  color="muted.400"
                />
              </Pressable>
            }
          />
        )}
        name={name}
      />
      <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
        {errorMessage && errorMessage}
      </FormControl.ErrorMessage>
    </FormControl>
  )
}
