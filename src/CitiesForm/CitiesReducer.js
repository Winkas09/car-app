// CitiesReducer.js
export const citiesReducer = (state, action) => {
    switch (action.type) {
      case 'SET_CITIES':
        return action.payload;
      case 'ADD_CITY':
        return [...state, action.payload];
      case 'REMOVE_CITY':
        return state.filter(city => city.id !== action.payload);
      default:
        return state;
    }
  };