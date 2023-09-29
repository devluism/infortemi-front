import { getAssetPath } from "@/core/helpers/assets";

export interface MenuItem {
  heading?: string;
  sectionTitle?: string;
  route?: string;
  pages?: Array<MenuItem>;
  svgIcon?: string;
  fontIcon?: string;
  admin?: string;
  sub?: Array<MenuItem>;
}

const MainMenuConfig: Array<MenuItem> = [
  {
    heading: "Home",
    route: "/dashboard",
    // svgIcon: getAssetPath("media/icons/duotune/art/art002.svg"),
    fontIcon: "bi bi-layers-fill",
    admin: "all",
  },
  {
    heading: "Orders",
    route: "/orders",
    // svgIcon: "/media/icons/duotune/communication/com014.svg",
    fontIcon: "fa-solid fa-rectangle-list",
    admin: "1",
  },
  {
    heading: "Reports",
    route: "/reports",
    // svgIcon: "/media/icons/duotune/communication/com014.svg",
    fontIcon: "bi bi-file-earmark-text-fill",
    admin: "1"
  },
  {
    heading: "Refunds",
    route: "/refunds",
    // svgIcon: "/media/icons/duotune/finance/fin008.svg",
    fontIcon: "fa-solid fa-money-bill-transfer",
    admin: "1",
  },
  {
    heading: "Wallets",
    route: "/users-wallets-list",
    // svgIcon: "/media/icons/duotune/finance/fin008.svg",
    fontIcon: "fa-solid fa-wallet",
    admin: "1",
  },
  {
    heading: "Users",
    route: "/users",
    // svgIcon: "/media/icons/duotune/communication/com014.svg",
    fontIcon: "bi bi-people-fill",
    admin: "1",
  },
  {
    heading: "Commissions",
    route: "/commissions",
    // svgIcon: "/media/icons/duotune/communication/com014.svg",
    fontIcon: "fa-solid fa-money-bills",
    admin: "1",
  },
  {
    heading: "Withdrawals",
    route: "/withdrawals",
    // svgIcon: "/media/icons/duotune/communication/com014.svg",
    fontIcon: "fa-solid fa-hand-holding-dollar",
    admin: "1",
  },
  {
    heading: "KYC",
    route: "/users-kyc-list",
    // svgIcon: "/media/icons/duotune/finance/fin008.svg",
    fontIcon: "bi bi-clipboard-check-fill",
    admin: "1",
  },

  // USERS URLS
  {
    heading: "Programs",
    route: "/programs",
    // svgIcon: "/media/icons/duotune/communication/com014.svg",
    fontIcon: "fa-solid fa-table-columns",
    admin: "0",
  },
  {
    heading: "Referrals",
    route: "/referrals",
    // svgIcon: "/media/icons/duotune/communication/com014.svg",
    fontIcon: "bi bi-people-fill",
    admin: "0",
  },
  {
    heading: "Wallet",
    route: "/wallet",
    // svgIcon: "/media/icons/duotune/communication/com014.svg",
    fontIcon: "fa-solid fa-wallet",
    admin: "0",
  },
  {
    heading: "Downloads",
    route: "/documentation",
    // svgIcon: "/media/icons/duotune/communication/com014.svg",
    fontIcon: "fa-solid fa-download",
    admin: "0",
  },
  {
    heading: "Support",
    route: "/support",
    // svgIcon: "/media/icons/duotune/communication/com014.svg",
    fontIcon: "fa-solid fa-circle-question",
    admin: "0",
  },
  {
    heading: "Sign Out",
    route: "/sign-out",
    // svgIcon: "/media/icons/duotune/communication/com014.svg",
    fontIcon: "fa-solid fa-right-from-bracket",
    admin: "all",
  },
];

export default MainMenuConfig;
