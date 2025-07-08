import { Button } from "@/components/ui/button";
import Link from "next/link";

export function MainSection() {
  return (
    <section className="relative py-12 md:py-24 lg:py-32 overflow-hidden">
      {/* Background with gradient and pattern */}
      <div className="absolute inset-0">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />

        {/* Animated background elements */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-primary/10 to-chart-1/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-r from-chart-2/10 to-chart-3/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-accent/5 to-secondary/5 rounded-full blur-2xl animate-pulse delay-500" />
      </div>

      <div className="container relative mx-auto px-4 md:px-6 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Main content with glasmorphism effect */}
          <div className="glass-intense glass-pattern rounded-3xl p-8 md:p-12 lg:p-16 relative">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
              AI Agents Find Your Perfect Job
            </h1>
            <p className="mt-6 text-lg text-muted-foreground md:text-xl max-w-2xl mx-auto">
              Increase your job hunt success rate by{" "}
              <span className="font-semibold text-primary bg-primary/10 px-2 py-1 rounded-lg">
                75%
              </span>{" "}
              with our multi-agent platform. Smart agents work 24/7 to find
              better opportunities, faster.
            </p>

            {/* Action buttons with glasmorphism */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <div className="glass-subtle rounded-xl p-1 glass-hover">
                <Button
                  size="lg"
                  className="w-full bg-primary/90 hover:bg-primary backdrop-blur-sm"
                  asChild
                >
                  <Link href="/signup">Get Started Free</Link>
                </Button>
              </div>
              <div className="glass-subtle rounded-xl p-1 glass-hover">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full bg-transparent border-border/50 backdrop-blur-sm hover:bg-accent/50"
                  asChild
                >
                  <Link href="/features">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Additional floating elements */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "🚀",
                title: "Minimal Setup",
                desc: "Get started in minutes with our minimal setup",
              },
              {
                icon: "🎯",
                title: "Smart Matching",
                desc: "AI-powered job recommendations",
              },
              {
                icon: "📈",
                title: "Track Progress",
                desc: "Monitor your success rate",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="glass glass-hover rounded-2xl p-6 text-center group cursor-pointer"
              >
                <div className="text-3xl mb-3 transition-transform group-hover:scale-110">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
