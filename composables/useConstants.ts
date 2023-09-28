const useConstants = () => {
  const config = useRuntimeConfig();
  const constant = {
    baseURL: config.public.baseURL,
    currency: "EUR",
  };

  return {constant};
};

export default useConstants;
