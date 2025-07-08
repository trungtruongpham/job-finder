import Link from "next/link";

// TODO: Add actual SVG icons for social media
function PlaceholderSocialIcon() {
  return <div className="w-6 h-6 bg-muted rounded-full" />;
}

export function Footer() {
  return (
    <footer className="border-t bg-background/95">
      <div className="container mx-auto py-10 px-4 md:px-6 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Related Links
            </h3>
            <ul className="mt-4 space-y-2">
              {/* TODO: Replace with actual links */}
              <li>
                <Link
                  href="/blog"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Legal
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Social
            </h3>
            <div className="mt-4 flex space-x-4">
              {/* TODO: Replace with actual social media links and icons */}
              <Link href="#" aria-label="Twitter">
                <PlaceholderSocialIcon />
              </Link>
              <Link href="#" aria-label="LinkedIn">
                <PlaceholderSocialIcon />
              </Link>
              <Link href="#" aria-label="Facebook">
                <PlaceholderSocialIcon />
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} JobFinder. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
