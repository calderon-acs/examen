const NumFormatCurrency: React.FC<any> = (props: any) => {
  return (
    <>
      {props.children || parseFloat(props.children) !== 0
        ? parseFloat(props.children).toLocaleString("es-MX", {
            style: "currency",
            currency: "MXN",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })
        : props.hiddenZero
        ? ""
        : (0).toLocaleString("es-MX", {
            style: "currency",
            currency: "MXN",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
    </>
  );
};

export default NumFormatCurrency;
