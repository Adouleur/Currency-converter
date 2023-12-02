import React from "react";
import HeaderCurrency from "./HeaderCurrency";

interface HeaderProps {
  generalData: any;
}
const Header = ({ generalData }: HeaderProps) => {
  const usd = 1 / generalData?.USD;
  const eur = 1 / generalData?.EUR;

  return (
    <div className="text-center bg-sky-100  w-full mx-auto p-2">
      <h2 className="text-2xl ">Your Currency Exchange</h2>
      <div className="lg:grid-cols-3 grid items-center mt-4 grid-cols-2 gap-4 justify-items-center bg-white rounded-lg p-4">
        <div className="flex col-span-2 mx-auto lg:col-auto	">
          <img src="https://flagcdn.com/h20/ua.png" alt="#" className="mr-2" />
          <p>Current Hryvnia exchange rate</p>
        </div>
        <HeaderCurrency rate={usd} currency="USD" />
        <HeaderCurrency rate={eur} currency="EUR" />
      </div>
    </div>
  );
};

export default Header;
