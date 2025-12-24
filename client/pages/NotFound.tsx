import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-teal-50">
      <Header variant="app" />

      <div className="flex items-center justify-center min-h-[calc(100vh-64px)] px-4">
        <div className="text-center space-y-8 max-w-md">
          <div className="space-y-4">
            <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center mx-auto">
              <AlertCircle className="w-10 h-10 text-destructive" />
            </div>
            <h1 className="text-6xl font-heading font-bold text-foreground">
              404
            </h1>
            <h2 className="text-2xl font-heading font-bold text-foreground">
              Page Not Found
            </h2>
            <p className="text-muted-foreground">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>

          <div className="space-y-3">
            <Link to="/">
              <Button className="w-full">Go to Home</Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="outline" className="w-full">
                Go to Dashboard
              </Button>
            </Link>
          </div>

          <div className="text-xs text-muted-foreground">
            {location.pathname && (
              <p>
                Requested route: <code className="bg-slate-100 px-2 py-1 rounded">{location.pathname}</code>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
