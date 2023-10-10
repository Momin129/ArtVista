import { useQuery } from "react-query";
import axios from "axios";

const fetchModel = ({ queryKey }) => {
  const type = queryKey[1];
  const data = axios.get(
    `${import.meta.env.VITE_HOST}/api/models/getModelList`,
    {
      params: {
        type: type,
      },
    }
  );
  return data;
};

export const TypesOfModel = (type, onSuccess) => {
  return useQuery(["getModels", type], fetchModel, {
    select: (data) => {
      const names = data.data.getmodel.map((item) => item);
      return names;
    },
    onSuccess: (data) => onSuccess(data),
    refetchOnWindowFocus: false,
  });
};
