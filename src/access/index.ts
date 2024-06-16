import router from "@/router";
import store from "@/store";
import ACCESS_ENUM from "@/access/accessEnum";
import checkAccess from "@/access/checkAccess";

router.beforeEach(async (to, from, next) => {
  console.log("登录用户信息: ", store.state.user.loginUser);
  let loginUser = store.state.user.loginUser;
  // 自动登录
  if (!loginUser || !loginUser.userRole) {
    // 加await等用户登录成功后执行后续代码
    await store.dispatch("getLoginUser");
    loginUser = store.state.user.loginUser;
  }
  const needAccess = (to.meta?.access as string) ?? ACCESS_ENUM.NOT_LOGIN;
  // 要跳转的页面必需要登录
  if (needAccess !== ACCESS_ENUM.NOT_LOGIN) {
    // 当前没登录，跳转登录页
    if (
      !loginUser ||
      !loginUser.userRole ||
      loginUser.userRole === ACCESS_ENUM.NOT_LOGIN
    ) {
      next(`/user/login?redirect=${to.fullPath}`);
      return;
    }
    if (!checkAccess(loginUser, needAccess)) {
      next("/401");
      return;
    }
  }
  next();
});
