"use client";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserNav } from "@/components/user-nav";
import { useUser } from "@/providers/user-provider";
import { Menu, Loader2 } from "lucide-react";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Header() {
  const { user, loading, isAuthenticated, clearUser } = useUser();

  const handleMobileSignOut = async () => {
    // Immediately clear user from UI for better UX
    clearUser();
    // Then perform the actual sign out
    const { signOut } = await import("@/lib/actions/auth");
    await signOut();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center">
          {/* Two-column layout for mobile, three columns for desktop */}
          <div className="w-full flex justify-between md:grid md:grid-cols-3 items-center">
            {/* Logo - Left Column */}
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold">
                JobFinder
              </Link>
            </div>

            {/* Navigation - Center Column (Desktop only) */}
            <nav className="hidden md:flex items-center justify-center gap-8">
              <Link
                href="/features"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                Features
              </Link>
              <Link
                href="/pricing"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                Pricing
              </Link>
              <Link
                href="/about"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                About Us
              </Link>
            </nav>

            {/* Actions - Right Column */}
            <div className="flex items-center justify-end gap-4">
              {/* Desktop Theme Toggle */}
              <div className="hidden md:block">
                <ThemeToggle />
              </div>

              {/* Authentication State */}
              {loading ? (
                <div className="hidden md:flex">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              ) : isAuthenticated ? (
                <div className="hidden md:flex items-center">
                  <UserNav />
                </div>
              ) : (
                <div className="hidden md:flex gap-2">
                  <Button variant="outline" asChild>
                    <Link href="/login">Login</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/signup">Sign Up</Link>
                  </Button>
                </div>
              )}

              {/* Mobile Menu - Only visible on mobile */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="ml-auto md:hidden"
                  >
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <div className="flex flex-col items-center text-center">
                    {/* User info in mobile menu */}
                    {isAuthenticated && user && (
                      <div className="mb-6 p-4 bg-muted rounded-lg">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                          <span className="text-lg font-bold text-primary">
                            {user.user_metadata?.full_name
                              ? user.user_metadata.full_name
                                  .split(" ")
                                  .map((n: string) => n[0])
                                  .join("")
                                  .toUpperCase()
                              : user.email?.slice(0, 2).toUpperCase() || "U"}
                          </span>
                        </div>
                        <p className="font-medium text-sm">
                          {user.user_metadata?.full_name || user.email}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    )}

                    <nav className="flex flex-col items-center gap-6 mt-8 w-full">
                      <Link
                        href="/features"
                        className="text-base font-medium transition-colors hover:text-primary"
                      >
                        Features
                      </Link>
                      <Link
                        href="/pricing"
                        className="text-base font-medium transition-colors hover:text-primary"
                      >
                        Pricing
                      </Link>
                      <Link
                        href="/about"
                        className="text-base font-medium transition-colors hover:text-primary"
                      >
                        About Us
                      </Link>

                      {/* Authenticated mobile menu items */}
                      {isAuthenticated && (
                        <>
                          <div className="w-full border-t pt-4">
                            <Link
                              href="/dashboard"
                              className="text-base font-medium transition-colors hover:text-primary block mb-4"
                            >
                              Dashboard
                            </Link>
                            <Link
                              href="/profile"
                              className="text-base font-medium transition-colors hover:text-primary block mb-4"
                            >
                              Profile
                            </Link>
                            <Link
                              href="/settings"
                              className="text-base font-medium transition-colors hover:text-primary block mb-4"
                            >
                              Settings
                            </Link>
                          </div>
                        </>
                      )}

                      {/* Theme Toggle in mobile menu */}
                      <div className="my-2">
                        <ThemeToggle />
                      </div>

                      {/* Mobile Authentication Buttons */}
                      <div className="mt-4 w-full max-w-[200px] space-y-2">
                        {loading ? (
                          <div className="flex justify-center">
                            <Loader2 className="h-4 w-4 animate-spin" />
                          </div>
                        ) : isAuthenticated ? (
                          <Button
                            className="w-full"
                            variant="destructive"
                            onClick={handleMobileSignOut}
                          >
                            Sign Out
                          </Button>
                        ) : (
                          <div className="space-y-2">
                            <Button
                              asChild
                              className="w-full"
                              variant="outline"
                            >
                              <Link href="/login">Login</Link>
                            </Button>
                            <Button asChild className="w-full">
                              <Link href="/signup">Sign Up</Link>
                            </Button>
                          </div>
                        )}
                      </div>
                    </nav>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
