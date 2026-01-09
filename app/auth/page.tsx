"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Camera } from "lucide-react"
import Link from "next/link"

type UserRole = "admin" | "officer" | "conductor"

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<UserRole>("officer")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate authentication
    setTimeout(() => {
      // In production, this would be an API call
      localStorage.setItem("userRole", activeTab)
      localStorage.setItem("userEmail", email)

      // Redirect based on role
      const dashboardMap = {
        admin: "/admin",
        officer: "/officer",
        conductor: "/conductor",
      }
      window.location.href = dashboardMap[activeTab]
      setLoading(false)
    }, 1000)
  }

  const roles = [
    { value: "admin" as const, label: "System Admin", icon: "🔧" },
    { value: "officer" as const, label: "Government Officer", icon: "👮" },
    { value: "conductor" as const, label: "Bus Conductor", icon: "🚌" },
  ]

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      {/* Background gradient elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 right-1/3 w-96 h-96 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-1/4 w-96 h-96 bg-gradient-to-br from-secondary/10 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2 mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Camera className="w-6 h-6 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground">TransitGuard</h1>
          <p className="text-foreground/60">Government Transit Security System</p>
        </div>

        {/* Role Tabs */}
        <Card className="p-1 bg-muted/50 border border-border/50">
          <div className="grid grid-cols-3 gap-1">
            {roles.map((role) => (
              <button
                key={role.value}
                onClick={() => setActiveTab(role.value)}
                className={`py-2 px-3 rounded-md text-xs sm:text-sm font-medium transition-all ${
                  activeTab === role.value
                    ? "bg-white text-primary shadow-sm border border-border/50"
                    : "text-foreground/60 hover:text-foreground"
                }`}
              >
                <span className="mr-1">{role.icon}</span>
                <span className="hidden sm:inline">{role.label}</span>
                <span className="sm:hidden">{role.label.split(" ")[0]}</span>
              </button>
            ))}
          </div>
        </Card>

        {/* Login Form */}
        <Card className="p-6 border border-border/50">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-border/50"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-foreground">
                  Password
                </Label>
                <a href="#" className="text-sm text-primary hover:underline">
                  Forgot?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border-border/50"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-primary to-secondary hover:shadow-lg"
            >
              {loading ? "Signing In..." : "Sign In"}
            </Button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 pt-6 border-t border-border/50">
            <p className="text-xs text-foreground/60 mb-3 font-medium">Demo Credentials:</p>
            <div className="space-y-2 text-xs">
              {activeTab === "admin" && (
                <>
                  <p className="text-foreground/70">
                    <span className="font-semibold">Email:</span> admin@transit.gov
                  </p>
                  <p className="text-foreground/70">
                    <span className="font-semibold">Pass:</span> Demo123!
                  </p>
                </>
              )}
              {activeTab === "officer" && (
                <>
                  <p className="text-foreground/70">
                    <span className="font-semibold">Email:</span> officer@transit.gov
                  </p>
                  <p className="text-foreground/70">
                    <span className="font-semibold">Pass:</span> Demo123!
                  </p>
                </>
              )}
              {activeTab === "conductor" && (
                <>
                  <p className="text-foreground/70">
                    <span className="font-semibold">Email:</span> conductor@transit.gov
                  </p>
                  <p className="text-foreground/70">
                    <span className="font-semibold">Pass:</span> Demo123!
                  </p>
                </>
              )}
            </div>
          </div>
        </Card>

        {/* Back to Home */}
        <div className="text-center text-sm">
          <p className="text-foreground/60">
            Not authorized?{" "}
            <Link href="/" className="text-primary hover:underline">
              Go back home
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
