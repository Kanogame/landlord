import { motion } from 'motion/react';
import {
  TPropertyType,
  type TProperty,
  type TRentProperty,
  type TSellPropery,
} from '../lib/property';
import ImageScroller from './ImageScroller';
import { Stars } from './stars';
import ButtonIcon from './ButtonIcon';
import iconBookmark from '~/media/icons/icon-bookmark.svg';

import ButtonAccent from './ButtonAccent';
import CardDropdown from './CardDropdown';

export default function PropertyCard(props: { property: TProperty }) {
  const prop: TRentProperty | TSellPropery = props.property.property;
  return (
    <div className="w-[200px] h-[290px] shrink-0 border-[1px] border-[#E3E3E3] rounded-[10px] p-[5px] flex flex-col items">
      <div className="flex-[1_1_100px] rounded-[5px]">
        <ImageScroller images={prop.images} rounded={5} />
      </div>
      <div className="n1-def">{prop.name}</div>
      <div className="p-light">{prop.address}</div>

      {props.property.type === TPropertyType.Rent && (
        <>
          <div className="flex">
            <Stars raiting={(prop as TRentProperty).raiting} />
          </div>
          <div className="flex justify-between">
            <div className="n2-def">{}</div>
            <div className="p-def">some2</div>
          </div>
        </>
      )}
      <div className="flex gap-[5px]">
        <ButtonAccent label="Написать" />
        <ButtonIcon icon={iconBookmark} />
        <CardDropdown />
      </div>
    </div>
  );
}
