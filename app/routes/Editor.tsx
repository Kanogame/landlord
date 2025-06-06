import { useState } from 'react';
import { useDesktop } from '~/hooks/useDesktop';
import DesktopWidth from '~/components/DesktopWidth';
import PropertyImageUpload from '~/routes/Editor/PropertyImageUpload';
import PropertyForm from '~/routes/Editor/PropertyForm';
import PropertyTextBox from '~/routes/Property/PropertyTextBox';
import PropertyAttributesModal from '~/routes/Editor/PropertyAttributesModal';
import PropertyCalendarEdit from '~/routes/Editor/PropertyCalendarEdit';
import {
  type TProperty,
  TOfferType,
  CreateEmptyProperty,
} from '~/lib/property';
import type { TCalendarResponse } from '~/lib/calendar';
import PropertyDetails from '~/routes/Property/PropertyDetails';
import ButtonAccent from '~/components/ButtonAccent';
import { Post, ErrorToast } from '~/lib/api';
import { createProperty, updateProperty } from '~/lib/propertyApi';
import { getCalendarPeriods } from '~/lib/calendarApi';
import { useNavigate } from 'react-router';
import type { Route } from './+types/Editor';

export async function clientLoader({
  params,
}: Route.ClientLoaderArgs): Promise<{
  property: TProperty | null;
  calendarData: TCalendarResponse;
}> {
  // If no ID provided, return null property (create mode)
  if (!params.id) {
    return {
      property: null,
      calendarData: {
        success: true,
        count: 0,
        periods: [],
      },
    };
  }

  // Load existing property (edit mode)
  const property = await Post<TProperty>('api/Property/get_property_by_id', {
    propertyId: params.id,
  });

  // Get current year calendar data
  const currentYear = new Date().getFullYear();
  const startDate = new Date(currentYear, 0, 1).toISOString();
  const endDate = new Date(currentYear, 11, 31, 23, 59, 59).toISOString();

  let calendarData: TCalendarResponse = {
    success: false,
    count: 0,
    periods: [],
  };

  try {
    calendarData = await getCalendarPeriods({
      propertyId: parseInt(params.id),
      startDate,
      endDate,
    });

    if (!calendarData.success) {
      ErrorToast('Ошибка при загрузке календаря');
    }
  } catch (error) {
    ErrorToast('Ошибка при загрузке календаря');
  }

  return { property, calendarData };
}

export default function Editor({ loaderData }: Route.ComponentProps) {
  const isDesktop = useDesktop();
  const navigate = useNavigate();

  // Initialize property state based on whether we're editing or creating
  const [property, setProperty] = useState<TProperty>(() => {
    if (loaderData.property) {
      return loaderData.property;
    }
    return CreateEmptyProperty(TOfferType.Rent);
  });

  const [isAttributesModalOpen, setIsAttributesModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [calendarData, setCalendarData] = useState<TCalendarResponse>(
    loaderData.calendarData
  );

  // Determine if we're in edit mode
  const isEditMode = loaderData.property !== null;

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
      let response: any;

      if (isEditMode) {
        // Update existing property
        response = await updateProperty(
          property.property.id,
          property.property
        );

        if (response.success) {
          navigate('/property/' + property.property.id);
        } else {
          ErrorToast(
            `Ошибка при обновлении объявления: ${
              response.message || 'Неизвестная ошибка'
            }`
          );
        }
      } else {
        // Create new property
        response = await createProperty(property.property);

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
      }
    } catch (error) {
      console.error('Error saving property:', error);
      ErrorToast(
        isEditMode
          ? 'Произошла ошибка при обновлении объявления'
          : 'Произошла ошибка при сохранении объявления'
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = () => {
    // TODO: Implement delete functionality
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
