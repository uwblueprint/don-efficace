import React from "react";
import StripeCheckout from "../pages/StripeCheckout";
import SelectCauseCheckbox from "../common/SelectCauseCheckbox";

const Donate: React.FC = () => {
  return (
    <>
      <StripeCheckout />
      <SelectCauseCheckbox
        label="Cause [TO DO]"
        onChange={(checked) => console.log(checked)}
      />
      Donate Now!!!
    </>
  );
};

export default Donate;
