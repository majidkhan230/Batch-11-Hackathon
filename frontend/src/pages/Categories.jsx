import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BiCategory } from 'react-icons/bi';
import { IoIosArrowForward } from 'react-icons/io';

const loanCategories = [
  {
    label: "Wedding Loans",
    route: "/loan-categories/wedding",
    subcategories: [
      { label: "Valima", route: "/loan-categories/wedding/valima" },
      { label: "Furniture", route: "/loan-categories/wedding/furniture" },
      { label: "Valima Food", route: "/loan-categories/wedding/valima-food" },
      { label: "Jahez", route: "/loan-categories/wedding/jahez" }
    ],
    maxLoan: "PKR 5 Lakh",
    loanPeriod: "3 years"
  },
  {
    label: "Home Construction Loans",
    route: "/loan-categories/home-construction",
    subcategories: [
      { label: "Structure", route: "/loan-categories/home-construction/structure" },
      { label: "Finishing", route: "/loan-categories/home-construction/finishing" },
      { label: "Loan", route: "/loan-categories/home-construction/loan" }
    ],
    maxLoan: "PKR 10 Lakh",
    loanPeriod: "5 years"
  },
  {
    label: "Business Startup Loans",
    route: "/loan-categories/business-startup",
    subcategories: [
      { label: "Buy Stall", route: "/loan-categories/business-startup/buy-stall" },
      { label: "Advance Rent for Shop", route: "/loan-categories/business-startup/advance-rent" },
      { label: "Shop Assets", route: "/loan-categories/business-startup/shop-assets" },
      { label: "Shop Machinery", route: "/loan-categories/business-startup/shop-machinery" }
    ],
    maxLoan: "PKR 10 Lakh",
    loanPeriod: "5 years"
  },
  {
    label: "Education Loans",
    route: "/loan-categories/education",
    subcategories: [
      { label: "University Fees", route: "/loan-categories/education/university-fees" },
      { label: "Child Fees Loan", route: "/loan-categories/education/child-fees" }
    ],
    maxLoan: "Based on requirement",
    loanPeriod: "4 years"
  }
];

function Categories() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const renderCategoryList = () => {
    return loanCategories.map((category, index) => (
      <div 
        key={index} 
        className="bg-white shadow-md rounded-lg p-4 mb-4 cursor-pointer hover:bg-gray-100"
        onClick={() => handleCategoryClick(category)}
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <BiCategory className="mr-3 text-blue-500" size={24} />
            <span className="font-semibold">{category.label}</span>
          </div>
          <IoIosArrowForward className="text-gray-400" />
        </div>
        <div className="mt-2 text-sm text-gray-600">
          <p>Max Loan: {category.maxLoan}</p>
          <p>Loan Period: {category.loanPeriod}</p>
        </div>
      </div>
    ));
  };

  const renderSubcategories = () => {
    if (!selectedCategory) return null;

    return (
      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-4">{selectedCategory.label} Subcategories</h2>
        {selectedCategory.subcategories.map((subcat, index) => (
          <Link 
            to={subcat.route} 
            key={index} 
            className="block bg-gray-100 p-3 mb-2 rounded-lg hover:bg-gray-200 transition"
          >
            <div className="flex justify-between items-center">
              <span>{subcat.label}</span>
              <IoIosArrowForward className="text-gray-400" />
            </div>
          </Link>
        ))}
        <div className="mt-4">
          <p className="font-semibold">Loan Details:</p>
          <p>Maximum Loan: {selectedCategory.maxLoan}</p>
          <p>Loan Period: {selectedCategory.loanPeriod}</p>
        </div>
        <button 
          onClick={() => setSelectedCategory(null)}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Back to Categories
        </button>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Loan Categories</h1>
      {!selectedCategory ? renderCategoryList() : renderSubcategories()}
    </div>
  );
}

export default Categories;