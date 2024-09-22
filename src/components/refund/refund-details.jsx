import React from "react";
import moment from "moment";

const RefundDetails = ({ item }) => {
  return (
    <div className=" my-1">
      <table>
        <tbody>
          {item?.created_at ? (
            <tr className="">
              <td className="secondary_color text-nowrap fw_600 fs_12 text-start ps-2">
                {" "}
                Created at
              </td>
              <td className="ps-3 secondary_color fs_12 fw_600 text-nowrap">
                :
              </td>
              <td className="primary_color fs_12 fw_600 text-start text-nowrap">
                {item?.created_at
                  ? moment(item?.created_at).format("DD-MM-YYYY   , HH:mm A")
                  : "--"}
              </td>
            </tr>
          ) : (
            <></>
          )}
          {item?.created_by ? (
            <tr>
              <td className="secondary_color text-nowrap fw_600 fs_12 text-start ps-2">
                Created by
              </td>
              <td className="ps-3 secondary_color fs_12 fw_600 text-nowrap">
                :
              </td>
              <td className="primary_color fs_14 fw_600 text-start text-nowrap">
                {item?.createdBy ? item?.createdBy?.user_name : "--"}
              </td>
            </tr>
          ) : (
            <></>
          )}
          {item?.refunded_at ? (
            <tr>
              <td className="secondary_color text-nowrap fw_600 fs_12 text-start ps-2">
                Refunded At
              </td>
              <td className="ps-3 secondary_color fs_12 fw_600 text-nowrap">
                :
              </td>
              <td className="primary_color fs_12 fw_600 text-start text-nowrap">
                {item?.refunded_at
                  ? moment(item?.refunded_at).format("DD-MM-YYYY   , HH:mm A")
                  : "--"}
              </td>
            </tr>
          ) : (
            <></>
          )}
          {item?.refunded_by ? (
            <tr>
              <td className="secondary_color text-nowrap fw_600 fs_12 text-start ps-2">
                Refunded By
              </td>
              <td className="ps-3 secondary_color fs_12 fw_600 text-nowrap">
                :
              </td>
              <td className="primary_color fs_14 fw_600 text-start text-nowrap">
                {item?.refundedBy ? item?.refundedBy?.user_name : "--"}
              </td>
            </tr>
          ) : (
            <></>
          )}

          {item?.rider_payment?.refund_cancelled_at ? (
            <tr>
              <td className="secondary_color text-nowrap fw_600 fs_12 text-start ps-2">
                Cancelled at
              </td>
              <td className="ps-3 secondary_color fs_12 fw_600 text-nowrap">
                :
              </td>
              <td className="primary_color fs_12 fw_600 text-start text-nowrap">
                {moment(item?.rider_payment?.refund_cancelled_at).format(
                  "DD-MM-YYYY,hh:mm A"
                )}
              </td>
            </tr>
          ) : (
            <></>
          )}

          {item?.rider_payment?.refundCancelledBy ? (
            <tr>
              <td className="secondary_color text-nowrap fw_600 fs_12 text-start ps-2">
                Cancelled By
              </td>
              <td className="ps-3 secondary_color fs_12 fw_600 text-nowrap">
                :
              </td>
              <td className="primary_color fs_12 fw_600 text-start text-nowrap">
                {item?.rider_payment?.refundCancelledBy?.user_name ?? "--"}
              </td>
            </tr>
          ) : (
            <></>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RefundDetails;
