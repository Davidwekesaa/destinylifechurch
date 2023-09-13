export const initialState = {
  nav: sessionStorage.getItem("nav") ? sessionStorage.getItem("nav") : false,

  user:
    sessionStorage.getItem("user") && JSON.parse(sessionStorage.getItem("user"))
      ? JSON.parse(sessionStorage.getItem("user"))
      : null,
};

export const actionType = {
  SET_NAV: "SET_NAV",
  SET_USER: "SET_USER",
};

export const reducer = (state, action) => {
  switch (action.type) {
    case actionType.SET_NAV:
      return {
        ...state,
        nav: action.nav,
      };

    case actionType.SET_USER:
      return {
        ...state,
        user: action.user,
      };

    default:
      return state;
  }
};
