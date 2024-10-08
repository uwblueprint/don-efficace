import React from "react";
import StripeCheckout from "../pages/StripeCheckout";
import SelectCauseCheckbox from "../common/SelectCauseCheckbox";
import Input from "../common/Input";

const Donate: React.FC = () => {
  return (
    <>
      <StripeCheckout />
      <SelectCauseCheckbox
        label="Cause [TO DO]"
        onChange={(checked) => console.log(checked)}
      />
      Donate Now!!!
      {/* <Input placeholder="Amount" type="number" /> */}
    </>
  );
};

export default Donate;
