import React from "react";

const usePaginate = (args) => {
  const [params, setParams] = React.useState({
    limit: args?.defaultParams?.limit || 10,
    page: args?.defaultParams?.page || 1,
    search: args?.defaultParams?.search || "",
    filters: args?.defaultParams?.filter || {},
  });

  const setSearch = (txt) =>
    setParams({
      ...params,
      search: txt,
    });

  const setPage = (newPage) =>
    setParams({
      ...params,
      page: newPage + 1,
    });

  const setLimit = (newLimit) =>
    setParams({
      ...params,
      limit: newLimit,
    });

  const getFilter = (key) => params?.filters?.[key] || undefined;
  const setFilterField = (key, value) =>
    setParams({
      ...params,
      filters: {
        ...params?.filters,
        [key]: value,
      },
    });

  const getQueryParams = () => {
    return JSON.parse(
      JSON.stringify({
        ...params,
        filters: undefined,
        ...params.filters,
      })
    );
  };

  return {
    params,
    search: params?.search,
    setSearch,
    page: (params?.page || 1) - 1,
    setPage,
    limit: params?.limit,
    setLimit,
    watch: getFilter,
    setFilterField,
    getQueryParams,
  };
};

export default usePaginate;
