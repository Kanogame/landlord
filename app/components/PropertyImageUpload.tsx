import Block from '~/components/Block';

interface PropertyImageUploadProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
}

export default function PropertyImageUpload({
  images,
  onImagesChange,
}: PropertyImageUploadProps) {
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    // TODO: Implement image upload logic
    console.log('Uploading images:', event.target.files);
  };

  return (
    <div
      className="w-[780px] h-[370px] bg-[#D9D9D9] rounded-[20px] flex flex-col justify-center items-center gap-[10px]"
      style={{
        boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.25)',
      }}
    >
      <div className="w-[124px] h-[124px] relative overflow-hidden">
        <div
          className="w-[38.76px] h-[46.51px] absolute bg-black"
          style={{
            left: 42.62,
            top: 46.49,
          }}
        />
        <div
          className="w-[93px] h-[124px] absolute bg-black"
          style={{
            left: 15.5,
            top: 0,
          }}
        />
      </div>
      <div className="text-black text-[24px] font-normal font-['Fira_Sans']">
        Загрузите изображения
      </div>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
        id="image-upload"
      />
      <label
        htmlFor="image-upload"
        className="cursor-pointer absolute inset-0"
      />
    </div>
  );
}
