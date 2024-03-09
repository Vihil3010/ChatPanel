import React, { useState } from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";

// interface
import { UserTypes, userTypeDir } from "../../../data/chat";
import { STATUS_TYPES } from "../../../constants";

interface ChatUserProps {
  user: userTypeDir;
  selectedChat: string | number;
  onSelectChat: (id: number | string) => void;
}
const ChatUser = ({ user, selectedChat, onSelectChat }: ChatUserProps) => {
  const fullName = `${user.name}`;
  const shortName = `${user.name.charAt(0)}`;

  const colors = [
    "bg-primary",
    "bg-danger",
    "bg-info",
    "bg-warning",
    "bg-secondary",
    "bg-pink",
    "bg-purple",
  ];
  const [color] = useState(Math.floor(Math.random() * colors.length));
  const isOnline = STATUS_TYPES.ACTIVE;
  const unRead = true;

  const isSelectedChat: boolean =
    selectedChat && selectedChat === user.id ? true : false;
  const onClick = () => {
    onSelectChat(user.id);
  };
  return (
    <li className={classnames({ active: isSelectedChat })} onClick={onClick}>
      <Link to="#" className={classnames({ "unread-msg-user": unRead })}>
        <div className="d-flex align-items-center">
          <div
            className={classnames(
              "chat-user-img",
              "align-self-center",
              "me-2",
              "ms-0",
              { online: isOnline },
            )}>
            {/* { false ? (
              <>
                <img src={""} className="rounded-circle avatar-xs" alt="" />
                {isOnline && <span className="user-status"></span>}
              </>
            ) : ( */}
            <div className="avatar-xs">
              <span
                className={classnames(
                  "avatar-title",
                  "rounded-circle",
                  "text-uppercase",
                  "text-white",
                  colors[color],
                )}>
                <span className="username"> {shortName}</span>
                <span className="user-status"></span>
              </span>
            </div>
            {/* )} */}
          </div>
          <div className="overflow-hidden">
            <p className="text-truncate mb-0">{fullName}</p>
          </div>
          {unRead ? (
            <div className="ms-auto">
              <span className="badge badge-soft-dark rounded p-1">
                {unRead}
              </span>
            </div>
          ) : null}
        </div>
      </Link>
    </li>
  );
};

export default ChatUser;
