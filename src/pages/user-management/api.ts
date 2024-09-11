import { useQuery } from "@tanstack/react-query";

const baseUrl = "https://jsonplaceholder.typicode.com/";

export const fetchUserList = async () => {
  const response = await fetch(baseUrl + "users");
  return await response.json();
};

export const useUserList = () => {
  return useQuery({
    queryKey: ["user-list"],
    queryFn: fetchUserList,
  });
};
