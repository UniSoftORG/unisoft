export enum Endpoints {
  // auth
  login = "auth/login",
  logout = "auth/logout",
  register = "auth/register",

  // 2fa
  twoFactor = "auth/2fa",
  twoFactorURL = "auth/2fa/url",

  // auth Verification
  verify = "auth/verify",
  requestPasswordReset = "auth/requestPasswordReset",
  verifyPasswordCode = "auth/verifyPasswordCode",

  // user
  session = "auth/session",
  profile = "user/profile",

  // products
  products = "products",

  // forum
  categories = "forum/categories",
  threads = "forum/threads",
  thread = "forum/thread",
}
