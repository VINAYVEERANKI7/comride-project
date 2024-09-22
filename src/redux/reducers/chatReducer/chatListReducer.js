import { CHAT_LIST_LOAD, CHAT_LIST_LOAD_MORE } from "../../actions/types";
import { chatListData } from "../../constants";

export const storedChatListReducer = (state = chatListData, action) => {
  switch (action.type) {
    case CHAT_LIST_LOAD:
      return {
        data: action.data.reverse(),
      };
    case CHAT_LIST_LOAD_MORE:
      return {
        ...state,
        data: [...state.data.reverse(), ...action.data].reverse(), // Concatenate arrays
      };
    default:
      return state;
  }
};
