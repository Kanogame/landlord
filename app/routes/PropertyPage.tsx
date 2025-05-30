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
import type { TProperty, TRentProperty, TSearchResult } from '~/lib/property';
import type { Route } from './+types/PropertyPage';
import CardFetchScroller from '~/blocks/CardFetchScroller';

export async function clientLoader({
  params,
}: Route.ClientLoaderArgs): Promise<{
  property: TProperty;
  similar: TSearchResult;
}> {
  const resp = await Post<TProperty>('api/Property/get_property_by_id', {
    propertyId: params.id,
  });

  const similar = await Post<TSearchResult>(
    'api/Property/get_properties_search',
    {
      pageNumber: 1,
      pageSize: 10,
      offerType: resp.type,
    }
  );
  return { property: resp, similar: similar };
}

export default function PropertyPage({ loaderData }: Route.ComponentProps) {
  const isDesktop = useDesktop();
  const property = loaderData.property;

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
          {!isDesktop && (
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

      <CardFetchScroller
        label="Похожие"
        link={{ label: 'Все', href: `/search?OfferType=${property.type}` }}
        loaded={loaderData.similar}
      />
    </DesktopWidth>
  );
}
