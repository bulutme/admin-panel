import Layout from "@/components/Layout";
import styles from "./Students.module.scss";
import Typography from "@/components/Typography";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Search from "../../assests/images/search.svg";
import Edit from "../../assests/images/edit.svg";
import Delete from "../../assests/images/delete.svg";
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from "@material-ui/core/";
import { useContext, useEffect, useState } from "react";
import { Context } from "@/contexts";
import Modal from "@/components/Modal";
import Form from "@/components/Form";
import { v4 as uuidv4 } from "uuid";
import dynamic from "next/dynamic";

export interface IUser {
  name: string;
  image: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: number | string;
  domain: string;
  company: {
    name: string;
  };
  id: string;
  isDeleted?: boolean;
}

const Students = () => {
  const {
    selectedImage,
    users,
    singleUser,
    setUsers,
    getUserList,
    getSingleUser,
    setSingleUser,
    deleteUser,
  } = useContext(Context);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [tableData, setTableData] = useState<any>([]);
  const [filteredTableData, setFilteredTableData] = useState<any>([]);

  const columns = [
    {
      name: "",
      options: {
        customBodyRender: (value: string) => (
          <img className={styles.userImage} src={value} alt="Image" />
        ),
      },
    },
    { name: "Name" },
    { name: "Email" },
    { name: "Phone" },
    { name: "Website" },
    { name: "Company" },
    {
      name: "Actions",
      options: {
        customBodyRender: (value: string) => (
          <div className={styles.buttons}>
            <span
              onClick={() => getUserDetail(value)}
              className={styles.button}
            >
              <Edit />
            </span>
            <span onClick={() => handleRemove(value)} className={styles.button}>
              <Delete />
            </span>
          </div>
        ),
      },
    },
  ];

  const options = {
    selectableRows: false,
    filterType: "dropdown",
    rowsPerPage: 6,
    pagination: true,
    selectToolbarPlacement: "none",
  } as any;

  const getMuiTheme = () =>
    createTheme({
      overrides: {
        MuiPaper: {
          elevation4: {
            backgroundColor: "transparent",
            boxShadow: "none",
          },
        },
        MuiTableCell: {
          head: {
            background: "#f8f8f8 !important",
          },
          body: {
            background: "#fff !important",
          },
          root: {
            border: "0px !important",
          },
        },
        MuiButton: {
          root: {
            color: "#ACACAC !important",
          },
        },
        MuiTableRow: {
          root: {
            color: "#000",
            height: "85px",
            borderRadius: "8px",
          },
        },
        // @ts-ignore
        MUIDataTableToolbar: { root: { display: "none" } },
        MUIDataTableBodyRow: { body: { marginBottom: "10px" } },
      },
    });

  const onSubmit = (value: IUser) => {
    if (singleUser) {
      var newUsers = [...users];
      var index = newUsers.findIndex(
        (user: IUser) => user.id === singleUser.id
      );
      newUsers[index] = {
        ...singleUser,
        firstName: value.name,
        lastName: "",
        company: { name: value.company },
        domain: value.domain,
        email: value.email,
        phone: value.phone,
        image: selectedImage,
      };
      setUsers(newUsers);
      setIsModalOpen(false);
      return;
    }
    const newData = {
      ...value,
      id: uuidv4(),
      image: selectedImage,
      firstName: value.name,
      company: {
        name: value.company,
      },
      lastName: "",
    };
    setUsers([newData, ...users]);
    setIsModalOpen(false);
  };

  const handleRemove = (id: string) => {
    deleteUser(id);
  };

  const getUserDetail = (id: string) => {
    getSingleUser(id);
    setIsModalOpen(true);
  };

  const handleInputChange = (value: string) => {
    const searchResult = tableData.filter((users: IUser[]) =>
      users.find(
        (p: IUser, _: number) =>
          p.toString().toLowerCase().includes(value?.toLowerCase()) && _ !== 0
      )
    );

    setFilteredTableData(searchResult);
  };

  useEffect(() => {
    const filteredData = users.filter((user: IUser) => user.isDeleted !== true);
    const data = filteredData.map((user: IUser) => {
      const newData = [];
      newData.push(
        user.image,
        user.firstName + " " + user.lastName,
        user.email,
        user.phone,
        user.domain,
        user.company.name,
        user.id
      );

      return newData;
    });
    setTableData(data);
    setFilteredTableData(data);
  }, [users]);

  useEffect(() => {
    getUserList("https://dummyjson.com/docs/users");
  }, []);

  return (
    <Layout>
      <div className={styles.students}>
        <div className={styles.header}>
          <Typography variant="header-small" color="primary">
            Students List
          </Typography>
          <div className={styles.search}>
            <Input
              className={styles.searchInput}
              id="search"
              placeholder="Search..."
              onChange={(e, value) => {
                handleInputChange(value as string);
              }}
              icon={<Search />}
            />
            <Button
              onClick={() => {
                setSingleUser(null);
                setIsModalOpen(!isModalOpen);
              }}
              className={styles.button}
              text="ADD NEW STUDENT"
            />
          </div>
        </div>
        <div className={styles.content}>
          <ThemeProvider theme={getMuiTheme()}>
            <MUIDataTable
              title={""}
              data={filteredTableData}
              columns={columns}
              options={options}
            />
          </ThemeProvider>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        title="Add new card"
      >
        {isModalOpen && <Form onSubmit={(value) => onSubmit(value as any)} />}
      </Modal>
    </Layout>
  );
};

export default dynamic(Promise.resolve(Students), {
  ssr: false,
});
