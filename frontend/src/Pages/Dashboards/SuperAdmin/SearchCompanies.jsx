import React from "react";
import SearchField from "../../../Components/Ui/SearchField";
import { useMutation } from "@tanstack/react-query";
import { companiesManageMent } from "../../../util/Http";

const SearchCompanies = ({
  setShowResponse,
  setResponseMessage,
  setSuccessResponse,
  getSearchData,
  setIsSearching,
}) => {
  const { mutate } = useMutation({
    mutationFn: companiesManageMent,
    onSuccess: (data) => {
      console.log(data);
      if (data) {
        if (data.status === "success") {
          console.log(data);
          getSearchData(data.data?.companies);
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
    setIsSearching(false);

  };

  return (
    <>
      <SearchField onSearch={onSearch} text="search company by name, email" />
    </>
  );
};

export default SearchCompanies;
