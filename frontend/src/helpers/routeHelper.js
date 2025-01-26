export const loanCategories = [
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