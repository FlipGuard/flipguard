import isViewMobile from '../../../hooks/utils/isViewMobile';
import { DesktopSidebar } from './desktop/DesktopSidebar';
import { MobileSidebar } from './mobile/MobileSidebar';

type Props = {
    open: boolean;
    onClose: () => void;
};

export const Sidebar = ({ open, onClose }: Props) => {
    const isMobile = isViewMobile();

    if (isMobile) {
        return <MobileSidebar open={open} onClose={onClose} />;
    } else {
        return <DesktopSidebar />;
    }
};
