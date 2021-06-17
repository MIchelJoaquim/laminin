import { ROUTES } from "../../../../constants/routes";

interface MenuItem {
    label: string;
    url: ROUTES;
}
const menu: MenuItem[] = [
    { label: "Início", url: ROUTES.DASHBOARD },
    { label: "Mercados", url: ROUTES.MARKET },
];

export default menu;

export interface DrawerProps {
    open: boolean;
    handleDrawerClose: () => void;
}