import React from "react";

const NoButton = ({ cancelFn, containerClassName = "px-4" }) => {
  return (
    <>
      <div className="">
        <button
          className={`white_bg error_border  border_radius_5px ${containerClassName}  `}
          type="button"
          onClick={() => cancelFn()}
        >
          <span
            className={`d-flex justify-content-center align-items-center gap-2 px-4`}
          >

            <span className=" fs_18 error_color  fw_500 mb-1">No</span>
          </span>
        </button>
      </div>
    </>
  );
};

export default NoButton;
