import { useQuery } from "react-query";
import axios from "axios";

const fetchModel = ({ queryKey }) => {
  const type = queryKey[1];
  const data = axios.get(
    `${import.meta.env.VITE_HOST}/api/admin/getAllDetails`,
    {
      params: {
        type: type,
      },
    }
  );
  return data;
};

export const allDetails = (type) => {
  return useQuery(["getAllDetails", type], fetchModel, {
    select: (data) => {
      const details = data.data.map((item) => item);
      return details;
    },
    refetchOnWindowFocus: false,
  });
};
