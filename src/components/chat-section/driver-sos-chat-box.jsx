import React, { useEffect, useRef, useState } from "react";
import "../chat-section/chat-section.css";
import { socket } from "../../redux/config";
import { useDispatch } from "react-redux";
import {
  DriverSendSosMessageAction,
  sendSosMessageAction,
  storedMessageSosAction,
  uploadChatImageAction,
} from "../../redux/actions/chatSection/chatSectionAction";
import moment from "moment";
import LoadingSpinnerTable from "../utilits/loadingSpinnerTable";
import chatLoad from "../../assets/icons/chat/chatloader.svg";

const DriverSosChatBox = ({
  driverID,
  riderID,
  complaintID,
  setStoredMessages,
  storedMessages,
  type,
  setmessageCount,
}) => {
  console.log(driverID, "driverID");
  console.log(riderID, "riderID");
  console.log(type, "type");

  const dispatch = useDispatch();
  const [messageSendLoader, setMessageSendLoader] = useState(false);
  const [messageReciveLoader, setMessageReciveLoader] = useState(false);
  const [fileLoading, setFileLoading] = useState(false);

  const [currentMessage, setCurrentMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const chatMessageBodyRef = useRef(null);
  const [shouldScrollToBottom, setShouldScrollToBottom] = useState(true);

  const [allMessageCount, setAllMessageCount] = useState("");
  const totalPages = Math.ceil(allMessageCount / 15);
  const [page, setPage] = useState(null);
  useEffect(() => {
    if (allMessageCount / 15 <= 1) {
      setPage(0);
    } else {
      setPage(totalPages);
    }
  }, [totalPages]);

  const [adminId, setAdminId] = useState("");
  const [adminUserName, setAdminUserName] = useState("");

  useEffect(() => {
    setAdminId(localStorage.getItem("id"));
    setAdminUserName(localStorage.getItem("user_name"));
  }, []);

  const currentDate = new Date();
  const hour = currentDate.getHours();
  const minute = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();
  const displayHour = hour % 12 || 12; // convert hour to 12-hour format

  function handleFileChange(e) {
    if (e.target?.files.length !== 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      var fileInput = document.getElementById("file-uplaod");
      var fileSize = fileInput.files[0].size; // size in bytes
      var maxSize = 2 * 1024 * 1024; // 2MB
      if (fileSize > maxSize) {
        alert("File size exceeds the maximum limit of 2MB");
        fileInput.value = null; // reset the file input
      } else {
        setFileLoading(true);
        dispatch(
          uploadChatImageAction(
            e.target.files[0],
            onUploadSuccess,
            onUploadError
          )
        );
      }
    }
  }
  const onUploadSuccess = (data) => {
    console.log(data, "imagedataaaaaa");
    setFile(data?.data?.data?.location);
    setFileLoading(false);
  };
  const onUploadError = (data) => {
    setFileLoading(false);
  };

  const handleSend = () => {
    if (currentMessage !== "" || file !== null) {
      const sosMessageData = {
        data: {
          driverId: driverID ?? null,
          riderId: riderID ?? null,
          adminId: adminId,
          roomId: driverID ?? riderID ?? "",
          author: adminUserName,
          file: file,
          message_data: currentMessage,
          time: `${displayHour}:${minute}:${seconds}`,
          sosId: complaintID,
          type: "sos",
          reAssignedAt: null,
          forwardedAt: null,
          user_type: "admin",
        },
      };
      console.log(sosMessageData, "sosMessageData");
      if (type === "driverSos") {
        dispatch(
          DriverSendSosMessageAction(sosMessageData, onSendSuccess, onSendError)
        );
      } else {
        dispatch(
          sendSosMessageAction(sosMessageData, onSendSuccess, onSendError)
        );
      }

      setCurrentMessage("");
      setFile(null);
      setMessageSendLoader(true);
      setShouldScrollToBottom(true);
    }
  };

  const onSendSuccess = () => {
    chatListFnc();
  };
  const onSendError = () => {};

  useEffect(() => {
    if (type === "driverSos") {
      socket.on("driver_sending_sos_msg_to_admin", (data) => {
        console.log(data, "driver_sending_sos_msg_to_admin");
        setShouldScrollToBottom(true);
        setmessageCount(data);
        setMessageReciveLoader(true);
        chatListFnc();

        const isMessageSosRead = {
          type: "sos",
          user_type: "admin",
          driverId: driverID ?? null,
          riderId: riderID ?? null,
          adminId: adminId,
          sosId: complaintID,
        };
      });
    }
  }, [socket]);

  const chatListFnc = () => {
    dispatch(
      storedMessageSosAction(
        {
          driverId: driverID ?? null,
          riderId: riderID ?? null,
          sosId: complaintID ?? null,
        },
        onSuccess,
        onError
      )
    );
  };

  useEffect(() => {
    if (type === "driverSos") {
      setLoading(true);
      chatListFnc();
    }
  }, []);

  const onSuccess = (data) => {
    setLoading(false);
    console.log(data);
    setAllMessageCount(data?.data?.count);
    console.log(data?.data, "data?.data");
    setStoredMessages(data?.data);
    setShouldScrollToBottom(true);
    setMessageSendLoader(false);
    setMessageReciveLoader(false);
  };
  const onError = (data) => {
    setLoading(false);
    console.log(data);
    setMessageSendLoader(false);
    setMessageReciveLoader(false);
  };

  useEffect(() => {
    if (shouldScrollToBottom && chatMessageBodyRef.current) {
      chatMessageBodyRef.current.scrollTop =
        chatMessageBodyRef.current.scrollHeight;
      setShouldScrollToBottom(false); // Reset shouldScrollToBottom to false after scrolling
    }
  }, [shouldScrollToBottom]);

  const handleScroll = (event) => {
    const { scrollTop, scrollBottom, scrollHeight, clientHeight } =
      event.target;
    if (page > 0) {
      if (scrollTop === 0) {
        setPage((prevPage) => prevPage - 1);
      }
    }
  };

  const today = moment().startOf("day");
  const yesterday = moment().subtract(1, "days").startOf("day");

  let lastDateDisplayed = "";

  return (
    <div className="chat_box_container position-relative">
      <div
        className="chat_message_body"
        ref={chatMessageBodyRef}
        onScroll={handleScroll}
      >
        {loading ? (
          <LoadingSpinnerTable />
        ) : (
          <>
            {storedMessages?.map((item, index) => {
              const messageDate = moment(item?.createdAt);

              if (messageDate.isSame(lastDateDisplayed, "day")) {
              } else {
                lastDateDisplayed = messageDate;
                const isFirstMessage =
                  index === 0 ||
                  moment(storedMessages[index - 1]?.createdAt).isBefore(
                    messageDate.startOf("day")
                  );
                if (messageDate.isSame(today, "day")) {
                  return (
                    <>
                      {isFirstMessage && (
                        <div className="w-100 mt-2 d-flex justify-content-center align-items-center">
                          <div className="message_text_line"></div>
                          <div
                            key={`date-${index}`}
                            className="text-center my-2 primary_color fs_14 fw_500"
                          >
                            Today
                          </div>
                          <div className="message_text_line"></div>
                        </div>
                      )}
                      {item?.reAssignedAt && (
                        <div className="w-100 mt-2 d-flex justify-content-center align-items-center">
                          <div className="message_text_line"></div>
                          <div
                            key={`date-${index}`}
                            className="text-center primary_color fs_14 fw_500 my-2"
                          >
                            <span className="primary_color fs_16 fw_500">
                              Re-assgined at{" "}
                            </span>

                            {item?.reAssignedAt
                              ? moment(item?.reAssignedAt).format(
                                  "DD/MM/YYYY, hh:mm A"
                                )
                              : null}
                          </div>
                          <div className="message_text_line"></div>
                        </div>
                      )}
                      {item?.forwardedAt && (
                        <div className="w-100 mt-2 d-flex justify-content-center align-items-center">
                          <div className="message_text_line"></div>
                          <div
                            key={`date-${index}`}
                            className="text-center primary_color fs_14 fw_500 my-2"
                          >
                            <span className="primary_color fs_16 fw_500">
                              Forward at
                            </span>
                            {item?.forwardedAt
                              ? moment(item?.forwardedAt).format(
                                  "DD/MM/YYYY, hh:mm A"
                                )
                              : null}
                          </div>
                          <div className="message_text_line"></div>
                        </div>
                      )}
                      <div
                        key={`message-${index}`}
                        className={`d-flex px-4 ${
                          item?.user_type == "admin"
                            ? `justify-content-end`
                            : `justify-content-start`
                        }`}
                      >
                        <div className="message_list_body my-1">
                          {item?.file?.img && (
                            <div
                              className={`d-flex  ${
                                item?.user_type == "admin"
                                  ? `justify-content-end`
                                  : `justify-content-start`
                              }`}
                            >
                              <a
                                href={item?.file?.img}
                                download={item?.file?.imgName}
                                className="text_decoration_none"
                              >
                                {item?.file?.imgType === "application/pdf" ? (
                                  <div
                                    className={`primary_border border_radius_7px px-2 py-1 d-flex align-items-center my-1`}
                                  >
                                    <span className="fs_20 primary_color">
                                      {(item?.file?.imgName).substring(0, 8) +
                                        "......."}
                                    </span>
                                    <span className="my-2">
                                      <i
                                        className={`ri-download-line fs_20 primary_color ms-2 border_radius_50per p-2 primary_border fw_700`}
                                      />
                                    </span>
                                  </div>
                                ) : (
                                  <>
                                    <img
                                      src={item?.file?.img}
                                      height={130}
                                      width={130}
                                      className={`border_radius_7px my-1`}
                                    />
                                  </>
                                )}
                              </a>
                            </div>
                          )}
                          {item?.message_data && (
                            <div
                              className={`${
                                item?.user_type == "admin"
                                  ? `mesaage_block_user white_color p-3`
                                  : `message_block_sender primary_color p-3`
                              }`}
                            >
                              {item.message_data}
                            </div>
                          )}
                          {item?.reAssignedAt === null &&
                            item?.forwardedAt === null && (
                              <div
                                className={`d-flex ${
                                  item?.user_type == "admin"
                                    ? `justify-content-start`
                                    : `justify-content-end`
                                }`}
                              >
                                <span className="disabled_color fs_12 fw_500">
                                  {moment(item?.createdAt).format("hh:mm A")}
                                </span>
                              </div>
                            )}
                        </div>
                      </div>
                    </>
                  );
                } else if (messageDate.isSame(yesterday, "day")) {
                  return (
                    <>
                      {isFirstMessage && (
                        <div className="w-100 mt-2 d-flex justify-content-center align-items-center">
                          <div className="message_text_line"></div>
                          <div
                            key={`date-${index}`}
                            className="text-center my-2 primary_color fs_14 fw_500"
                          >
                            Yesterday
                          </div>
                          <div className="message_text_line"></div>
                        </div>
                      )}
                      {item?.reAssignedAt && (
                        <div className="w-100 mt-2 d-flex justify-content-center align-items-center">
                          <div className="message_text_line"></div>
                          <div
                            key={`date-${index}`}
                            className="text-center primary_color fs_14 fw_500 my-2"
                          >
                            <span className="primary_color fs_16 fw_500">
                              Re-assgined at{" "}
                            </span>

                            {item?.reAssignedAt
                              ? moment(item?.reAssignedAt).format(
                                  "DD/MM/YYYY, hh:mm A"
                                )
                              : null}
                          </div>
                          <div className="message_text_line"></div>
                        </div>
                      )}
                      {item?.forwardedAt && (
                        <div className="w-100 mt-2 d-flex justify-content-center align-items-center">
                          <div className="message_text_line"></div>
                          <div
                            key={`date-${index}`}
                            className="text-center primary_color fs_14 fw_500 my-2"
                          >
                            <span className="primary_color fs_16 fw_500">
                              Forward at
                            </span>
                            {item?.forwardedAt
                              ? moment(item?.forwardedAt).format(
                                  "DD/MM/YYYY, hh:mm A"
                                )
                              : null}
                          </div>
                          <div className="message_text_line"></div>
                        </div>
                      )}
                      <div
                        key={`message-${index}`}
                        className={`d-flex px-4 ${
                          item?.adminId
                            ? `justify-content-end`
                            : `justify-content-start`
                        }`}
                      >
                        <div className="message_list_body my-1">
                          {item?.file?.img && (
                            <div
                              className={`d-flex  ${
                                item?.adminId
                                  ? `justify-content-end`
                                  : `justify-content-start`
                              }`}
                            >
                              <a
                                href={item?.file?.img}
                                download={item?.file?.imgName}
                                className="text_decoration_none"
                              >
                                {item?.file?.imgType === "application/pdf" ? (
                                  <div
                                    className={`primary_border border_radius_7px px-2 py-1 d-flex align-items-center my-1`}
                                  >
                                    <span className="fs_20 primary_color">
                                      {(item?.file?.imgName).substring(0, 8) +
                                        "......."}
                                    </span>
                                    <span className="my-2">
                                      <i
                                        className={`ri-download-line fs_20 primary_color ms-2 border_radius_50per p-2 primary_border fw_700`}
                                      />
                                    </span>
                                  </div>
                                ) : (
                                  <>
                                    <img
                                      src={item?.file?.img}
                                      height={130}
                                      width={130}
                                      className={`border_radius_7px my-1`}
                                    />
                                  </>
                                )}
                              </a>
                            </div>
                          )}
                          {item?.message_data && (
                            <div
                              className={`${
                                item?.adminId
                                  ? `mesaage_block_user white_color p-3`
                                  : `message_block_sender primary_color p-3`
                              }`}
                            >
                              {item.message_data}
                            </div>
                          )}

                          {item?.reAssignedAt === null &&
                            item?.forwardedAt === null && (
                              <div
                                className={`d-flex ${
                                  item.adminId
                                    ? `justify-content-start`
                                    : `justify-content-end`
                                }`}
                              >
                                <span className="disabled_color fs_12 fw_500">
                                  {moment(item?.createdAt).format("hh:mm A")}
                                </span>
                              </div>
                            )}
                        </div>
                      </div>
                    </>
                  );
                } else {
                  return (
                    <>
                      {isFirstMessage && (
                        <div className="w-100 mt-2 d-flex justify-content-center align-items-center">
                          <div className="message_text_line"></div>
                          <div
                            key={`date-${index}`}
                            className="text-center my-2 primary_color fs_14 fw_500"
                          >
                            {messageDate.format("DD/MM/YYYY")}
                          </div>
                          <div className="message_text_line"></div>
                        </div>
                      )}

                      {item?.reAssignedAt && (
                        <div className="w-100 mt-2 d-flex justify-content-center align-items-center">
                          <div className="message_text_line"></div>
                          <div
                            key={`date-${index}`}
                            className="text-center primary_color fs_14 fw_500 my-2"
                          >
                            <span className="primary_color fs_16 fw_500">
                              Re-assgined at{" "}
                            </span>

                            {item?.reAssignedAt
                              ? moment(item?.reAssignedAt).format(
                                  "DD/MM/YYYY, hh:mm A"
                                )
                              : null}
                          </div>
                          <div className="message_text_line"></div>
                        </div>
                      )}
                      {item?.forwardedAt && (
                        <div className="w-100 mt-2 d-flex justify-content-center align-items-center">
                          <div className="message_text_line"></div>
                          <div
                            key={`date-${index}`}
                            className="text-center primary_color fs_14 fw_500 my-2"
                          >
                            <span className="primary_color fs_16 fw_500">
                              Forward at
                            </span>
                            {item?.forwardedAt
                              ? moment(item?.forwardedAt).format(
                                  "DD/MM/YYYY, hh:mm A"
                                )
                              : null}
                          </div>
                          <div className="message_text_line"></div>
                        </div>
                      )}
                      <div
                        key={`message-${index}`}
                        className={`d-flex px-4 ${
                          item?.adminId
                            ? `justify-content-end`
                            : `justify-content-start`
                        }`}
                      >
                        <div className="message_list_body my-1">
                          {item?.file?.img && (
                            <div
                              className={`d-flex  ${
                                item?.adminId
                                  ? `justify-content-end`
                                  : `justify-content-start`
                              }`}
                            >
                              <a
                                href={item?.file?.img}
                                download={item?.file?.imgName}
                                className="text_decoration_none"
                              >
                                {item?.file?.imgType === "application/pdf" ? (
                                  <div
                                    className={`primary_border border_radius_7px px-2 py-1 d-flex align-items-center my-1`}
                                  >
                                    <span className="fs_20 primary_color">
                                      {(item?.file?.imgName).substring(0, 8) +
                                        "......."}
                                    </span>
                                    <span className="my-2">
                                      <i
                                        className={`ri-download-line fs_20 primary_color ms-2 border_radius_50per p-2 primary_border fw_700`}
                                      />
                                    </span>
                                  </div>
                                ) : (
                                  <>
                                    <img
                                      src={item?.file?.img}
                                      height={130}
                                      width={130}
                                      className={`border_radius_7px my-1`}
                                    />
                                  </>
                                )}
                              </a>
                            </div>
                          )}
                          {item?.message_data && (
                            <div
                              className={`${
                                item?.adminId
                                  ? `mesaage_block_user white_color p-3`
                                  : `message_block_sender primary_color p-3`
                              }`}
                            >
                              {item.message_data}
                            </div>
                          )}

                          {item?.reAssignedAt === null &&
                            item?.forwardedAt === null && (
                              <div
                                className={`d-flex ${
                                  item.adminId
                                    ? `justify-content-start`
                                    : `justify-content-end`
                                }`}
                              >
                                <span className="disabled_color fs_12 fw_500">
                                  {moment(item?.createdAt).format("hh:mm A")}
                                </span>
                              </div>
                            )}
                        </div>
                      </div>
                    </>
                  );
                }
              }

              return (
                <>
                  {/* {item?.reAssignedAt && (
                    <div className="w-100 mt-2 d-flex justify-content-center align-items-center">
                      <div className="message_text_line"></div>
                      <div
                        key={`date-${index}`}
                        className="text-center primary_color fs_14 fw_500 my-2"
                      >
                        <span className="primary_color fs_16 fw_500">
                          Re-assgined at{" "}
                        </span>

                        {item?.reAssignedAt
                          ? moment(item?.reAssignedAt).format(
                              "DD/MM/YYYY, hh:mm A"
                            )
                          : null}
                      </div>
                      <div className="message_text_line"></div>
                    </div>
                  )} */}
                  {item?.forwardedAt && (
                    <div className="w-100 mt-2 d-flex justify-content-center align-items-center">
                      <div className="message_text_line"></div>
                      <div
                        key={`date-${index}`}
                        className="text-center primary_color fs_14 fw_500 my-2"
                      >
                        <span className="primary_color fs_16 fw_500">
                          Forward at
                        </span>
                        {item?.forwardedAt
                          ? moment(item?.forwardedAt).format(
                              "DD/MM/YYYY, hh:mm A"
                            )
                          : null}
                      </div>
                      <div className="message_text_line"></div>
                    </div>
                  )}
                  <div
                    key={index}
                    className={`d-flex px-4 ${
                      item?.user_type == "admin"
                        ? `justify-content-end`
                        : `justify-content-start`
                    }`}
                  >
                    <div className="message_list_body my-1">
                      {item?.adminId !== adminId && (
                        <div>
                          <span className="primary_color fs_14 fw_500">
                            {item?.author}
                          </span>
                        </div>
                      )}

                      {item?.file !== null && (
                        <div
                          className={`d-flex  ${
                            item?.user_type == "admin"
                              ? `justify-content-end`
                              : `justify-content-start`
                          }`}
                        >
                          <a
                            href={item?.file}
                            download={item?.file}
                            className="text_decoration_none"
                          >
                            {/* {item?.file?.imgType === "application/pdf" ? (
                              <div
                                className={`primary_border border_radius_7px px-2 py-1 d-flex align-items-center my-1`}
                              >
                                <span className="fs_20 primary_color">
                                  {(item?.file?.imgName).substring(0, 8) +
                                    "......."}
                                </span>
                                <span className="my-2">
                                  <i
                                    className={`ri-download-line fs_20 primary_color ms-2 border_radius_50per p-2 primary_border fw_700`}
                                  />
                                </span>
                              </div>
                            ) : ( */}
                            <>
                              <img
                                src={item?.file}
                                height={130}
                                width={130}
                                className={`border_radius_7px my-1`}
                                alt="img"
                              />
                            </>
                            {/* )} */}
                          </a>
                        </div>
                      )}

                      {item?.message_data && (
                        <div
                          className={`${
                            item?.user_type == "admin"
                              ? `mesaage_block_user white_color p-3`
                              : `message_block_sender primary_color p-3`
                          }`}
                        >
                          {item.message_data}
                        </div>
                      )}

                      {item?.reAssignedAt === null &&
                        item?.forwardedAt === null && (
                          <div
                            className={`d-flex ${
                              item?.user_type == "admin"
                                ? `justify-content-start`
                                : `justify-content-end`
                            }`}
                          >
                            <span className="disabled_color fs_12 fw_500">
                              {moment(item?.createdAt).format("hh:mm A")}
                            </span>
                          </div>
                        )}
                    </div>
                  </div>
                </>
              );
            })}
            {/* ------------------ LOADER ------------------ */}
            {messageSendLoader && (
              <div className="d-flex justify-content-end mx-3">
                <div className="message_list_body m-2">
                  <div className={`mesaage_block_user white_color px-3 py-2`}>
                    <img
                      src={chatLoad}
                      alt="load"
                      width={"32px"}
                      height={"32px"}
                    />
                  </div>
                </div>
              </div>
            )}
            {messageReciveLoader && (
              <div className="d-flex justify-content-start mx-3">
                <div className="message_list_body m-2">
                  <div
                    className={`message_block_sender primary_color px-3 py-2`}
                  >
                    <img
                      src={chatLoad}
                      alt="load"
                      width={"32px"}
                      height={"32px"}
                    />
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
      <div className="chat_footer ">
        <div className="white_bg default_border border_radius_7px p-1 d-flex align-items-end position-absolute bottom-0 w-100">
          <div className="w_5">
            <label htmlFor="file-uplaod">
              <i className="ri-attachment-2 attachment_icon p-1 cursor_pointer ms-2" />
            </label>
            <input
              type="file"
              id="file-uplaod"
              className="visibility_hidden w_0"
              accept=".jpg,.jpeg,.png,.pdf"
              name="filename"
              onChange={(e) => {
                handleFileChange(e);
              }}
              download={file}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSend();
                }
              }}
            />
          </div>

          <div className="w-100">
            {!file && fileLoading === true ? (
              <div
                className="col-1 rounded-2 d-flex justify-content-center"
                style={{ backgroundColor: "rgb(0,0,0,0.4)", maxWidth: "100px" }}
              >
                <img src={chatLoad} alt="load" width={"32px"} height={"32px"} />
              </div>
            ) : (
              <div className="position-relative width_fit">
                {file && (
                  <i
                    className={`ri-close-circle-fill fs_22 position-absolute remove_img_icon  bg-white rounded-5 m-1`}
                    onClick={() => {
                      setFile(null);
                    }}
                  ></i>
                )}

                {file && (
                  <>
                    <img
                      src={file}
                      height={100}
                      width={100}
                      className="m-3 border_radius_5px"
                      alt="img"
                    />
                  </>
                )}
              </div>
            )}

            <input
              type="text"
              className="border_none outline_none w-100 ps-xl-2 fs_20"
              placeholder="Enter message"
              value={currentMessage}
              onChange={(event) => {
                setCurrentMessage(event.target.value);
              }}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSend();
                }
              }}
            />
          </div>

          <button
            disabled={!currentMessage && !file}
            onClick={handleSend}
            type="button"
            className="border_none background_none cursor_pointer"
          >
            <i className="ri-send-plane-fill fs_23" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DriverSosChatBox;
