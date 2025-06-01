import { useState } from 'react';
import { useDesktop } from '~/hooks/useDesktop';
import DesktopWidth from '~/blocks/DesktopWidth';
import PropertyImageUpload from '~/components/PropertyImageUpload';
import PropertyForm from '~/blocks/PropertyForm';
import PropertyTextBox from '~/blocks/PropertyTextBox';
import PropertyAttributesModal from '~/components/PropertyAttributesModal';
import PropertyCalendarEdit from '~/components/PropertyCalendarEdit';
import {
  type TProperty,
  TOfferType,
  CreateEmptyProperty,
} from '~/lib/property';
import type { TCalendarResponse } from '~/lib/calendar';
import PropertyDetails from '~/components/PropertyDetails';
import ButtonAccent from '~/components/ButtonAccent';
import { ErrorToast } from '~/lib/api';
import { createProperty } from '~/lib/propertyApi';
import { useNavigate } from 'react-router';

export default function Editor() {
  const isDesktop = useDesktop();
  const [property, setProperty] = useState<TProperty>(
    CreateEmptyProperty(TOfferType.Rent)
  );
  const navigate = useNavigate();
  const [isAttributesModalOpen, setIsAttributesModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [calendarData, setCalendarData] = useState<TCalendarResponse>({
    success: true,
    count: 0,
    periods: [],
  });

  const handlePropertyUpdate = (updates: Partial<TProperty>) => {
    setProperty(prev => ({
      ...prev,
      ...updates,
      property: {
        ...prev.property,
        ...updates.property,
      },
    }));
  };

  const handleAttributesChange = (attributes: any[]) => {
    handlePropertyUpdate({
      property: {
        ...property.property,
        propertyAttributes: attributes,
      },
    });
  };

  const handleCalendarUpdate = (newCalendarData: TCalendarResponse) => {
    setCalendarData(newCalendarData);
  };

  const handleSave = async () => {
    if (isSaving) return;

    // Basic validation
    if (!property.property.name.trim()) {
      ErrorToast('Пожалуйста, введите название объявления');
      return;
    }

    if (!property.property.desc.trim()) {
      ErrorToast('Пожалуйста, введите описание');
      return;
    }

    if (parseFloat(property.property.price.amount) <= 0) {
      ErrorToast('Пожалуйста, укажите корректную цену');
      return;
    }

    setIsSaving(true);

    try {
      const response = await createProperty(property.property);

      if (response.success) {
        navigate('/property/' + response.propertyId);
        // Update property with new ID if provided
        if (response.propertyId) {
          setProperty(prev => ({
            ...prev,
            property: {
              ...prev.property,
              id: response.propertyId!,
            },
          }));
        }
      } else {
        ErrorToast(
          `Ошибка при создании объявления: ${
            response.message || 'Неизвестная ошибка'
          }`
        );
      }
    } catch (error) {
      console.error('Error saving property:', error);
      ErrorToast('Произошла ошибка при сохранении объявления');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = () => {
    // TODO: Implement delete functionality
    console.log('Deleting property');
  };

  return (
    <DesktopWidth isDesktop={isDesktop}>
      <div
        className={
          isDesktop ? 'flex gap-[20px] items-start' : 'flex flex-col gap-[20px]'
        }
      >
        <div
          className={
            isDesktop
              ? 'flex flex-[2_0] flex-col gap-[20px]'
              : 'flex flex-col gap-[20px]'
          }
        >
          <PropertyImageUpload
            images={property.property.imageLinks}
            onImagesChange={images =>
              handlePropertyUpdate({
                property: { ...property.property, imageLinks: images },
              })
            }
          />

          {!isDesktop && (
            <div className="flex flex-[1_0] flex-col gap-[20px]">
              <PropertyForm
                property={property}
                onPropertyChange={handlePropertyUpdate}
                onSave={handleSave}
                onDelete={handleDelete}
                isDesktop={isDesktop}
                isSaving={isSaving}
              />
            </div>
          )}

          <PropertyTextBox
            value={property.property.desc}
            onChange={desc =>
              handlePropertyUpdate({
                property: {
                  ...property.property,
                  desc: desc,
                },
              })
            }
            isDesktop={isDesktop}
          />

          <PropertyCalendarEdit
            propertyId={property.property.id}
            initialCalendarData={calendarData}
            onCalendarUpdate={handleCalendarUpdate}
          />

          <PropertyDetails property={property} isDesktop={isDesktop}>
            <div className="flex flex-col self-end gap-[10px]">
              <PropertyAttributesModal
                isOpen={isAttributesModalOpen}
                onOpenChange={setIsAttributesModalOpen}
                attributes={property.property.propertyAttributes || []}
                onAttributesChange={handleAttributesChange}
                isDesktop={isDesktop}
                trigger={
                  <ButtonAccent
                    label="Редактировать"
                    onClick={() => setIsAttributesModalOpen(true)}
                  />
                }
              />
            </div>
          </PropertyDetails>
        </div>

        {isDesktop && (
          <div className="flex flex-[1_0] flex-col gap-[20px]">
            <PropertyForm
              property={property}
              onPropertyChange={handlePropertyUpdate}
              onSave={handleSave}
              onDelete={handleDelete}
              isDesktop={isDesktop}
              isSaving={isSaving}
            />
          </div>
        )}
      </div>
    </DesktopWidth>
  );
}
