import FormatPrice, {
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
import { GetOwnerString } from '~/lib/user';
import iconCalendar from '~/media/icons/icon-calendar.svg';
import iconShare from '~/media/icons/icon-share.svg';
import iconPosition from '~/media/icons/icon-position.svg';
import ArrowLink from './Link';
import { widePropertyCardDropdownOptions } from './common/propertyCard';
import DropdownElement from './DropdownElement';

export default function WidePropertyCard(props: { property: TProperty }) {
  const type = props.property.type;
  const prop: TRentProperty | TSellProperty = props.property.property;
  return (
    <div className="bg-white block-shadow rounded-[20px] p-[10px] flex gap-[5px]">
      <div className="flex-[0_0_170px] rounded-[5px]">
        <ImageScroller images={[]} />
      </div>

      <div className="flex flex-col flex-[1_0]">
        <div className="n1-def overflow-hidden text-ellipsis text-nowrap">
          {prop.name}
        </div>

        <div className="p-light overflow-hidden text-ellipsis text-nowrap">
          {prop.address.displayAddress}
        </div>

        {type === TOfferType.Rent && (
          <div className="flex">
            <Stars rating={(prop as TRentProperty).raiting} />
          </div>
        )}

        <div className="p-light overflow-hidden text-ellipsis w-[100%]">
          {prop.desc}
        </div>

        <div className="flex">{prop.username}, хозяин</div>
        <ArrowLink
          link={{
            label: 'Профиль',
            href: prop.profileLink,
          }}
        />
      </div>

      <div className="flex flex-col justify-between">
        <div className="flex flex-col items-end">
          <div className="n1-def">{FormatPrice(props.property)}</div>
          <div className="p-def">
            {(+prop.price.amount / prop.area).toFixed(1) + ' ₽/м²'}
          </div>
          <div className="p-def">{FormatArea(prop.area)}</div>
        </div>
        <div className="flex flex-col gap-[5px]">
          <ButtonAccent label="Написать" width="100%" />
          <div className="flex gap-[5px]">
            <ButtonIcon icon={iconBookmark} />
            <ButtonIcon icon={iconCalendar} />
            <ButtonIcon icon={iconShare} />
            <ButtonIcon icon={iconPosition} />
            <ButtonIconDropdown icon={IconMore}>
              {widePropertyCardDropdownOptions.map(el => {
                return <DropdownElement label={el.label} icon={el.icon} />;
              })}
            </ButtonIconDropdown>
          </div>
        </div>
      </div>
    </div>
  );
}
