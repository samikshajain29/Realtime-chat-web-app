import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { serverUrl } from "../main";
import { setOtherUsers, setUserData } from "../redux/userSlice.js";

const getMessages = () => {
  let dispatch = useDispatch();
  let { userData, selectedUser } = useSelector((state) => state.user);
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        let result = await axios.get(
          `${serverUrl}/api/message/get/${selectedUser._id}`,
          {
            withCredentials: true,
          }
        );
        dispatch(setOtherUsers(result.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [userData]);
};
export default getMessages;
