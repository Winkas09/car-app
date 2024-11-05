export const todoReducer = (state, action) => {
    switch (action.type) {
      case 'SET_TODOS':
        return action.payload;
      case 'ADD_TODO':
        return [action.payload, ...state];
      case 'DELETE_TODO':
        return state.filter(todo => todo.id !== action.payload);
      case 'TOGGLE_DONE':
        return state.map(todo =>
          todo.id === action.payload ? { ...todo, done: !todo.done } : todo
        );
      case 'EDIT_TODO':
        return state.map(todo =>
          todo.id === action.payload.id
            ? { ...todo, title: action.payload.newTitle, description: action.payload.newDescription }
            : todo
        );
      default:
        return state;
    }
  };