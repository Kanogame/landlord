import { AnimatePresence, motion } from 'motion/react';
import {
  FormatArea,
  InitiateChat,
  TOfferType,
  type TProperty,
  type TRentProperty,
  type TSellProperty,
} from '../lib/property';
import ImageScroller from './ImageScroller';
import { Stars } from './stars';
import ButtonIcon from './ButtonIcon';
import iconBookmark from '~/media/icons/icon-bookmark.svg';
import iconBookmarkChecked from '~/media/icons/icon-bookmark-checked.svg';
import IconMore from '~/media/icons/icon-more.svg';
import ButtonAccent from './ButtonAccent';
import ButtonIconDropdown from './ButtonIconDropdown';
import { FormatMoney } from '~/lib/money';
import DropdownElement from './DropdownElement';
import { propertyCardDropdownOptions } from './common/propertyCard';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { addBookmark, removeBookmark } from '~/lib/bookmarkApi';

export default function PropertyCard(props: { property: TProperty }) {
  const prop: TRentProperty | TSellProperty = props.property.property;
  const [isBookmarked, setIsBookmarked] = useState(prop.isBookmarked);
  const navigate = useNavigate();

  async function startChat(e: any) {
    e.stopPropagation();
    const { success, chatId } = await InitiateChat(props.property, '');
    if (success) {
      navigate(`/chat/${chatId}`);
    }
  }

  async function bookmark(e: any) {
    e.stopPropagation();
    let response;
    if (isBookmarked) {
      response = await removeBookmark(prop.id);
    } else {
      response = await addBookmark(prop.id);
    }

    if (response.success) {
      setIsBookmarked(!isBookmarked);
    } else {
      console.error('Bookmark operation failed:', response.message);
    }
  }

  return (
    <div
      className="w-[200px] h-[290px] shrink-0 border-[1px] bg-white border-[#E3E3E3] rounded-[10px] p-[5px] flex flex-col items gap-[5px] cursor-pointer"
      onClick={() => navigate('/property/' + prop.id)}
    >
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
            <Stars rating={(prop as TRentProperty).rating} />
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
        <ButtonAccent label="Написать" width="100%" onClick={startChat} />
        <ButtonIcon
          icon={isBookmarked ? iconBookmarkChecked : iconBookmark}
          onClick={bookmark}
        />
        <ButtonIconDropdown icon={IconMore}>
          {propertyCardDropdownOptions.map(el => {
            return <DropdownElement label={el.label} icon={el.icon} />;
          })}
        </ButtonIconDropdown>
      </div>
    </div>
  );
}
