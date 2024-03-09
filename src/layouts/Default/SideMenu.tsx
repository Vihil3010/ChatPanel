import React, { useEffect, useState } from "react";
// import {  } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Nav,
  NavItem,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  NavLink,
  UncontrolledTooltip,
} from "reactstrap";

// hooks
import { useRedux } from "../../hooks/index";

// actions
import { changeTab } from "../../redux/actions";

// costants
import { TABS } from "../../constants/index";
import LightDarkMode from "../../components/LightDarkMode";

//images
import avatar1 from "../../assets/images/users/avatar-1.jpg";

// menu
import { MENU_ITEMS, MenuItemType } from "./menu";
import { useProfile } from "../../hooks/index";
import _ from "lodash";
// import { nav } from "@types/react-router-dom";

const LogoLightSVG = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 24 24">
      <path d="M8.5,18l3.5,4l3.5-4H19c1.103,0,2-0.897,2-2V4c0-1.103-0.897-2-2-2H5C3.897,2,3,2.897,3,4v12c0,1.103,0.897,2,2,2H8.5z M7,7h10v2H7V7z M7,11h7v2H7V11z" />
    </svg>
  );
};

const LogoDarkSVG = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 24 24">
      <path d="M8.5,18l3.5,4l3.5-4H19c1.103,0,2-0.897,2-2V4c0-1.103-0.897-2-2-2H5C3.897,2,3,2.897,3,4v12c0,1.103,0.897,2,2,2H8.5z M7,7h10v2H7V7z M7,11h7v2H7V11z" />
    </svg>
  );
};

interface MenuNavItemProps {
  item: MenuItemType;
  selectedTab:
    | TABS.BOOKMARK
    | TABS.CALLS
    | TABS.CHAT
    | TABS.CONTACTS
    | TABS.SETTINGS
    | TABS.USERS;
  onChangeTab: (
    id:
      | TABS.BOOKMARK
      | TABS.CALLS
      | TABS.CHAT
      | TABS.CONTACTS
      | TABS.SETTINGS
      | TABS.USERS,
  ) => void;
}
const MenuNavItem = ({ item, selectedTab, onChangeTab }: MenuNavItemProps) => {
  const onClick = () => {
    console.log("item.tabId===>>", item.tabId);
    onChangeTab(item.tabId);
    // <Link></Link>
  };
  return (
    <>
      <NavItem className={item.className} id={`${item.key}-container`}>
        <NavLink
          // href={item.redirect}
          active={selectedTab === item.tabId}
          id={item.key}
          role="ta0000000000000000000000000000000000000b"
          onClick={onClick}>
          {/* <Link to="#" className="fw-medium text-decoration-underline"> */}
          <i className={item.icon}></i>
          {/* </Link> */}
        </NavLink>
      </NavItem>
      <UncontrolledTooltip target={`${item.key}-container`} placement="right">
        {item.tooltipTitle}
      </UncontrolledTooltip>
    </>
  );
};

