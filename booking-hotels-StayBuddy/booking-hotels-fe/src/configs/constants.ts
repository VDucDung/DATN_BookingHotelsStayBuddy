export enum ClientStatusCode {
  OTP_TIMEOUT = 600,
  OTP_INVALID = 601,
  WRONG_OTP_CODE = 602,
  OVERTIME_SCAN_OTP = 603,
  AVAILABILITY_CREATE_SUCCESS = 604,
  AVAILABILITY_CREATE_ERROR = 605,
  AVAILABILITY_CREATE_EXISTED = 606,
  AVAILABILITY_UPDATE_SUCCESS = 607,
  AVAILABILITY_UPDATE_ERROR = 608,
  AVAILABILITY_DELETE_SUCCESS = 609,
  AVAILABILITY_DELETE_ERROR = 610,
  AVAILABILITY_GET_SUCCESS = 611,
  AVAILABILITY_GET_ERROR = 612,
  AVAILABILITY_GET_NOT_FOUND = 613,
  USER_NOT_FOUND = 614,
  EMAIL_ALREADY_EXISTS = 615,
  MOBILE_ALREADY_EXISTS = 616,
  SALESFORCE_CONTACT_ERR = 617,
  SALESFORCE_CONTACT_DUPLICATE = 618,
  USER_UPDATE_SUCCESS = 619,
  USER_NOT_ACTIVE = 620,
  INVALID_LOGIN_LINK = 621,
  ITEM_NOT_FOUND = 622,
  SEND_EMAIL_FAIL = 623,
}


export enum EForgotPasswordPageType {
  VERIFY_EMAIL = 'verify-email',
  RESET_PASSWORD = 'reset-password',
  FORGOT_PASSWORD = 'forgot-password',
}


export const DEFAULT_USER_AVATAR =
  'https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg'

export const REGEX_EMAIL =
  /^[a-zA-Z0-9._%+-]+@(?!.*\.\.)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/


export const PATH = {
  HOME: "/",
  NOTFOUND: '*',
  ABOUT: "/about",
  AUTH: "/auth",
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  FORGOT_PASSWORD: "/auth/forgotPassword",
  CART: "/cart",
  TEST: "/test",
  PRODUCTS: "/products",
  PRODUCT_DETAIL: "/product/:productId",
  PROFILE: "/profile",
  PROFILE_EDIT: "/profile",
  VIEWED_PRODUCTS: "profile/viewed-products",
  CHANGE_PASSWORD: "/profile/changePassword",
  FAVORITE: "/profile/favorite",
  ORDER: "/profile/booking",
  CHECKOUT: "/checkout",
  OTHER: "/other",
  CONTACT: "/contact",
  FORGOT_PASSWORD_OTP: "/auth/forgotPasswordOTP",
  RESET_PASSWORD: "/auth/resetPassword",
  SEARCH: "/search",
  TOPUP: "/profile/topUp",
};

export const PAGE_TITLE = {
  HOME: "pageTitle.home",
  ABOUT: "pageTitle.about",
  SIGN_UP: "pageTitle.register",
  LOGIN: "pageTitle.login",
  TEST: "pageTitle.test",
  PRODUCT: "pageTitle.product",
  CART: "pageTitle.cart",
  OTHER: "pageTitle.other",
  CONTACT: "pageTitle.contact",
  CHECKOUT: "pageTitle.checkout",
  PRODUCT_DETAIL: "pathTitle.productDetail",
  PROFILE: "pageTitle.profile",
};
