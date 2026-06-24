import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

export function Loader({ className, size = "default", fullScreen = false }) {
  const sizes = {
    sm: "h-4 w-4",
    default: "h-8 w-8",
    lg: "h-12 w-12",
  }

  const icon = <Loader2 className={cn("animate-spin text-primary", sizes[size], className)} />

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
        {icon}
      </div>
    )
  }

  return <div className="flex w-full items-center justify-center p-4">{icon}</div>
}
