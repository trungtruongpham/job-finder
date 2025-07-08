import { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Search,
  Bell,
  Target,
  Users,
  BarChart3,
  Shield,
  Zap,
  Globe,
  CheckCircle,
  Star,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Features | JobFinder",
  description:
    "Discover all the powerful features that make JobFinder the best platform for finding your dream job.",
};

const features = [
  {
    icon: Search,
    title: "Smart Job Search",
    description:
      "Advanced AI-powered search that understands your preferences and finds jobs that truly match your skills and career goals.",
    features: [
      "AI-powered matching",
      "Salary range filtering",
      "Location preferences",
      "Remote work options",
    ],
  },
  {
    icon: Bell,
    title: "Real-time Alerts",
    description:
      "Never miss an opportunity with instant notifications for new jobs that match your criteria and profile.",
    features: [
      "Instant notifications",
      "Email alerts",
      "Mobile push notifications",
      "Custom alert criteria",
    ],
  },
  {
    icon: Target,
    title: "Career Insights",
    description:
      "Get detailed analytics about job market trends, salary insights, and career progression paths in your field.",
    features: [
      "Market trends",
      "Salary analytics",
      "Career path mapping",
      "Industry insights",
    ],
  },
  {
    icon: Users,
    title: "Company Profiles",
    description:
      "Deep dive into company culture, reviews, and hiring practices to find the perfect workplace fit.",
    features: [
      "Company reviews",
      "Culture insights",
      "Employee testimonials",
      "Hiring process details",
    ],
  },
  {
    icon: BarChart3,
    title: "Application Tracking",
    description:
      "Organize and track all your job applications in one place with detailed progress monitoring.",
    features: [
      "Application status",
      "Interview scheduling",
      "Follow-up reminders",
      "Progress analytics",
    ],
  },
  {
    icon: Shield,
    title: "Privacy & Security",
    description:
      "Your data is protected with enterprise-grade security and privacy controls you can trust.",
    features: [
      "End-to-end encryption",
      "GDPR compliant",
      "Anonymous browsing",
      "Data export options",
    ],
  },
];

const stats = [
  { number: "500K+", label: "Active Jobs" },
  { number: "50K+", label: "Companies" },
  { number: "1M+", label: "Job Seekers" },
  { number: "95%", label: "Success Rate" },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <Badge variant="outline" className="mb-4">
            ✨ Powered by AI
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Features that
            <span className="text-primary"> accelerate </span>
            your job search
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
            JobFinder combines cutting-edge technology with deep industry
            insights to help you find not just any job, but the right job for
            your career.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything you need to land your dream job
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From intelligent job matching to comprehensive application
              tracking, we&apos;ve built the complete toolkit for modern job
              seekers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="h-full hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {feature.features.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section className="py-20 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="outline" className="mb-4">
                <Zap className="w-4 h-4 mr-2" />
                Advanced Technology
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                AI-powered job matching that actually works
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Our machine learning algorithms analyze thousands of data points
                to match you with opportunities that align with your skills,
                experience, and career aspirations.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mr-3 mt-1">
                    <Star className="w-3 h-3 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">
                      Smart Recommendations
                    </h3>
                    <p className="text-muted-foreground">
                      Get personalized job suggestions based on your profile and
                      preferences.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mr-3 mt-1">
                    <Globe className="w-3 h-3 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Global Opportunities</h3>
                    <p className="text-muted-foreground">
                      Access jobs from companies worldwide, including remote
                      positions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl p-8 h-96 flex items-center justify-center">
                <div className="text-center">
                  <Search className="w-16 h-16 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">
                    Intelligent Search
                  </h3>
                  <p className="text-muted-foreground">
                    AI that understands context and intent
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
