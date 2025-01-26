import { useState } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogTrigger } from "./ui/dialog";
import DialogDemo from "./Dialog";

const CategoriesForm = () => {
 const categories = [
  {wedding:["Valima","Furniture",'Valima Food',"Jahez"]},
  {construction:["Valima","Furniture",'Valima Food',"Jahez"]},
  {buissness:["Valima","Furniture",'Valima Food',"Jahez"]},
  {education:["Valima","Furniture",'Valima Food',"Jahez"]},

 ]
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [initialDeposit, setInitialDeposit] = useState("");
  const [loanPeriod, setLoanPeriod] = useState("");
  const [loanEstimate, setLoanEstimate] = useState(null);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSubCategoryChange = (e) => {
    setSelectedSubCategory(e.target.value);
  };

  const handleDepositChange = (e) => {
    setInitialDeposit(e.target.value);
  };

  const handleLoanPeriodChange = (e) => {
    setLoanPeriod(e.target.value);
  };

  const calculateLoan = () => {
    if (initialDeposit && loanPeriod) {
      const estimatedLoan =
        (parseFloat(initialDeposit) * parseFloat(loanPeriod)) / 1000;
      setLoanEstimate(estimatedLoan.toFixed(2));
    }
  };

  return (
    <div className="flex justify-center items-center flex-col">
      <div className="w-full max-w-lg p-4">
        <h2 className="text-center font-semibold mb-4">Loan Calculator</h2>

        <div className="mb-4">
          <label htmlFor="category" className="block mb-2">
            Select Category
          </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="w-full border p-2"
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {selectedCategory && (
          <div className="mb-4">
            <label htmlFor="subcategory" className="block mb-2">
              Select Subcategory
            </label>
            <select
              id="subcategory"
              value={selectedSubCategory}
              onChange={handleSubCategoryChange}
              className="w-full border p-2"
            >
              {categories.map((item, index) => (
                <option key={index}>{item}</option>
              ))}
            </select>
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="deposit" className="block mb-2">
            Initial Deposit
          </label>
          <input
            type="number"
            id="deposit"
            value={initialDeposit}
            onChange={handleDepositChange}
            className="w-full border p-2"
            placeholder="Enter deposit amount"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="loanPeriod" className="block mb-2">
            Loan Period (years)
          </label>
          <input
            type="number"
            id="loanPeriod"
            value={loanPeriod}
            onChange={handleLoanPeriodChange}
            className="w-full border p-2"
            placeholder="Enter loan period"
          />
        </div>

        <div className="text-center"><Button onClick={calculateLoan}>Calculate Loan</Button></div>

        {loanEstimate !== null && (
          <div className="mt-4">
            <h3 className="font-semibold">Estimated Loan Breakdown:</h3>
            <p>Estimated loan: ${loanEstimate}</p>
          </div>
        )}
      </div>

      <div>
        <DialogDemo />
      </div>
    </div>
  );
};

export default CategoriesForm;
