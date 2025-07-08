import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AuthCodeErrorPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center p-4 md:p-8 overflow-hidden">
      {/* Background with gradient and animated elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-destructive/5 via-background to-accent/5" />
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-destructive/10 to-chart-1/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-chart-2/10 to-chart-3/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 w-full max-w-md space-y-8">
        {/* Error content with glasmorphism */}
        <div className="glass-intense glass-pattern rounded-3xl p-8 text-center">
          <div className="mb-6">
            <div className="text-6xl mb-4">⚠️</div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground via-destructive to-foreground bg-clip-text text-transparent">
              Authentication Error
            </h1>
            <p className="mt-4 text-muted-foreground">
              Sorry, there was an error signing you in. This could be due to:
            </p>
          </div>

          <div className="glass-subtle rounded-xl p-4 mb-6 text-left">
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• The authentication link has expired</li>
              <li>• The link has already been used</li>
              <li>• There was an issue with the OAuth provider</li>
              <li>• Network connectivity problems</li>
            </ul>
          </div>

          <div className="space-y-4">
            <div className="glass-subtle rounded-xl p-1 glass-hover">
              <Button
                asChild
                className="w-full bg-primary/90 hover:bg-primary backdrop-blur-sm"
              >
                <Link href="/login">Try Again</Link>
              </Button>
            </div>

            <div className="glass-subtle rounded-xl p-1 glass-hover">
              <Button
                variant="outline"
                className="w-full bg-transparent border-border/50 backdrop-blur-sm hover:bg-accent/50"
                asChild
              >
                <Link href="/">Go Home</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
