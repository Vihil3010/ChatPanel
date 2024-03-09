import React, { useMemo, useEffect, useState } from "react";
import classnames from "classnames";
// hooks
import { useRedux } from "../../hooks/index";
// hooks
import { useConversationUserType } from "../../hooks/index";
import MaterialReactTable, { MRT_ColumnDef } from "material-react-table";
import { APIClient } from "../../api/apiCore";
import * as url from "../../api/urls";
import reportWebVitals from "../../reportWebVitals";
import AddTopic from "../../components/AddTopic";
import _ from "lodash";
// import { useApi } from "react-use-fetch-api";
import Axios from "axios";
import DeleteModel from "../../components/deleteModel";
import { Table } from "reactstrap";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import moment from "moment";

type Person = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
};

const data: Person[] = [
  {
    name: "juhil",
    description: "261 Erdman Ford",
    createdAt: "12/12/2022",
    id: "sdgdgsadfa",
  },
];

interface IndexProps {}
const Index = (props: IndexProps) => {
  // global store
  const { useAppSelector } = useRedux();
  const api = new APIClient();

  const { selectedChat } = useAppSelector((state) => ({
    selectedChat: state.Chats.selectedChat,
  }));

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loading, setloading] = useState<boolean>(true);
  const [dataSet, setDataSet] = useState<any>({});
  const [responseset, setResponse] = useState<any>({});
  const [isOpenD, setIsOpenD] = useState<boolean>(false);
  const [page, setPage] = useState<any>([]);
  const [selectPage, setSelectPage] = useState<any>(1);
  const onOpen = () => {
    setIsOpen(true);
  };
  const onClose = (value: boolean) => {
    setIsOpen(false);
    setIsOpenD(false);
    if (value) {
      apiCallGet();
    }
  };

  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: "id", //access nested data with dot notation
        header: "id",
      },
      {
        accessorKey: "name", //access nested data with dot notation
        header: "Name",
      },
      {
        accessorKey: "description", //normal accessorKey
        header: "Description",
      },
      {
        accessorKey: "createdAt",
        header: "Create At",
      },
    ],
    [],
  );
  const [dataValue, setDataValue] = useState<any>([]);
  useEffect(() => {
    apiCallGet();
  }, [selectPage]);

  const apiCallGet = async () => {
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

  useEffect(() => {
    const isEmpty = !_.isEmpty(responseset);
    let Pages: any = [];
    for (let i = 1; i <= responseset.totalPages; i++) {
      Pages.push(i);
    }
    if (isEmpty) {
      console.log("responseset ===>>", responseset.results);
      setDataValue(responseset.results);
      setPage(Pages);
      // setloading(false);
    }
  }, [responseset]);

  return (
    <>
      <div style={{ margin: 10, width: "100%" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 10,
          }}>
          <div>
            <h4>Topics</h4>
          </div>
          <button
            onClick={() => {
              setDataSet({});
              onOpen();
            }}
            style={{ marginBottom: 10 }}
            type="button"
            className="btn btn-sm btn-soft-primary">
            Add Topic
          </button>
        </div>
        <Table>
          <thead>
            <tr>
              <th style={{ color: "#07bc0c" }}>Id</th>
              <th style={{ color: "#07bc0c" }}>Name</th>
              <th style={{ color: "#07bc0c" }}>Description</th>
              <th style={{ color: "#07bc0c" }}>Create At</th>
              <th style={{ color: "#07bc0c" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {!_.isEmpty(dataValue)
              ? dataValue.map((items: Person, Key: number) => {
                  console.log("key ====>>>>", items);
                  const dateValue = moment(items.createdAt).format(
                    "DD/MM/YYYY",
                  );
                  return (
                    <tr key={Key}>
                      <th scope="row">{Key + 1}</th>
                      <td>{items.name}</td>
                      <td>{items.description}</td>
                      <td>{dateValue}</td>
                      <td>
                        <div key={Key}>
                          <div
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              setDataSet(items);
                              onOpen();
                            }}>
                            <i className="bx bx-pencil ms-2 text-muted"></i>
                          </div>
                          <div
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              setDataSet(items);
                              setIsOpenD(true);
                            }}>
                            <i className="bx bx-trash ms-2 text-muted"></i>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </Table>
        {!_.isEmpty(dataValue) ? (
          <Pagination
            size="sm"
            aria-label="Page navigation example"
            style={{ justifyContent: "flex-end" }}>
            {selectPage == 1 ? null : (
              <PaginationItem
                disabled={selectPage == 1}
                onClick={() => {
                  const countValue = selectPage - 1;
                  setSelectPage(countValue);
                }}>
                <PaginationLink previous href="#" />
              </PaginationItem>
            )}
            {page.map((item: any, key: number) => {
              return (
                <PaginationItem
                  key={key}
                  onClick={(e) => {
                    console.log("eeeeeee", item);
                    setSelectPage(item);
                  }}>
                  <PaginationLink href="#">{item}</PaginationLink>
                </PaginationItem>
              );
            })}

            {page.length <= selectPage ? null : (
              <PaginationItem
                disabled={page.length <= selectPage}
                onClick={() => {
                  console.log(page.length <= selectPage);
                  if (page.length <= selectPage) {
                    console.log("not allows");
                  } else {
                    const countValue = selectPage + 1;
                    setSelectPage(countValue);
                  }
                }}>
                <PaginationLink next href="#" />
              </PaginationItem>
            )}
          </Pagination>
        ) : null}
        {/* {!_.isEmpty(dataValue) ? (
          <MaterialReactTable
            columns={columns}
            data={responseset.results}
            enableRowActions
            renderRowActions={(index: any) => (
              <div key={index}>
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    console.log("index==>>", index.cell.row.original);
                    setDataSet(index.cell.row.original);
                    onOpen();
                  }}>
                  <i className="bx bx-pencil ms-2 text-muted"></i>
                </div>
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setDataSet(index.cell.row.original);
                    setIsOpenD(true);
                  }}>
                  <i className="bx bx-trash ms-2 text-muted"></i>
                </div>
              </div>
            )}
          />
        ) : null} */}
      </div>
      {isOpen && (
        <AddTopic
          dataSet={dataSet}
          isOpen={isOpen}
          onClose={onClose}
          onUpdate={() => {}}
        />
      )}

      {isOpenD && (
        <DeleteModel
          dataSet={dataSet}
          isOpen={isOpenD}
          onClose={onClose}
          onUpdate={() => {}}
          TopicMatter={true}
        />
      )}
    </>
  );
};

export default Index;
