"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { ArrowLeft, Download, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function ConductorReportPage({ params }: { params: { id: string } }) {
  const [selectedTab, setSelectedTab] = useState("overview")

  const conductorInfo = {
    id: "COND-2847",
    name: "Rajesh Kumar",
    employeeNumber: "EMP-00847",
    busRoute: "Route 42 Express",
    busNumber: "TG-2847",
    depot: "Central Transit Hub",
    trustScore: 96,
    status: "green" as const,
  }

  // Line chart data - Passenger vs Ticket over time
  const passengerVsTicketData = [
    { time: "6:00 AM", passengers: 28, tickets: 27 },
    { time: "7:00 AM", passengers: 45, tickets: 43 },
    { time: "8:00 AM", passengers: 52, tickets: 51 },
    { time: "9:00 AM", passengers: 38, tickets: 38 },
    { time: "10:00 AM", passengers: 35, tickets: 34 },
    { time: "11:00 AM", passengers: 42, tickets: 41 },
    { time: "12:00 PM", passengers: 47, tickets: 46 },
  ]

  // Bar chart data - Stop-wise mismatch
  const stopWiseMismatchData = [
    { stop: "Central Hub", mismatch: 1 },
    { stop: "Station 1", mismatch: 2 },
    { stop: "Station 2", mismatch: 0 },
    { stop: "Station 3", mismatch: 2 },
    { stop: "Station 4", mismatch: 1 },
    { stop: "Station 5", mismatch: 0 },
    { stop: "End Point", mismatch: 1 },
  ]

  // Line chart data - Trust score over time
  const trustScoreTrendData = [
    { date: "Jan 3", score: 94 },
    { date: "Jan 4", score: 92 },
    { date: "Jan 5", score: 95 },
    { date: "Jan 6", score: 96 },
    { date: "Jan 7", score: 97 },
    { date: "Jan 8", score: 96 },
    { date: "Jan 9", score: 96 },
  ]

  // Line chart data - Fraud trend
  const fraudTrendData = [
    { period: "Week 1", fraudRate: 2.3 },
    { period: "Week 2", fraudRate: 1.8 },
    { period: "Week 3", fraudRate: 2.1 },
    { period: "Week 4", fraudRate: 1.5 },
    { period: "Week 5", fraudRate: 1.2 },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/officer">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
            <div className="hidden sm:flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <span className="text-white text-xs font-bold">TG</span>
              </div>
              <span className="font-semibold text-lg text-foreground">TransitGuard</span>
            </div>
          </div>

          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <Download className="w-4 h-4" />
            Export Report
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Conductor Info Header */}
        <Card className="p-6 border border-border/50">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">{conductorInfo.name}</h1>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm mt-4">
                <div>
                  <p className="text-foreground/60">Conductor ID</p>
                  <p className="font-semibold text-foreground">{conductorInfo.id}</p>
                </div>
                <div>
                  <p className="text-foreground/60">Bus Route</p>
                  <p className="font-semibold text-foreground">{conductorInfo.busRoute}</p>
                </div>
                <div>
                  <p className="text-foreground/60">Bus Number</p>
                  <p className="font-semibold text-foreground">{conductorInfo.busNumber}</p>
                </div>
                <div>
                  <p className="text-foreground/60">Depot</p>
                  <p className="font-semibold text-foreground">{conductorInfo.depot}</p>
                </div>
              </div>
            </div>

            <div className="text-center bg-gradient-to-br from-primary/10 to-secondary/10 p-6 rounded-lg border border-primary/20">
              <p className="text-sm text-foreground/60 mb-2">Trust Score</p>
              <div className="text-5xl font-bold text-primary mb-2">{conductorInfo.trustScore}</div>
              <Badge className="bg-green-500 text-white">Compliant</Badge>
            </div>
          </div>
        </Card>

        {/* Tabs for Different Views */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="analytics">Visual Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-6 border border-border/50">
                <p className="text-sm text-foreground/60 mb-2">Total Trips Today</p>
                <p className="text-4xl font-bold text-foreground">8</p>
                <p className="text-xs text-foreground/50 mt-2">All completed</p>
              </Card>

              <Card className="p-6 border border-border/50">
                <p className="text-sm text-foreground/60 mb-2">Avg Mismatch Rate</p>
                <p className="text-4xl font-bold text-green-600">1.9%</p>
                <p className="text-xs text-foreground/50 mt-2">Below threshold</p>
              </Card>

              <Card className="p-6 border border-border/50">
                <p className="text-sm text-foreground/60 mb-2">Alerts Today</p>
                <p className="text-4xl font-bold text-foreground">0</p>
                <p className="text-xs text-foreground/50 mt-2">Clean record</p>
              </Card>
            </div>

            <Card className="p-6 border border-border/50">
              <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {[
                  { time: "12:30 PM", action: "Trip #8 completed", status: "success" },
                  { time: "11:45 AM", action: "Trip #7 completed", status: "success" },
                  { time: "10:20 AM", action: "Trip #6 completed - Mismatch detected: 1 passenger", status: "warning" },
                  { time: "09:15 AM", action: "Trip #5 completed", status: "success" },
                ].map((activity, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between py-3 border-b border-border/50 last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          activity.status === "success" ? "bg-green-500" : "bg-yellow-500"
                        }`}
                      ></div>
                      <div>
                        <p className="font-medium text-foreground">{activity.action}</p>
                        <p className="text-xs text-foreground/60">{activity.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Timeline Tab */}
          <TabsContent value="timeline" className="space-y-6">
            <Card className="p-6 border border-border/50">
              <h3 className="text-lg font-semibold text-foreground mb-6">Daily Trip Timeline</h3>
              <div className="space-y-4">
                {passengerVsTicketData.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div>
                      <p className="font-semibold text-foreground">{item.time}</p>
                      <p className="text-sm text-foreground/60">
                        Passengers: {item.passengers} | Tickets: {item.tickets}
                      </p>
                    </div>
                    <div
                      className={`text-right ${
                        item.passengers === item.tickets
                          ? "text-green-600"
                          : item.passengers - item.tickets <= 1
                            ? "text-yellow-600"
                            : "text-red-600"
                      }`}
                    >
                      <p className="font-semibold">{Math.abs(item.passengers - item.tickets)} mismatch</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Visual Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            {/* Passenger vs Ticket Line Chart */}
            <Card className="p-6 border border-border/50">
              <h3 className="text-lg font-semibold text-foreground mb-4">Passenger vs Ticket Count</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={passengerVsTicketData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid var(--color-border)",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="passengers" stroke="#4f46e5" name="Passengers" strokeWidth={2} />
                  <Line type="monotone" dataKey="tickets" stroke="#06b6d4" name="Tickets" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            {/* Stop-wise Mismatch Bar Chart */}
            <Card className="p-6 border border-border/50">
              <h3 className="text-lg font-semibold text-foreground mb-4">Stop-wise Mismatch Count</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={stopWiseMismatchData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="stop" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid var(--color-border)",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="mismatch" fill="#a51a4a" name="Mismatches" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            {/* Trust Score Trend */}
            <Card className="p-6 border border-border/50">
              <h3 className="text-lg font-semibold text-foreground mb-4">Trust Score Trend</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={trustScoreTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[85, 100]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid var(--color-border)",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="score" stroke="#22c55e" name="Trust Score" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            {/* Fraud Trend */}
            <Card className="p-6 border border-border/50">
              <h3 className="text-lg font-semibold text-foreground mb-4">Weekly Fraud Rate Trend</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={fraudTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="period" />
                  <YAxis />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid var(--color-border)",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="fraudRate" stroke="#ef4444" name="Fraud Rate %" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <Card className="p-6 border border-border/50">
              <h3 className="text-lg font-semibold text-foreground mb-4">Available Reports</h3>
              <div className="space-y-3">
                {[
                  { title: "Daily Summary Report", date: "Jan 9, 2025", type: "PDF" },
                  { title: "Weekly Performance Report", date: "Jan 3-9, 2025", type: "PDF" },
                  { title: "Monthly Analytics Report", date: "January 2025", type: "PDF" },
                  { title: "Fraud Detection Log", date: "Jan 9, 2025", type: "CSV" },
                ].map((report, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div>
                      <p className="font-semibold text-foreground">{report.title}</p>
                      <p className="text-xs text-foreground/60">{report.date}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-white">
                        {report.type}
                      </Badge>
                      <Button size="sm" variant="ghost">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6 border border-border/50 bg-blue-50/50 border-blue-200">
              <div className="flex gap-4">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-blue-900 mb-1">Report Audit Trail</h4>
                  <p className="text-sm text-blue-800">
                    All reports are automatically logged with timestamps and user information for compliance and
                    governance purposes.
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
