import React from "react";
import LoadingSVG from "./LoadingSvg";

interface HeaderCurrencyProps {
  rate: number;
  currency: string;
}
const HeaderCurrency = ({ rate, currency }: HeaderCurrencyProps) => {
  return (
    <div className="flex max-w-2xl ">
      <img
        src={`https://flagcdn.com/32x24/${currency
          .toLowerCase()
          .slice(0, -1)}.png`}
        className="mr-2"
        alt="#"
      />
      <p className="flex">
        {isNaN(rate) ? <LoadingSVG /> : rate.toFixed(3)} {currency}
      </p>
    </div>
  );
};

export default HeaderCurrency;
