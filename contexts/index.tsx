import { IUser } from "@/pages/students";
import { ReactNode, FC, createContext, useState, useEffect } from "react";

interface ContextProviderProps {
  children: ReactNode;
}

const useContext = () => {
  const [users, setUsers] = useState<any>([]);
  const [singleUser, setSingleUser] = useState<any>();
  const [selectedImage, setSelectedImage] = useState<any>(null);

  const getUserList = (url: string) => {
    fetch("https://dummyjson.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users);
      });
  };

  const getSingleUser = (id: string) => {
    if (id.length > 5) {
      const newUser = users.find((user: IUser) => user.id === id);
      setSingleUser(newUser);
      return;
    }
    fetch(`https://dummyjson.com/users/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setSingleUser(data);
      });
  };

  const deleteUser = (id: string) => {
    if (id.length > 5) {
      const newUsers = users.filter((user: IUser) => user.id !== id);
      setUsers(newUsers);
      return;
    }
    fetch(`https://dummyjson.com/users/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        setUsers((prevState: IUser[]) => {
          return prevState.map((item: IUser) => {
            if (item.id === data.id) {
              return data;
            }
            return item;
          });
        });
      });
  };

  return {
    users,
    selectedImage,
    singleUser,
    setUsers,
    setSelectedImage,
    getUserList,
    getSingleUser,
    deleteUser,
    setSingleUser,
  };
};

export const Context = createContext({} as ReturnType<typeof useContext>);

const ContextProvider: FC<ContextProviderProps> = ({ children }) => {
  return <Context.Provider value={useContext()}>{children}</Context.Provider>;
};

export default ContextProvider;
