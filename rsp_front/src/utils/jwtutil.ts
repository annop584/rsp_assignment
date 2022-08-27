export const initToken = (email: string, token: string) => {
  const now = new Date();
  const jwt_token = {
    email: email,
    token: token,
  };
  localStorage.setItem("jwt", JSON.stringify(jwt_token));
};

export const getToken = (): string | null => {
  const jwt = localStorage.getItem("jwt");
  if (jwt) {
    const item = JSON.parse(jwt);
    return item.token;
  } else {
    return null;
  }
};

export const getEmail = (): string => {
  const jwt = localStorage.getItem("jwt");
  if (jwt) {
    const item = JSON.parse(jwt);
    return item.email;
  } else {
    return "";
  }
};
