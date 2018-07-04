import {
  ARTICLE_PAGE_LOADED,
  ARTICLE_PAGE_UNLOADED,
  MSG_ADDED,
  CHANGE_MSG
} from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case ARTICLE_PAGE_LOADED:
       console.log(action.payload)
       return {
        ...state,
        jobDetail: action.payload[0] || {},
        chatList: action.payload[1]?action.payload[1].userMsg:[],
        jobMsgList: action.payload[2]?action.payload[2]:[]
      };
    case MSG_ADDED:
       return {
        ...state,
        chatList : action.payload.userMsg
      };
    case CHANGE_MSG:
       return {
        ...state,
        chatList : action.payload.userMsg
      };
    case ARTICLE_PAGE_UNLOADED:
      return {};
    default:
      return state;
  }
};
