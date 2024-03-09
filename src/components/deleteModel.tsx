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
  showSuccessNotification,
  showErrorNotification,
} from "../helpers/notifications";
import reportWebVitals from "../reportWebVitals";
import * as url from "../api/urls";
import Axios from "axios";

// interface
import { BookMarkTypes } from "../data/bookmarks";
import _ from "lodash";

interface DataTypes {
  bookmarkTitle: string | null;
}

interface UpdateDeleteBookmarkProps {
  isOpen: boolean;
  onClose: (data: boolean) => void;
  onUpdate: (data: any) => void;
  dataSet: any;
  TopicMatter: boolean;
}
const DeleteModel = ({
  isOpen,
  onClose,
  onUpdate,
  dataSet,
  TopicMatter,
}: UpdateDeleteBookmarkProps) => {
  /*
   data input handeling
   */
  const [data, setData] = useState<DataTypes>({
    bookmarkTitle: "",
  });

  /*
    submit data
    */

  const deleteAgent = () => {
    reportWebVitals(console.log);
    let user: any = localStorage.getItem("authUser");
    user = JSON.parse(user);
    console.log("user===>>>", user);
    // const axios = require("axios");
    const authHeaders = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.tokens.access.token}`,
    };
    const apiUrl = TopicMatter
      ? `${url.ADD_TOPICS}/${dataSet.id}`
      : `${url.ADD_AGENTS}/${dataSet.id}`;
    try {
      Axios(apiUrl, {
        method: "DELETE",
        headers: authHeaders,
      })
        .then(function (data) {
          console.log("====>>>>", data);
          showSuccessNotification("delete successfully");
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
        Delete
      </ModalHeader>
      <ModalBody>
        <Label htmlFor="update-bookmark" className="mb-2">
          Are you sure you want to delete ?
        </Label>
      </ModalBody>
      <ModalFooter>
        <Button
          type="button"
          color="none"
          onClick={() => {
            onClose(false);
          }}>
          No
        </Button>
        <Button color="primary" onClick={deleteAgent}>
          Yes
        </Button>{" "}
      </ModalFooter>
    </Modal>
  );
};

export default DeleteModel;
