import React, { useRef } from "react";
import Sidebar from "./sidebar";
import { useState } from "react";
import menuIcon from "../../assets/icons/menu-icon.svg";
import SOSEmercencyList from "./sosEmercencyList";
import LogoutModal from "./LogoutModal";
import toggleIcon from "../../assets/icons/menu.svg";
import ResetAdminPasswordModal from "./resetAdminPassword";
import useDisplayToggle from "../useDisplayToggle";

const Layout = ({ children }) => {
  const onClickRef = useRef(null);
  const insideClickRef = useRef(null);

  const [resetPasswordshow, setResetPasswordShow] = useState(false);
  const handleResetPasswordClose = () => setResetPasswordShow(false);
  const handleResetPasswordShow = () => {
    setResetPasswordShow(true);
  };

  const [logoutModalshow, setLogoutModalShow] = useState(false);
  const handleLogoutModalClose = () => setLogoutModalShow(false);
  const handleLogoutModalShow = () => {
    setLogoutModalShow(true);
  };

  const [logoutPopup, setLogoutPopup] = useState(false);

  const [sideBarOpen, setSideBarOpen] = useState(false);
  const handleSidebarClose = () => {
    setSideBarOpen(false);
  };

  useDisplayToggle({
    onClickRef,
    insideClickRef,
    setDisplay: setLogoutPopup,
  });

  const user = JSON.parse(localStorage.getItem("user"));
  const userName = user?.adminData?.first_name;
  const firstLetter = userName ? userName.charAt(0).toUpperCase() : "";
  const lastLetter = userName
    ? user?.adminData?.last_name.charAt(0).toUpperCase()
    : "";

  return (
    <>
      <ResetAdminPasswordModal
        resetPasswordshow={resetPasswordshow}
        handleResetPasswordClose={handleResetPasswordClose}
      />
      <LogoutModal
        logoutModalshow={logoutModalshow}
        handleLogoutModalClose={handleLogoutModalClose}
      />
      <div className="d-flex">
        <Sidebar
          sideBarOpen={sideBarOpen}
          handleSidebarClose={handleSidebarClose}
        />
        <div
          className="d-flex justify-content-between justify-content-lg-end px-2 
        align-items-center logout_container  
        position-fixed  white_bg "
        >
          <div
            onClick={() => setSideBarOpen(!sideBarOpen)}
            className={`menu_icon_container`}
          >
            <img src={menuIcon} alt="menu_icon" />
          </div>
          <div className="d-flex gap-3 align-items-center">
            <SOSEmercencyList />
            {/* <div
              className="pe-4 fs_16 fw_600 position-relative cursor_pointer"
              onClick={() => setLogoutPopup(!logoutPopup)}
              ref={onClickRef}
            >
              <img src={toggleIcon} width={15} height={15} alt="icon" />
            </div> */}

            <label className="ms-4 text-capitalize">{userName ?? "--"}</label>
            <div
              onClick={() => setLogoutPopup(!logoutPopup)}
              ref={onClickRef}
              className="container d-flex justify-content-center align-items-center cursor_pointer me-3 w-100"
            >
              {firstLetter ?? "A"}
              {lastLetter ?? "A"}
            </div>
            {logoutPopup ? (
              <>
                <div
                  style={{ width: "330px" }}
                  className="rider_more_option_container white_bg rounded-5 mt-4 me-4 p-4 text-center"
                  ref={insideClickRef}
                >
                  <div className="text-center">
                    <div className="d-flex align-items-start justify-content-center gap-2 ms-3">
                      <div className="container2 d-flex justify-content-end align-items-center cursor_pointer  px-3 py-2 rounded-2">
                        <label className="">{firstLetter ?? "A"}</label>
                        <label className="">{lastLetter ?? "A"}</label>
                      </div>
                      <div className="text-start">
                        <label className="text-capitalize fs_18 fw_500">
                          {userName} {user?.adminData?.last_name}
                        </label>
                        <label className="w-100 fs_14">
                          {user?.adminData?.email}
                        </label>
                        <label className="w-100 fs_14">
                          {user?.adminData?.admin_id}
                        </label>
                      </div>
                    </div>
                  </div>
                  <hr className="m-0 mt-1" />
                  <button
                    className={
                      "background_none border_none primary_color fs_16 fw_600 cursor_pointer my-1"
                    }
                    type="button"
                    onClick={() => {
                      handleResetPasswordShow();
                    }}
                  >
                    Reset Password
                  </button>
                  <hr className="m-0" />

                  <button
                    style={{ backgroundColor: "#1699f8" }}
                    className={
                      "border_none rounded-2 text-white fs_16 fw_600 cursor_pointer px-3 py-1 w-50 mt-2"
                    }
                    type="button"
                    onClick={() => {
                      handleLogoutModalShow();
                    }}
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : null}
          </div>
        </div>
        <div className="main_layout_container ms-auto">
          <div className="mt-4 pt-3">{children}</div>
        </div>
      </div>
    </>
  );
};

export default Layout;
