import type { TImageLink } from '../../components/ImageScroller';
import iconUpload from '~/media/icons/icon-upload.svg';

interface PropertyImageUploadProps {
  images: TImageLink[];
  onImagesChange: (images: TImageLink[]) => void;
}

export default function PropertyImageUpload({
  images,
  onImagesChange,
}: PropertyImageUploadProps) {
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    // TODO: Implement image upload logic
  };

  return (
    <div
      className="w-[100%] h-[370px] bg-[#D9D9D9] rounded-[20px] flex flex-col justify-center items-center gap-[10px] relative"
      style={{
        boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.25)',
      }}
    >
      <div className="w-[124px] h-[124px] relative overflow-hidden">
        <img src={iconUpload} />
      </div>
      <div className="h4-def">Загрузите изображения</div>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
        id="image-upload"
      />
      <label htmlFor="image-upload" />
    </div>
  );
}
