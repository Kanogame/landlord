import { useState } from 'react';
import {
  AddressSuggestions,
  type DaDataAddress,
  type DaDataSuggestion,
} from 'react-dadata';
import { useDadataToken } from '~/hooks/useDadataToken';

interface AddressInputProps {
  value: DaDataSuggestion<DaDataAddress> | undefined;
  onChange: (value: DaDataSuggestion<DaDataAddress> | undefined) => void;
  className?: string;
}

export default function AddressInput({
  value,
  onChange,
  className,
}: AddressInputProps) {
  const token = useDadataToken();

  console.log(value?.data.city, value?.data, value?.data.street);
  return (
    <div className={className}>
      <AddressSuggestions
        inputProps={{
          placeholder: 'Введите адрес',
        }}
        hintText="Введите адрес"
        token={token}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
