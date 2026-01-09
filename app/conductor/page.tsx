"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Clock, AlertCircle, CheckCircle2, MapPin, LogOut } from "lucide-react"
import Link from "next/link"

export default function ConductorDashboard() {
  const conductorData = {
    name: "Rajesh Kumar",
    id: "COND-2847",
    employeeNumber: "EMP-00847",
    bus: "Route 42 Express",
    busNumber: "TG-2847",
    depot: "Central Transit Hub",
    avatar: "RK",
  }

  const shifts = [
    {
      date: "Today, Jan 9",
      status: "active",
      startTime: "06:00 AM",
      endTime: "02:00 PM",
      tripsCompleted: 6,
      tripsTotal: 8,
    },
    {
      date: "Tomorrow, Jan 10",
      status: "scheduled",
      startTime: "06:00 AM",
      endTime: "02:00 PM",
      tripsCompleted: 0,
      tripsTotal: 8,
    },
  ]

  const notices = [
    {
      id: 1,
      title: "System Maintenance Scheduled",
      message: "The fraud detection system will undergo maintenance on Jan 15, 2:00 AM - 4:00 AM.",
      type: "info",
      date: "2 days ago",
    },
    {
      id: 2,
      title: "Performance Recognition",
      message: "Excellent work on Route 42. Your compliance score is 98%.",
      type: "success",
      date: "1 day ago",
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
            <span className="text-sm text-foreground/70">Conductor Portal</span>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/auth">
                <LogOut className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Profile Card */}
        <Card className="p-6 border border-border/50">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <Avatar className="w-16 h-16 bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-xl font-bold">
              <AvatarFallback>{conductorData.avatar}</AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-3">
              <div>
                <h1 className="text-3xl font-bold text-foreground">{conductorData.name}</h1>
                <p className="text-foreground/60">Conductor ID: {conductorData.id}</p>
                <p className="text-sm text-foreground/50">Employee: {conductorData.employeeNumber}</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-foreground/50 uppercase tracking-wide mb-1">Bus Route</p>
                  <p className="font-semibold text-foreground">{conductorData.bus}</p>
                  <p className="text-xs text-foreground/60">{conductorData.busNumber}</p>
                </div>
                <div>
                  <p className="text-xs text-foreground/50 uppercase tracking-wide mb-1">Depot</p>
                  <p className="font-semibold text-foreground">{conductorData.depot}</p>
                </div>
                <div>
                  <p className="text-xs text-foreground/50 uppercase tracking-wide mb-1">Status</p>
                  <Badge className="bg-green-500 text-white">On Duty</Badge>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Shift Status */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Shift Schedule</h2>

          <div className="grid md:grid-cols-2 gap-4">
            {shifts.map((shift, idx) => (
              <Card key={idx} className="p-6 border border-border/50">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-lg text-foreground">{shift.date}</h3>
                    <p className="text-sm text-foreground/60">
                      {shift.startTime} - {shift.endTime}
                    </p>
                  </div>
                  <Badge className={shift.status === "active" ? "bg-blue-500 text-white" : "bg-muted text-foreground"}>
                    {shift.status === "active" ? "Active Now" : "Scheduled"}
                  </Badge>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="text-foreground">
                    {shift.tripsCompleted} of {shift.tripsTotal} trips completed
                  </span>
                </div>

                {shift.status === "active" && (
                  <div className="mt-4 pt-4 border-t border-border/50">
                    <div className="flex items-center gap-2 text-sm text-green-600">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>System operating normally</span>
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>

        {/* Trip Status */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Today's Trips</h2>

          <div className="space-y-3">
            {[1, 2, 3, 4, 5, 6].map((trip) => (
              <Card key={trip} className="p-4 border border-border/50 hover:border-primary/30 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="text-center">
                      <p className="text-xs text-foreground/60 mb-1">Trip</p>
                      <p className="text-lg font-bold text-foreground">{trip}</p>
                    </div>

                    <div className="flex-1">
                      <p className="font-semibold text-foreground">
                        {trip < 6 ? "Completed" : "In Progress"} - 6:00 AM Route
                      </p>
                      <div className="flex items-center gap-2 text-sm text-foreground/60 mt-1">
                        <MapPin className="w-3 h-3" />
                        <span>Central Hub → Station {trip * 2}</span>
                      </div>
                    </div>
                  </div>

                  {trip < 6 ? (
                    <Badge className="bg-green-500 text-white">Completed</Badge>
                  ) : (
                    <Badge className="bg-blue-500 text-white">Active</Badge>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Notices from Authority */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Notices from Authority</h2>

          <div className="space-y-3">
            {notices.map((notice) => (
              <Card
                key={notice.id}
                className={`p-4 border ${
                  notice.type === "info"
                    ? "border-blue-200 bg-blue-50/50"
                    : notice.type === "success"
                      ? "border-green-200 bg-green-50/50"
                      : "border-yellow-200 bg-yellow-50/50"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    {notice.type === "info" && <AlertCircle className="w-5 h-5 text-blue-600" />}
                    {notice.type === "success" && <CheckCircle2 className="w-5 h-5 text-green-600" />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground">{notice.title}</h3>
                    <p className="text-sm text-foreground/70 mt-1">{notice.message}</p>
                    <p className="text-xs text-foreground/50 mt-2">{notice.date}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <Card className="p-6 bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/20">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold text-lg text-foreground mb-2">Need Support?</h3>
              <p className="text-sm text-foreground/70">
                Contact your depot manager or the support team for assistance.
              </p>
            </div>
            <Button asChild variant="outline">
              <a href="mailto:support@transit.gov">Contact Support</a>
            </Button>
          </div>
        </Card>
      </main>
    </div>
  )
}
