import React, { ReactEventHandler } from "react";

interface CurrencyRowProps {
  currencyOptions: string[];
  selectedCurrency: string | undefined;
  onChangeCurrency: any;
  amount: number;
  onChangeAmount: ReactEventHandler<HTMLInputElement>;
}
const CurrencyRow = ({
  currencyOptions,
  selectedCurrency,
  onChangeCurrency,
  amount,
  onChangeAmount,
}: CurrencyRowProps) => {
  return (
    <div className="flex justify-between w-full">
      <input
        type="number"
        className="border border-solid border-gray-400 p-1 rounded-lg bg-sky-100 focus:border-blue-500 focus:outline-none transition duration-100 w-9/12"
        value={+amount.toFixed(3)}
        onChange={onChangeAmount}
      />
      <select
        onChange={onChangeCurrency}
        className="border border-solid ml-1.5 p-1 rounded-lg border-sky-500 w-3/12"
        value={selectedCurrency === undefined ? "..." : selectedCurrency}
      >
        {currencyOptions.map((option, index) => (
          <option key={index} value={option} className="relative bg-sky-100 ">
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencyRow;
