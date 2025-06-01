import { useState } from 'react';
import Modal from '~/components/Modal';
import PropertyInfoLine from '~/components/PropertyInfoLine';
import ButtonIcon from '~/components/ButtonIcon';
import iconPencil from '~/media/icons/icon-pencil.svg';
import iconTrash from '~/media/icons/icon-trash.svg';
import { type TPropertyAttribute } from '~/lib/property';
import { Input } from './ui/input';
import ComboBox from './ComboBox';
import NumberInput from './NumberInput';
import Toggle from './Toggle';
import ButtonAccent from './ButtonAccent';
import ButtonEmpty from './ButtonEmpty';

interface PropertyAttributesModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  attributes: TPropertyAttribute[];
  onAttributesChange: (attributes: TPropertyAttribute[]) => void;
  isDesktop: boolean;
  trigger: React.ReactNode;
}

enum TAttibuteType {
  number,
  text,
  toggle,
}

const attributeTypeOptions = [
  { value: TAttibuteType.number, label: 'Число' },
  { value: TAttibuteType.text, label: 'Текст' },
  { value: TAttibuteType.toggle, label: 'Да/Нет' },
];

interface TNewAttribute {
  name: string;
  type: TAttibuteType;
  value: string;
}

export default function PropertyAttributesModal({
  isOpen,
  onOpenChange,
  attributes,
  onAttributesChange,
  isDesktop,
  trigger,
}: PropertyAttributesModalProps) {
  const [editingAttribute, setEditingAttribute] =
    useState<TNewAttribute | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  const handleDeleteAttribute = (index: number) => {
    const newAttributes = attributes.filter((_, i) => i !== index);
    onAttributesChange(newAttributes);
  };

  const handleEditAttribute = (index: number) => {
    const attr = attributes[index];
    setEditingAttribute({
      name: attr.name,
      type: TAttibuteType.number,
      value: attr.value,
    });
  };

  const handleAddNew = () => {
    setIsAddingNew(true);
    setEditingAttribute({
      name: '',
      type: TAttibuteType.number,
      value: '',
    });
  };

  const handleSaveAttribute = () => {
    if (!editingAttribute) return;

    const newAttribute: TPropertyAttribute = {
      name: editingAttribute.name,
      value: editingAttribute.value,
    };

    if (isAddingNew) {
      onAttributesChange([...attributes, newAttribute]);
    } else {
      // Find and update existing attribute
      const updatedAttributes = attributes.map(attr =>
        attr.value === editingAttribute.value ? newAttribute : attr
      );
      onAttributesChange(updatedAttributes);
    }

    setEditingAttribute(null);
    setIsAddingNew(false);
  };

  const handleSave = () => {
    onOpenChange(false);
  };

  const formatAttributeValue = (attr: TPropertyAttribute) => {
    // You can add specific formatting based on attribute type
    return attr.value;
  };

  return (
    <>
      <Modal
        open={isOpen}
        onOpenChange={onOpenChange}
        title="Редактировать"
        isDesktop={isDesktop}
        trigger={trigger}
      >
        <div className="flex flex-col gap-[10px] max-h-[250px] overflow-y-auto">
          {attributes.map((attr, index) => (
            <div key={attr.value} className="flex items-center gap-[10px]">
              <PropertyInfoLine
                label={attr.name}
                value={formatAttributeValue(attr)}
                className="flex-1"
              />
              <ButtonIcon
                icon={iconPencil}
                onClick={() => handleEditAttribute(index)}
              />
              <ButtonIcon
                icon={iconTrash}
                onClick={() => handleDeleteAttribute(index)}
              />
            </div>
          ))}
        </div>
        <div className="flex gap-[10px] flex-col flex-1">
          <ButtonEmpty
            label="Добавить поле"
            onClick={handleAddNew}
            width="100%"
          />
          <ButtonAccent label="Сохранить" onClick={handleSave} width="100%" />
        </div>
      </Modal>

      {editingAttribute && (
        <AttributeEditModal
          attribute={editingAttribute}
          onAttributeChange={setEditingAttribute}
          onSave={handleSaveAttribute}
          onCancel={() => {
            setEditingAttribute(null);
            setIsAddingNew(false);
          }}
          isNew={isAddingNew}
          isDesktop={isDesktop}
        />
      )}
    </>
  );
}

interface AttributeEditModalProps {
  attribute: TNewAttribute;
  onAttributeChange: (attr: TNewAttribute) => void;
  onSave: () => void;
  onCancel: () => void;
  isDesktop: boolean;
  isNew: boolean;
}

function AttributeEditModal({
  attribute,
  onAttributeChange,
  onSave,
  onCancel,
  isDesktop,
  isNew,
}: AttributeEditModalProps) {
  const inputClassname = 'w-70';

  return (
    <Modal
      open={true}
      onOpenChange={open => !open && onCancel()}
      title={isNew ? 'Создать поле' : 'Редактировать поле'}
      isDesktop={isDesktop}
      trigger={<div />}
    >
      <div className="flex flex-col gap-[15px]">
        <div className="flex justify-between items-center gap-[50px]">
          <label className="h5-def">Название</label>
          <Input
            className={inputClassname}
            value={attribute.name}
            onChange={e =>
              onAttributeChange({ ...attribute, name: e.target.value })
            }
          />
        </div>

        <div className="flex justify-between items-center gap-[50px]">
          <label className="h5-def">Тип</label>
          <ComboBox
            className={inputClassname}
            options={attributeTypeOptions}
            value={attribute.type}
            onChange={type =>
              onAttributeChange({
                ...attribute,
                type: type,
              })
            }
          />
        </div>

        <div className="flex justify-between items-center gap-[50px]">
          <label className="block text-[14px] mb-[5px]">Значение</label>
          {attribute.type === TAttibuteType.text && (
            <Input
              className={inputClassname}
              value={attribute.value}
              onChange={e =>
                onAttributeChange({
                  ...attribute,
                  value: e.target.value,
                })
              }
            />
          )}
          {attribute.type === TAttibuteType.number && (
            <NumberInput
              className={inputClassname}
              value={+attribute.value}
              onChange={e =>
                onAttributeChange({
                  ...attribute,
                  value: '' + e,
                })
              }
            />
          )}

          {attribute.type === TAttibuteType.toggle && (
            <Toggle
              checked={attribute.value === 'true'}
              onChange={e =>
                onAttributeChange({
                  ...attribute,
                  value: '' + e,
                })
              }
            />
          )}
        </div>

        <div className="flex gap-[10px] flex-1">
          <ButtonEmpty label="Отмена" onClick={onCancel} width="100%" />
          <ButtonAccent label="Сохранить" onClick={onSave} width="100%" />
        </div>
      </div>
    </Modal>
  );
}
