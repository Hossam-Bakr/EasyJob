import React from "react";
import SearchField from "../../../Components/Ui/SearchField";
import { useMutation } from "@tanstack/react-query";
import { usersManageMent } from "../../../util/Http";

const SearchEmployees = ({
  setShowResponse,
  setResponseMessage,
  setSuccessResponse,
  getSearchData,
  setIsSearching,
}) => {

  const { mutate } = useMutation({
    mutationFn: usersManageMent,
    onSuccess: (data) => {
      console.log(data);
      if (data) {
        if (data.status === "success") {
          console.log(data);
          getSearchData(data.data?.users)
        }
      }
    },
    onError: (error) => {
      console.log("my error", error);
      setResponseMessage({
        title: "Request Faild",
        content: "searching faild please try again",
      });
      setSuccessResponse(false);
      setShowResponse(true);
    },
  });

  const onSearch = (e, searchInput) => {
    e.preventDefault();
    setIsSearching(true);
    if (searchInput) {
        mutate({
            type: `search?query=${searchInput}`,
            method: "get",
          });
    }
  };

  return (
    <>
      <SearchField
        onSearch={onSearch}
        text="search user by name, email"
      />
    </>
  );
};

export default SearchEmployees;
