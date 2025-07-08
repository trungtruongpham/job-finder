import { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle, Star, Zap, Crown } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pricing | JobFinder",
  description:
    "Choose the perfect plan to accelerate your job search with JobFinder's powerful features.",
};

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for getting started with your job search",
    icon: Star,
    popular: false,
    features: [
      "5 job applications per month",
      "Basic job search filters",
      "Email notifications",
      "Mobile app access",
      "Basic profile creation",
      "Standard support",
    ],
    limitations: [
      "Limited to 5 applications",
      "Basic search only",
      "No premium insights",
    ],
    cta: "Get Started Free",
    href: "/signup",
  },
  {
    name: "Pro",
    price: "$19",
    period: "per month",
    description: "For serious job seekers ready to level up",
    icon: Zap,
    popular: true,
    features: [
      "Unlimited job applications",
      "Advanced AI-powered search",
      "Real-time job alerts",
      "Application tracking dashboard",
      "Salary insights & market data",
      "Company culture insights",
      "Resume optimization tips",
      "Interview preparation resources",
      "Priority support",
    ],
    limitations: [],
    cta: "Start Pro Trial",
    href: "/signup?plan=pro",
  },
  {
    name: "Enterprise",
    price: "$49",
    period: "per month",
    description: "For professionals and teams seeking maximum advantage",
    icon: Crown,
    popular: false,
    features: [
      "Everything in Pro",
      "Personal career coach",
      "Direct recruiter connections",
      "Exclusive job opportunities",
      "Advanced analytics & insights",
      "Personal branding guidance",
      "Network expansion tools",
      "Mock interview sessions",
      "Career path planning",
      "24/7 premium support",
    ],
    limitations: [],
    cta: "Start Enterprise",
    href: "/signup?plan=enterprise",
  },
];

const faqs = [
  {
    question: "Can I change my plan anytime?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.",
  },
  {
    question: "Is there a free trial for paid plans?",
    answer:
      "Yes, we offer a 14-day free trial for both Pro and Enterprise plans. No credit card required to start.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, PayPal, and bank transfers for Enterprise customers.",
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer:
      "Absolutely. You can cancel your subscription at any time from your account settings. No cancellation fees.",
  },
  {
    question: "Do you offer discounts for students?",
    answer:
      "Yes, we offer a 50% discount for students with a valid .edu email address on all paid plans.",
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="outline" className="mb-4">
            💰 Simple Pricing
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Pricing that
            <span className="text-primary"> scales </span>
            with your career
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
            Start free and upgrade as you grow. All plans include our core job
            search features with transparent pricing and no hidden fees.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`relative h-full ${
                  plan.popular ? "ring-2 ring-primary shadow-lg scale-105" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground">
                      Most Popular
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-8">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <plan.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription className="text-base">
                    {plan.description}
                  </CardDescription>
                  <div className="pt-4">
                    <div className="text-4xl font-bold">
                      {plan.price}
                      <span className="text-lg text-muted-foreground font-normal">
                        /{plan.period}
                      </span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <Button
                    className={`w-full mb-8 ${
                      plan.popular ? "bg-primary hover:bg-primary/90" : ""
                    }`}
                    variant={plan.popular ? "default" : "outline"}
                    asChild
                  >
                    <Link href={plan.href}>{plan.cta}</Link>
                  </Button>

                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Why choose JobFinder?
          </h2>
          <p className="text-xl text-muted-foreground mb-12">
            Join thousands of successful job seekers who found their dream
            careers with JobFinder.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">3x</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Faster Job Search</h3>
              <p className="text-muted-foreground">
                Our users find jobs 3x faster than traditional job boards
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">95%</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Success Rate</h3>
              <p className="text-muted-foreground">
                95% of our Pro users receive job offers within 60 days
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">$15K+</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Salary Increase</h3>
              <p className="text-muted-foreground">
                Average salary increase for users who upgrade their plan
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-muted-foreground">
              Everything you need to know about our pricing and plans.
            </p>
          </div>

          <div className="space-y-8">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-left">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-primary/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to accelerate your career?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of professionals who have already found their dream
            jobs with JobFinder.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/signup">Start Your Free Trial</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/features">View All Features</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
