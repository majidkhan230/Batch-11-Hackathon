import React from 'react'
import { Button } from "@/components/ui/button"
import { Link } from 'react-router-dom'
function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold tracking-tight">
          Welcome to Your Application
        </h1>
        <p className="text-xl text-muted-foreground max-w-md mx-auto">
          Discover amazing features and start your journey with us.
        </p>
        <div className="flex justify-center space-x-4">
          <Link to="/sign-in">
            <Button>Sign In</Button>
          </Link>
          <Button variant="outline">Learn More</Button>
        </div>
      </div>
    </div>
  )
}

export default LandingPage