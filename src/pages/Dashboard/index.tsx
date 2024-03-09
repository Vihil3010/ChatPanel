import React from "react";
import classnames from "classnames";

// hooks
import { useRedux } from "../../hooks/index";

// hooks
import { useConversationUserType } from "../../hooks/index";

// component
import Leftbar from "./Leftbar";
import ConversationUser from "./ConversationUser/index";
import UserProfileDetails from "./UserProfileDetails/index";
import Welcome from "./ConversationUser/Welcome";

interface IndexProps {}
const Index = (props: IndexProps) => {
  // global store
  const { useAppSelector } = useRedux();

  const { selectedChat } = useAppSelector((state) => ({
    selectedChat: state.Chats.selectedChat,
  }));

  const { isChannel } = useConversationUserType();

  return (
    <>
      {/* <Leftbar /> */}

      <div
        className={classnames("user-chat", "w-100", "overflow-hidden", {
          "user-chat-show": selectedChat,
        })}
        id="user-chat">
        <div
          style={{
            margin: 40,
            display: "flex",
            alignItems: "center",
            alignSelf: "center",
            justifyContent: "center",
          }}>
          <div className="card" style={{ width: 300, margin: 10 }}>
            <div className="card-body" style={{ alignSelf: "center" }}>
              <h1>Users</h1>
              <h1 style={{ color: "#07bc0c", textAlign: "center" }}>150</h1>
            </div>
          </div>
          <div className="card" style={{ width: 300, margin: 10 }}>
            <div className="card-body" style={{ alignSelf: "center" }}>
              <h1>Agent</h1>
              <h1 style={{ color: "#07bc0c", textAlign: "center" }}>150</h1>
            </div>
          </div>
          <div className="card" style={{ width: 300, margin: 10 }}>
            <div className="card-body" style={{ alignSelf: "center" }}>
              <h1>Dashboard</h1>
              <h1 style={{ color: "#07bc0c", textAlign: "center" }}>150</h1>
            </div>
          </div>
          <div className="card" style={{ width: 300, margin: 10 }}>
            <div className="card-body" style={{ alignSelf: "center" }}>
              <h1>Count</h1>
              <h1 style={{ color: "#07bc0c", textAlign: "center" }}>150</h1>
            </div>
          </div>
        </div>
        {/* <div className="user-chat-overlay" id="user-chat-overlay"></div> */}
        {/* {selectedChat !== null ? (
          <div className="chat-content d-lg-flex">
            <div className="w-100 overflow-hidden position-relative">
              <ConversationUser isChannel={isChannel} />
            </div>
            <UserProfileDetails isChannel={isChannel} />
          </div>
        ) : (
          <Welcome />
        )} */}
      </div>
    </>
  );
};

export default Index;
