import isViewMobile from '../../../hooks/utils/isViewMobile';
import { DesktopTopbar } from './desktop/DesktopTopbar';
import { MobileTopbar } from './mobile/MobileTopbar';

type Props = {
    logOut: () => void;
    toggleSidebar: () => void;
};

export const Topbar = ({ logOut, toggleSidebar }: Props) => {
    const isMobile = isViewMobile();

    if (isMobile) {
        return <MobileTopbar logOut={logOut} toggleSidebar={toggleSidebar} />;
    } else {
        return <DesktopTopbar logOut={logOut} />;
    }
};
