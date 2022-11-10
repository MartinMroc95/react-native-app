import React from 'react'
import { Control, Controller } from 'react-hook-form'
import { MaterialIcons } from '@expo/vector-icons'
import { FormControl, Icon, Input, WarningOutlineIcon } from 'native-base'

interface Props {
  name: string
  label: string
  control: Control
  placeholder?: string
  errorMessage?: string
}

export const FormTextInput: React.FC<Props> = ({
  control,
  label,
  name,
  placeholder,
  errorMessage,
}) => (
  <FormControl isInvalid={!!errorMessage}>
    <FormControl.Label>{label}</FormControl.Label>
    <Controller
      control={control}
      render={({ field: { onChange, onBlur, value } }) => (
        <Input
          size="md"
          type="text"
          placeholder={placeholder || ''}
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          InputLeftElement={
            <Icon as={<MaterialIcons name="email" />} size={5} mx="2" color="muted.400" />
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
