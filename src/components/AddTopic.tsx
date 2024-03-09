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
import {
  showErrorNotification,
  showSuccessNotification,
} from "../helpers/notifications";
import reportWebVitals from "../reportWebVitals";
import * as url from "../api/urls";
import Axios from "axios";
import _ from "lodash";
interface DataTypes {
  bookmarkTitle: string | null;
}

interface UpdateDeleteBookmarkProps {
  isOpen: boolean;
  onClose: (data: boolean) => void;
  onUpdate: (data: any) => void;
  dataSet: any;
}
const AddTopic = ({
  isOpen,
  onClose,
  onUpdate,
  dataSet,
}: UpdateDeleteBookmarkProps) => {
  /*
   data input handeling
   */
  const [data, setData] = useState<DataTypes>({
    bookmarkTitle: "",
  });
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [errorNameBool, setErrorName] = useState<boolean>(false);
  const [errorDescriptionBool, setErrorDescription] = useState<boolean>(false);

  const onChangeData = (field: "bookmarkTitle", value: string) => {
    let modifiedData: DataTypes = { ...data };
    if (value === "") {
      modifiedData[field] = null;
    } else {
      modifiedData[field] = value;
    }
    setData(modifiedData);
  };

  useEffect(() => {
    if (!_.isEmpty(dataSet)) {
      setName(dataSet.name);
      setDescription(dataSet.description);
    }
  }, []);

  /*
    submit data
    */
  const onSubmit = () => {
    if (_.isEmpty(name)) {
      // showErrorNotification("please enter name");
      setErrorName(true);
    } else if (_.isEmpty(description)) {
      setErrorDescription(true);
      // showErrorNotification("please enter description");
    } else if (!_.isEmpty(dataSet)) {
      EditAgent();
    } else {
      // onUpdate(data);
      createTopic();
    }
  };

  const EditAgent = () => {
    reportWebVitals(console.log);
    let user: any = localStorage.getItem("authUser");
    user = JSON.parse(user);
    console.log("user===>>>", user);
    // const axios = require("axios");
    const authHeaders = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.tokens.access.token}`,
    };
    const apiUrl = `${url.ADD_TOPICS}/${dataSet.id}`;
    try {
      Axios(apiUrl, {
        method: "PATCH",
        headers: authHeaders,
        data: {
          name: name,
          description: description,
        },
      })
        .then(function (data) {
          console.log("====>>>>", data);
          showSuccessNotification("Topic Update successfully");
          onClose(true);
        })
        .catch(function (ex) {
          return 0;
        });
    } catch (error) {}
  };

  const createTopic = () => {
    reportWebVitals(console.log);
    let user: any = localStorage.getItem("authUser");
    user = JSON.parse(user);
    console.log("user===>>>", user);
    // const axios = require("axios");
    const authHeaders = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.tokens.access.token}`,
    };
    const apiUrl = `${url.ADD_TOPICS}`;
    try {
      Axios(apiUrl, {
        method: "post",
        headers: authHeaders,
        data: {
          name: name,
          description: description,
        },
      })
        .then(function (data) {
          console.log("====>>>>", data);
          showSuccessNotification("Topic create successfully");
          onClose(true);
          // setResponse(res);
          //  return res
        })
        .catch(function (ex) {
          return 0;
        });
    } catch (error) {}
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
        {_.isEmpty(dataSet) ? "Add Topic" : "Edit Topic"}
      </ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label
              style={{ marginTop: 15 }}
              htmlFor="update-bookmark"
              className="mb-2">
              Topic Name <span style={{ color: "red" }}>*</span>
            </Label>
            <Input
              type="text"
              name="email"
              id="update-bookmark"
              placeholder="add Topic Name"
              value={name || ""}
              onChange={(e: any) => {
                setName(e.target.value);
                if (!_.isEmpty(name)) {
                  setErrorName(false);
                }
                // onChangeData("bookmarkTitle", e.target.value);
              }}
            />
            <div>
              {errorNameBool ? (
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
              Topic Description <span style={{ color: "red" }}>*</span>
            </Label>
            <Input
              type="text"
              name="email"
              id="update-bookmark"
              placeholder="add Topic Description"
              value={description || ""}
              onChange={(e: any) => {
                setDescription(e.target.value);
                if (!_.isEmpty(description)) {
                  setErrorDescription(false);
                }
                // onChangeData("bookmarkTitle", e.target.value);
              }}
            />
            <div>
              {errorDescriptionBool ? (
                <Label
                  style={{ color: "red" }}
                  htmlFor="update-bookmark"
                  className="mb-2">
                  Please enter description
                </Label>
              ) : null}
            </div>
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
          {_.isEmpty(dataSet) ? "Add" : "update"}
        </Button>{" "}
      </ModalFooter>
    </Modal>
  );
};

export default AddTopic;
