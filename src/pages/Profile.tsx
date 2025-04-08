
import React from "react";
import { User, Mail, Phone, Shield, Clock, Edit, Save } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const Profile = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = React.useState(false);

  const handleSaveProfile = () => {
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully.",
    });
  };

  return (
    <div className="container px-4 py-6 max-w-7xl mx-auto">
      <div className="flex items-center mb-6">
        <User className="h-6 w-6 text-theme-blue mr-2" />
        <h1 className="text-2xl font-bold">User Profile</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="border-white/10 bg-theme-darker">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>Personal Information</CardTitle>
                <Button 
                  variant="ghost"
                  className="border-white/10 hover:bg-white/5"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? (
                    <>
                      <Save className="h-4 w-4 mr-1.5" /> Save
                    </>
                  ) : (
                    <>
                      <Edit className="h-4 w-4 mr-1.5" /> Edit
                    </>
                  )}
                </Button>
              </div>
              <CardDescription>Update your account details</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex flex-col items-center gap-2">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src="" />
                    <AvatarFallback className="text-3xl bg-theme-blue/20 text-theme-blue">JD</AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-white/10 bg-theme-darker"
                    >
                      Change Photo
                    </Button>
                  )}
                </div>
                
                <div className="flex-1 space-y-4 w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="first-name">First Name</Label>
                      <Input 
                        id="first-name" 
                        defaultValue="John" 
                        disabled={!isEditing} 
                        className="bg-theme-darker border-white/10 mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input 
                        id="last-name" 
                        defaultValue="Doe" 
                        disabled={!isEditing} 
                        className="bg-theme-darker border-white/10 mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        defaultValue="john.doe@railguard.com" 
                        disabled={!isEditing} 
                        className="bg-theme-darker border-white/10 mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input 
                        id="phone" 
                        defaultValue="+1 (555) 123-4567" 
                        disabled={!isEditing} 
                        className="bg-theme-darker border-white/10 mt-1"
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <Label htmlFor="role">Role</Label>
                      <Input 
                        id="role" 
                        defaultValue="Senior Train Security Officer" 
                        disabled={true} 
                        className="bg-theme-darker border-white/10 mt-1"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator className="my-6 bg-white/10" />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Contact Preferences</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="emergency-contact">Emergency Contact</Label>
                    <Input 
                      id="emergency-contact" 
                      defaultValue="Jane Doe (+1-555-987-6543)" 
                      disabled={!isEditing} 
                      className="bg-theme-darker border-white/10 mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="timezone">Timezone</Label>
                    <Input 
                      id="timezone" 
                      defaultValue="Eastern Time (UTC-5)" 
                      disabled={!isEditing} 
                      className="bg-theme-darker border-white/10 mt-1"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t border-white/10 pt-4 flex justify-end">
              {isEditing && (
                <Button 
                  className="bg-theme-blue hover:bg-theme-blue/90"
                  onClick={handleSaveProfile}
                >
                  <Save className="h-4 w-4 mr-1.5" /> Save Changes
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card className="border-white/10 bg-theme-darker">
            <CardHeader className="pb-2">
              <CardTitle>Account Information</CardTitle>
              <CardDescription>Details about your account</CardDescription>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              <div className="flex items-center gap-2">
                <Badge className="bg-theme-blue">ACTIVE</Badge>
                <Badge className="bg-theme-green">VERIFIED</Badge>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Access Level</span>
                  <span>Level 3 (Administrator)</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-400">Account ID</span>
                  <span>TTE-24056</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-400">Member Since</span>
                  <span>March 15, 2023</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-400">Last Login</span>
                  <span>Today, 9:32 AM</span>
                </div>
              </div>
              
              <Button variant="outline" className="w-full border-white/10 hover:bg-white/5">
                Change Password
              </Button>
            </CardContent>
          </Card>
          
          <Card className="border-white/10 bg-theme-darker">
            <CardHeader className="pb-2">
              <CardTitle>Security Statistics</CardTitle>
              <CardDescription>Your security performance</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Alerts Reviewed</span>
                    <span className="text-sm font-medium">85%</span>
                  </div>
                  <div className="w-full bg-theme-blue/20 rounded-full h-2">
                    <div className="bg-theme-blue h-2 rounded-full" style={{ width: "85%" }} />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Response Time</span>
                    <span className="text-sm font-medium">92%</span>
                  </div>
                  <div className="w-full bg-theme-blue/20 rounded-full h-2">
                    <div className="bg-theme-blue h-2 rounded-full" style={{ width: "92%" }} />
                  </div>
                </div>
                
                <div className="pt-2">
                  <div className="flex justify-between text-sm">
                    <div className="flex items-center">
                      <Shield className="h-4 w-4 mr-1.5 text-theme-green" />
                      Threats Detected
                    </div>
                    <span>47</span>
                  </div>
                  
                  <div className="flex justify-between text-sm mt-2">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1.5 text-theme-blue" />
                      Avg. Response Time
                    </div>
                    <span>1.2 min</span>
                  </div>
                  
                  <div className="flex justify-between text-sm mt-2">
                    <div className="flex items-center">
                      <Shield className="h-4 w-4 mr-1.5 text-theme-purple" />
                      Security Score
                    </div>
                    <span className="font-medium">94/100</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
