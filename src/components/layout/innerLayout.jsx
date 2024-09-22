import React from "react";
import { useNavigate } from "react-router";
import { statusColor } from "../helper";
import BackIcon from "../../assets/icons/backIcom";

const InnerLayout = ({
  children,
  mainHeading = "",
  navigateEnable = true,
  navigateFn = () => {},
  naviagteLeave = false,
  buttons = [],
  statusList = [],
  backBtnClassName = "",
  is_headingHint = false,
  headingHint = "",
  headingHintClassName = "secondary_color fs_16 fw_500",
  expiryDateShow = false,
  expiryDate = "",
  headingClassName = "",
  heading_classname = "",
  pagecontent = "",
  layoutClassname = "default_fare_container pt-3 my-4 mx-sm-3",
}) => {
  const navigate = useNavigate();
  return (
    <div className={`pb-4 ${layoutClassname} pe-3`}>
      <>
        <div
          className={`d-sm-flex align-items-center  ${backBtnClassName} justify-content-between`}
        >
          {/* <div className={`d-sm-flex `}> */}
          <div className={`d-flex `}>
            {navigateEnable ? (
              <button
                title="Back"
                className="back_icon"
                onClick={() => {
                  navigate(-1);
                }}
              >
                <BackIcon />
              </button>
            ) : (
              <></>
            )}
            {naviagteLeave && (
              <button title="Back" className="back_icon" onClick={navigateFn}>
                <BackIcon />
              </button>
            )}

            <div
              className={`primary_color d-flex ${heading_classname} ${
                is_headingHint ? "" : "gap-sm-3"
              } justify-content-start align-items-center fw_600 fs_26`}
            >
              {mainHeading}
              {statusList?.map((item) => {
                return (
                  <span
                    key={item?.value}
                    className={`border_radius_10px ${item?.backGroundColor} fs_14 d-flex gap-1 align-items-center px-2`}
                  >
                    <span>
                      <i
                        className={`${statusColor(
                          item?.value
                        )} ri-checkbox-blank-circle-fill fs_10`}
                      />
                    </span>

                    <span className={`${statusColor(item?.value)} `}>
                      {item?.value}
                    </span>
                  </span>
                );
              })}
              {is_headingHint && (
                <span className={`${headingHintClassName} pt-1`}>
                  {headingHint}
                </span>
              )}
            </div>
          </div>

          <div className="d-flex justify-content-end gap-2">
            {expiryDateShow && (
              <span className="red_color fs_16 fw_500 pe-2">{expiryDate}</span>
            )}
            {buttons.map((item, i) => {
              return <React.Fragment key={i + "e"}>{item}</React.Fragment>;
            })}
          </div>
        </div>
        <div className="row  mt-1 ms-2">
          <div className="col-12 table_container">{children}</div>
        </div>
      </>

      {/* <div>
        bread crumb place
      </div> */}
    </div>
  );
};

export default InnerLayout;