interface ProfileDropdownMenuProps {
  onChangeTab: (
    id:
      | TABS.BOOKMARK
      | TABS.CALLS
      | TABS.CHAT
      | TABS.CONTACTS
      | TABS.SETTINGS
      | TABS.USERS,
  ) => void;
}
const ProfileDropdownMenu = ({ onChangeTab }: ProfileDropdownMenuProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(!dropdownOpen);

  return (
    <Dropdown
      nav
      isOpen={dropdownOpen}
      className="profile-user-dropdown"
      toggle={toggle}>
      <DropdownToggle nav className="bg-transparent">
        <img src={avatar1} alt="" className="profile-user rounded-circle" />
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem
          className="d-flex align-items-center justify-content-between"
          onClick={() => onChangeTab(TABS.USERS)}>
          Profile <i className="bx bx-user-circle text-muted ms-1"></i>
        </DropdownItem>
        <DropdownItem
          className="d-flex align-items-center justify-content-between"
          onClick={() => onChangeTab(TABS.SETTINGS)}>
          Setting <i className="bx bx-cog text-muted ms-1"></i>
        </DropdownItem>
        <DropdownItem
          className="d-flex align-items-center justify-content-between"
          href="/auth-changepassword">
          Change Password <i className="bx bx-lock-open text-muted ms-1"></i>
        </DropdownItem>

        <DropdownItem />
        <DropdownItem
          className="d-flex align-items-center justify-content-between"
          tag="a"
          href="/logout">
          Log out <i className="bx bx-log-out-circle text-muted ms-1"></i>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

const SideMenu = ({ onChangeLayoutMode }: any) => {
  // global store
  const { dispatch, useAppSelector } = useRedux();
  const [selectTab, setSelectTab] = useState(1);

  const menuItems: MenuItemType[] = MENU_ITEMS;
  const { activeTab, layoutMode } = useAppSelector((state) => ({
    activeTab: state.Layout.activeTab,
    layoutMode: state.Layout.layoutMode,
  }));

  /* 
    tab activation
    */
  const [selectedTab, setSelectedTab] = useState<
    | TABS.BOOKMARK
    | TABS.CALLS
    | TABS.CHAT
    | TABS.CONTACTS
    | TABS.SETTINGS
    | TABS.USERS
  >(TABS.CHAT);
  const onChangeTab = (
    id:
      | TABS.BOOKMARK
      | TABS.CALLS
      | TABS.CHAT
      | TABS.CONTACTS
      | TABS.SETTINGS
      | TABS.USERS,
  ) => {
    setSelectedTab(id);
    dispatch(changeTab(id));
  };

  useEffect(() => {
    // setSelectedTab("pills-user-tab");
  }, []);
  // const Navigation = useNavigate();
  console.log("id===>>>>", window.location.href.toString().split("/"));
  const getUrl = window.location.href.toString().split("/");
  const getlenght = getUrl.length - 1;
  const namePage = getUrl[getlenght];

  const Logo = () => {
    return (
      <div
        className="navbar-brand-box"
        onClick={() => {
          setSelectTab(1);
        }}>
        <Link
          to="/dashboard"
          className="logo logo-dark"
          style={{ color: namePage == "dashboard" ? "#07bc0c" : "gray" }}>
          <span className="logo-sm">
            <i className={"bx bxs-dashboard"} style={{ fontSize: "30px" }}></i>
            {/* <LogoLightSVG  style={{ color :  selectTab == 1 ? }} /> */}
          </span>
        </Link>
      </div>
    );
  };

  const Contact = () => {
    return (
      <div
        className="navbar-brand-box"
        onClick={() => {
          setSelectTab(2);
        }}>
        <Link
          to="/Topic"
          className="logo logo-dark"
          style={{ color: namePage == "Topic" ? "#07bc0c" : "gray" }}>
          <span className="logo-sm">
            <i className={"bx bx-user-plus"} style={{ fontSize: "30px" }}></i>
            {/* <LogoLightSVG /> */}
          </span>
        </Link>
      </div>
    );
  };
  const Agent = () => {
    return (
      <div
        className={"navbar-brand-box"}
        onClick={() => {
          setSelectTab(3);
        }}>
        <Link
          to="/Agents"
          className={"logo logo-dark"}
          style={{ color: namePage == "Agents" ? "#07bc0c" : "gray" }}>
          <span className="logo-sm">
            <i
              className={"bx bxs-user-detail"}
              style={{ fontSize: "30px" }}></i>
            {/* <LogoLightSVG pills-contacts-tab /> */}
          </span>
        </Link>
      </div>
    );
  };

  const Chat = () => {
    return (
      <div
        className={"navbar-brand-box"}
        onClick={() => {
          setSelectTab(3);
        }}>
        <Link
          to="/Chat"
          className={"logo logo-dark"}
          style={{ color: namePage == "Chat" ? "#07bc0c" : "gray" }}>
          <span className="logo-sm">
            <i
              className={"bx bx-conversation"}
              style={{ fontSize: "30px" }}></i>
            {/* <LogoLightSVG pills-contacts-tab /> */}
          </span>
        </Link>
      </div>
    );
  };

  const { userProfile, loading } = useProfile();

  const UserProfileValue = !_.isEmpty(userProfile)
    ? userProfile.user.role == "agent"
      ? true
      : false
    : false;

  if (UserProfileValue) {
    return (
      <div className="side-menu flex-lg-column">
        {/* LOGO */}
        {/* end navbar-brand-box */}

        {/* Start side-menu nav */}
        <div className="flex-lg-column my-0 sidemenu-navigation">
          <Nav pills className="side-menu-nav" role="tablist">
            {/* <Logo />
          <Logo />
          <Logo /> */}
            {(menuItems || []).map((item: MenuItemType, key: number) => (
              <MenuNavItem
                item={item}
                key={key}
                selectedTab={selectedTab}
                onChangeTab={onChangeTab}
              />
            ))}

            {/* <MenuNavItem
              item={''}
              selectedTab={selectedTab}
              onChangeTab={onChangeTab}
            /> */}
            {/* <MenuNavItem
              item={menuItems[0] : MenuItemType}
              // key={key}
              selectedTab={selectedTab}
              onChangeTab={onChangeTab}
                 /> */}

            {/* change mode */}
            <LightDarkMode
              layoutMode={layoutMode}
              onChangeLayoutMode={onChangeLayoutMode}
            />

            {/* profile menu dropdown */}
            <ProfileDropdownMenu onChangeTab={onChangeTab} />
          </Nav>
        </div>
        {/* end side-menu nav */}
      </div>
    );
  }

  return (
    <div className="side-menu flex-lg-column">
      {/* LOGO */}
      <Logo />
      <Contact />
      <Agent />
      <Chat />
      {/* end navbar-brand-box */}

      {/* Start side-menu nav */}
      <div className="flex-lg-column my-0 sidemenu-navigation">
        <Nav pills className="side-menu-nav" role="tablist">
          {/* <Logo />
          <Logo />
          <Logo /> */}
          {/* {(menuItems || []).map((item: MenuItemType, key: number) => (
            <MenuNavItem
              item={item}
              key={key}
              selectedTab={selectedTab}
              onChangeTab={onChangeTab}
            />
          ))} */}

          {/* <MenuNavItem
              item={''}
              selectedTab={selectedTab}
              onChangeTab={onChangeTab}
            /> */}
          {/* <MenuNavItem
              item={menuItems[0] : MenuItemType}
              // key={key}
              selectedTab={selectedTab}
              onChangeTab={onChangeTab}
                 /> */}

          {/* change mode */}
          <LightDarkMode
            layoutMode={layoutMode}
            onChangeLayoutMode={onChangeLayoutMode}
          />

          {/* profile menu dropdown */}
          <ProfileDropdownMenu onChangeTab={onChangeTab} />
        </Nav>
      </div>
      {/* end side-menu nav */}
    </div>
  );
};

export default SideMenu;
