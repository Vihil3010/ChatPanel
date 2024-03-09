import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { showSuccessNotification } from "../helpers/notifications";
import reportWebVitals from "../reportWebVitals";
import * as url from "../api/urls";
import Axios from "axios";
import { Table } from "reactstrap";
import { Dropdown, DropdownToggle, DropdownMenu } from "reactstrap";
import Multiselect from "multiselect-react-dropdown";
import _ from "lodash";

interface DataTypes {
  bookmarkTitle: string | null;
}

type Person = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
};

interface UpdateDeleteBookmarkProps {
  isOpen: boolean;
  dataSet: any;
  onClose: (data: boolean) => void;
  onUpdate: (data: any) => void;
}
const addAgents = ({
  isOpen,
  onClose,
  onUpdate,
  dataSet = {},
}: UpdateDeleteBookmarkProps) => {
  /*
   data input handeling
   */
  const [data, setData] = useState<DataTypes>({
    bookmarkTitle: "",
  });
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [dropdownOpen, setdropdownOpen] = useState<boolean>(false);
  const [responseset, setResponse] = useState<any>({});
  const [dataValue, setDataValue] = useState<any>([]);
  const [selectItem, setSelectData] = useState<any>({});
  const [password, setPassword] = useState<any>("");
  const [role, setRole] = useState<any>("");
  const [errorEmail, setErrorEmail] = useState<boolean>(false);
  const [errorName, setErrorName] = useState<boolean>(false);
  const [errorPassword, setErrorPassword] = useState<boolean>(false);
  const [ErrorTopic, setErrorTopic] = useState<boolean>(false);

  const toggle = () => {
    setdropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    getTopicList();
  }, []);

  // useEffect(() => {

  // },[])

  useEffect(() => {
    const isEmpty = !_.isEmpty(responseset);
    if (isEmpty) {
      console.log("responseset ===>>", responseset.results);
      let dummyArray: any = [];
      if (_.isArray(responseset.results) && !_.isEmpty(responseset.results)) {
        responseset.results.map((items: any, Key: number) => {
          dummyArray.push({ cat: items.id, key: items.name });
        });
      }

      setDataValue(dummyArray);
      //   setloading(false);

      if (!_.isEmpty(dataSet)) {
        setName(dataSet.name);
        setEmail(dataSet.email);
        setRole(dataSet.role);

        if (!_.isEmpty(dummyArray)) {
          // const Index = dummyArray.findIndex((p: any) => {
          //   p.id == dataSet.topicIds[0];
          // });
          let value: any = [];

          dummyArray.map((item: any, key: number) => {
            dataSet.topicIds.map((i: any, Key: number) => {
              if (item.cat == i) {
                value.push(item);
              }
            });
          });
          console.log("Index===>>>> 123456", value);

          if (!_.isEmpty(value)) {
            setSelectData(value);
          }
        }
      }
    }
  }, [responseset]);

  const getTopicList = () => {
    reportWebVitals(console.log);
    let user: any = localStorage.getItem("authUser");
    user = JSON.parse(user);
    console.log("user===>>>", user);
    // const axios = require("axios");
    const authHeaders = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.tokens.access.token}`,
    };
    const apiUrl = `${url.GET_TOPICS}?sortBy=name:desc&limit=10&page=1`;
    try {
      Axios(apiUrl, {
        method: "get",
        headers: authHeaders,
      })
        .then(function (res) {
          console.log("====>>>>", res);
          setResponse(res);

          //  return res
        })
        .catch(function (ex) {
          return 0;
        });
    } catch (error) {}
  };

  /*
    submit data
    */
  const onSubmit = () => {
    const passwordValue = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/;
    console.log("passwordValue===>>>", passwordValue.test(password));
    if (_.isEmpty(name)) {
      setErrorName(true);
    } else if (_.isEmpty(email)) {
      setErrorEmail(true);
    } else if (_.isEmpty(password) && _.isEmpty(dataSet)) {
      setErrorPassword(true);
    } else if (!passwordValue && _.isEmpty(dataSet)) {
      setErrorPassword(true);
    } else if (_.isEmpty(selectItem)) {
      setErrorTopic(true);
    } else if (!_.isEmpty(dataSet)) {
      EditAgent();
    } else {
      createAgents();
    }
    // onUpdate(data);
  };

  const EditAgent = () => {
    reportWebVitals(console.log);
    let user: any = localStorage.getItem("authUser");
    user = JSON.parse(user);

    // const axios = require("axios");
    const authHeaders = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.tokens.access.token}`,
    };
    const apiUrl = `${url.ADD_AGENTS}/${dataSet.id}`;
    let selectItems: any = [];
    selectItem.map((item: any, key: number) => {
      selectItems.push(item.id);
    });
    console.log("user===>>>", selectItem, selectItems, user);
    try {
      Axios(apiUrl, {
        method: "PATCH",
        headers: authHeaders,
        data: {
          name: name,
          email: email,
          role: role,
          topicIds: selectItems,
        },
      })
        .then(function (data) {
          console.log("====>>>>", data);
          showSuccessNotification("agent Update successfully");
          onClose(true);
        })
        .catch(function (ex) {
          return 0;
        });
    } catch (error) {}
  };

  const createAgents = () => {
    reportWebVitals(console.log);
    let user: any = localStorage.getItem("authUser");
    user = JSON.parse(user);
    console.log("user===>>>", user);
    // const axios = require("axios");
    const authHeaders = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.tokens.access.token}`,
    };
    const apiUrl = `${url.ADD_AGENTS}`;
    let selectItems: any = [];
    selectItem.map((item: any, key: number) => {
      selectItems.push(item.cat);
    });
    try {
      Axios(apiUrl, {
        method: "post",
        headers: authHeaders,
        data: {
          name: name,
          email: email,
          password: password,
          role: "agent",
          topicIds: selectItems,
        },
      })
        .then(function (data) {
          console.log("====>>>>", data);
          showSuccessNotification("agent create successfully");
          onClose(true);
        })
        .catch(function (ex) {
          return 0;
        });
    } catch (error) {}
  };
  const onSelectData = (item: any) => {
    console.log("item ===>>>", item);
    setSelectData(item);
    toggle();
    setErrorTopic(false);
  };
  return (
    <Modal
      isOpen={isOpen}
      toggle={() => {
        onClose(false);
      }}>
      <ModalHeader
        className="modal-title-custom"
        toggle={() => {
          onClose(false);
        }}>
        {!_.isEmpty(dataSet) ? "Edit Agent" : "Add Agent"}
      </ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label
              style={{ marginTop: 5 }}
              htmlFor="update-bookmark"
              className="mb-2">
              Name <span style={{ color: "red" }}>*</span>
            </Label>
            <Input
              type="text"
              name="email"
              id="update-bookmark"
              placeholder=""
              value={name || ""}
              onChange={(e: any) => {
                setName(e.target.value);
                if (!_.isEmpty(name)) {
                  setErrorName(false);
                }
              }}
            />
            <div>
              {errorName ? (
                <Label
                  style={{ color: "red" }}
                  htmlFor="update-bookmark"
                  className="mb-2">
                  Please enter name
                </Label>
              ) : null}
            </div>
            <Label
              style={{ marginTop: 15 }}
              htmlFor="update-bookmark"
              className="mb-2">
              Email <span style={{ color: "red" }}>*</span>
            </Label>
            <Input
              type="text"
              name="email"
              id="update-bookmark"
              placeholder=""
              value={email || ""}
              onChange={(e: any) => {
                setEmail(e.target.value);

                if (!_.isEmpty(email)) {
                  setErrorEmail(false);
                }
              }}
            />
            <div>
              {errorEmail ? (
                <Label
                  style={{ color: "red" }}
                  htmlFor="update-bookmark"
                  className="mb-2">
                  Please enter email
                </Label>
              ) : null}
            </div>
            {_.isEmpty(dataSet) ? (
              <Label
                style={{ marginTop: 15 }}
                htmlFor="update-bookmark"
                className="mb-2">
                Password <span style={{ color: "red" }}>*</span>
              </Label>
            ) : null}
            {_.isEmpty(dataSet) ? (
              <Input
                type="password"
                name="email"
                id="update-bookmark"
                placeholder=""
                value={password || ""}
                onChange={(e: any) => {
                  setPassword(e.target.value);
                  if (!_.isEmpty(password)) {
                    setErrorPassword(false);
                  }
                }}
              />
            ) : null}
            <div>
              {errorPassword && _.isEmpty(dataSet) ? (
                <Label
                  style={{ color: "red" }}
                  htmlFor="update-bookmark"
                  className="mb-2">
                  Please enter password
                </Label>
              ) : null}
            </div>
            <Label
              style={{ marginTop: 15 }}
              htmlFor="update-bookmark"
              className="mb-2">
              Select Topic <span style={{ color: "red" }}>*</span>
            </Label>

            <Multiselect
              avoidHighlightFirstOption={false}
              style={{
                multiselectContainer: {},
                searchBox: {},
                inputField: {},
                chips: {
                  backgroundColor: "#07bc0c",
                },
                optionContainer: {
                  "&:hover": {
                    backgroundColor: "#07bc0c",
                  },
                },
                option: {
                  "&:hover": {
                    backgroundColor: "#07bc0c",
                  },
                  // To change css for dropdown options
                },
                highlightOption: {
                  "&:hover": {
                    backgroundColor: "#07bc0c",
                  },
                },
                groupHeading: {},
              }}
              displayValue="key"
              onKeyPressFn={function noRefCheck() {}}
              onRemove={function noRefCheck(v) {
                console.log("v==>>", v);
                setSelectData(v);
              }}
              onSearch={function noRefCheck() {}}
              onSelect={function noRefCheck(v) {
                console.log(v);
                setSelectData(v);
              }}
              options={dataValue}
              selectedValues={selectItem}
            />
            {/* <Dropdown
              style={{
                width: "100%",
                padding: "0.5rem 1rem",
                fontSize: "0.875rem",
                fontWeight: 400,
                lineHeight: 1.5,
                color: "#495057",
                backgroundColor: "#fff",
                backgroundClip: "padding-box",
                border: "1px solid #e6ebf5",
                appearance: "none",
                borderRadius: "0.25rem",
              }}
              isOpen={dropdownOpen}
              toggle={toggle}>
              <DropdownToggle
                style={{
                  display: "flex",
                  height: 25,
                }}
                tag="span"
                onClick={toggle}
                data-toggle="dropdown"
                aria-expanded={dropdownOpen}>
                {!_.isEmpty(selectItem) ? selectItem.name : `${" "}`}
              </DropdownToggle>
              <DropdownMenu
                style={{
                  width: "93%",
                  flexDirection: "column",
                }}>
                {!_.isEmpty(dataValue)
                  ? dataValue.map((items: Person, Key: number) => {
                      return (
                        <div
                          key={Key}
                          style={{
                            width: "100%",
                            // backgroundColor: "pink",
                          }}
                          onClick={() => {
                            onSelectData(items);
                          }}>
                          {items.name}
                        </div>
                      );
                    })
                  : null}
              </DropdownMenu>
            </Dropdown> */}
            {ErrorTopic && _.isEmpty(dataSet) ? (
              <Label
                style={{ color: "red" }}
                htmlFor="update-bookmark"
                className="mb-2">
                Please select Topic
              </Label>
            ) : null}
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button
          type="button"
          color="none"
          onClick={() => {
            onClose(false);
          }}>
          Close
        </Button>
        <Button color="primary" onClick={onSubmit}>
          {!_.isEmpty(dataSet) ? "Update" : "Add"}
        </Button>{" "}
      </ModalFooter>
    </Modal>
  );
};

export default addAgents;
