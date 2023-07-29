export const initialState = {
  nav: localStorage.getItem('nav') ? localStorage.getItem('nav') : false,

  // user:
  //   localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'))
  //     ? JSON.parse(localStorage.getItem('user'))
  //     : null,
};

export const actionType = {
  SET_NAV: 'SET_NAV',
  SET_USER: 'SET_USER',
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
