import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import "../adminModals.css";
import Resetbtn from "../../utilits/buttons/resetbtn";
import { removeUnderScore } from "../../helper";
import { useDispatch, useSelector } from "react-redux";
import { permissionUpdate } from "../../../redux/actions/manageAdminsAction";
import CloseIcon from "../../../assets/icons/close-icon";

const CreatePermissionsModal = ({
  permissionShow,
  handlePermissionClose,
  formik,
  action,
  setCreatePermissionValues,
  createPermissionValues,
}) => {
  const dispatch = useDispatch();
  const [viewAllChecked, setViewAllChecked] = useState(false);
  const [editAllChecked, setEditAllChecked] = useState(false);

  const permissionData = useSelector((store) => store.permissionReducer);

  const handleViewAllChange = (event) => {
    const isChecked = event.target.checked;
    setViewAllChecked(isChecked);
    const updatedPermissions = { ...permissionData?.permissions };
    for (const sectionName in updatedPermissions) {
      for (const subSectionName in updatedPermissions[sectionName]) {
        console.log(isChecked, "updatedPermissions : ");
        updatedPermissions[sectionName][subSectionName].read = isChecked;
      }
    }
    dispatch(permissionUpdate(updatedPermissions));
    setCreatePermissionValues(updatedPermissions);
  };

  const handleEditAllChange = (event) => {
    const isChecked = event.target.checked;
    setViewAllChecked(isChecked);
    setEditAllChecked(isChecked);
    const updatedPermissions = { ...permissionData?.permissions };
    for (const sectionName in updatedPermissions) {
      for (const subSectionName in updatedPermissions[sectionName]) {
        updatedPermissions[sectionName][subSectionName].write = isChecked;
        updatedPermissions[sectionName][subSectionName].read = isChecked;
      }
    }
    dispatch(permissionUpdate(updatedPermissions));
    setCreatePermissionValues(updatedPermissions);
  };

  const handleEditCheck = (e, sectionName, subSectionName) => {
    const { checked } = e.target;
    const updatedPermissions = { ...permissionData?.permissions };
    updatedPermissions[sectionName][subSectionName].read = checked;
    updatedPermissions[sectionName][subSectionName].write = checked;

    dispatch(permissionUpdate(updatedPermissions));
    setCreatePermissionValues(updatedPermissions);
  };

  const handleWriteCheck = (e, sectionName, subSectionName) => {
    const { checked } = e.target;
    const isWrite = e.currentTarget.name?.includes("write");
    const updatedPermissions = { ...permissionData?.permissions };
    updatedPermissions[sectionName][subSectionName].read = checked;

    dispatch(permissionUpdate(updatedPermissions));
    setCreatePermissionValues(updatedPermissions);
  };

  // const handleWriteCheck = (event, sectionName, subSectionName) => {
  //   formik.handleChange(event);
  //   const isWrite = event.currentTarget.name?.includes("write");

  //   if (isWrite) {
  //     if (event.currentTarget.checked) {
  //       formik.setFieldValue(
  //         `user_permission.${sectionName}.${subSectionName}.read`,
  //         true
  //       );
  //     } else {
  //       formik.setFieldValue(
  //         `user_permission.${sectionName}.${subSectionName}.read`,
  //         false
  //       );
  //     }
  //   }
  // };

  return (
    <>
      <Modal
        centered
        show={permissionShow}
        onHide={handlePermissionClose}
        size="large"
        dialogClassName="add_new_admin_container"
        contentClassName="border_radius_15px"
        backdropClassName="edit_admin_modal_backdrop"
        backdrop={action === "view" ? true : "static"}
        keyboard={false}
      >
        <div className="admin_panel py-3 d-flex justify-content-between align-items-center">
          <div> </div>
          <span className=" d-flex justify-content-center fs_14 fw_600 view_title">
            Admin Panel Feature Permissions
          </span>
          <button
            className="border_none background_none mx-2"
            onClick={() => {
              handleCancelFn();
            }}
            type="button"
          >
            <CloseIcon
              fill="white"
              className={`primary_bg fs_21 rounded-5 fw_500 p-1`}
              width={20}
              height={20}
            />
          </button>
        </div>
        <Modal.Body>
          <>
            <div className=" d-flex justify-content-center mt-2">
              <div className="col-lg-10 col-12">
                <div className="row justify-content-center table_header pale_blue_bg g-0">
                  <div className="col-4">
                    <div className="px-3 py-2 fs_12 fw_500">Menu Section</div>
                  </div>
                  <div className="col-4">
                    <div className="px-3 py-2 fs_12 fw_500">Sub-section</div>
                  </div>
                  <div className="col-2">
                    <div className="px-3 py-2 fs_12 ms-3 fw_500">
                      {" "}
                      <input
                        type="checkbox"
                        id="viewAll"
                        checked={viewAllChecked}
                        onChange={(e) => handleViewAllChange(e)}
                        disabled={editAllChecked}
                      />{" "}
                      View
                    </div>
                  </div>
                  <div className="col-2">
                    <div className="px-3 py-2 fs_12 ms-3 fw_500">
                      {" "}
                      <input
                        type="checkbox"
                        id="viewAll"
                        checked={editAllChecked}
                        onChange={(e) => handleEditAllChange(e)}
                      />{" "}
                      Edit
                    </div>
                  </div>
                </div>

                <div className="view_permissions_lists">
                  {Object.entries(createPermissionValues).map(
                    ([sectionName, permissions]) => {
                      return (
                        <div
                          className="row g-0 justify-content-center"
                          key={sectionName}
                        >
                          <div className="col-4 table_btms">
                            <div className="py-2 px-2 fs_14 fw_500">
                              {sectionName
                                ? removeUnderScore(sectionName)
                                : "--"}
                            </div>
                          </div>
                          <div className="col-8 table_data">
                            <div className="row g-0">
                              {Object.entries(permissions).map(
                                ([subSectionName, subPermissions]) => {
                                  return (
                                    <React.Fragment key={subSectionName}>
                                      <div className="col-6 table_btms">
                                        <div className="px-2 py-1 fs_14 fw_500">
                                          {subSectionName
                                            ? removeUnderScore(subSectionName)
                                            : "--"}
                                        </div>
                                      </div>
                                      <div className="col-3 table_btms">
                                        <div className="px-2 ms-3 py-1 fs_14">
                                          <input
                                            type="checkbox"
                                            className="manage_fare_checkbox_row ms-2"
                                            id={`${sectionName}_${subSectionName}_read`}
                                            name={`user_permission.${sectionName}.${subSectionName}.read`}
                                            // checked={subPermissions?.read}
                                            checked={
                                              permissions[subSectionName]?.read
                                            }
                                            onChange={(e) =>
                                              handleWriteCheck(
                                                e,
                                                sectionName,
                                                subSectionName
                                              )
                                            }
                                            disabled={
                                              permissions[subSectionName]?.write
                                            }
                                          />
                                        </div>
                                      </div>
                                      <div className="col-3 table_btms">
                                        <div className="px-2 ms-3 py-1 fs_14 last_lists">
                                          <input
                                            type="checkbox"
                                            className="manage_fare_checkbox_row ms-2"
                                            id={`${sectionName}_${subSectionName}_write`}
                                            name={`user_permission.${sectionName}.${subSectionName}.write`}
                                            checked={
                                              permissions[subSectionName]?.write
                                            }
                                            onChange={(e) =>
                                              handleEditCheck(
                                                e,
                                                sectionName,
                                                subSectionName
                                              )
                                            }
                                            disabled={false}
                                          />
                                        </div>
                                      </div>
                                    </React.Fragment>
                                  );
                                }
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            </div>
          </>
        </Modal.Body>

        <div className="admin_downpanel">
          <div
            className={`d-flex ${
              action === "view"
                ? "justify-content-end me-3"
                : "justify-content-center"
            }  mt-3 gap-sm-3 gap-1 mb-3`}
          >
            <button
              className={`border_none  d-flex align-items-center fs_16 px-sm-4 fw_500 border_radius_3px gap-2  py-1`}
              type="button"
              onClick={() => {
                formik.setFieldValue(
                  "user_permission",
                  formik?.initialValues?.user_permission
                );
                handlePermissionClose();
              }}
            >
              <i className="ri-close-circle-fill primary_color fs_18"></i>
              Cancel
            </button>
            {action === "view" ? (
              <></>
            ) : (
              <>
                {" "}
                <Resetbtn
                  onResetFn={() => {
                    setCreatePermissionValues(
                      formik?.initialValues?.user_permission
                    );
                    formik.setFieldValue(
                      "user_permission",
                      formik?.initialValues?.user_permission
                    );
                  }}
                />
                <button
                  className={`light_green_bg px-sm-5  white_color border_none  border_radius_5px ms-3 fw_400 py-2 d-flex align-items-center gap-2`}
                  type={"button"}
                  onClick={() => {
                    formik.setFieldValue(
                      "user_permission",
                      createPermissionValues
                    );
                    handlePermissionClose();
                  }}
                >
                  <i className="ri-save-fill"></i> SAVE
                </button>
              </>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CreatePermissionsModal;
