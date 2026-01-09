"use client"

import type React from "react"
import { Suspense } from "react"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, AlertCircle, CheckCircle2, AlertTriangle, Eye, Bus, Users, MapPin, AlertCircle as AlertIcon } from "lucide-react"
import Link from "next/link"

interface Conductor {
  id: string
  name: string
  busRoute: string
  busNumber: string
  passengerCount: number
  ticketCount: number
  mismatch: string
  trustScore: number
  status: "green" | "amber" | "red"
}

function OfficerDashboardContent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCity, setSelectedCity] = useState("all")
  const [timeRange, setTimeRange] = useState("1h")

  const conductors: Conductor[] = [
    {
      id: "COND-2847",
      name: "Rajesh Kumar",
      busRoute: "Route 42",
      busNumber: "TG-2847",
      passengerCount: 47,
      ticketCount: 45,
      mismatch: "4.3%",
      trustScore: 96,
      status: "green",
    },
    {
      id: "COND-2856",
      name: "Priya Sharma",
      busRoute: "Route 15",
      busNumber: "TG-2856",
      passengerCount: 52,
      ticketCount: 48,
      mismatch: "7.7%",
      trustScore: 89,
      status: "amber",
    },
    {
      id: "COND-2891",
      name: "Amit Patel",
      busRoute: "Route 28",
      busNumber: "TG-2891",
      passengerCount: 58,
      ticketCount: 48,
      mismatch: "17.2%",
      trustScore: 62,
      status: "red",
    },
    {
      id: "COND-2834",
      name: "Vikram Singh",
      busRoute: "Route 42",
      busNumber: "TG-2834",
      passengerCount: 45,
      ticketCount: 44,
      mismatch: "2.2%",
      trustScore: 98,
      status: "green",
    },
    {
      id: "COND-2875",
      name: "Neha Desai",
      busRoute: "Route 8",
      busNumber: "TG-2875",
      passengerCount: 51,
      ticketCount: 49,
      mismatch: "3.9%",
      trustScore: 94,
      status: "green",
    },
    {
      id: "COND-2902",
      name: "Rohan Gupta",
      busRoute: "Route 22",
      busNumber: "TG-2902",
      passengerCount: 54,
      ticketCount: 45,
      mismatch: "16.7%",
      trustScore: 68,
      status: "red",
    },
  ]

  const kpis = [
    { label: "Active Buses", value: "847", icon: Bus },
    { label: "Conductors on Duty", value: "847", icon: Users },
    { label: "Trips Monitored", value: "12,547", icon: MapPin },
    { label: "Alerts Detected", value: "23", icon: AlertIcon },
  ]

  const filteredConductors = conductors.filter((c) => c.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const getStatusColor = (status: "green" | "amber" | "red") => {
    switch (status) {
      case "green":
        return "bg-green-500 text-white"
      case "amber":
        return "bg-yellow-500 text-white"
      case "red":
        return "bg-red-500 text-white"
    }
  }

  const getStatusIcon = (status: "green" | "amber" | "red") => {
    switch (status) {
      case "green":
        return <CheckCircle2 className="w-4 h-4" />
      case "amber":
        return <AlertTriangle className="w-4 h-4" />
      case "red":
        return <AlertCircle className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <span className="text-white text-xs font-bold">TG</span>
            </div>
            <span className="font-semibold text-lg text-foreground">TransitGuard</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-foreground/70">Government Officer Portal</span>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/auth">Sign Out</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Sidebar Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav className="flex flex-wrap gap-2 mb-8 pb-6 border-b border-border">
          {[
            { label: "Dashboard", active: true },
            { label: "Conductors" },
            { label: "Routes & Buses" },
            { label: "Analytics" },
            { label: "Reports" },
            { label: "Audit Logs" },
            { label: "Settings" },
          ].map((item) => (
            <button
              key={item.label}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                item.active ? "bg-primary text-white" : "text-foreground/70 hover:text-foreground hover:bg-muted"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {kpis.map((kpi, idx) => (
            <Card key={idx} className="p-6 border border-border/50">
              <kpi.icon className="w-6 h-6 mb-2 text-primary" />
              <p className="text-sm text-foreground/60 mb-1">{kpi.label}</p>
              <p className="text-3xl font-bold text-foreground">{kpi.value}</p>
            </Card>
          ))}
        </div>

        {/* Filter Section */}
        <Card className="p-4 border border-border/50 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
              <Input
                placeholder="Search conductor name..."
                value={searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                className="pl-10 border-border/50"
              />
            </div>

            {/* City Filter */}
            <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger className="border-border/50">
                <SelectValue placeholder="Select city" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cities</SelectItem>
                <SelectItem value="delhi">Delhi</SelectItem>
                <SelectItem value="mumbai">Mumbai</SelectItem>
                <SelectItem value="bangalore">Bangalore</SelectItem>
              </SelectContent>
            </Select>

            {/* Time Range */}
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="border-border/50">
                <SelectValue placeholder="Time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1h">Last 1 hour</SelectItem>
                <SelectItem value="3h">Last 3 hours</SelectItem>
                <SelectItem value="5h">Last 5 hours</SelectItem>
                <SelectItem value="custom">Custom range</SelectItem>
              </SelectContent>
            </Select>

            {/* Export Button */}
            <Button variant="outline" className="border-border/50 bg-transparent">
              Export Report
            </Button>
          </div>
        </Card>

        {/* Conductor List Table */}
        <Card className="border border-border/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50 border-b border-border/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-foreground/70 uppercase">Conductor</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-foreground/70 uppercase">Route</th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-foreground/70 uppercase">
                    Passengers
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-foreground/70 uppercase">Tickets</th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-foreground/70 uppercase">
                    Mismatch %
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-foreground/70 uppercase">
                    Trust Score
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-foreground/70 uppercase">Status</th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-foreground/70 uppercase">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredConductors.map((conductor) => (
                  <tr key={conductor.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-foreground">{conductor.name}</p>
                        <p className="text-xs text-foreground/60">{conductor.id}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-foreground">
                      {conductor.busRoute}
                      <br />
                      <span className="text-xs text-foreground/60">{conductor.busNumber}</span>
                    </td>
                    <td className="px-6 py-4 text-center font-semibold text-foreground">{conductor.passengerCount}</td>
                    <td className="px-6 py-4 text-center font-semibold text-foreground">{conductor.ticketCount}</td>
                    <td
                      className={`px-6 py-4 text-center font-semibold ${
                        conductor.status === "red"
                          ? "text-red-600"
                          : conductor.status === "amber"
                            ? "text-yellow-600"
                            : "text-green-600"
                      }`}
                    >
                      {conductor.mismatch}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white font-semibold text-sm">
                          {conductor.trustScore}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Badge className={getStatusColor(conductor.status)}>
                        {getStatusIcon(conductor.status)}
                        <span className="ml-1">
                          {conductor.status === "green"
                            ? "Compliant"
                            : conductor.status === "amber"
                              ? "Review"
                              : "Alert"}
                        </span>
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/officer/conductor/${conductor.id}`}>
                          <Eye className="w-4 h-4" />
                        </Link>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <Card className="p-6 border border-border/50">
            <p className="text-sm text-foreground/60 mb-2">Compliant Conductors</p>
            <p className="text-3xl font-bold text-green-600">834</p>
            <p className="text-xs text-foreground/50 mt-2">98.5% of fleet</p>
          </Card>

          <Card className="p-6 border border-border/50">
            <p className="text-sm text-foreground/60 mb-2">Under Review</p>
            <p className="text-3xl font-bold text-yellow-600">10</p>
            <p className="text-xs text-foreground/50 mt-2">Monitoring closely</p>
          </Card>

          <Card className="p-6 border border-border/50">
            <p className="text-sm text-foreground/60 mb-2">Alert Status</p>
            <p className="text-3xl font-bold text-red-600">3</p>
            <p className="text-xs text-foreground/50 mt-2">Requires investigation</p>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default function OfficerDashboardPage() {
  return (
    <Suspense fallback={null}>
      <OfficerDashboardContent />
    </Suspense>
  )
}
