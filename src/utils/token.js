export const setToken = (token) => localStorage.setItem('userToken',token)

export const getToken = () => localStorage.getItem('userToken')

export const clearToken = () => localStorage.removeItem('userToken')