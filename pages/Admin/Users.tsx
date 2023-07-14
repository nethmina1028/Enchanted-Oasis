import { useSession } from "next-auth/react";
import Layout from "../Layout";
import {
  Button,
  FormControl,
  InputGroup,
  InputLeftElement,
  useDisclosure,
  Divider,
  ModalOverlay,
  useToast,
  Input,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";

import useSWR from "swr";
import {
  ReceivedUserDataOnClient,
  Role,
  SentUserDataFromClient,
} from "../../lib/types";

import React, { useState } from "react";
import styles from "./Users.module.css";
import { fetcher } from "@/lib/functions";

import UserListItem from "../../components/UserListItem";
import NewUserModal from "@/components/NewUserModal";
import TabsComponent from "@/components/TabsComponent";

function useSearch(searchQuery: string, role: string, page: number) {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/allUsers/search?searchQuery=${searchQuery}&page=${page}&role=${role}`,
    fetcher
  );
  return {
    users: data as ReceivedUserDataOnClient[],
    isLoading,
    error: error,
    mutate,
  };
}

export default function Users() {
  const session = useSession();

  const [searchQuery, setSearchQuery] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [role, setRole] = useState("All");
  const [page, setPage] = useState(1);

  const { users, isLoading, error, mutate } = useSearch(
    searchQuery,
    role,
    page
  );

  const [newUserData, setNewUserData] = useState<SentUserDataFromClient>({
    name: "",
    email: "",
    role: "Student",
    house: "",
    password: "",
    phone: "",
    profilePicture: null,
    rollNumber: "",
  });

  const toast = useToast();

  let componentToRender;
  if (isLoading) {
    componentToRender = <div>Loading...</div>;
  }
  if (error) {
    toast({
      title: error.name,
      description: error.message,
      status: "error",
      duration: 9000,
      isClosable: true,
    });
    componentToRender = <div> {error.message}</div>;
  }
  if (users) {
    if (users.length == 0) {
      componentToRender = <div>No users found</div>;
    } else {
      componentToRender = (
        <>
          {users.map((user) => (
            <UserListItem
              mutate={mutate}
              userData={user}
              key={user._id.toString()}
            />
          ))}
        </>
      );
    }
  }

  // for the new overlay when the modal is opened:
  function OverlayOne() {
    return <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />;
  }
  const [overlay, setOverlay] = React.useState(<OverlayOne />);

  return (
    <>
      <Layout>
        {/* header */}
        <div className={styles.wrapper}>
          {/* search bar */}
          <div className={styles.searchBar}>
            <FormControl id="search">
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Search2Icon />
                </InputLeftElement>
                <Input
                  type="text"
                  placeholder="Search"
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </InputGroup>
            </FormControl>
          </div>

          {/* Tabs here*/}
          <TabsComponent setRole={setRole} setPage={setPage} />

          <div className={styles.tableHeader}>
            <span>
              <span>Profile</span>
            </span>
            <div className={styles.tableHeadersMain}>
              <span>Name</span>
              <span>Role</span>
              <span>Email</span>
              <span>Phone</span>
              <span>Roll No.</span>
              <span>House</span>
            </div>
            <span>Info</span>
            <span>Remove</span>
          </div>
          <Divider orientation="horizontal" paddingBlock={"5px"} />

          {/* list of users */}
          {componentToRender}
        </div>

        {/* divider */}
        <Divider orientation="horizontal" paddingBlock={"5px"} />

        <div className={styles.botBar}>
          {/* Pagination */}
          <Button
            onClick={() => {
              if (page > 1) setPage(page - 1);
            }}
          >
            {"<"}
          </Button>
          <span>{page}</span>
          <Button
            onClick={() => {
              if (users.length == 10) setPage(page + 1);
            }}
          >
            {">"}
          </Button>

          {/* Adding new users */}
          <Button
            onClick={() => {
              onOpen();
              setOverlay(<OverlayOne />);
            }}
          >
            Add
          </Button>
        </div>

        {/* Modal window to add new users */}
        <NewUserModal
          isOpen={isOpen}
          onClose={onClose}
          mutate={mutate}
          newUserData={newUserData}
          setNewUserData={setNewUserData}
        />
      </Layout>
    </>
  );
}
