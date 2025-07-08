import { ThemeToggle } from "@/components/theme-toggle";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center p-4 md:p-8 overflow-hidden">
      {/* Background with gradient and animated elements */}
      <div className="absolute inset-0">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />

        {/* Animated background orbs */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-primary/10 to-chart-1/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-chart-2/10 to-chart-3/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/3 right-1/3 w-72 h-72 bg-gradient-to-r from-accent/5 to-secondary/5 rounded-full blur-2xl animate-pulse delay-500" />
      </div>

      {/* Theme toggle with glasmorphism */}
      <div className="absolute top-4 right-4 z-10">
        <div className="glass-subtle rounded-xl p-1">
          <ThemeToggle />
        </div>
      </div>

      <div className="relative z-10 w-full max-w-md space-y-8">
        {/* Header with glasmorphism */}
        <div className="glass-subtle rounded-2xl p-6 text-center">
          <div className="flex flex-col items-center space-y-2">
            <div className="text-2xl font-bold bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
              AI Agents Await
            </div>
            <p className="text-center text-sm text-muted-foreground">
              Join thousands finding their perfect job with AI
            </p>
          </div>
        </div>

        {/* Form container with intense glasmorphism */}
        <div className="glass-intense glass-pattern rounded-3xl p-6 md:p-8 shadow-2xl">
          {children}
        </div>
      </div>
    </div>
  );
}
