import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

export default function RecommendationSkeleton() {
  return (
    <Card className="overflow-hidden hover-lift transition-smooth shadow-periwinkle-sm animate-pulse">
      <div className="relative h-48 w-full bg-gradient-to-br from-muted to-muted/50">
        <div className="absolute inset-0 bg-shimmer-gradient bg-[length:200%_100%] animate-shimmer" />
      </div>

      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Skeleton className="h-12 w-12 rounded-full bg-gradient-to-br from-muted to-muted/80" />
              <div className="absolute inset-0 rounded-full bg-shimmer-gradient bg-[length:200%_100%] animate-shimmer opacity-50" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-5 w-32 bg-gradient-to-r from-muted to-muted/80" />
              <Skeleton className="h-3 w-20 bg-gradient-to-r from-muted/60 to-muted/40" />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Skeleton className="h-8 w-8 rounded-full bg-gradient-to-br from-muted to-muted/80" />
            <Skeleton className="h-6 w-24 rounded-full bg-gradient-to-r from-muted to-muted/80" />
          </div>
        </div>

        <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-muted/30 to-muted/20 border border-border/30">
          <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-10 rounded-full bg-gradient-to-br from-muted to-muted/80" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-10 w-full rounded-lg bg-gradient-to-r from-muted to-muted/80" />
              <div className="flex justify-between items-center">
                <Skeleton className="h-3 w-12 bg-gradient-to-r from-muted/60 to-muted/40" />
                <Skeleton className="h-3 w-16 bg-gradient-to-r from-muted/60 to-muted/40" />
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <Skeleton className="h-8 w-32 rounded-full bg-gradient-to-r from-accent/20 to-accent/10" />
          </div>
        </div>

        <div className="space-y-3 mb-4">
          <Skeleton className="h-4 w-full bg-gradient-to-r from-muted to-muted/80" />
          <Skeleton className="h-4 w-full bg-gradient-to-r from-muted/80 to-muted/60" />
          <Skeleton className="h-4 w-3/4 bg-gradient-to-r from-muted/60 to-muted/40" />
        </div>

        <div className="p-4 rounded-xl bg-gradient-to-r from-muted/20 to-muted/10 border border-border/30">
          <div className="flex items-start space-x-3">
            <Skeleton className="h-8 w-8 rounded-lg bg-gradient-to-br from-muted to-muted/80 flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-3/4 bg-gradient-to-r from-muted to-muted/80" />
              <Skeleton className="h-3 w-1/2 bg-gradient-to-r from-muted/60 to-muted/40" />
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between bg-muted/10 border-t border-border/30 p-4">
        <div className="flex space-x-3">
          <Skeleton className="h-8 w-16 rounded-lg bg-gradient-to-r from-muted to-muted/80" />
          <Skeleton className="h-8 w-16 rounded-lg bg-gradient-to-r from-muted/80 to-muted/60" />
        </div>
        <div className="flex space-x-3">
          <Skeleton className="h-8 w-20 rounded-lg bg-gradient-to-r from-muted to-muted/80" />
          <Skeleton className="h-8 w-16 rounded-lg bg-gradient-to-r from-muted/80 to-muted/60" />
        </div>
      </CardFooter>
    </Card>
  )
}
