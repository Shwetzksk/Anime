import useSWR from "swr";

const fetcher = (...args) =>
  fetch(...args)
    .then((res) => res.json())
    .catch((err) => {
      throw err;
    });
function useFetch(url) {
  const { data, error } = useSWR(url, fetcher);

  return {
    res: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export default useFetch;
