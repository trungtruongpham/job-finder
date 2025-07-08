import { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Heart,
  Users,
  Target,
  Award,
  Linkedin,
  Twitter,
  Github,
  Mail,
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us | JobFinder",
  description:
    "Learn about JobFinder's mission to connect talented professionals with their dream careers using cutting-edge technology.",
};

const teamMembers = [
  {
    name: "Sarah Chen",
    role: "CEO & Co-founder",
    bio: "Former Google recruiter with 10+ years of experience in talent acquisition and a passion for democratizing career opportunities.",
    image: "/team/sarah.jpg", // Placeholder
    social: {
      linkedin: "https://linkedin.com/in/sarahchen",
      twitter: "https://twitter.com/sarahchen",
      email: "sarah@jobfinder.com",
    },
  },
  {
    name: "Marcus Rodriguez",
    role: "CTO & Co-founder",
    bio: "Ex-Microsoft engineer who led AI initiatives. Believes technology can make job searching more human and effective.",
    image: "/team/marcus.jpg", // Placeholder
    social: {
      linkedin: "https://linkedin.com/in/marcusrodriguez",
      github: "https://github.com/marcusrodriguez",
      email: "marcus@jobfinder.com",
    },
  },
  {
    name: "Emily Johnson",
    role: "Head of Product",
    bio: "Product strategist from Airbnb with deep expertise in user experience and marketplace dynamics.",
    image: "/team/emily.jpg", // Placeholder
    social: {
      linkedin: "https://linkedin.com/in/emilyjohnson",
      twitter: "https://twitter.com/emilyjohnson",
      email: "emily@jobfinder.com",
    },
  },
  {
    name: "David Kim",
    role: "Head of Engineering",
    bio: "Former Netflix senior engineer specializing in scalable systems and machine learning infrastructure.",
    image: "/team/david.jpg", // Placeholder
    social: {
      linkedin: "https://linkedin.com/in/davidkim",
      github: "https://github.com/davidkim",
      email: "david@jobfinder.com",
    },
  },
];

const values = [
  {
    icon: Heart,
    title: "Human-Centered",
    description:
      "We believe every person deserves meaningful work that aligns with their values and aspirations.",
  },
  {
    icon: Target,
    title: "Results-Driven",
    description:
      "We measure our success by the career achievements and happiness of our users.",
  },
  {
    icon: Users,
    title: "Inclusive & Fair",
    description:
      "We&apos;re committed to creating equal opportunities for everyone, regardless of background.",
  },
  {
    icon: Award,
    title: "Excellence",
    description:
      "We continuously innovate and improve to provide the best possible experience.",
  },
];

const stats = [
  { number: "2019", label: "Founded" },
  { number: "1M+", label: "Users Helped" },
  { number: "50K+", label: "Partner Companies" },
  { number: "95%", label: "Success Rate" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="outline" className="mb-4">
            🚀 Our Story
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            We&apos;re on a mission to
            <span className="text-primary"> revolutionize </span>
            how people find careers
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
            JobFinder was born from a simple belief: finding the right job
            shouldn&apos;t be a full-time job. We combine cutting-edge AI with
            human insight to connect talented people with opportunities that
            truly matter.
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

      {/* Mission & Vision */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                We believe that everyone deserves to find work that&apos;s not
                just a job, but a calling. Our mission is to democratize access
                to career opportunities by leveraging technology to create more
                transparent, efficient, and fair hiring processes.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mr-3 mt-1">
                    <Target className="w-3 h-3 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Transparency First</h3>
                    <p className="text-muted-foreground">
                      We provide clear salary ranges, company insights, and
                      honest feedback to help you make informed decisions.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mr-3 mt-1">
                    <Users className="w-3 h-3 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Equal Opportunity</h3>
                    <p className="text-muted-foreground">
                      Our AI algorithms are designed to reduce bias and promote
                      diversity in hiring.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl p-8 h-96 flex items-center justify-center">
                <div className="text-center">
                  <Heart className="w-16 h-16 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">People First</h3>
                  <p className="text-muted-foreground">
                    Technology that serves humanity
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              These principles guide everything we do, from product development
              to customer support.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center h-full">
                <CardContent className="pt-8">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We&apos;re a diverse group of dreamers, builders, and
              problem-solvers united by our passion for helping people find
              meaningful work.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center h-full">
                <CardContent className="pt-8">
                  <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    {member.bio}
                  </p>

                  <div className="flex justify-center space-x-3">
                    {member.social.linkedin && (
                      <Button size="sm" variant="ghost" className="p-2">
                        <Linkedin className="w-4 h-4" />
                      </Button>
                    )}
                    {member.social.twitter && (
                      <Button size="sm" variant="ghost" className="p-2">
                        <Twitter className="w-4 h-4" />
                      </Button>
                    )}
                    {member.social.github && (
                      <Button size="sm" variant="ghost" className="p-2">
                        <Github className="w-4 h-4" />
                      </Button>
                    )}
                    {member.social.email && (
                      <Button size="sm" variant="ghost" className="p-2">
                        <Mail className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Company Culture */}
      <section className="py-20 px-4 md:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Journey</h2>
            <p className="text-xl text-muted-foreground">
              From a small startup to a platform trusted by millions.
            </p>
          </div>

          <div className="space-y-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-primary">2019</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      The Beginning
                    </h3>
                    <p className="text-muted-foreground">
                      Founded by Sarah and Marcus after experiencing the
                      frustrations of traditional job searching firsthand.
                      Started with a simple idea: what if job searching could be
                      as easy as online shopping?
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-primary">2021</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      AI Innovation
                    </h3>
                    <p className="text-muted-foreground">
                      Launched our AI-powered matching algorithm,
                      revolutionizing how job seekers discover opportunities
                      that truly fit their skills and aspirations.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-primary">2023</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Global Expansion
                    </h3>
                    <p className="text-muted-foreground">
                      Reached 1 million users worldwide and partnered with over
                      50,000 companies across 20 countries, making quality
                      career opportunities accessible globally.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-primary/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to join our mission?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Whether you&apos;re looking for your next career opportunity or want
            to be part of our team, we&apos;d love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/signup">Start Your Job Search</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/careers">Join Our Team</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
