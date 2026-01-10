import { Card } from "@/components/ui/card"

export default function ModelsLoading() {
  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 bg-background border-b border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="h-8 w-48 bg-muted rounded animate-pulse"></div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="h-12 w-2/3 bg-muted rounded animate-pulse mx-auto mb-4"></div>
          <div className="h-6 w-1/2 bg-muted rounded animate-pulse mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {[1, 2].map((i) => (
            <Card key={i} className="overflow-hidden border border-border/50">
              <div className="aspect-video bg-muted animate-pulse"></div>
              <div className="p-6 space-y-4">
                <div className="h-4 w-1/2 bg-muted rounded animate-pulse"></div>
                <div className="space-y-2">
                  {[1, 2, 3].map((j) => (
                    <div key={j} className="h-3 bg-muted rounded animate-pulse"></div>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
