export const loginStateData = {
  loading: false,
  success: false,
  error: false,
  message: "",
  token: "",
};
export const fetchpendingApplicantData = {
  loading: false,
  success: false,
  error: false,
  data: {
    data: {},
  },
};

export const fetchbannedApplicantData = {
  loading: false,
  success: false,
  error: false,
  data: {
    data: {},
  },
};
export const fetchrejectApplicantData = {
  loading: false,
  success: false,
  error: false,
  data: {
    data: {},
  },
};

export const fetchexpiredApplicantData = {
  loading: false,
  success: false,
  error: false,
  data: {
    data: {},
  },
};

export const fetchblockedApplicantData = {
  loading: false,
  success: false,
  error: false,
  data: {
    data: {},
  },
};
export const fetchdeletedDriverData = {
  loading: false,
  success: false,
  error: false,
  data: {
    data: {},
  },
};

export const fetchpermdeletedDriverData = {
  loading: false,
  success: false,
  error: false,
  data: {
    data: {},
  },
};
export const fetchmanageDriverData = {
  loading: false,
  success: false,
  error: false,
  data: {
    data: {},
  },
};

// coupon
export const reviewRequiredCouponData = {
  loading: false,
  success: false,
  error: false,
  data: {
    data: {},
  },
};

export const fetchInvoiceData = {
  loading: false,
  success: false,
  error: false,
  data: {
    data: {},
  },
};

// referral
export const createRiderReferralData = {
  loading: false,
  success: false,
  error: false,
  data: {
    data: {},
  },
};

export const createDriverReferralData = {
  loading: false,
  success: false,
  error: false,
  data: {
    data: {},
  },
};

// coupon
export const createRiderCouponData = {
  loading: false,
  success: false,
  error: false,
  data: {
    data: {},
  },
};

export const createDriverCouponData = {
  loading: false,
  success: false,
  error: false,
  data: {
    data: {},
  },
};

export const incentiveData = {
  loading: false,
  success: false,
  error: false,
  data: {},
};

