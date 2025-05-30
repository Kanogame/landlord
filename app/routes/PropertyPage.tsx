import { useParams } from 'react-router';
import { useDesktop } from '~/hooks/useDesktop';
import DesktopWidth from '~/blocks/DesktopWidth';
import PropertyImageGallery from '~/components/PropertyImageGallery';
import PropertyDescription from '~/components/PropertyDescription';
import PropertyCalendar from '~/components/PropertyCalendar';
import PropertyMap from '~/components/PropertyMap';
import PropertyDetails from '~/components/PropertyDetails';
import PropertySummary from '~/components/PropertyOwnerContact';
import { Post } from '~/lib/api';
import type { TProperty, TRentProperty } from '~/lib/property';
import type { Route } from './+types/PropertyPage';

export async function clientLoader({
  params,
}: Route.ClientLoaderArgs): Promise<TProperty> {
  const resp = await Post<TProperty>('api/Property/get_property_by_id', {
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
          <PropertyImageGallery images={property.property.imageLinks} />
          {isDesktop! && (
            <div className="flex flex-[1_0] flex-col gap-[20px]">
              <PropertySummary property={property} />
            </div>
          )}
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
        {isDesktop && (
          <div className="flex flex-[1_0] flex-col gap-[20px]">
            <PropertySummary property={property} />
          </div>
        )}
      </div>
    </DesktopWidth>
  );
}
