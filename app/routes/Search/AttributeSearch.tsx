import { useState, useEffect } from 'react';
import { useFetcher } from 'react-router';
import { PropertyAttributeType } from '~/lib/property';
import type { SearchAttribute } from '~/lib/attributeApi';
import ComboBox from '~/components/ComboBox';
import NumberInput from '~/components/NumberInput';
import ToggleLabel from '~/components/ToggleLabel';
import ButtonEmpty from '~/components/ButtonEmpty';
import ButtonAccent from '~/components/ButtonAccent';

interface AttributeSearchProps {
  attributes: SearchAttribute[];
  searchParams: URLSearchParams;
  isDesktop: boolean;
  onApply: (params: URLSearchParams) => void;
  onClose: () => void;
}

export default function AttributeSearch({
  attributes,
  searchParams,
  isDesktop,
  onApply,
  onClose,
}: AttributeSearchProps) {
  // Intermediate state for attribute values
  const [localAttributeValues, setLocalAttributeValues] = useState<
    Record<string, string>
  >({});

  // Initialize local state from URL params on mount
  useEffect(() => {
    const initialValues: Record<string, string> = {};
    for (const [key, value] of searchParams.entries()) {
      if (key.startsWith('attr_')) {
        const attributeName = key.replace('attr_', '');
        initialValues[attributeName] = value;
      }
    }
    setLocalAttributeValues(initialValues);
  }, [searchParams]);

  const getLocalAttributeValue = (attributeName: string): string => {
    return localAttributeValues[attributeName] || '';
  };

  const updateLocalAttribute = (attributeName: string, value: string) => {
    setLocalAttributeValues(prev => ({
      ...prev,
      [attributeName]: value,
    }));
  };

  const clearLocalAttribute = (attributeName: string) => {
    setLocalAttributeValues(prev => {
      const newValues = { ...prev };
      delete newValues[attributeName];
      return newValues;
    });
  };

  const resetAllLocalAttributes = () => {
    setLocalAttributeValues({});
  };

  const handleApply = () => {
    const newParams = new URLSearchParams(searchParams);

    // Remove all existing attribute parameters
    for (const key of Array.from(newParams.keys())) {
      if (key.startsWith('attr_')) {
        newParams.delete(key);
      }
    }

    // Add current local attribute values
    Object.entries(localAttributeValues).forEach(([attributeName, value]) => {
      if (value) {
        newParams.set(`attr_${attributeName}`, value);
      }
    });

    onApply(newParams);
    onClose();
  };

  const handleReset = () => {
    resetAllLocalAttributes();
  };

  const renderAttributeInput = (attribute: SearchAttribute) => {
    const currentValue = getLocalAttributeValue(attribute.attributeName);

    // Type 0 - ComboBox string
    if (attribute.attributeType === 0 && attribute.possibleValues.length > 0) {
      const options = attribute.possibleValues.map(value => ({
        value,
        label: value,
      }));

      return (
        <div
          key={attribute.attributeName}
          className="flex justify-between items-center"
        >
          <span className="h5-def">{attribute.attributeName}</span>
          <div className="flex items-center gap-2">
            <ComboBox
              options={options}
              value={currentValue}
              onChange={value => {
                updateLocalAttribute(attribute.attributeName, value || '');
              }}
              placeholder="Выберите"
              className="w-40"
            />
          </div>
        </div>
      );
    }

    // Type 2 - Toggle (Boolean)
    if (attribute.attributeType === 2) {
      return (
        <ToggleLabel
          key={attribute.attributeName}
          label={attribute.attributeName}
          checked={currentValue === 'true'}
          onChange={checked => {
            updateLocalAttribute(attribute.attributeName, checked.toString());
          }}
        />
      );
    }

    // Type 1 - Number input
    if (attribute.attributeType === 1) {
      return (
        <div
          key={attribute.attributeName}
          className="flex justify-between items-center"
        >
          <span className="h5-def">{attribute.attributeName}</span>
          <div className="flex items-center gap-2">
            <NumberInput
              value={currentValue ? parseInt(currentValue) : undefined}
              onChange={value => {
                updateLocalAttribute(
                  attribute.attributeName,
                  value?.toString() || ''
                );
              }}
              placeholder="Значение"
              className="w-32"
            />
          </div>
        </div>
      );
    }
  };

  // Check if there are any changes from the original URL state
  const hasChanges = () => {
    const urlAttributeValues: Record<string, string> = {};
    for (const [key, value] of searchParams.entries()) {
      if (key.startsWith('attr_')) {
        const attributeName = key.replace('attr_', '');
        urlAttributeValues[attributeName] = value;
      }
    }

    // Compare local state with URL state
    const localKeys = Object.keys(localAttributeValues);
    const urlKeys = Object.keys(urlAttributeValues);

    if (localKeys.length !== urlKeys.length) return true;

    return localKeys.some(
      key => localAttributeValues[key] !== urlAttributeValues[key]
    );
  };

  return (
    <div className="flex flex-col gap-4">
      {attributes.length === 0 ? (
        <div className="text-center py-4">
          <span className="text-muted-foreground">Нет доступных атрибутов</span>
        </div>
      ) : (
        <>
          {attributes.map(renderAttributeInput)}

          <div className="flex flex-col gap-2 mt-4">
            <ButtonEmpty
              label="Сбросить атрибуты"
              onClick={handleReset}
              width="100%"
              height="40px"
            />
            <ButtonAccent
              label={`Применить${hasChanges() ? ' *' : ''}`}
              onClick={handleApply}
              width="100%"
              height="40px"
            />
          </div>
        </>
      )}
    </div>
  );
}
