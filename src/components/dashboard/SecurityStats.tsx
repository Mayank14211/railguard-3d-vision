
import React from "react";
import { AlertCircle, Clock, Shield, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

// Stats card component
const StatCard = ({ 
  title, 
  value, 
  icon: Icon, 
  color,
  trend,
  trendValue 
}: { 
  title: string; 
  value: string | number; 
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
}) => {
  return (
    <Card className="border-white/10 bg-theme-darker">
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-gray-400">{title}</p>
            <p className="text-2xl font-bold mt-1">{value}</p>
            
            {trend && trendValue && (
              <div className={`text-xs flex items-center mt-2 ${
                trend === "up" ? "text-theme-green" : 
                trend === "down" ? "text-theme-red" : 
                "text-gray-400"
              }`}>
                {trend === "up" ? "↑" : trend === "down" ? "↓" : "→"} {trendValue}
              </div>
            )}
          </div>
          <div className={`p-2 rounded-lg ${color}`}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const SecurityStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard 
        title="Active Security Alerts" 
        value={2} 
        icon={AlertCircle} 
        color="bg-theme-red/20 text-theme-red"
        trend="up"
        trendValue="2 new since yesterday"
      />
      <StatCard 
        title="Passengers Verified" 
        value={286} 
        icon={Users} 
        color="bg-theme-blue/20 text-theme-blue"
        trend="up"
        trendValue="24 in last hour"
      />
      <StatCard 
        title="Security Score" 
        value="94%" 
        icon={Shield} 
        color="bg-theme-green/20 text-theme-green"
        trend="neutral"
        trendValue="No change"
      />
      <StatCard 
        title="Avg. Response Time" 
        value="1m 24s" 
        icon={Clock} 
        color="bg-theme-purple/20 text-theme-purple"
        trend="down"
        trendValue="12s faster than average"
      />
    </div>
  );
};

export default SecurityStats;
