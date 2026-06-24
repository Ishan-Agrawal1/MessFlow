import { AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/Button"

export function ErrorState({ title = "Something went wrong", message, onRetry }) {
  return (
    <div className="flex w-full flex-col items-center justify-center space-y-4 rounded-lg border border-destructive/20 bg-destructive/10 p-8 text-center">
      <AlertCircle className="h-10 w-10 text-destructive" />
      <div className="space-y-1">
        <h3 className="font-semibold tracking-tight text-destructive">{title}</h3>
        {message && <p className="text-sm text-muted-foreground">{message}</p>}
      </div>
      {onRetry && (
        <Button variant="outline" onClick={onRetry} className="mt-4">
          Try again
        </Button>
      )}
    </div>
  )
}
