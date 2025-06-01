import { useMediaQuery } from 'react-responsive';
import WidePropertyCard from '~/components/WidePropertyCard';
import type { TGenericProperty, TProperty } from '~/lib/property';
import { useDesktop } from '~/hooks/useDesktop';
import ButtonAccent from '~/components/ButtonAccent';
import ButtonEmpty from '~/components/ButtonEmpty';
import PropertyCard from '~/components/PropertyCard';

interface SearchListProps {
  propertyList: TProperty[];
  currentPage: number;
  totalPages: number;
  totalCount: number;
  pageSize: number;
  onPageChange: (page: number, size: number) => void;
}

export default function SearchList({
  propertyList,
  currentPage,
  totalPages,
  totalCount,
  pageSize,
  onPageChange,
}: SearchListProps) {
  const isDesktop = useDesktop();

  const handlePageChange = (newPage: number) => {
    onPageChange(newPage, pageSize);
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisiblePages = isDesktop ? 7 : 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    if (currentPage > 1) {
      buttons.push(
        <ButtonEmpty
          key="prev"
          label={'←'}
          width="30px"
          height="30px"
          onClick={() => handlePageChange(currentPage - 1)}
        />
      );
    }

    if (startPage > 1) {
      buttons.push(
        <ButtonEmpty
          key={1}
          label={1 + ''}
          width="30px"
          height="30px"
          onClick={() => handlePageChange(1)}
        />
      );
      if (startPage > 2) {
        buttons.push(
          <span key="ellipsis1" className="px-2 py-2 text-sm text-gray-500">
            ...
          </span>
        );
      }
    }

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        i === currentPage ? (
          <ButtonAccent
            key={i}
            label={i + ''}
            width="30px"
            height="30px"
            onClick={() => handlePageChange(i)}
          />
        ) : (
          <ButtonEmpty
            key={i}
            label={i + ''}
            width="30px"
            height="30px"
            onClick={() => handlePageChange(i)}
          />
        )
      );
    }

    // Last page if not visible
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        buttons.push(
          <span key="ellipsis2" className="px-2 py-2 p-def">
            ...
          </span>
        );
      }
      buttons.push(
        <ButtonEmpty
          key={totalPages}
          label={totalPages + ''}
          width="30px"
          height="30px"
          onClick={() => handlePageChange(totalPages)}
        />
      );
    }

    // Next button
    if (currentPage < totalPages) {
      <ButtonEmpty
        key={totalPages}
        label={totalPages + ''}
        width="30px"
        height="30px"
        onClick={() => handlePageChange(totalPages)}
      />;
      buttons.push(
        <ButtonEmpty
          key="next"
          label={'→'}
          width="30px"
          height="30px"
          onClick={() => handlePageChange(currentPage + 1)}
        />
      );
    }

    return buttons;
  };

  return (
    <div
      className={
        isDesktop
          ? 'flex min-w-[0] flex-col gap-[20px]'
          : 'flex flex-wrap justify-around gap-[10px]'
      }
    >
      {propertyList.map(el => {
        return isDesktop ? (
          <WidePropertyCard key={el.property.id} property={el} />
        ) : (
          <PropertyCard
            key={el.property.id}
            property={el}
            className="w-[300px] h-[400px]"
          />
        );
      })}

      {totalPages > 1 && (
        <div className="flex flex-col items-center gap-4 mt-8 pt-6 border-t border-gray-200">
          <div className="p-def">
            Показано {(currentPage - 1) * pageSize + 1}-
            {Math.min(currentPage * pageSize, totalCount)} из {totalCount}{' '}
            объявлений
          </div>

          <div className="flex gap-1 flex-wrap justify-center">
            {renderPaginationButtons()}
          </div>
        </div>
      )}
    </div>
  );
}
