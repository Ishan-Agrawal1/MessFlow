import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { cn } from "@/lib/utils"
import { forwardRef } from "react"

export const InputField = forwardRef(({ label, error, className, ...props }, ref) => {
  return (
    <div className={cn("space-y-2", className)}>
      {label && <Label htmlFor={props.id || props.name}>{label}</Label>}
      <Input ref={ref} {...props} className={error ? "border-destructive focus-visible:ring-destructive" : ""} />
      {error && <p className="text-sm text-destructive">{error.message}</p>}
    </div>
  )
})
InputField.displayName = "InputField"
