import React, { useEffect, useRef, useState } from "react";
import "../chat-section/chat-section.css";
import { socket } from "../../redux/config";
import { useDispatch, useSelector } from "react-redux";
import {
  chatListLoadAction,
  chatListLoadMoreAction,
  RiderSendComplaintMessageAction,
  storedMessageAction,
  uploadChatImageAction,
} from "../../redux/actions/chatSection/chatSectionAction";
import moment from "moment";
import LoadingSpinnerTable from "../utilits/loadingSpinnerTable";
import chatLoad from "../../assets/icons/chat/chatloader.svg";

const RiderComplaintChatBox = ({
  driverID,
  riderID,
  complaintID,
  type,
  setmessageCount,
}) => {
  console.log(riderID, "riderID");
  console.log(complaintID, "adasdadadasdasd");

  const dispatch = useDispatch();
  const [changesMade, setChangesMade] = useState([]);

  const [messageSendLoader, setMessageSendLoader] = useState(false);

  const reverseData = useSelector((store) => store.storedChatListReducer);
  const storedData = reverseData.data.reverse();
  console.log(storedData, "storedChatListReducer");
  console.log(socket, "socket");

  const [currentMessage, setCurrentMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [fileLoading, setFileLoading] = useState(false);
  const chatMessageBodyRef = useRef(null);
  const [shouldScrollToBottom, setShouldScrollToBottom] = useState(true);

  const [allMessageCount, setAllMessageCount] = useState("");
  const totalPages = Math.ceil(allMessageCount / 50);
  const [page, setPage] = useState(null);
  console.log(totalPages, "totalPages");

  useEffect(() => {
    if (allMessageCount / 50 <= 1) {
      setPage(0);
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

  const handleSend = async () => {
    if (currentMessage !== "" || file !== null) {
      const messageData = {
        data: {
          driverId: driverID ?? null,
          riderId: riderID ?? null,
          adminId: adminId,
          author: adminUserName,
          file: file,
          message_data: currentMessage,
          time: `${displayHour}:${minute}:${seconds}`,
          complaintId: complaintID,
          type: "complaint",
          reAssignedAt: null,
          forwardedAt: null,
          user_type: "admin",
          recipientId: driverID ?? riderID ?? null,
        },
      };

      dispatch(
        RiderSendComplaintMessageAction(messageData, onSendSuccess, onSendError)
      );

      chatListFnc();
      setCurrentMessage("");
      setFile(null);
      setPage(0);
      setShouldScrollToBottom(true);
      setMessageSendLoader(true);
    }
  };

  const onSendSuccess = () => {
    chatListFnc();
  };
  const onSendError = () => {};

  useEffect(() => {
    socket.on("rider_sending_complaint_msg_to_admin", (data) => {
      console.log(data, "rider_sending_complaint_msg_to_admin");
      setChangesMade(data);
      setShouldScrollToBottom(true);
      setmessageCount(data);
      chatListFnc();
      setPage(0);
    });

    return () => {
      socket.off("rider_sending_complaint_msg_to_admin");
    };
  }, [socket]);

  const uploadChat = (data) => {
    dispatch(chatListLoadAction(data));
  };

  const chatListFnc = () => {
    if (page != null) {
      dispatch(
        storedMessageAction(
          {
            driverId: driverID ?? null,
            riderId: riderID ?? null,
            complaintId: complaintID,
          },
          page,
          15,
          onSuccess,
          onError
        )
      );
    }
  };

  useEffect(() => {
    if (type === "riderComplaints") {
      chatListFnc();
    }
  }, [changesMade, page, socket]);

  const onSuccess = (data) => {
    setLoading(false);
    setMessageSendLoader(false);
    console.log(data);
    setAllMessageCount(data?.data?.count);
    if (data.data.current_page === 1) {
      uploadChat(data?.data?.data);
    } else {
      dispatch(chatListLoadMoreAction(data?.data?.data));
    }
    if (page === 0) {
      setShouldScrollToBottom(true);
    }
  };
  const onError = (data) => {
    setLoading(false);
    console.log(data);
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
    console.log(page, scrollTop, "scrollBottom");
    if (page < totalPages - 1 && loading === false) {
      if (scrollTop === 0) {
        setPage(page + 1);
      }
    }
  };

  console.log(parseInt(allMessageCount / 15), "allMessageCount");

  // get today's date and yesterday's date

  const today = moment().startOf("day");
  const yesterday = moment().subtract(1, "days").startOf("day");

  let lastDateDisplayed = "";

  return (
    <div className="chat_box_container position-relative">
      <div
        className="chat_message_body"
        ref={chatMessageBodyRef}
        onScroll={(e) => handleScroll(e)}
      >
        {loading ? (
          <LoadingSpinnerTable />
        ) : (
          <>
            {page}
            {storedData?.reverse()?.map((item, index) => {
              const messageDate = moment(item?.createdAt);

              if (messageDate.isSame(lastDateDisplayed, "day")) {
              } else {
                lastDateDisplayed = messageDate;
                const isFirstMessage =
                  index === 0 ||
                  moment(storedData[index - 1]?.createdAt).isBefore(
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
                          item.user_type === "admin"
                            ? `justify-content-end`
                            : `justify-content-start`
                        }`}
                      >
                        <div className="message_list_body my-1">
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
                                <>
                                  <img
                                    src={item?.file}
                                    height={130}
                                    width={130}
                                    className={`border_radius_7px my-1`}
                                    alt="img"
                                  />
                                </>
                              </a>
                            </div>
                          )}

                          {item?.message_data && (
                            <div
                              className={`${
                                item.user_type === "admin"
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
                                  item.user_type === "admin"
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
                          item.user_type === "admin"
                            ? `justify-content-end`
                            : `justify-content-start`
                        }`}
                      >
                        <div className="message_list_body my-1">
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
                                <>
                                  <img
                                    src={item?.file}
                                    height={130}
                                    width={130}
                                    className={`border_radius_7px my-1`}
                                    alt="img"
                                  />
                                </>
                              </a>
                            </div>
                          )}

                          {item?.message_data && (
                            <div
                              className={`${
                                item.user_type === "admin"
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
                                  item.user_type === "admin"
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
                          item.user_type === "admin"
                            ? `justify-content-end`
                            : `justify-content-start`
                        }`}
                      >
                        <div className="message_list_body my-1">
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
                                item.user_type === "admin"
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
                                  item.user_type === "admin"
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
                <React.Fragment key={index}>
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
                            <>
                              <img
                                src={item?.file}
                                height={130}
                                width={130}
                                className={`border_radius_7px my-1`}
                                alt="img"
                              />
                            </>
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
                </React.Fragment>
              );
            })}
            {messageSendLoader && (
              <div className="d-flex justify-content-end ">
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
              download={file?.imgName}
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

export default RiderComplaintChatBox;
