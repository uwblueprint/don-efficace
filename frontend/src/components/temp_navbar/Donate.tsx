import React from "react";
import SelectCauseCheckbox from "../common/SelectCauseCheckbox";

const Donate: React.FC = () => {
  return <div>
    {/* pass in causes here */}
    <SelectCauseCheckbox label="Cause [TO DO]" onChange={(checked) => console.log(checked)} />
    Donate Now!!!</div>;
};

export default Donate;
