"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Settings, Users } from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
  const [fraudThreshold, setFraudThreshold] = useState(15)
  const [peakHourTolerance, setPeakHourTolerance] = useState(5)
  const [timeWindow, setTimeWindow] = useState(30)

  // System health metrics
  const systemMetrics = {
    cameraUptime: 99.7,
    aiAccuracy: 98.3,
    detectionFPS: 28.4,
    confidenceScore: 96.2,
  }

  // Model accuracy data
  const modelAccuracyData = [
    { time: "00:00", accuracy: 97.5, confidence: 95.2 },
    { time: "04:00", accuracy: 98.1, confidence: 96.1 },
    { time: "08:00", accuracy: 98.4, confidence: 96.8 },
    { time: "12:00", accuracy: 97.8, confidence: 96.0 },
    { time: "16:00", accuracy: 98.3, confidence: 96.5 },
    { time: "20:00", accuracy: 98.0, confidence: 95.9 },
  ]

  // False positive/negative trends
  const trendData = [
    { day: "Jan 3", falsePositive: 12, falseNegative: 3 },
    { day: "Jan 4", falsePositive: 10, falseNegative: 2 },
    { day: "Jan 5", falsePositive: 14, falseNegative: 4 },
    { day: "Jan 6", falsePositive: 8, falseNegative: 2 },
    { day: "Jan 7", falsePositive: 9, falseNegative: 1 },
    { day: "Jan 8", falsePositive: 11, falseNegative: 2 },
    { day: "Jan 9", falsePositive: 7, falseNegative: 1 },
  ]

  const officers = [
    {
      id: 1,
      name: "Priya Verma",
      email: "priya.verma@transit.gov",
      region: "North Delhi",
      role: "Region Manager",
      status: "active",
      lastLogin: "Today, 10:32 AM",
    },
    {
      id: 2,
      name: "Amit Singh",
      email: "amit.singh@transit.gov",
      region: "South Mumbai",
      role: "Operations Officer",
      status: "active",
      lastLogin: "Today, 9:15 AM",
    },
    {
      id: 3,
      name: "Neha Patel",
      email: "neha.patel@transit.gov",
      region: "Central Bangalore",
      role: "Compliance Officer",
      status: "inactive",
      lastLogin: "Jan 8, 3:42 PM",
    },
  ]

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
            <span className="text-sm text-foreground/70">System Administration</span>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/auth">Sign Out</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* System Health Overview */}
        <div className="space-y-4 mb-8">
          <h2 className="text-2xl font-bold text-foreground">System Health</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Camera Uptime", value: `${systemMetrics.cameraUptime}%`, icon: "📹", color: "green" },
              { label: "AI Accuracy", value: `${systemMetrics.aiAccuracy}%`, icon: "🤖", color: "blue" },
              { label: "Detection FPS", value: systemMetrics.detectionFPS.toFixed(1), icon: "⚡", color: "purple" },
              {
                label: "Confidence Score",
                value: `${systemMetrics.confidenceScore}%`,
                icon: "✓",
                color: "green",
              },
            ].map((metric, idx) => (
              <Card key={idx} className="p-6 border border-border/50">
                <div className="text-3xl mb-2">{metric.icon}</div>
                <p className="text-sm text-foreground/60 mb-1">{metric.label}</p>
                <p className="text-3xl font-bold text-foreground">{metric.value}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Tabs for Admin Controls */}
        <Tabs defaultValue="configuration" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="configuration">Configuration</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="audit">Audit Logs</TabsTrigger>
          </TabsList>

          {/* Configuration Tab */}
          <TabsContent value="configuration" className="space-y-6">
            <Card className="p-6 border border-border/50">
              <h3 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
                <Settings className="w-5 h-5" />
                System Configuration
              </h3>

              <div className="space-y-8">
                {/* Fraud Threshold */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="font-semibold text-foreground">Fraud Detection Threshold</Label>
                    <Badge className="bg-primary text-white">{fraudThreshold}%</Badge>
                  </div>
                  <p className="text-sm text-foreground/60">Alerts triggered when mismatch exceeds this percentage</p>
                  <Slider
                    value={[fraudThreshold]}
                    onValueChange={(val) => setFraudThreshold(val[0])}
                    max={30}
                    step={1}
                  />
                  <div className="flex justify-between text-xs text-foreground/50">
                    <span>5%</span>
                    <span>30%</span>
                  </div>
                </div>

                {/* Time Window */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="font-semibold text-foreground">Analysis Time Window</Label>
                    <Badge className="bg-secondary text-white">{timeWindow} min</Badge>
                  </div>
                  <p className="text-sm text-foreground/60">Rolling window for comparing passenger and ticket counts</p>
                  <Slider
                    value={[timeWindow]}
                    onValueChange={(val) => setTimeWindow(val[0])}
                    min={10}
                    max={60}
                    step={5}
                  />
                  <div className="flex justify-between text-xs text-foreground/50">
                    <span>10 min</span>
                    <span>60 min</span>
                  </div>
                </div>

                {/* Peak Hour Tolerance */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="font-semibold text-foreground">Peak Hour Tolerance</Label>
                    <Badge className="bg-accent text-white">{peakHourTolerance}%</Badge>
                  </div>
                  <p className="text-sm text-foreground/60">
                    Additional tolerance for mismatches during peak hours (7-9 AM, 6-8 PM)
                  </p>
                  <Slider
                    value={[peakHourTolerance]}
                    onValueChange={(val) => setPeakHourTolerance(val[0])}
                    max={10}
                    step={0.5}
                  />
                  <div className="flex justify-between text-xs text-foreground/50">
                    <span>0%</span>
                    <span>10%</span>
                  </div>
                </div>

                {/* Route-Specific Rules */}
                <div className="border-t border-border/50 pt-6">
                  <h4 className="font-semibold text-foreground mb-4">Route-Specific Rules</h4>
                  <div className="space-y-3">
                    {[
                      { route: "Route 42 Express", threshold: "12%" },
                      { route: "Route 15", threshold: "14%" },
                      { route: "Route 28", threshold: "16%" },
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <p className="font-medium text-foreground">{item.route}</p>
                        <Badge variant="outline" className="bg-white">
                          {item.threshold}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-primary to-secondary">Save Configuration</Button>
              </div>
            </Card>
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-6">
            {/* AI Model Accuracy */}
            <Card className="p-6 border border-border/50">
              <h3 className="text-lg font-semibold text-foreground mb-4">AI Model Accuracy</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={modelAccuracyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="time" />
                  <YAxis domain={[95, 100]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid var(--color-border)",
                      borderRadius: "8px",
                    }}
                  />
                  <Line type="monotone" dataKey="accuracy" stroke="#4f46e5" name="Accuracy %" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            {/* False Positive/Negative Trends */}
            <Card className="p-6 border border-border/50">
              <h3 className="text-lg font-semibold text-foreground mb-4">False Positive/Negative Trends</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={trendData}>
                  <defs>
                    <linearGradient id="colorFalsePositive" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorFalseNegative" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid var(--color-border)",
                      borderRadius: "8px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="falsePositive"
                    stroke="#ef4444"
                    fillOpacity={1}
                    fill="url(#colorFalsePositive)"
                    name="False Positives"
                  />
                  <Area
                    type="monotone"
                    dataKey="falseNegative"
                    stroke="#f59e0b"
                    fillOpacity={1}
                    fill="url(#colorFalseNegative)"
                    name="False Negatives"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Card>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-6 border border-border/50">
                <p className="text-sm text-foreground/60 mb-2">Avg False Positive Rate</p>
                <p className="text-3xl font-bold text-red-600">9.7%</p>
                <p className="text-xs text-foreground/50 mt-2">7-day average</p>
              </Card>

              <Card className="p-6 border border-border/50">
                <p className="text-sm text-foreground/60 mb-2">Avg False Negative Rate</p>
                <p className="text-3xl font-bold text-yellow-600">2.1%</p>
                <p className="text-xs text-foreground/50 mt-2">7-day average</p>
              </Card>

              <Card className="p-6 border border-border/50">
                <p className="text-sm text-foreground/60 mb-2">Model F1 Score</p>
                <p className="text-3xl font-bold text-green-600">0.96</p>
                <p className="text-xs text-foreground/50 mt-2">Excellent balance</p>
              </Card>
            </div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <Card className="p-6 border border-border/50">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Government Officers
                </h3>
                <Button size="sm" asChild>
                  <Link href="#">Add Officer</Link>
                </Button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50 border-b border-border/50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/70 uppercase">Name</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/70 uppercase">Email</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/70 uppercase">Region</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/70 uppercase">Role</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/70 uppercase">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/70 uppercase">
                        Last Login
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/70 uppercase">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {officers.map((officer) => (
                      <tr key={officer.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                        <td className="px-4 py-3 font-semibold text-foreground">{officer.name}</td>
                        <td className="px-4 py-3 text-sm text-foreground/70">{officer.email}</td>
                        <td className="px-4 py-3 text-sm text-foreground">{officer.region}</td>
                        <td className="px-4 py-3 text-sm text-foreground/70">{officer.role}</td>
                        <td className="px-4 py-3">
                          <Badge
                            className={
                              officer.status === "active" ? "bg-green-500 text-white" : "bg-gray-400 text-white"
                            }
                          >
                            {officer.status === "active" ? "Active" : "Inactive"}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 text-sm text-foreground/60">{officer.lastLogin}</td>
                        <td className="px-4 py-3">
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>

          {/* Audit Logs Tab */}
          <TabsContent value="audit" className="space-y-6">
            <Card className="p-6 border border-border/50">
              <h3 className="text-lg font-semibold text-foreground mb-4">Admin Action Audit Log</h3>

              <div className="space-y-3">
                {[
                  {
                    action: "Configuration Updated",
                    user: "System Admin",
                    time: "Today, 2:34 PM",
                    details: "Fraud threshold changed from 12% to 15%",
                  },
                  {
                    action: "User Access Granted",
                    user: "System Admin",
                    time: "Today, 1:15 PM",
                    details: "Officer Neha Patel granted access to Central Bangalore region",
                  },
                  {
                    action: "Model Update Deployed",
                    user: "System Admin",
                    time: "Jan 8, 4:20 PM",
                    details: "AI model v2.3.1 deployed across all buses",
                  },
                  {
                    action: "Configuration Rolled Back",
                    user: "System Admin",
                    time: "Jan 8, 3:45 PM",
                    details: "Peak hour tolerance reverted to 5%",
                  },
                  {
                    action: "User Access Revoked",
                    user: "System Admin",
                    time: "Jan 7, 10:22 AM",
                    details: "Officer Rajesh Singh access removed",
                  },
                ].map((log, idx) => (
                  <div key={idx} className="border border-border/50 rounded-lg p-4 hover:bg-muted/20 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-foreground">{log.action}</h4>
                      <span className="text-xs text-foreground/60">{log.time}</span>
                    </div>
                    <p className="text-sm text-foreground/70 mb-2">{log.details}</p>
                    <p className="text-xs text-foreground/50">By {log.user}</p>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
