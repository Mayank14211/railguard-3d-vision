
import React from "react";
import { ClipboardList, Filter, Search } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type LogEntry = {
  id: string;
  timestamp: string;
  event: string;
  cabin: number;
  severity: "low" | "medium" | "high";
  status: "open" | "resolved" | "investigating";
};

const logData: LogEntry[] = [
  {
    id: "LOG-001",
    timestamp: "2025-04-08 14:32:15",
    event: "Unauthorized Access Attempt",
    cabin: 3,
    severity: "high",
    status: "open",
  },
  {
    id: "LOG-002",
    timestamp: "2025-04-08 14:25:42",
    event: "Suspicious Activity",
    cabin: 1,
    severity: "medium",
    status: "investigating",
  },
  {
    id: "LOG-003",
    timestamp: "2025-04-08 14:10:18",
    event: "Facial Recognition Mismatch",
    cabin: 3,
    severity: "high",
    status: "investigating",
  },
  {
    id: "LOG-004",
    timestamp: "2025-04-08 13:55:03",
    event: "System Alert: Camera 2 Offline",
    cabin: 2,
    severity: "medium",
    status: "resolved",
  },
  {
    id: "LOG-005",
    timestamp: "2025-04-08 13:42:37",
    event: "Passenger Verification Complete",
    cabin: 4,
    severity: "low",
    status: "resolved",
  },
  {
    id: "LOG-006",
    timestamp: "2025-04-08 13:30:22",
    event: "Maintenance Check",
    cabin: 5,
    severity: "low",
    status: "resolved",
  },
  {
    id: "LOG-007",
    timestamp: "2025-04-08 12:45:11",
    event: "Unauthorized Access Attempt",
    cabin: 2,
    severity: "high",
    status: "resolved",
  },
  {
    id: "LOG-008",
    timestamp: "2025-04-08 12:15:48",
    event: "System Update Completed",
    cabin: 0,
    severity: "low",
    status: "resolved",
  },
];

const Logs = () => {
  const [search, setSearch] = React.useState("");
  const [filtered, setFiltered] = React.useState<LogEntry[]>(logData);
  const [activeTab, setActiveTab] = React.useState("all");

  React.useEffect(() => {
    let result = logData;
    
    // Apply search filter
    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(log => 
        log.event.toLowerCase().includes(searchLower) || 
        log.id.toLowerCase().includes(searchLower)
      );
    }
    
    // Apply tab filter
    if (activeTab !== "all") {
      result = result.filter(log => {
        if (activeTab === "high") return log.severity === "high";
        if (activeTab === "open") return log.status === "open" || log.status === "investigating";
        if (activeTab === "resolved") return log.status === "resolved";
        return true;
      });
    }
    
    setFiltered(result);
  }, [search, activeTab]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "text-theme-red bg-theme-red/10 border-theme-red/20";
      case "medium": return "text-theme-yellow bg-theme-yellow/10 border-theme-yellow/20";
      case "low": return "text-theme-green bg-theme-green/10 border-theme-green/20";
      default: return "text-theme-blue bg-theme-blue/10 border-theme-blue/20";
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "open": return "text-theme-red bg-theme-red/10 border-theme-red/20";
      case "investigating": return "text-theme-yellow bg-theme-yellow/10 border-theme-yellow/20";
      case "resolved": return "text-theme-green bg-theme-green/10 border-theme-green/20";
      default: return "text-theme-blue bg-theme-blue/10 border-theme-blue/20";
    }
  };

  return (
    <div className="container px-4 py-6 max-w-7xl mx-auto">
      <div className="flex items-center mb-6">
        <ClipboardList className="h-6 w-6 text-theme-blue mr-2" />
        <h1 className="text-2xl font-bold">Security Logs</h1>
      </div>
      
      <Card className="border-white/10 bg-theme-darker">
        <CardHeader>
          <CardTitle>Event History</CardTitle>
          <CardDescription>Complete log of security events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row justify-between mb-4 gap-4">
            <div className="relative max-w-md w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search logs..."
                className="pl-8 bg-theme-darker border-white/10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm"
                className="border-white/10 bg-theme-darker"
              >
                <Filter className="h-4 w-4 mr-1" /> Filter
              </Button>
              <Button 
                variant="default" 
                size="sm"
                className="bg-theme-blue hover:bg-theme-blue/90"
              >
                Export
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-theme-darker border border-white/10 mb-4">
              <TabsTrigger value="all">All Events</TabsTrigger>
              <TabsTrigger value="high">High Priority</TabsTrigger>
              <TabsTrigger value="open">Open Issues</TabsTrigger>
              <TabsTrigger value="resolved">Resolved</TabsTrigger>
            </TabsList>
            <TabsContent value={activeTab}>
              <div className="rounded-md border border-white/10 overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-theme-darker border-b border-white/10">
                      <th className="py-3 px-4 text-left">ID</th>
                      <th className="py-3 px-4 text-left">Timestamp</th>
                      <th className="py-3 px-4 text-left">Event</th>
                      <th className="py-3 px-4 text-left">Cabin</th>
                      <th className="py-3 px-4 text-left">Severity</th>
                      <th className="py-3 px-4 text-left">Status</th>
                      <th className="py-3 px-4 text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((log) => (
                      <tr 
                        key={log.id} 
                        className="border-b border-white/10 hover:bg-theme-blue/5 transition-colors"
                      >
                        <td className="py-3 px-4 font-medium">{log.id}</td>
                        <td className="py-3 px-4 text-gray-400">{log.timestamp}</td>
                        <td className="py-3 px-4">{log.event}</td>
                        <td className="py-3 px-4">
                          {log.cabin > 0 ? `Cabin ${log.cabin}` : "System"}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${getSeverityColor(log.severity)}`}>
                            {log.severity.charAt(0).toUpperCase() + log.severity.slice(1)}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(log.status)}`}>
                            {log.status.charAt(0).toUpperCase() + log.status.slice(1)}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <Button 
                            variant="ghost"
                            size="sm"
                            className="text-theme-blue hover:text-theme-blue hover:bg-theme-blue/10"
                            onClick={() => console.log(`View details for ${log.id}`)}
                          >
                            View
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                {filtered.length === 0 && (
                  <div className="text-center py-8 text-gray-400">
                    No logs found matching your criteria
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Logs;
