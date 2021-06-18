import { FETCH_ALL,DELETE,FETCH_ONE,UPDATE} from '../constants/actionTypes';

export default (users = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case FETCH_ONE:
      return users.map((user) => (user._id === action.payload._id ? action.payload : user));
    case UPDATE:
      return users.map((user) => (user._id === action.payload._id ? action.payload : user));
    case DELETE:
      return users.filter((user) => user._id !== action.payload);
    default:
      return users;
  }
};

