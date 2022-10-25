import { useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { FormControl, Icon, Input, Pressable, WarningOutlineIcon } from 'native-base'
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
  const [isPasswordShow, setIsPasswordShow] = useState(false)
  return (
    <FormControl isInvalid={!!errorMessage}>
      <FormControl.Label>{label}</FormControl.Label>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            size="md"
            type={isPasswordShow ? 'text' : 'password'}
            placeholder={placeholder}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            InputLeftElement={
              <Icon as={<MaterialIcons name="vpn-key" />} size={5} ml="2" color="muted.400" />
            }
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
