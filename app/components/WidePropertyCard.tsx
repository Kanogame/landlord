import { motion } from 'motion/react';
import {
  FormatArea,
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
import { FormatMoney } from '~/lib/money';
import { GetOwnerString } from '~/lib/user';
import Link from './Link';

export default function WidePropertyCard(props: { property: TProperty }) {
  const prop: TRentProperty | TSellPropery = props.property.property;
  return (
    <div className="bg-white block-shadow rounded-[20px] p-[10px] flex gap-[5px]">
      <div className="flex-[0_0_170px] rounded-[5px]">
        <ImageScroller images={prop.images} />
      </div>

      <div className="flex flex-col flex-[1_0]">
        <div className="n1-def overflow-hidden text-ellipsis text-nowrap">
          {prop.name}
        </div>

        <div className="p-light overflow-hidden text-ellipsis text-nowrap">
          {prop.address}
        </div>

        {props.property.type === TPropertyType.Rent && (
          <div className="flex">
            <Stars raiting={(prop as TRentProperty).raiting} />
          </div>
        )}

        <div className="p-light overflow-hidden text-ellipsis w-[100%]">
          {prop.desc}
        </div>

        <div className="flex">{GetOwnerString(props.property.owner)}</div>
        <Link
          link={{
            label: 'Профиль',
            href: `/profile/${props.property.owner.id}`,
          }}
        />
      </div>

      <div className="flex gap-[5px]">
        <ButtonAccent label="Написать" width="100%" />
        <ButtonIcon icon={iconBookmark} />
        <CardDropdown />
      </div>
    </div>
  );
}
