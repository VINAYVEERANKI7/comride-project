import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import {
  manageDriverReducer,
  pendingApplicantReducer,
  bannedApplicantReducer,
  rejectApplicantReducer,
  expiredApplicantReducer,
  blockedApplicantReducer,
  deletedDriverReducer,
  perDeletedDriverReducer,
  permissionReducer,
} from "../reducers/manageDriversReducer";
import {
  createRiderReferralReducer,
  createDriverReferralReducer,
} from "./referralReducer/createReferralReducer";
import {
  createRiderCouponReducer,
  createDriverCouponReducer,
} from "./couponReducer/createCouponReducer";
import { incentiveCreateReducer } from "./incentivesReducer/createIncentiveReducer";
import { storedChatListReducer } from "./chatReducer/chatListReducer";

const rootReducer = combineReducers({
  authReducer,
  manageDriverReducer,
  pendingApplicantReducer,
  bannedApplicantReducer,
  rejectApplicantReducer,
  expiredApplicantReducer,
  blockedApplicantReducer,
  deletedDriverReducer,
  perDeletedDriverReducer,
  createRiderReferralReducer,
  createDriverReferralReducer,
  createRiderCouponReducer,
  createDriverCouponReducer,
  incentiveCreateReducer,
  permissionReducer,
  storedChatListReducer,
});
export default rootReducer;
