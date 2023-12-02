import React, { useEffect, useState } from "react";
import CurrencyRow from "./components/Exchange/CurrencyRow";
import Header from "./components/Header";

export const BASE_URL = `https://v6.exchangerate-api.com/v6/${process.env.REACT_APP_API_KEY}`;

function App() {
  const [generalData, setGeneralData] = useState([]);
  const [currencyOptions, setCurrencyOptions] = useState<string[]>([]);
  const [fromCurrency, setFromCurrency] = useState<any>();
  const [toCurrency, setToCurrency] = useState<string>();
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);
  const [exchangeRate, setExchangeRate] = useState(0);

  let toAmount, fromAmount;
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

  useEffect(() => {
    fetch(`${BASE_URL}/latest/UAH`)
      .then((res) => res.json())
      .then((data) => {
        setGeneralData(data.conversion_rates);
        const firstCurrency = Object.keys(data.conversion_rates)[1];
        setCurrencyOptions([...Object.keys(data.conversion_rates)]);
        setFromCurrency(data.base_code);
        setToCurrency(firstCurrency);
        setExchangeRate(data.conversion_rates[firstCurrency]);
      });
  }, []);

  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      fetch(`${BASE_URL}/pair/${fromCurrency}/${toCurrency}`)
        .then((res) => res.json())
        .then((data) => setExchangeRate(data.conversion_rate));
    }
  }, [fromCurrency, toCurrency]);

  const handleFromAmountChange = (e: React.FormEvent<HTMLInputElement>) => {
    setAmount(+e.currentTarget.value);
    setAmountInFromCurrency(true);
  };
  const handleToAmountChange = (e: React.FormEvent<HTMLInputElement>) => {
    setAmount(+e.currentTarget.value);
    setAmountInFromCurrency(false);
  };

  return (
    <div className="bg-gradient-to-r h-screen from-blue-400 to-orange-500 via-purple-500 animate-gradient-x ">
      <Header generalData={generalData} />
      <div className="lg:p-0 md:p-8 min-[320px]:p-4">
        <div className="flex-col flex items-center bg-sky-100  mx-auto h-[200px] p-4 rounded-lg border border-solid border-gray-300 shadow-2xl max-w-[400px] w-full mt-8 ">
          <h1 className="md:text-3xl	mb-6 text-xl">Choose your currency!</h1>
          <CurrencyRow
            currencyOptions={currencyOptions}
            selectedCurrency={fromCurrency}
            onChangeCurrency={(e: React.FormEvent<HTMLInputElement>) =>
              setFromCurrency(e.currentTarget.value)
            }
            amount={fromAmount}
            onChangeAmount={handleFromAmountChange}
          />

          <div className="font-bold text-xl">=</div>
          <CurrencyRow
            currencyOptions={currencyOptions}
            selectedCurrency={toCurrency}
            onChangeCurrency={(e: React.FormEvent<HTMLInputElement>) =>
              setToCurrency(e.currentTarget.value)
            }
            amount={toAmount}
            onChangeAmount={handleToAmountChange}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
