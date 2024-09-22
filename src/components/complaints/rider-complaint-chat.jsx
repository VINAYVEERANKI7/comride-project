import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import moment from "moment";
import usePermissions from "../usePermissionChecker";
import {
  applicationAge,
  driverNavigateFn,
  navigationFn,
  riderNavigateFn,
  useSortableData,
} from "../helper";
import SearchInputfield from "../form/searchInputfield";
import { myComplaintsRiderListAction } from "../../redux/actions/complaints/myComplaintsAction";
import DriverImage from "../../assets/images/profileimage.png";
import EmptyChatImage from "../../assets/images/empty-chat.png";
import { NavLink } from "react-router-dom";
import ComplaintChatSection from "../chat-section/complaintsChatSection";
import RiderComplaintChatBox from "../chat-section/rider-complaint-chat-box";

const RiderComplaintChat = ({ type, navLoaction }) => {
  const dispatch = useDispatch();

  const [reload, setReload] = useState(false);
  const [myComplaintsFilter, setMyComplaintsFilter] = useState(false);
  const [searchText, setSearchText] = useState(
    navLoaction?.state?.complaint_id ?? ""
  );
  const [complaintListLoading, setComplaintListLoading] = useState(false);
  const [complaintList, setcomplaintList] = useState([]);
  const [complaintListBody, setComplaintListBody] = useState([]);
  const [showChatBody, setShowChatBody] = useState(false);
  const [blockFocus, setBlockFocus] = useState(false);
  const [riderDetails, setRiderDetails] = useState(false);
  const [riderMoreOption, setRiderMoreOption] = useState(false);
  const [storedMessages, setStoredMessages] = useState([]);
  const [messageCount, setmessageCount] = useState([]);
  const [adminId, setAdminId] = useState("");
  useEffect(() => {
    setAdminId(localStorage.getItem("id"));
  }, []);

  const { canRead, canWrite } = usePermissions();
  const pagePermissions = {
    driverComplaints: "my_driver_complaint",
    riderComplaints: "my_rider_complaint",
  };
  const permission = pagePermissions[type];

  const onClickRef = useRef(null);
  const insideClickRef = useRef(null);

  const filterClickRef = useRef();
  const insideFilterClickRef = useRef();

  const moreClickRef = useRef();
  const insideMoreClick = useRef();

  useEffect(() => {
    setComplaintListLoading(true);
    if (type === "riderComplaints") {
      dispatch(
        myComplaintsRiderListAction(
          {
            search: "",
          },
          onListFetchSuccess,
          onListFetchError
        )
      );
    }
  }, [reload]);

  const onListFetchSuccess = (data) => {
    setComplaintListLoading(false);

    setcomplaintList(data?.data?.data);
  };

  const onListFetchError = (data) => {
    setComplaintListLoading(false);
  };

  const filterComplaintsList = searchText
    ? complaintList?.filter(
        (item) =>
          item?.complaint_id2
            ?.toLocaleLowerCase()
            .includes(searchText.toLocaleLowerCase()) ||
          item?.booking?.driver?.first_name
            .toLocaleLowerCase()
            .includes(searchText.toLocaleLowerCase()) ||
          item?.booking?.rider?.first_name
            .toLocaleLowerCase()
            .includes(searchText.toLocaleLowerCase())
      )
    : complaintList;

  const { items, requestSort, sortConfig } =
    useSortableData(filterComplaintsList);

  const idCountMap = [];

  function onClickFn(items, index) {
    setComplaintListBody(items);
    setBlockFocus(index);
    const admin_id = adminId;
    const connectedData = {
      userId: admin_id,
      user_type: "admin",
      complaintId: items?.id,
    };
    setShowChatBody(true);
    // setRoomChange(!roomChange);
  }
  const complaintData = [
    {
      label: "Complaint",
      value: complaintListBody?.complaint_id2 ?? "--",
      subValue: `(Complaint age: ${
        complaintListBody?.complented_at
          ? applicationAge(complaintListBody?.complented_at)
          : "--"
      })`,
    },
    { label: "Type", value: complaintListBody?.complaint_type ?? "--" },
    {
      label: complaintListBody?.booking?.driver_id2 ? "Driver ID" : "Rider ID",
      value:
        complaintListBody?.booking?.driver_id2 ??
        complaintListBody?.booking?.rider?.rider_id2 ??
        "--",
      navLink: true,
      link: complaintListBody?.booking?.driver
        ? driverNavigateFn(
            complaintListBody?.booking?.driver,
            complaintListBody?.booking?.driver?.id
          )
        : riderNavigateFn(
            complaintListBody?.booking?.rider,
            complaintListBody?.booking?.rider?.id
          ),
    },
    { label: "Title", value: complaintListBody?.complaint_title ?? "--" },
    {
      label: "Booking ID",
      value: complaintListBody?.booking?.booking_id_2 ?? "--",
      navLink: true,
      link: `${navigationFn(
        complaintListBody?.booking?.booking_classification,
        complaintListBody?.booking?.id
      )}`,
    },
  ];

  return (
    <>
      <div className="rider_complaints_container  p-3 pb-4 mx-3 my-4">
        <div className="mx-3 d-sm-flex justify-content-between mt-3 align-items-center">
          <span className="">
            <span className="fs_26 primary_color fw_600">My Complaints</span>
            <span className="secondary_color fs_16 fw_500">
              (Source: Mobile App)
            </span>
          </span>
        </div>
        {canWrite(permission) === false ? (
          <div className="position-absolute top-50 start-50 translate-middle">
            <span className="primary_color fs_26 fw_500">
              You are not authorized
            </span>
          </div>
        ) : (
          <div className="row mt-3">
            <div className="col-xxl-3 col-xl-4 col-md-5 col-sm-6">
              {/* chat sidebar starts */}
              <div className="ms-3 ">
                <div className="position-relative">
                  <input
                    className=" grey_color_bg border_none border_radius_5px outline_none ps-2 p-1 w-100"
                    placeholder="Search text"
                    value={searchText}
                    type="text"
                    onChange={(e) => {
                      setSearchText(e.target.value.toLocaleUpperCase());
                      setReload(!reload);
                    }}
                  />

                  <i
                    className="ri-search-line serach__input_icon ps-2"
                    onClick={() => setReload(!reload)}
                  />
                </div>

                <div className="d-flex justify-content-between mt-3 mb-2">
                  <span className="primary_color fs_16 fw_500">
                    My Complaints ({complaintList?.length})
                  </span>
                  <div className="position-relative">
                    <span>
                      <i
                        className="ri-filter-2-fill primary_color cursor_pointer"
                        onClick={() =>
                          setMyComplaintsFilter(!myComplaintsFilter)
                        }
                        ref={filterClickRef}
                      />
                    </span>
                    {myComplaintsFilter ? (
                      <div
                        className="rider_complaint_filter_container white_bg border_radius_7px"
                        ref={insideFilterClickRef}
                      >
                        <span className="d-flex justify-content-between">
                          <span className="orange_color fs_16 fw_500 p-2 ps-3">
                            Filter
                          </span>
                          <span className="p-2 pe-2">
                            <i
                              className="ri-close-fill secondary_color fw_700 cursor_pointer"
                              onClick={() => setMyComplaintsFilter(false)}
                            />
                          </span>
                        </span>
                        <hr className="list_underline m-0" />
                        <ul className="menu_list p-2 mb-0 primary_color fs_14 fw_600 text-start">
                          {filterTitle?.map((item, index) => {
                            const isActiveSortIndex = activeSortIndex === index;
                            return (
                              <>
                                <li className="py-1 px-3">
                                  <SearchInputfield
                                    title={item?.title}
                                    requestSort={requestSort}
                                    sortName={item?.value}
                                    key={item?.title}
                                    index={index}
                                    isActiveSortIndex={isActiveSortIndex}
                                    setActiveSortIndex={setActiveSortIndex}
                                    sortConfig={sortConfig}
                                  />
                                </li>
                              </>
                            );
                          })}
                        </ul>
                      </div>
                    ) : null}
                  </div>
                </div>

                {items?.map((items, index) => {
                  return (
                    <div
                      className={
                        blockFocus === index
                          ? "complaints_block cursor_pointer my-2"
                          : "rider_heading_border_bottom cursor_pointer my-2"
                      }
                      onClick={() => {
                        onClickFn(items, index);
                      }}
                      key={items?.complaint_id2}
                    >
                      <div className="d-flex">
                        <div className="p-2 position-relative">
                          <img
                            src={
                              items?.booking?.driver?.profile_pic?.photo ??
                              items?.booking?.rider?.profile_pic?.photo ??
                              DriverImage
                            }
                            width="50px"
                            height="50px"
                            className="border_radius_7px"
                          />
                          <span
                            className={
                              idCountMap
                                ?.filter(
                                  (item) =>
                                    item.id === items?.driver?.id ||
                                    item.id === items?.rider?.id
                                )
                                .map((item) => item?.count)?.[0] ===
                              (null || undefined)
                                ? ""
                                : "position-absolute count_of_unseen_mess fw_500 fs_14 text-center white_color"
                            }
                          >
                            {
                              idCountMap
                                ?.filter(
                                  (item) =>
                                    item.id === items?.driver?.id ||
                                    item.id === items?.rider?.id
                                )
                                .map((item) => item?.count)?.[0]
                            }
                          </span>
                        </div>
                        <div className="w-100 pt-1 d-flex flex-column pe-2">
                          <span className="d-flex justify-content-between">
                            <span className="fs_14 fw_500 primary_color">
                              {items?.driver?.first_name ??
                                items?.rider?.first_name ??
                                "--"}
                            </span>
                            {/* <span className="fs_11 orange_color fw_500 d-flex-justify-content-end">
                              {alllllll?.data?.complaintId === items?.id
                                ? moment(alllllll?.data?.createdAt).format(
                                    "hh:mm A"
                                  )
                                : moment(UseLastMessage(items?.id)).format(
                                    "hh:mm A"
                                  )}
                            
                            </span> */}
                          </span>
                          <table className="w_80">
                            <tbody>
                              <tr className="fs_11 fw_500 secondary_color">
                                <td className="text-nowrap ">Complaint</td>
                                <td className="text-nowrap">
                                  : {items?.complaint_id2 ?? "--"}
                                </td>
                              </tr>
                              <tr className="fs_11 fw_500 secondary_color">
                                <td className="text-nowrap">Complaint Age</td>
                                <td className="text-nowrap">
                                  :{" "}
                                  {items?.complented_at
                                    ? applicationAge(items?.complented_at)
                                    : "--"}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              {/* chat sidebar ends */}
            </div>
            <div className="col-xxl-9 col-xl-8  col-md-7 col-sm-6">
              {showChatBody ? (
                <div className="border border_radius_7px h-100 p-2">
                  <div className="row mb-2">
                    <div className="col-10">
                      <div className="row">
                        <div className="col-xxl-1 d-flex justify-content-xxl-start justify-content-center">
                          <img
                            src={
                              complaintListBody?.booking?.driver?.profile_pic
                                ?.photo ??
                              complaintListBody?.booking?.rider?.profile_pic
                                ?.photo ??
                              null
                            }
                            width="75px"
                            height="75px"
                            className="border_radius_7px"
                          />
                        </div>
                        <div className="col-10 ms-4">
                          <span className="fs_16 fw_500 primary_color">
                            {complaintListBody?.booking?.driver?.first_name ??
                              complaintListBody?.booking?.rider?.first_name ??
                              "--"}
                          </span>
                          <div className="row">
                            {complaintData?.map((item) => {
                              return (
                                <div className="col-xl-6">
                                  <table>
                                    <tbody>
                                      <tr className="fs_11 fw_500">
                                        <td className="secondary_color">
                                          {item?.label}
                                        </td>
                                        {/* <td className="ps-2 primary_color">
                                          {item?.label === "Driver ID" ||
                                          item?.label === "Rider ID" ||
                                          item?.label === "Booking ID" ? (
                                            <a href="">{item?.value ?? "--"}</a>
                                          ) : (
                                            item?.value ?? "--"
                                          )}

                                          {item?.subValue && (
                                            <span className="secondary_color">
                                              {item?.subValue}
                                            </span>
                                          )}
                                        </td> */}

                                        <td className="ps-2 primary_color">
                                          {item?.navLink ? (
                                            <NavLink
                                              to={item?.link}
                                              className="primary_color"
                                            >
                                              {item?.value}
                                            </NavLink>
                                          ) : (
                                            item?.value
                                          )}
                                          {item?.subValue && (
                                            <span className="secondary_color">
                                              {item?.subValue}
                                            </span>
                                          )}
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-2">
                      <div className="d-flex justify-content-end align-items-center me-sm-2 gap-2">
                        <div className="position-relative">
                          <div
                            className="light_blue_color details_text fs_14 fw_500 cursor_pointer "
                            onClick={() => setRiderDetails(!riderDetails)}
                            ref={onClickRef}
                          >
                            <span>Details</span>
                          </div>

                          {riderDetails ? (
                            <>
                              <div ref={insideClickRef}>
                                <ComplaintsDetails item={complaintListBody} />
                              </div>
                            </>
                          ) : null}
                        </div>
                        <div className="position-relative">
                          <i
                            className="ri-more-2-fill align-items-end cursor_pointer"
                            onClick={() => setRiderMoreOption(!riderMoreOption)}
                            ref={moreClickRef}
                          />

                          {riderMoreOption ? (
                            <div
                              className="rider_more_option_container white_bg border_radius_7px"
                              ref={insideMoreClick}
                            >
                              <ul className="menu_list p-2 mb-0 primary_color fs_14 fw_600 text-center">
                                <li className="py-1 ">
                                  <button
                                    className={
                                      "background_none border_none  primary_color fs_14 fw_600 cursor_pointer text-nowrap"
                                    }
                                    type="button"
                                    onClick={() => {
                                      handleAssignComplaintsShow();
                                      setAction("forwardComplaint");
                                    }}
                                  >
                                    Forward The Complaint
                                  </button>
                                </li>
                                <hr className="list_underline m-1" />

                                <li className="py-1 cursor_pointer">
                                  <button
                                    className="background_none border_none primary_color fs_14 fw_600 cursor_pointer text-nowrap"
                                    type="button"
                                    onClick={() => {
                                      handleComplaintPassShow();
                                      setAction("closeComplaint");
                                    }}
                                  >
                                    Close Complaint
                                  </button>
                                </li>
                                <hr className="list_underline m-1" />

                                <li className="py-1 cursor_pointer">
                                  <button
                                    className="background_none border_none primary_color fs_14 fw_600 cursor_pointer text-nowrap"
                                    onClick={() => {
                                      handleComplaintPassShow();
                                      setAction("resolveComplaint");
                                    }}
                                  >
                                    Resolve Complaint
                                  </button>
                                </li>
                              </ul>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="chat_body_border">
                    <RiderComplaintChatBox
                      complaintList={complaintListBody}
                      driverID={null}
                      riderID={
                        type === "riderComplaints"
                          ? complaintListBody?.rider_id
                          : null
                      }
                      complaintID={complaintListBody?.id}
                      setStoredMessages={setStoredMessages}
                      storedMessages={storedMessages}
                      type={type}
                      setmessageCount={setmessageCount}
                      messageCount={messageCount}
                    />
                  </div>
                </div>
              ) : (
                // chat body ends
                <div className="chat_box_body">
                  <img src={EmptyChatImage} className="chat_box_empty_image" />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default RiderComplaintChat;
