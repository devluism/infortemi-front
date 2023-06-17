import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useConfigStore } from "@/stores/config";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "landing-page",
    component: () => import("@/views/LandingPage.vue"),
    meta: {
      pageTitle: "Home Page",
    }
  },
  {
    path: "/",
    redirect: "/dashboard",
    component: () => import("@/layouts/main-layout/MainLayout.vue"),
    meta: {
      middleware: "auth",
      admin: "all"
    },
    children: [
      // ADMIN ROUTES
      {
        path: "/dashboard",
        name: "dashboard",
        component: () => import("@/views/Dashboard.vue"),
        meta: {
          pageTitle: "Dashboard",
          breadcrumbs: ["Dashboards"],
          admin: "all"
        },
      },
      {
        path: "/orders",
        name: "admin-orders",
        component: () => import("@/views/admin/orders/Index.vue"),
        meta: {
          pageTitle: "Orders",
          breadcrumbs: ["Orders"],
          admin: "1"
        },
      },
      {
        path: "/admin/projects/:id/:phase",
        name: "admin-order-update",
        props: true,
        component: () => import("@/views/admin/reports/Update.vue"),
        // component: () => import("@/views/admin/orders/OrderUpdate.vue"),
        meta: {
          pageTitle: "Update Project",
          breadcrumbs: ["Orders", "Update orders"],
          admin: "1"
        },
      },
      {
        path: "/users",
        name: "admin-users",
        component: () => import("@/views/admin/users/UsersList.vue"),
        meta: {
          pageTitle: "Users",
          breadcrumbs: ["Users"],
          admin: "1"
        },
      },
      {
        path: "/commissions",
        name: "admin-commissions",
        component: () => import("@/views/admin/commisions/Index.vue"),
        meta: {
          pageTitle: "Commissions",
          breadcrumbs: ["Commissions"],
          admin: "1"
        },
      },
      {
        path: "/audit-user-wallets/:id",
        name: "audit-user-wallets",
        component: () => import("@/views/admin/users/audit/Wallets.vue"),
        meta: {
          pageTitle: "User's wallets",
          breadcrumbs: ["Wallets"],
          admin: "1"
        },
      },
      {
        path: "/audit-user-profile/:id",
        name: "audit-user-profile",
        component: () => import("@/views/admin/users/audit/Profile.vue"),
        meta: {
          pageTitle: "Audit user's profile",
          breadcrumbs: ["Profile"],
          admin: "1"
        },
      },
      {
        path: "/audit-user-dashboard/:id",
        name: "audit-user-dashboard",
        component: () => import("@/views/admin/users/audit/Dashboard.vue"),
        meta: {
          pageTitle: "User's dashboard",
          breadcrumbs: ["Dashboard"],
          admin: "1"
        },
      },
      {
        path: "/refunds",
        name: "admin-refunds",
        component: () => import("@/views/admin/refunds/Index.vue"),
        meta: {
          pageTitle: "Refunds",
          breadcrumbs: ["Refunds"],
          admin: "1"
        },
      },
      {
        path: "/users-wallets-list",
        name: "admin-users-wallets",
        component: () => import("@/views/admin/users/UsersWalletsList.vue"),
        meta: {
          pageTitle: "Users Wallets List",
          breadcrumbs: ["Users","Wallets"],
          admin: "1"
        },
      },
      {
        path: "/users-kyc-list",
        name: "admin-users-kyc",
        component: () => import("@/views/admin/users/kyc/UsersKycList.vue"),
        meta: {
          pageTitle: "Users KYC List",
          breadcrumbs: ["Users","Kyc"],
          admin: "1"
        },
      },
      {
        path: "/withdrawals",
        name: "admin-withdrawals",
        component: () => import("@/views/admin/withdrawals/Index.vue"),
        meta: {
          pageTitle: "Users Withdrawals",
          breadcrumbs: ["Withdrawals"],
          admin: "1"
        },
      },
      {
        path: "/reports",
        name: "admin-reports",
        component: () => import("@/views/admin/reports/ReportList.vue"),
        meta: {
          pageTitle: "User's reports",
          breadcrumbs: ["Reports"],
          admin: '1'
        },
      },
      
      // ALL ROUTES
      {
        path: "/documentation",
        name: "admin-documentation",
        component: () => import("@/views/documentation/Index.vue"),
        meta: {
          pageTitle: "Documentation",
          breadcrumbs: ["Documentation"],
          admin: 'all'
        },
      },
      {
        path: "/profile",
        name: "profile",
        component: () => import("@/views/user/acount/Profile.vue"),
        meta: {
          pageTitle: "User's profile",
          breadcrumbs: ["Profile"],
          admin: 'all'
        },
        children: [
          {
            path: "/profile/details",
            name: "profile-details",
            component: () => import("@/views/user/acount/Details.vue"),
            meta: {
              pageTitle: "Account Details",
              admin: 'all'
            },
          },
          {
            path: "/profile/options",
            name: "profile-options",
            component: () => import("@/views/user/acount/Options.vue"),
            meta: {
              pageTitle: "Account Settings",
              admin: 'all'
            },
          },
          {
            path: "/profile/security",
            name: "profile-security",
            component: () => import("@/views/user/acount/Security.vue"),
            meta: {
              pageTitle: "Account Security",
              admin: 'all'
            },
          },
          {
            path: "/profile/kyc",
            name: "profileFYT-kyc",
            component: () => import("@/views/user/acount/Kyc.vue"),
            meta: {
              pageTitle: "Account KYC",
            },
          },
        ],
      },

      // USERS ROUTES
      {
        path: "/programs",
        name: "programs",
        component: () => import("@/views/user/programs/Index.vue"),
        meta: {
          pageTitle: "Projects",
          breadcrumbs: ["Projects"],
          admin: "0"
        },
      },
      {
        path: "/referrals",
        name: "referrals",
        component: () => import("@/views/user/referrals/Index.vue"),
        meta: {
          pageTitle: "Unilevel",
          breadcrumbs: ["Unilevel"],
          admin: "0"
        },
      },
      {
        path: "/wallet",
        name: "wallet",
        component: () => import("@/views/user/wallets/Index.vue"),
        meta: {
          pageTitle: "Wallet",
          breadcrumbs: ["Wallet"],
          admin: "0"
        },
      },
      {
        path: "/support",
        name: "support",
        component: () => import("@/views/support/Index.vue"),
        meta: {
          pageTitle: "Support",
          breadcrumbs: ["Support"],
          admin: "all"
        },
      },
    ],
  },
  {
    path: "/",
    component: () => import("@/layouts/AuthLayout.vue"),
    children: [
      {
        path: "/sign-in",
        name: "sign-in",
        component: () =>
          import("@/views/crafted/authentication/basic-flow/SignIn.vue"),
        meta: {
          pageTitle: "Sign In",
        },
      },
      {
        path: "/sign-up",
        name: "sign-up",
        component: () =>
          import("@/views/crafted/authentication/basic-flow/SignUp.vue"),
        meta: {
          pageTitle: "Sign Up",
        },
      },
      {
        path: "/update-password",
        name: "update-password",
        component: () =>
          import("@/views/crafted/authentication/basic-flow/updatePassword.vue"),
        meta: {
          pageTitle: "Update Password",
        },
      },
      {
        path: "/mail-verify",
        name: "mail-verify",
        component: () =>
          import("@/views/crafted/authentication/basic-flow/MailVerify.vue"),
        meta: {
          pageTitle: "Verify your email",
        },
      },
      {
        path: "/mail-retrieval-sent",
        name: "mail-retrieval-sent",
        component: () =>
          import("@/views/crafted/authentication/basic-flow/MailRetrievalSent.vue"),
        meta: {
          pageTitle: "Mail Retrieval Sent",
        },
      },
      {
        path: "/password-reset",
        name: "password-reset",
        component: () =>
          import("@/views/crafted/authentication/basic-flow/PasswordReset.vue"),
        meta: {
          pageTitle: "Password reset",
        },
      },
    ],
  },
  {
    path: "/multi-step-sign-up",
    name: "multi-step-sign-up",
    component: () =>
      import("@/views/crafted/authentication/MultiStepSignUp.vue"),
    meta: {
      pageTitle: "Multi-step Sign up",
    },
  },
  {
    path: "/",
    component: () => import("@/layouts/SystemLayout.vue"),
    children: [
      {
        // the 404 route, when none of the above matches
        path: "/404",
        name: "404",
        component: () => import("@/views/crafted/authentication/Error404.vue"),
        meta: {
          pageTitle: "Error 404",
        },
      },
      {
        path: "/500",
        name: "500",
        component: () => import("@/views/crafted/authentication/Error500.vue"),
        meta: {
          pageTitle: "Error 500",
        },
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async(to, from, next) => {
  const authStore = useAuthStore();
  const configStore = useConfigStore();

  // current page view title
  document.title = `${to.meta.pageTitle} - ${import.meta.env.VITE_APP_NAME}`;

  // reset config to initial state
  configStore.resetLayoutConfig();

  // verify auth token before each page change
  await authStore.verifyAuth();

  // before page access check if page requires authentication
  if (to.meta.middleware == "auth") {
    if (authStore.isAuthenticated) {
      if (to.meta.admin === 'all' || authStore.user.admin === to.meta.admin) {
        next();
      } else {
        next({ name: "404" });
      }
    } else {
      next({ name: "landing-page" });
    }
  } else {
    next();
  }

  // Scroll page to top on every route change
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
});

export default router;
