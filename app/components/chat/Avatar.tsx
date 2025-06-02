interface AvatarProps {
  avatar: string;
  size?: 'small' | 'large';
  className?: string;
}

export default function Avatar({
  avatar,
  size = 'small',
  className = '',
}: AvatarProps) {
  const sizeClasses = size === 'large' ? 'w-[120px] h-[120px]' : 'w-10 h-10';

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
