import { useState } from 'react';
import {
  AddressSuggestions,
  type DaDataAddress,
  type DaDataAddressBounds,
  type DaDataSuggestion,
} from 'react-dadata';
import { useDadataToken } from '~/hooks/useDadataToken';

interface AddressInputProps {
  value: DaDataSuggestion<DaDataAddress> | undefined;
  onChange: (value: DaDataSuggestion<DaDataAddress> | undefined) => void;
  className?: string;
  filterFromBound?: DaDataAddressBounds;
  filterToBound?: DaDataAddressBounds;
  filterLocations?: Dictionary[];
  hint?: string;
}

type Dictionary = Record<string, unknown>;

export default function AddressInput({
  value,
  onChange,
  className,
  filterFromBound,
  filterToBound,
  filterLocations,
  hint,
}: AddressInputProps) {
  console.log(filterLocations);
  const token = useDadataToken();
  return (
    <div className={className}>
      <AddressSuggestions
        inputProps={{
          placeholder: hint ?? '',
        }}
        delay={500}
        filterFromBound={filterFromBound}
        filterToBound={filterToBound}
        hintText={hint ?? ''}
        filterLocations={filterLocations}
        token={token}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
