import { Outlet } from 'react-router';
import DesktopWidth from '~/blocks/DesktopWidth';
import ProfileSidebar from '~/blocks/ProfileSidebar';
import { useDesktop } from '~/hooks/useDesktop';

export default function ProfilePage() {
  const isDesktop = useDesktop();

  return (
    <div className="w-[100%]">
      <DesktopWidth isDesktop={isDesktop}>
        <div
          className={
            isDesktop
              ? 'grid grid-cols-[3fr_9fr] gap-[20px]'
              : 'flex flex-col gap-[20px]'
          }
        >
          <div className="flex flex-col gap-[20px] w-[100%]">
            <ProfileSidebar />
          </div>

          <div className="flex flex-col gap-[20px] w-[100%]">
            <Outlet />
          </div>
        </div>
      </DesktopWidth>
    </div>
  );
}
