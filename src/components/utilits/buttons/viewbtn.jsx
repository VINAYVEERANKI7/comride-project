import React from "react";
import SpinnerLoading from "../spinnerLoading";

const Viewbtn = ({ viewfn, loading }) => {
  return (
    <button
      className={
        loading
          ? "border_none border_radius_5px fs_13 me-4 fw_500 px-2 white_color blue_color_bg"
          : "border_none border_radius_5px fs_13 me-4 fw_500 px-3 white_color blue_color_bg"
      }
      onClick={() => {
        viewfn();
      }}
    >
      {loading ? (
        <div>
          {" "}
          <SpinnerLoading />{" "}
        </div>
      ) : (
        "View"
      )}
    </button>
  );
};

export default Viewbtn;
