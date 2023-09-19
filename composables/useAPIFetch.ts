import {useFetch} from "#app";

type useFetchType = typeof useFetch;

// wrap useFetch with configuration needed to talk to our API
const useAPIFetch: useFetchType = (path, options = {}) => {
  const config = useRuntimeConfig();

  // modify options as needed
  options.baseURL = config.public.baseURL;
  return useFetch(path, {
    ...options,
    credentials: "include",
  });
};

export default useAPIFetch;
