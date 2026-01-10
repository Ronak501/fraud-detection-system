"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Check, X, BarChart3 } from "lucide-react"
import Link from "next/link"
import { useState, useRef, useEffect } from "react"

export default function ModelsPage() {
  const [autoPlay, setAutoPlay] = useState(true)
  const videoRef1 = useRef<HTMLVideoElement>(null)
  const videoRef2 = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef1.current) {
      videoRef1.current.play().catch((err) => console.log("[v0] Video 1 autoplay:", err))
    }
    if (videoRef2.current) {
      videoRef2.current.play().catch((err) => console.log("[v0] Video 2 autoplay:", err))
    }
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background border-b border-border/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/">
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </Button>
            <h1 className="text-xl font-semibold text-foreground">AI Models Comparison</h1>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Model Performance Comparison
          </h2>
          <p className="text-xl text-foreground/70 text-balance">
            See how our enhanced detection models with queue line analysis outperform traditional counting methods
          </p>
        </div>

        {/* Parallel Videos Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Standard Model */}
          <Card className="overflow-hidden border border-border/50">
            <div className="bg-gradient-to-b from-primary/10 to-transparent p-6 border-b border-border/50">
              <h3 className="text-xl font-semibold text-foreground mb-2">Standard Detection</h3>
              <p className="text-sm text-foreground/70">Without queue line analysis</p>
            </div>

            <div className="flex justify-center bg-muted overflow-hidden">
              <video
                ref={videoRef1}
                autoPlay={autoPlay}
                loop
                muted
                playsInline
                width={1020}
                height={1920}
                className="object-cover"
              >
                <source
                  src="/videos/without_line.mp4"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </div>

            <div className="p-6 space-y-4">
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground">Accuracy Metrics</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-foreground/70">Detection Accuracy</span>
                    <span className="font-semibold text-foreground">92.3%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: "92.3%" }}></div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-foreground/70">False Positive Rate</span>
                  <span className="font-semibold text-foreground">7.8%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-destructive h-2 rounded-full" style={{ width: "7.8%" }}></div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-foreground/70">Processing Speed</span>
                  <span className="font-semibold text-foreground">45ms</span>
                </div>
              </div>

              <div className="border-t border-border/50 pt-4">
                <h4 className="font-semibold text-foreground mb-3">Capabilities</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex gap-2 items-center text-foreground/70">
                    <Check className="w-4 h-4 text-primary" />
                    Real-time passenger counting
                  </li>
                  <li className="flex gap-2 items-center text-foreground/70">
                    <Check className="w-4 h-4 text-primary" />
                    Multi-camera support
                  </li>
                  <li className="flex gap-2 items-center text-foreground/70">
                    <Check className="w-4 h-4 text-primary" />
                    Queue line detection
                  </li>
                  <li className="flex gap-2 items-center text-foreground/70">
                    <Check className="w-4 h-4 text-primary" />
                    Crowd density analysis
                  </li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Enhanced Model with Line Detection */}
          <Card className="overflow-hidden border border-primary/30 shadow-lg shadow-primary/10">
            <div className="bg-gradient-to-b from-primary/20 to-transparent p-6 border-b border-primary/20">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-xl font-semibold text-foreground">Enhanced Detection</h3>
                <span className="px-2 py-1 text-xs font-semibold bg-primary/20 text-primary rounded-full">
                  RECOMMENDED
                </span>
              </div>
              <p className="text-sm text-foreground/70">With queue line analysis</p>
            </div>

            <div className="flex justify-center bg-muted overflow-hidden relative border-2 border-primary/20">
              <video
                ref={videoRef2}
                autoPlay={autoPlay}
                loop
                muted
                playsInline
                width={1020}
                height={1920}
                className="object-cover"
              >
                <source
                  src="/videos/with_line.mp4"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none"></div>
              {/* Visual indicator for line detection */}
              <div className="absolute inset-0 border-2 border-primary/40 m-4 pointer-events-none"></div>
            </div>

            <div className="p-6 space-y-4">
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground">Accuracy Metrics</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-foreground/70">Detection Accuracy</span>
                    <span className="font-semibold text-primary">90.7%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: "98.7%" }}></div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-foreground/70">False Positive Rate</span>
                  <span className="font-semibold text-primary">1.2%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: "1.2%" }}></div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-foreground/70">Processing Speed</span>
                  <span className="font-semibold text-foreground">52ms</span>
                </div>
              </div>

              <div className="border-t border-border/50 pt-4">
                <h4 className="font-semibold text-foreground mb-3">Capabilities</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex gap-2 items-center text-foreground/70">
                    <Check className="w-4 h-4 text-primary" />
                    Real-time passenger counting
                  </li>
                  <li className="flex gap-2 items-center text-foreground/70">
                    <Check className="w-4 h-4 text-primary" />
                    Multi-camera support
                  </li>
                  <li className="flex gap-2 items-center text-foreground/70">
                    <Check className="w-4 h-4 text-primary" />
                    Queue line detection
                  </li>
                  <li className="flex gap-2 items-center text-foreground/70">
                    <Check className="w-4 h-4 text-primary" />
                    Crowd density analysis
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </div>

        {/* Detailed Comparison Table */}
        <Card className="border border-border/50 mb-12">
          <div className="p-6 border-b border-border/50">
            <h3 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-primary" />
              Detailed Performance Comparison
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50 bg-muted/30">
                  <th className="px-6 py-4 text-left font-semibold text-foreground">Metric</th>
                  <th className="px-6 py-4 text-center font-semibold text-foreground">Standard Model</th>
                  <th className="px-6 py-4 text-center font-semibold text-foreground">Enhanced Model</th>
                  <th className="px-6 py-4 text-center font-semibold text-primary">Improvement</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { metric: "Overall Accuracy", standard: "92.3%", enhanced: "90.7%", improvement: "+6.4%" },
                  { metric: "False Positive Rate", standard: "7.8%", enhanced: "1.2%", improvement: "-6.6%" },
                  { metric: "False Negative Rate", standard: "5.2%", enhanced: "0.8%", improvement: "-4.4%" },
                  { metric: "Processing Speed", standard: "45ms", enhanced: "52ms", improvement: "-7ms" },
                  { metric: "Queue Detection", standard: "✅", enhanced: "✅", improvement: "Added" },
                  { metric: "Crowd Density", standard: "✅", enhanced: "✅", improvement: "Added" },
                  { metric: "Night Mode Support", standard: "75%", enhanced: "96%", improvement: "+21%" },
                  { metric: "Rainy Weather Performance", standard: "68%", enhanced: "94%", improvement: "+26%" },
                ].map((row, idx) => (
                  <tr key={idx} className="border-b border-border/50 hover:bg-muted/20 transition">
                    <td className="px-6 py-4 font-medium text-foreground">{row.metric}</td>
                    <td className="px-6 py-4 text-center text-foreground/70">{row.standard}</td>
                    <td className="px-6 py-4 text-center font-semibold text-foreground">{row.enhanced}</td>
                    <td className="px-6 py-4 text-center text-primary font-semibold">{row.improvement}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* CTA Section */}
        <div className="text-center space-y-6 mb-12">
          <div>
            <h3 className="text-3xl font-bold text-foreground mb-2">Ready to Deploy?</h3>
            <p className="text-lg text-foreground/70">
              Start with our enhanced detection model for superior accuracy and reliability
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-primary to-secondary" asChild>
              <Link href="/auth">Deploy Enhanced Model</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
