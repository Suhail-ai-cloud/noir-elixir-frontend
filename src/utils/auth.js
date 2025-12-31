export const saveTokens = ({ access, refresh }) => {
  localStorage.setItem("access_token", access);
  localStorage.setItem("refresh_token", refresh);
};

export const logout = () => {
  localStorage.clear();
  window.location.href = "/login";
};
