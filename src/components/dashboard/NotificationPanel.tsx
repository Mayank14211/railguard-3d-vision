
import React, { useState, useEffect } from "react";
import { AlertCircle, Bell, CheckCircle, Clock, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";

// Notification types
type NotificationType = "error" | "warning" | "success" | "info";

type Notification = {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
};

// Dummy notification data
const initialNotifications: Notification[] = [
  {
    id: "1",
    type: "error",
    title: "Unauthorized Access Detected",
    message: "Cabin 3: Unidentified individual attempting to access restricted area.",
    timestamp: "Just now",
    read: false,
  },
  {
    id: "2",
    type: "warning",
    title: "System Alert",
    message: "Unusual activity detected in Cabin 2. Visual confirmation recommended.",
    timestamp: "5 minutes ago",
    read: false,
  },
  {
    id: "3",
    type: "success",
    title: "Access Verification Complete",
    message: "All passengers in Cabin 1 successfully verified.",
    timestamp: "15 minutes ago",
    read: true,
  },
  {
    id: "4",
    type: "info",
    title: "System Update",
    message: "AI detection model updated to version 2.3.0.",
    timestamp: "1 hour ago",
    read: true,
  },
];

const NotificationItem = ({ 
  notification, 
  onMarkAsRead 
}: { 
  notification: Notification; 
  onMarkAsRead: (id: string) => void;
}) => {
  const { id, type, title, message, timestamp, read } = notification;
  
  const iconMap = {
    error: <AlertCircle className="h-5 w-5 text-theme-red" />,
    warning: <Clock className="h-5 w-5 text-theme-yellow" />,
    success: <CheckCircle className="h-5 w-5 text-theme-green" />,
    info: <Bell className="h-5 w-5 text-theme-blue" />,
  };

  const bgColorMap = {
    error: "bg-theme-red/10 border-theme-red/20",
    warning: "bg-theme-yellow/10 border-theme-yellow/20",
    success: "bg-theme-green/10 border-theme-green/20",
    info: "bg-theme-blue/10 border-theme-blue/20",
  };

  return (
    <div 
      className={cn(
        "relative border p-3 rounded-md mb-2 transition-all",
        read ? "opacity-70" : `${bgColorMap[type]} shadow-lg`,
        !read && type === "error" && "alert-pulse"
      )}
    >
      <div className="absolute top-2 right-2 flex space-x-1">
        {!read && (
          <Badge variant="outline" className="bg-theme-blue/20 border-theme-blue/30 text-white text-xs">
            New
          </Badge>
        )}
        <button 
          onClick={() => onMarkAsRead(id)}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="flex">
        <div className="mr-3 mt-0.5">{iconMap[type]}</div>
        <div>
          <div className="font-medium">{title}</div>
          <div className="text-sm text-gray-300 mt-1">{message}</div>
          <div className="text-xs text-gray-400 mt-2 flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            {timestamp}
          </div>
        </div>
      </div>
    </div>
  );
};

const NotificationPanel = () => {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  
  // Count unread notifications
  const unreadCount = notifications.filter(n => !n.read).length;
  
  // Mark notification as read
  const handleMarkAsRead = (id: string) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };
  
  // Remove notification
  const handleRemove = (id: string) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };
  
  // Simulate new notification arriving
  useEffect(() => {
    const timer = setTimeout(() => {
      const newNotification: Notification = {
        id: Date.now().toString(),
        type: "error",
        title: "Security Alert",
        message: "Cabin 5: Unauthorized passenger detected. Verification required.",
        timestamp: "Just now",
        read: false,
      };
      
      setNotifications(prev => [newNotification, ...prev]);
    }, 20000); // Add a new notification after 20 seconds
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative">
      <button
        onClick={() => setIsPanelOpen(!isPanelOpen)}
        className="fixed bottom-6 right-6 bg-theme-blue p-3 rounded-full shadow-lg hover:bg-theme-purple transition-colors z-20"
      >
        <Bell className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-theme-red text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {unreadCount}
          </span>
        )}
      </button>
      
      {isPanelOpen && (
        <Card className="fixed bottom-20 right-6 w-80 max-h-[70vh] overflow-hidden z-20 animate-fade-in shadow-xl bg-theme-darker border-white/10">
          <CardHeader className="py-3">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg flex items-center">
                <Bell className="h-5 w-5 mr-2" />
                Notifications
                {unreadCount > 0 && (
                  <Badge className="ml-2 bg-theme-red">{unreadCount}</Badge>
                )}
              </CardTitle>
              <button 
                onClick={() => setIsPanelOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <CardDescription>Real-time security alerts</CardDescription>
          </CardHeader>
          <CardContent className="max-h-[calc(70vh-80px)] overflow-y-auto py-2">
            {notifications.length > 0 ? (
              notifications.map(notification => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onMarkAsRead={handleMarkAsRead}
                />
              ))
            ) : (
              <div className="text-center text-gray-400 py-6">
                No notifications
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default NotificationPanel;
