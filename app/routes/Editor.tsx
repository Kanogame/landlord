import { useState } from 'react';
import { useDesktop } from '~/hooks/useDesktop';
import DesktopWidth from '~/blocks/DesktopWidth';
import PropertyImageUpload from '~/components/PropertyImageUpload';
import PropertyForm from '~/blocks/PropertyForm';
import PropertyPreview from '~/blocks/PropertyPreview';
import { TProperty, TOfferType, TPropertyType } from '~/lib/property';

// Initial empty property state
const createEmptyProperty = (): TProperty => ({
  type: TOfferType.Rent,
  property: {
    id: 0,
    PropertyTypeId: TPropertyType.Flat,
    name: '',
    desc: '',
    price: {
      amount: '0',
      currency: 125,
      currencySymbol: '₽',
    },
    area: 0,
    address: {
        ...
    },
    imageLinks: [],
    ownerId: 0,
    // Rent-specific fields
    period: 0,
    raiting: 0,
  },
});

export default function Editor() {
  const isDesktop = useDesktop();
  const [property, setProperty] = useState<TProperty>(createEmptyProperty());

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

  const handleSave = () => {
    // TODO: Implement save functionality
    console.log('Saving property:', property);
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
              />
            </div>
          )}

          <PropertyPreview property={property} isDesktop={isDesktop} />
        </div>

        {isDesktop && (
          <div className="flex flex-[1_0] flex-col gap-[20px]">
            <PropertyForm
              property={property}
              onPropertyChange={handlePropertyUpdate}
              onSave={handleSave}
              onDelete={handleDelete}
              isDesktop={isDesktop}
            />
          </div>
        )}
      </div>
    </DesktopWidth>
  );
}
