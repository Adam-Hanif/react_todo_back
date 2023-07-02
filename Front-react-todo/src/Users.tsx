import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { fetchUsers } from "./features/UsersSlice";
import { AppDispatch, RootState } from './app/store';

const Users = () => {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector((state: RootState) => state.users.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div>
      {users.map((item) => {
        return (
          <div style={{ color: "white" }} key={item._id}>
            {item.login}, ID_ {item._id}
          </div>
        );
      })}
    </div>
  );
};
export default Users;
