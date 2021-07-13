// get credentials of loged in user
export const getLocalCredentials = () => {
  const token = JSON.parse(localStorage.getItem("logincredentials"))?.token;
  return { token };
};

// saving logged in user's credentials in localStorage
export const setLocalCredentials = (token) => {
  return localStorage.setItem("logincredentials", JSON.stringify({ token }));
};

// TODO: when logging out
// remove user credentials from localstorage
export const removeLocalCredentials = () => {
  return localStorage.removeItem("logincredentials");
};
