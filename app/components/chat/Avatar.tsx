interface AvatarProps {
  avatar: string;
  size: number;
  className?: string;
}

export default function Avatar({ avatar, size, className = '' }: AvatarProps) {
  const sizeClasses = `w-[${size}] h-[${size}]`;

  return (
    <div
      className={`${sizeClasses} rounded-full bg-gray-300 flex-shrink-0 ${className}`}
    >
      <img
        src={avatar}
        alt="Аватар"
        className="w-full h-full rounded-full object-cover"
      />
    </div>
  );
}
