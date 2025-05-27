import { AnimatePresence, motion } from 'motion/react';
import {
  FormatArea,
  TOfferType,
  type TProperty,
  type TRentProperty,
  type TSellProperty,
} from '../lib/property';
import ImageScroller from './ImageScroller';
import { Stars } from './stars';
import ButtonIcon from './ButtonIcon';
import iconBookmark from '~/media/icons/icon-bookmark.svg';
import IconMore from '~/media/icons/icon-more.svg';
import ButtonAccent from './ButtonAccent';
import ButtonIconDropdown from './ButtonIconDropdown';
import { FormatMoney } from '~/lib/money';
import DropdownElement from './DropdownElement';
import { propertyCardDropdownOptions } from './common/propertyCard';

export default function PropertyCard(props: { property: TProperty }) {
  const prop: TRentProperty | TSellProperty = props.property;
  return (
    <div className="w-[200px] h-[290px] shrink-0 border-[1px] bg-white border-[#E3E3E3] rounded-[10px] p-[5px] flex flex-col items gap-[5px]">
      <div className="flex-[1_1_100px] rounded-[5px]">
        <ImageScroller images={prop.imageLinks} />
      </div>
      <div>
        <div className="n1-def overflow-hidden text-ellipsis text-nowrap">
          {prop.name}
        </div>
        <div className="p-light overflow-hidden text-ellipsis text-nowrap">
          {prop.address.displayAddress}
        </div>
      </div>

      {props.property.type === TOfferType.Rent && (
        <>
          <div className="flex">
            <Stars raiting={(prop as TRentProperty).raiting} />
          </div>
          <div className="flex justify-between">
            <div className="n2-def">{FormatMoney(prop.price)}</div>
            <div className="p-def">{FormatArea(prop.area)}</div>
          </div>
        </>
      )}
      {props.property.type === TOfferType.Sell && (
        <>
          <div className="flex justify-between">
            <div className="n2-def">{FormatMoney(prop.price)}</div>
            <div className="p-def">{FormatArea(prop.area)}</div>
          </div>
        </>
      )}
      <div className="flex gap-[5px]">
        <ButtonAccent label="Написать" width="100%" />
        <ButtonIcon icon={iconBookmark} />
        <ButtonIconDropdown icon={IconMore}>
          {propertyCardDropdownOptions.map(el => {
            return <DropdownElement label={el.label} icon={el.icon} />;
          })}
        </ButtonIconDropdown>
      </div>
    </div>
  );
}
