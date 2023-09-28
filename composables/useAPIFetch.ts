// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import {useFetch} from "#app";

type useFetchType = typeof useFetch;

// wrap useFetch with configuration needed to talk to our API
const useAPIFetch: useFetchType = async (path, options = {}) => {
  const config = useRuntimeConfig();

  // modify options as needed
  options.baseURL = config.public.baseURL;
  const {data, status, error} = await useFetch(path, {
    ...options,
    credentials: "include",
    // headers: {
    //   "ngrok-skip-browser-warning": "true",
    // },
  });

  return {data, status, error};
};

export default useAPIFetch;
