import React from "react";
import DonationImpactMetric from "./ImpactItem";

const Donate: React.FC = () => {
  return <div>
    Donate page here
    {/* import ImpactPerCause instead ? */}
    <DonationImpactMetric 
      key={item.item_id}
      item_id={item.item_id}
      item_name={item.item_name}
      total_impact={item.total_impact} />
    </div>;
};

export default Donate;
