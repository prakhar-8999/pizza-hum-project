const useExtraCharge = () => {
  const extraCharge = useState("extracharge", () => 200);

  return {
    extraCharge,
  };
};
export default useExtraCharge;
