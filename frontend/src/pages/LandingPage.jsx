import React from 'react'
import { Button } from "@/components/ui/button"
import { Link } from 'react-router-dom'
function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold tracking-tight">
          Welcome to Saylani Microfinance App
        </h1>
        <p className="text-xl text-muted-foreground max-w-md mx-auto">
        The bank provides tailored financial solutions to support individuals in various life stages and entrepreneurial pursuits, offering flexible loan options with structured repayment plans.
        </p>
        <div className="flex justify-center space-x-4">
          <Link to={'/categories'}>
              <Button> categories</Button>
              
          </Link>
        </div>  
      </div>
    </div>
  )
}

export default LandingPage