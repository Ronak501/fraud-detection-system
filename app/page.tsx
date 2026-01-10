import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, Camera, BarChart3, Shield, Lock, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-border/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Camera className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-lg text-foreground">TransitGuard</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-foreground/70 hover:text-foreground transition">
              Features
            </a>
            <a href="#how-it-works" className="text-sm text-foreground/70 hover:text-foreground transition">
              How It Works
            </a>
            <a href="#trust" className="text-sm text-foreground/70 hover:text-foreground transition">
              Trust
            </a>
            <a href="/models" className="text-sm text-foreground/70 hover:text-foreground transition">
              Models
            </a>
            <a href="/analytics" className="text-sm text-foreground/70 hover:text-foreground transition">
              Analytics
            </a>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link href="/auth">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/auth">Get Started</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        {/* Gradient Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute top-32 right-1/4 w-96 h-96 bg-gradient-to-br from-secondary/20 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-gradient-to-br from-accent/20 to-transparent rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="inline-block">
                <div className="px-4 py-2 rounded-full bg-secondary/10 border border-secondary/30 text-sm font-medium text-secondary">
                  Trusted by Government Transit Systems
                </div>
              </div>

              <div>
                <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight mb-6 text-balance">
                  AI-Driven Transparency for Government City Transport
                </h1>
                <p className="text-xl text-foreground/70 leading-relaxed text-balance">
                  Detect ticket fraud in real time using privacy-first computer vision and analytics. Secure,
                  government-compliant, and deployed by leading transit authorities.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild className="bg-gradient-to-r from-primary to-secondary">
                  <Link href="/auth">
                    Government Login
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="#features">Explore System</Link>
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-6 pt-8">
                <div className="text-sm">
                  <div className="font-semibold text-foreground">100%</div>
                  <div className="text-foreground/60">Uptime SLA</div>
                </div>
                <div className="text-sm">
                  <div className="font-semibold text-foreground">50M+</div>
                  <div className="text-foreground/60">Transactions/Day</div>
                </div>
                <div className="text-sm">
                  <div className="font-semibold text-foreground">24/7</div>
                  <div className="text-foreground/60">Support</div>
                </div>
              </div>
            </div>

            {/* Right Visual */}
            <div className="relative h-96 md:h-full min-h-[400px]">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl border border-primary/20 flex items-center justify-center overflow-hidden">
                <div className="relative w-full h-full">
                  {/* Animated Elements */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-48 h-48 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 blur-2xl animate-pulse"></div>
                  </div>

                  <div className="relative z-10 p-8 flex flex-col items-center justify-center h-full gap-6">
                    <Camera className="w-20 h-20 text-primary" />
                    <div className="text-center space-y-2">
                      <div className="text-sm font-semibold text-primary">Real-Time Detection</div>
                      <div className="text-2xl font-bold text-foreground">~90%</div>
                      <div className="text-sm text-foreground/60">Fraud Detection Accuracy</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 md:py-32 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
              Enterprise-Grade Capabilities
            </h2>
            <p className="text-xl text-foreground/70 text-balance">
              Purpose-built for government transit systems with security and compliance at its core.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: Camera,
                title: "Real-Time Passenger Detection",
                description: "AI-powered computer vision counts passengers as they board, with zero privacy concerns.",
              },
              {
                icon: AlertCircle,
                title: "Automated Fraud Identification",
                description: "Instantly identifies ticket count mismatches and flags suspicious patterns.",
              },
              {
                icon: Shield,
                title: "Secure Role-Based Access",
                description: "Granular permissions ensure each role only sees authorized data.",
              },
              {
                icon: BarChart3,
                title: "Audit-Ready Government Reports",
                description: "Compliant reporting with full audit trails and data governance.",
              },
              {
                icon: Lock,
                title: "Privacy-First AI",
                description: "No face recognition. Only passenger counting and ticket analysis.",
              },
              {
                icon: Camera,
                title: "Multi-Camera Support",
                description: "Scalable to thousands of buses with distributed edge processing.",
              },
            ].map((feature, idx) => (
              <Card
                key={idx}
                className="p-6 border border-border/50 hover:border-primary/30 transition-all hover:shadow-lg hover:shadow-primary/5"
              >
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <feature.icon className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-foreground mb-2">{feature.title}</h3>
                    <p className="text-foreground/70">{feature.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
              Intelligent Detection Pipeline
            </h2>
            <p className="text-xl text-foreground/70 text-balance">
              A four-step process designed for accuracy and transparency.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Camera Counts",
                description: "Bus entrance camera counts passengers in real time using edge AI.",
              },
              {
                step: "02",
                title: "Ticket Data Collected",
                description: "Official ticketing system reports sold and validated tickets.",
              },
              {
                step: "03",
                title: "AI Comparison",
                description: "System compares counts across stops and journey endpoints.",
              },
              {
                step: "04",
                title: "Fraud Alerts",
                description: "Mismatches generate alerts with severity scoring for investigation.",
              },
            ].map((item, idx) => (
              <div key={idx} className="relative">
                <Card className="p-6 border border-border/50">
                  <div className="text-4xl font-bold text-primary/30 mb-4">{item.step}</div>
                  <h3 className="font-semibold text-lg text-foreground mb-2">{item.title}</h3>
                  <p className="text-foreground/70 text-sm">{item.description}</p>
                </Card>
                {idx < 3 && (
                  <div className="hidden md:flex absolute top-1/2 -right-3 -translate-y-1/2 z-10">
                    <ArrowRight className="w-6 h-6 text-primary/30" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section id="trust" className="py-20 md:py-32 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
              Built for Trust and Compliance
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                badge: "🏛️",
                title: "Smart City Ready",
                description: "Designed to integrate with government transit infrastructure and reporting systems.",
              },
              {
                badge: "✓",
                title: "Government Compliant",
                description: "Meets all regulatory requirements for data privacy, security, and audit trails.",
              },
              {
                badge: "🔒",
                title: "Privacy Preserving AI",
                description: "Zero biometric data collection. Compliant with GDPR and government privacy standards.",
              },
            ].map((item, idx) => (
              <Card
                key={idx}
                className="p-8 border border-border/50 text-center hover:border-primary/30 transition-all"
              >
                <div className="text-4xl mb-4">{item.badge}</div>
                <h3 className="font-semibold text-lg text-foreground mb-2">{item.title}</h3>
                <p className="text-foreground/70">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-primary/5 to-secondary/5 border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">Ready to Deploy?</h2>
            <p className="text-xl text-foreground/70 text-balance">
              Join government transit authorities across the country using TransitGuard.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-gradient-to-r from-primary to-secondary">
              <Link href="/auth">
                Government Login
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/auth">Request Demo</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground/5 border-t border-border/40 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Camera className="w-5 h-5 text-primary" />
                <span className="font-semibold">TransitGuard</span>
              </div>
              <p className="text-sm text-foreground/60">Enterprise fraud detection for government city transport.</p>
            </div>

            <div>
              <h4 className="font-semibold text-sm mb-4 text-foreground">Product</h4>
              <ul className="space-y-2 text-sm text-foreground/60">
                <li>
                  <a href="#features" className="hover:text-foreground transition">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#how-it-works" className="hover:text-foreground transition">
                    How It Works
                  </a>
                </li>
                <li>
                  <a href="#trust" className="hover:text-foreground transition">
                    Security
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-sm mb-4 text-foreground">Company</h4>
              <ul className="space-y-2 text-sm text-foreground/60">
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Support
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-sm mb-4 text-foreground">Legal</h4>
              <ul className="space-y-2 text-sm text-foreground/60">
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Compliance
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border/40 pt-8 text-center text-sm text-foreground/60">
            <p>© 2025 TransitGuard. All rights reserved. Government-grade infrastructure.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
