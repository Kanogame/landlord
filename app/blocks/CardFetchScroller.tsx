import ScrollBlock from '~/components/ScrollBlock';
import { useDesktop } from '~/hooks/useDesktop';
import { Post } from '~/lib/api';
import type { TLink } from '~/lib/link';
import type { TOfferType, TSearchResult } from '~/lib/property';
import type { Route } from '../+types/root';
import PropertyCard from '~/components/PropertyCard';

interface CardFetchProps {
  label: string;
  link: TLink;
  loaded: TSearchResult;
}
export default function CardFetchScroller({
  link,
  label,
  loaded,
}: CardFetchProps) {
  const isDesktop = useDesktop();

  return (
    <ScrollBlock isDesktop={isDesktop} label={label} link={link}>
      {loaded.properties.map(p => {
        return <PropertyCard key={p.property.desc} property={p} />;
      })}
    </ScrollBlock>
  );
}
