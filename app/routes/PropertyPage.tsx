import { useParams } from 'react-router';
import { useDesktop } from '~/hooks/useDesktop';
import DesktopWidth from '~/blocks/DesktopWidth';
import PropertyImageGallery from '~/components/PropertyImageGallery';
import PropertyDescription from '~/components/PropertyDescription';
import PropertyCalendar from '~/components/PropertyCalendar';
import PropertyMap from '~/components/PropertyMap';
import PropertyDetails from '~/components/PropertyDetails';
import PropertyOwnerContact from '~/components/PropertyOwnerContact';
import { Post } from '~/lib/api';
import type { TProperty, TRentProperty } from '~/lib/property';
import type { Route } from '../+types/root';

export async function clientLoader({ params }): Promise<TProperty> {
  const resp = await Post<TProperty>('api/Property/get_property', {
    propertyId: params.id,
  });
  return resp;
}

export default function PropertyPage({ loaderData }: Route.ComponentProps) {
  const isDesktop = useDesktop();
  const property = loaderData as TProperty;

  return (
    <DesktopWidth isDesktop={isDesktop}>
      <div
        className={
          isDesktop
            ? 'grid grid-cols-[2fr_1fr] gap-[20px]'
            : 'flex flex-col gap-[20px]'
        }
      >
        <div className="flex flex-col gap-[20px]">
          <PropertyImageGallery images={property.property.imageLinks} />
          <PropertyDescription
            description={property.property.desc}
            rating={
              property.type === 0
                ? (property.property as TRentProperty).raiting
                : undefined
            }
          />
          <PropertyCalendar />
          <PropertyMap address={property.property.address} />
          <PropertyDetails property={property} isDesktop={isDesktop} />
        </div>

        <div className="flex flex-col gap-[20px]">
          <PropertyOwnerContact property={property} />
        </div>
      </div>
    </DesktopWidth>
  );
}
