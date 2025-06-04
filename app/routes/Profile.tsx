import { Outlet } from 'react-router';
import DesktopWidth from '~/components/DesktopWidth';
import ProfileSidebar from '~/routes/Profile/ProfileSidebar';
import { useDesktop } from '~/hooks/useDesktop';

export default function ProfilePage() {
  const isDesktop = useDesktop();

  return (
    <div className="w-[100%]">
      <DesktopWidth isDesktop={isDesktop}>
        <div
          className={
            isDesktop
              ? 'flex items-start gap-[20px]'
              : 'flex flex-col gap-[20px]'
          }
        >
          {isDesktop && (
            <div className="flex flex-[1_0] flex-col gap-[20px] w-[100%]">
              <ProfileSidebar />
            </div>
          )}

          <div className="flex flex-[3_0] flex-col min-w-0 gap-[20px] w-[100%]">
            <Outlet />
          </div>
        </div>
      </DesktopWidth>
    </div>
  );
}
