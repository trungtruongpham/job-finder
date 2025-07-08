import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  BriefcaseIcon,
  Clock,
  DollarSign,
  MapPin,
  Plus,
  Search,
  TrendingUp,
  Users,
  Settings,
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dashboard | JobFinder",
  description: "Your personalized job search dashboard.",
};

export default async function DashboardPage() {
  // Check authentication on server-side
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {user.user_metadata?.full_name || user.email}!
            </p>
          </div>
          <div className="flex gap-2 mt-4 lg:mt-0">
            <Button asChild variant="outline">
              <Link href="/job-search-setup">
                <Settings className="mr-2 h-4 w-4" />
                Setup Job Search
              </Link>
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Job Alert
            </Button>
            <Button variant="outline">
              <Search className="mr-2 h-4 w-4" />
              Browse Jobs
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Applications
              </CardTitle>
              <BriefcaseIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">47</div>
              <p className="text-xs text-muted-foreground">
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Interviews Scheduled
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">+3 from last week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Response Rate
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">34%</div>
              <p className="text-xs text-muted-foreground">+5% improvement</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Average Salary
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$89k</div>
              <p className="text-xs text-muted-foreground">
                Based on applications
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Applications */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BriefcaseIcon className="mr-2 h-5 w-5" />
                Recent Applications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    company: "TechCorp Inc",
                    position: "Senior Frontend Developer",
                    location: "San Francisco, CA",
                    salary: "$120k - $140k",
                    status: "Under Review",
                    appliedDate: "2 days ago",
                  },
                  {
                    company: "StartupXYZ",
                    position: "Full Stack Engineer",
                    location: "Remote",
                    salary: "$100k - $130k",
                    status: "Interview Scheduled",
                    appliedDate: "1 week ago",
                  },
                  {
                    company: "BigTech Solutions",
                    position: "React Developer",
                    location: "New York, NY",
                    salary: "$110k - $135k",
                    status: "Applied",
                    appliedDate: "1 week ago",
                  },
                ].map((job, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="space-y-1">
                      <h4 className="font-medium">{job.position}</h4>
                      <p className="text-sm text-muted-foreground">
                        {job.company}
                      </p>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <MapPin className="mr-1 h-3 w-3" />
                        {job.location}
                        <span className="mx-2">•</span>
                        <DollarSign className="mr-1 h-3 w-3" />
                        {job.salary}
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <Badge
                        variant={
                          job.status === "Interview Scheduled"
                            ? "default"
                            : job.status === "Under Review"
                            ? "secondary"
                            : "outline"
                        }
                      >
                        {job.status}
                      </Badge>
                      <p className="text-xs text-muted-foreground flex items-center">
                        <Clock className="mr-1 h-3 w-3" />
                        {job.appliedDate}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Job Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="mr-2 h-5 w-5" />
                Recommended Jobs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    title: "Frontend Engineer",
                    company: "InnovateTech",
                    match: "95% match",
                  },
                  {
                    title: "React Specialist",
                    company: "WebSolutions Co",
                    match: "89% match",
                  },
                  {
                    title: "UI/UX Developer",
                    company: "DesignFirst",
                    match: "87% match",
                  },
                ].map((job, index) => (
                  <div
                    key={index}
                    className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer"
                  >
                    <h4 className="font-medium text-sm">{job.title}</h4>
                    <p className="text-xs text-muted-foreground">
                      {job.company}
                    </p>
                    <Badge variant="outline" className="mt-1 text-xs">
                      {job.match}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
