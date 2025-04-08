
import React from "react";
import { useToast } from "../hooks/use-toast";
import { Shield } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Train3DVisualization from "@/components/dashboard/Train3DVisualization";
import SecurityStats from "@/components/dashboard/SecurityStats";
import NotificationPanel from "@/components/dashboard/NotificationPanel";

const Dashboard = () => {
  const { toast } = useToast();

  // Show toast when page loads
  React.useEffect(() => {
    const timer = setTimeout(() => {
      toast({
        title: "Security Alert",
        description: "Unauthorized access detected in Cabin 3. Check notifications for details.",
        variant: "destructive",
      });
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [toast]);

  return (
    <div className="container px-4 py-6 max-w-7xl mx-auto">
      <div className="flex items-center mb-6">
        <Shield className="h-6 w-6 text-theme-blue mr-2" />
        <h1 className="text-2xl font-bold">Security Dashboard</h1>
      </div>
      
      <SecurityStats />
      
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="border-white/10 bg-theme-darker">
            <CardHeader className="pb-2">
              <CardTitle>Train Visualization</CardTitle>
              <CardDescription>3D real-time security monitoring</CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <Train3DVisualization />
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-1">
          <Card className="border-white/10 bg-theme-darker h-full">
            <CardHeader className="pb-2">
              <CardTitle>Security Feed</CardTitle>
              <CardDescription>Live updates from detection systems</CardDescription>
            </CardHeader>
            <CardContent className="p-4 max-h-[500px] overflow-y-auto">
              <div className="space-y-4">
                <div className="glass-panel p-4">
                  <div className="flex items-center justify-between">
                    <div className="text-theme-red font-medium">Cabin 3: Alert</div>
                    <div className="text-xs text-gray-400">2m ago</div>
                  </div>
                  <p className="mt-2 text-sm">Unidentified individual detected attempting to access restricted area.</p>
                  <div className="mt-3 flex justify-end">
                    <button className="glass-button">View Details</button>
                  </div>
                </div>
                
                <div className="glass-panel p-4">
                  <div className="flex items-center justify-between">
                    <div className="text-theme-yellow font-medium">Cabin 1: Warning</div>
                    <div className="text-xs text-gray-400">5m ago</div>
                  </div>
                  <p className="mt-2 text-sm">Suspicious activity detected. Visual confirmation required.</p>
                  <div className="mt-3 flex justify-end">
                    <button className="glass-button">View Details</button>
                  </div>
                </div>
                
                <div className="glass-panel p-4">
                  <div className="flex items-center justify-between">
                    <div className="text-theme-green font-medium">System Report</div>
                    <div className="text-xs text-gray-400">17m ago</div>
                  </div>
                  <p className="mt-2 text-sm">All passenger verifications in Cabins 2, 4, and 5 completed successfully.</p>
                  <div className="mt-3 flex justify-end">
                    <button className="glass-button">View Report</button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <NotificationPanel />
    </div>
  );
};

export default Dashboard;
