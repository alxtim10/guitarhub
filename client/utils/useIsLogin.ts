
export const useIsLogin = () => {

    const isLogin = window.localStorage.getItem("isLogin");
    return { isLogin };

}