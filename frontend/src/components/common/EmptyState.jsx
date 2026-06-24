import { FileQuestion } from "lucide-react"
import { cn } from "@/lib/utils"

export function EmptyState({ title = "No data found", description, icon: Icon = FileQuestion, className }) {
  return (
    <div className={cn("flex flex-col items-center justify-center space-y-3 rounded-lg border border-dashed p-8 text-center animate-in fade-in-50", className)}>
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
        <Icon className="h-6 w-6 text-muted-foreground" />
      </div>
      <div className="space-y-1">
        <h3 className="font-medium tracking-tight">{title}</h3>
        {description && <p className="text-sm text-muted-foreground max-w-sm mx-auto">{description}</p>}
      </div>
    </div>
  )
}
