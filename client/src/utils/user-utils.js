export const getToken = () => {
    if(localStorage.AUTH_TOKEN && localStorage.AUTH_TOKEN !== '') {
        return localStorage.AUTH_TOKEN;
    }
    return null;
}

export const setUserInfo = (userInfo) => {
    localStorage.setItem('AUTH_TOKEN', userInfo.token);
    localStorage.setItem('USER_NAME', userInfo.name);
    localStorage.setItem('USER_PROFILE_IMG', userInfo.image);
}

export const getUserInfo = () => {
    return {
        name: localStorage.USER_NAME,
        profileImage: localStorage.USER_PROFILE_IMG
    }
}
export const removeUserInfo = () => {
    localStorage.removeItem('AUTH_TOKEN');
    localStorage.removeItem('USER_NAME');
    localStorage.removeItem('USER_PROFILE_IMG');
}

export const isLoggedIn = () => {
    const token = getToken();
    return token && token !== null ? true : false;
}