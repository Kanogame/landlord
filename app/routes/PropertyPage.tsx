import { useParams } from 'react-router';
import { useEffect } from 'react';
import { useDesktop } from '~/hooks/useDesktop';
import DesktopWidth from '~/blocks/DesktopWidth';
import PropertyImageGallery from '~/components/PropertyImageGallery';
import PropertyDescription from '~/components/PropertyDescription';
import PropertyCalendar from '~/components/PropertyCalendar';
import PropertyMap from '~/components/PropertyMap';
import PropertyDetails from '~/components/PropertyDetails';
import PropertySummary from '~/components/PropertySummary';
import { Post, ErrorToast } from '~/lib/api';
import { getCalendarPeriods } from '~/lib/calendarApi';
import type { TProperty, TRentProperty, TSearchResult } from '~/lib/property';
import type { TCalendarResponse } from '~/lib/calendar';
import type { Route } from './+types/PropertyPage';
import CardScroller from '~/blocks/CardScroller';

export async function clientLoader({
  params,
}: Route.ClientLoaderArgs): Promise<{
  property: TProperty;
  similar: TSearchResult;
  calendarData: TCalendarResponse;
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

  return { property: resp, similar: similar, calendarData };
}

export default function PropertyPage({ loaderData }: Route.ComponentProps) {
  const isDesktop = useDesktop();
  const property = loaderData.property;

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    if (hash) {
      // Small delay to ensure components are rendered
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      }, 100);
    }
  }, []);

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
                ? (property.property as TRentProperty).rating
                : undefined
            }
          />
          <div id="propertyCalendar">
            <PropertyCalendar
              propertyId={property.property.id}
              initialCalendarData={loaderData.calendarData}
            />
          </div>
          <div id="propertyMap">
            <PropertyMap address={property.property.address} />
          </div>
          <div id="propertyDetails">
            <PropertyDetails property={property} isDesktop={isDesktop} />
          </div>
        </div>
        {isDesktop && (
          <div className="sticky top-[20px] flex flex-[1_0] flex-col gap-[20px]">
            <PropertySummary property={property} />
          </div>
        )}
      </div>

      <CardScroller
        label="Похожие"
        link={{ label: 'Все', href: `/search?OfferType=${property.type}` }}
        loaded={loaderData.similar}
      />
    </DesktopWidth>
  );
}
