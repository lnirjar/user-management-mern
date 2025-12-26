import { useCallback, useState } from "react";
import axios from "axios";
import { useAppDispatch } from "../redux/hooks";
import { authActions } from "../redux/authSlice";

export const useUserDataQuery = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();

  const fetchData = useCallback(() => {
    const fetchUser = async () => {
      setLoading(true);
      const data = await axios.get("/api/user");
      dispatch(authActions.setUser(data?.data?.user ?? null));
      setLoading(false);
    };
    fetchUser();
  }, [dispatch]);

  return { loading, fetchData };
};
