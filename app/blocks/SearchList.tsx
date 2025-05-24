import { useMediaQuery } from 'react-responsive';
import WidePropertyCard from '~/components/WidePropertyCard';
import type { TProperty } from '~/lib/property';

export default function SearchList(props: { propertyList: TProperty[] }) {
  const isDesktop = useMediaQuery({ query: '(min-width: 1280px)' });

  return (
    <div className="flex flex-col gap-[20px]">
      {props.propertyList.map((el, ind) => {
        return <WidePropertyCard key={el.property.address} property={el} />;
      })}
    </div>
  );
}
