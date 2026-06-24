import { useState, forwardRef } from "react"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Button } from "@/components/ui/Button"
import { Eye, EyeOff } from "lucide-react"
import { cn } from "@/lib/utils"

export const PasswordField = forwardRef(({ label, error, className, ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className={cn("space-y-2", className)}>
      {label && <Label htmlFor={props.id || props.name}>{label}</Label>}
      <div className="relative">
        <Input
          ref={ref}
          type={showPassword ? "text" : "password"}
          {...props}
          className={cn("pr-10", error && "border-destructive focus-visible:ring-destructive")}
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
          ) : (
            <Eye className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
          )}
          <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
        </Button>
      </div>
      {error && <p className="text-sm text-destructive">{error.message}</p>}
    </div>
  )
})
PasswordField.displayName = "PasswordField"