export const permissionsData = {
  permissions: {
    dashboard: {
      driver_dashboard: {
        read: false,
        write: false,
      },

      complaint_dashboard: {
        read: false,
        write: false,
      },
    },
    analysis_dashboard: {
      rider_metrics: {
        read: false,
        write: false,
      },
      // driver_metrics: {
      //   read: false,
      //   write: false,
      // },
      booking_metrics: {
        read: false,
        write: false,
      },
      cancellation_metrics: {
        read: false,
        write: false,
      },
      earning_metrics: {
        read: false,
        write: false,
      },
    },
    manage_admin: {
      admin_users: {
        read: false,
        write: false,
      },
      blocked_admins: {
        read: false,
        write: false,
      },
      deleted_admins: {
        read: false,
        write: false,
      },
    },
    riders: {
      manage_riders: {
        read: false,
        write: false,
      },
      blocked_riders: {
        read: false,
        write: false,
      },
    },
    drivers: {
      manage_drivers: {
        read: false,
        write: false,
      },
      pending_application: {
        read: false,
        write: false,
      },
      rejected_application: {
        read: false,
        write: false,
      },
      banned_application: {
        read: false,
        write: false,
      },
      expired_documents: {
        read: false,
        write: false,
      },
      blocked_driver: {
        read: false,
        write: false,
      },
    },
    deleted_users: {
      deleted_riders: {
        read: false,
        write: false,
      },
      permanentely_deleted_drivers: {
        read: false,
        write: false,
      },
      permanentely_deleted_riders: {
        read: false,
        write: false,
      },
      deleted_drivers: {
        read: false,
        write: false,
      },
    },
    manage_booking_requests: {
      ongoing_booking_requests: {
        read: false,
        write: false,
      },
      unsuccessful_booking_requests: {
        read: false,
        write: false,
      },
    },
    manage_bookings: {
      ongoing_booking: {
        read: false,
        write: false,
      },
      completed_booking: {
        read: false,
        write: false,
      },
      cancelled_booking: {
        read: false,
        write: false,
      },
      accident_booking: {
        read: false,
        write: false,
      },
      adjusted_booking: {
        read: false,
        write: false,
      },
    },

    booking_invoices: {
      booking_invoice: {
        read: false,
        write: false,
      },
    },
    refund: {
      pending_refund: {
        read: false,
        write: false,
      },
      successful_refund: {
        read: false,
        write: false,
      },
      cancelled_refund: {
        read: false,
        write: false,
      },
    },

    driver_metrics: {
      driver_metrics: {
        read: false,
        write: false,
      },
    },
    driver_finances: {
      driver_finance: {
        read: false,
        write: false,
      },
    },
    ride_type_Vehicle_type: {
      ride_types: {
        read: false,
        write: false,
      },
      vehicle_types: {
        read: false,
        write: false,
      },
    },
    zones: {
      manage_zones: {
        read: false,
        write: false,
      },
      blocked_zones: {
        read: false,
        write: false,
      },
      archived_zones: {
        read: false,
        write: false,
      },
    },
    fares: {
      manage_fares: {
        read: false,
        write: false,
      },
      defualt_fares: {
        read: false,
        write: false,
      },
      deleted_intrazone_fares: {
        read: false,
        write: false,
      },
      archived_intrazone_fares: {
        read: false,
        write: false,
      },
      archived_fares: {
        read: false,
        write: false,
      },
    },
    driver_premium: {
      manage_driver_premiums: {
        read: false,
        write: false,
      },
      default_driver_premiums: {
        read: false,
        write: false,
      },
      archived_premiums: {
        read: false,
        write: false,
      },
    },
    // Driver Premiums need to add
    rider_complaints: {
      my_rider_complaint: {
        read: false,
        write: false,
      },
      rider_mobileapp: {
        read: false,
        write: false,
      },
      rider_call: {
        read: false,
        write: false,
      },
      rider_pending_complaints: {
        read: false,
        write: false,
      },
      rider_inprogress_complaint: {
        read: false,
        write: false,
      },
      rider_resloved_closed_complaint: {
        read: false,
        write: false,
      },
    },
    driver_complaints: {
      my_driver_complaint: {
        read: false,
        write: false,
      },
      driver_mobileapp: {
        read: false,
        write: false,
      },
      driver_call: {
        read: false,
        write: false,
      },
      driver_pending_complaints: {
        read: false,
        write: false,
      },
      driver_inprogress_complaint: {
        read: false,
        write: false,
      },
      driver_resloved_closed_complaint: {
        read: false,
        write: false,
      },
    },
    sos: {
      my_driver_sos: {
        read: false,
        write: false,
      },
      my_rider_sos: {
        read: false,
        write: false,
      },
      pending_create_rider_sos: {
        read: false,
        write: false,
      },
      pending_create_driver_sos: {
        read: false,
        write: false,
      },
      inprogress_rider_sos: {
        read: false,
        write: false,
      },
      inprogress_driver_sos: {
        read: false,
        write: false,
      },
      resloved_closed_sos: {
        read: false,
        write: false,
      },
      local_responder: {
        read: false,
        write: false,
      },
    },
    rider_finances: {
      rider_finance: {
        read: false,
        write: false,
      },
    },
    coupons: {
      rider_coupons: {
        read: false,
        write: false,
      },
      rider_coupons_review_required: {
        read: false,
        write: false,
      },
      rider_coupons_active: {
        read: false,
        write: false,
      },
      rider_coupons_rejected: {
        read: false,
        write: false,
      },
      rider_coupons_deleted: {
        read: false,
        write: false,
      },
      rider_coupons_expired: {
        read: false,
        write: false,
      },
      rider_coupons_usage_history: {
        read: false,
        write: false,
      },
      driver_coupons: {
        read: false,
        write: false,
      },
      driver_coupons_review_required: {
        read: false,
        write: false,
      },
      driver_coupons_active: {
        read: false,
        write: false,
      },
      driver_coupons_rejected: {
        read: false,
        write: false,
      },
      driver_coupons_deleted: {
        read: false,
        write: false,
      },
      driver_coupons_expired: {
        read: false,
        write: false,
      },
      driver_coupons_usage_history: {
        read: false,
        write: false,
      },
    },
    referrals: {
      rider_referrals: {
        read: false,
        write: false,
      },
      rider_referrals_review_required: {
        read: false,
        write: false,
      },
      rider_referrals_active: {
        read: false,
        write: false,
      },
      rider_referrals_rejected: {
        read: false,
        write: false,
      },
      rider_referrals_deleted: {
        read: false,
        write: false,
      },
      rider_referrals_expired: {
        read: false,
        write: false,
      },
      rider_referrals_usage_history: {
        read: false,
        write: false,
      },
      driver_referrals: {
        read: false,
        write: false,
      },
      driver_referrals_review_required: {
        read: false,
        write: false,
      },
      driver_referrals_active: {
        read: false,
        write: false,
      },
      driver_referrals_rejected: {
        read: false,
        write: false,
      },
      driver_referrals_deleted: {
        read: false,
        write: false,
      },
      driver_referrals_expired: {
        read: false,
        write: false,
      },
      driver_referrals_usage_history: {
        read: false,
        write: false,
      },
    },
    incentives: {
      rider_incentive: {
        read: false,
        write: false,
      },
      rider_incentive_review_required: {
        read: false,
        write: false,
      },
      rider_incentive_active: {
        read: false,
        write: false,
      },
      rider_incentive_rejected: {
        read: false,
        write: false,
      },
      rider_incentive_deleted: {
        read: false,
        write: false,
      },
      rider_incentive_expired: {
        read: false,
        write: false,
      },
      rider_incentive_usage_history: {
        read: false,
        write: false,
      },
      driver_incentive: {
        read: false,
        write: false,
      },

      driver_incentive_review_required: {
        read: false,
        write: false,
      },
      driver_incentive_active: {
        read: false,
        write: false,
      },
      driver_incentive_rejected: {
        read: false,
        write: false,
      },
      driver_incentive_deleted: {
        read: false,
        write: false,
      },
      driver_incentive_expired: {
        read: false,
        write: false,
      },
      driver_incentive_usage_history: {
        read: false,
        write: false,
      },
    },
    broadcast: {
      rider_broadcast: {
        read: false,
        write: false,
      },

      rider_broadcast_review_required: {
        read: false,
        write: false,
      },
      rider_broadcast_active: {
        read: false,
        write: false,
      },
      rider_broadcast_rejected: {
        read: false,
        write: false,
      },
      rider_broadcast_deleted: {
        read: false,
        write: false,
      },
      rider_broadcast_expired: {
        read: false,
        write: false,
      },
      driver_broadcast: {
        read: false,
        write: false,
      },
      driver_broadcast_review_required: {
        read: false,
        write: false,
      },
      driver_broadcast_active: {
        read: false,
        write: false,
      },
      driver_broadcast_rejected: {
        read: false,
        write: false,
      },
      driver_broadcast_deleted: {
        read: false,
        write: false,
      },
      driver_broadcast_expired: {
        read: false,
        write: false,
      },
    },
    faq: {
      rider_faq: {
        read: false,
        write: false,
      },
      driver_faq: {
        read: false,
        write: false,
      },
    },
    notification_and_sms: {
      nse_rider: {
        read: false,
        write: false,
      },
      nse_driver: {
        read: false,
        write: false,
      },
    },
    tracking: {
      track_vehicle: {
        read: false,
        write: false,
      },
      track_sos_rider: {
        read: false,
        write: false,
      },
    },
  },
};

export const chatListData = {
  data: [],
};
