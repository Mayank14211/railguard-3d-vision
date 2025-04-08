
import React from "react";
import { Settings as SettingsIcon, Save, AlertCircle, Bell, Eye, Lock, Sliders } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "../hooks/use-toast";

const Settings = () => {
  const { toast } = useToast();
  const [aiThreshold, setAiThreshold] = React.useState([75]);
  const [emailNotifications, setEmailNotifications] = React.useState(true);
  const [systemAlerts, setSystemAlerts] = React.useState(true);
  const [securityAlerts, setSecurityAlerts] = React.useState(true);
  const [maintenanceAlerts, setMaintenanceAlerts] = React.useState(false);

  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your security settings have been updated successfully.",
    });
  };

  return (
    <div className="container px-4 py-6 max-w-7xl mx-auto">
      <div className="flex items-center mb-6">
        <SettingsIcon className="h-6 w-6 text-theme-blue mr-2" />
        <h1 className="text-2xl font-bold">System Settings</h1>
      </div>
      
      <Tabs defaultValue="detection">
        <TabsList className="bg-theme-darker border border-white/10 mb-6">
          <TabsTrigger value="detection">
            <AlertCircle className="h-4 w-4 mr-2" />
            Detection Settings
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="display">
            <Eye className="h-4 w-4 mr-2" />
            Display Settings
          </TabsTrigger>
          <TabsTrigger value="security">
            <Lock className="h-4 w-4 mr-2" />
            Security
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="detection">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-white/10 bg-theme-darker">
              <CardHeader>
                <CardTitle>AI Detection Parameters</CardTitle>
                <CardDescription>Configure AI detection sensitivity and thresholds</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <Label>Detection Threshold</Label>
                      <span className="text-theme-blue">{aiThreshold}%</span>
                    </div>
                    <Slider
                      value={aiThreshold}
                      onValueChange={setAiThreshold}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                    <p className="text-xs text-gray-400 mt-1">
                      Higher values require more confidence before triggering alerts
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Enhanced Recognition</Label>
                      <p className="text-xs text-gray-400">Enable advanced facial recognition</p>
                    </div>
                    <Switch checked defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Behavior Analysis</Label>
                      <p className="text-xs text-gray-400">Detect suspicious behavior patterns</p>
                    </div>
                    <Switch checked defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Thermal Scanning</Label>
                      <p className="text-xs text-gray-400">Use thermal cameras for additional detection</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-white/10 bg-theme-darker">
              <CardHeader>
                <CardTitle>Alert Configuration</CardTitle>
                <CardDescription>Set when and how alerts are triggered</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="response-time" className="mb-2 block">Alert Response Time (seconds)</Label>
                  <Input 
                    type="number" 
                    id="response-time" 
                    className="bg-theme-darker border-white/10"
                    defaultValue={30}
                    min={5}
                    max={120}
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Time before escalating unacknowledged alerts
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Auto-Escalation</Label>
                      <p className="text-xs text-gray-400">Automatically escalate critical alerts</p>
                    </div>
                    <Switch checked defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Alert Clustering</Label>
                      <p className="text-xs text-gray-400">Group similar alerts to reduce noise</p>
                    </div>
                    <Switch checked defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Visual Indicators</Label>
                      <p className="text-xs text-gray-400">Show visual cues in 3D visualization</p>
                    </div>
                    <Switch checked defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-white/10 bg-theme-darker lg:col-span-2">
              <CardHeader>
                <CardTitle>Advanced Detection Settings</CardTitle>
                <CardDescription>Fine-tune detector performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <Label>Motion Sensitivity</Label>
                      <span className="text-theme-blue">65%</span>
                    </div>
                    <Slider defaultValue={[65]} max={100} step={1} className="w-full" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <Label>False Positive Reduction</Label>
                      <span className="text-theme-blue">80%</span>
                    </div>
                    <Slider defaultValue={[80]} max={100} step={1} className="w-full" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Advanced Lighting Compensation</Label>
                      <p className="text-xs text-gray-400">Adjust for poor lighting conditions</p>
                    </div>
                    <Switch />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Integration with Ticketing System</Label>
                      <p className="text-xs text-gray-400">Verify against passenger tickets</p>
                    </div>
                    <Switch checked defaultChecked />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t border-white/10 mt-4 flex justify-end gap-2">
                <Button variant="ghost" className="border-white/10">Reset to Default</Button>
                <Button 
                  className="bg-theme-blue hover:bg-theme-blue/90"
                  onClick={handleSaveSettings}
                >
                  <Save className="h-4 w-4 mr-1.5" /> Save Settings
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card className="border-white/10 bg-theme-darker">
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Manage your alert notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-xs text-gray-400">Receive security alerts via email</p>
                </div>
                <Switch 
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>System Alerts</Label>
                  <p className="text-xs text-gray-400">Notifications about system status</p>
                </div>
                <Switch 
                  checked={systemAlerts}
                  onCheckedChange={setSystemAlerts}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Security Alerts</Label>
                  <p className="text-xs text-gray-400">High-priority security notifications</p>
                </div>
                <Switch 
                  checked={securityAlerts}
                  onCheckedChange={setSecurityAlerts}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Maintenance Alerts</Label>
                  <p className="text-xs text-gray-400">System maintenance notifications</p>
                </div>
                <Switch 
                  checked={maintenanceAlerts}
                  onCheckedChange={setMaintenanceAlerts}
                />
              </div>
              
              <div className="pt-4">
                <Label htmlFor="email" className="mb-2 block">Notification Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  className="bg-theme-darker border-white/10"
                />
              </div>
            </CardContent>
            <CardFooter className="border-t border-white/10 mt-4 flex justify-end gap-2">
              <Button variant="ghost" className="border-white/10">Cancel</Button>
              <Button 
                className="bg-theme-blue hover:bg-theme-blue/90"
                onClick={handleSaveSettings}
              >
                <Save className="h-4 w-4 mr-1.5" /> Save Preferences
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="display">
          <Card className="border-white/10 bg-theme-darker">
            <CardHeader>
              <CardTitle>Display Configuration</CardTitle>
              <CardDescription>Customize your dashboard appearance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label className="mb-2 block">3D Rendering Quality</Label>
                    <div className="flex gap-2">
                      {["Low", "Medium", "High", "Ultra"].map((quality) => (
                        <Button
                          key={quality}
                          variant={quality === "High" ? "default" : "outline"}
                          size="sm"
                          className={quality === "High" 
                            ? "bg-theme-blue hover:bg-theme-blue/90" 
                            : "border-white/10 bg-theme-darker"}
                        >
                          {quality}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Auto-Rotate Camera</Label>
                      <p className="text-xs text-gray-400">Slowly rotate the 3D view</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Show Labels</Label>
                      <p className="text-xs text-gray-400">Display cabin labels in 3D view</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label className="mb-2 block">Interface Theme</Label>
                    <div className="flex gap-2">
                      {["System", "Dark", "Light"].map((theme) => (
                        <Button
                          key={theme}
                          variant={theme === "Dark" ? "default" : "outline"}
                          size="sm"
                          className={theme === "Dark" 
                            ? "bg-theme-blue hover:bg-theme-blue/90" 
                            : "border-white/10 bg-theme-darker"}
                        >
                          {theme}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Reduced Motion</Label>
                      <p className="text-xs text-gray-400">Minimize animations and movement</p>
                    </div>
                    <Switch />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>High Contrast</Label>
                      <p className="text-xs text-gray-400">Increase visual contrast</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t border-white/10 mt-4 flex justify-end gap-2">
              <Button variant="ghost" className="border-white/10">Reset to Default</Button>
              <Button 
                className="bg-theme-blue hover:bg-theme-blue/90"
                onClick={handleSaveSettings}
              >
                <Save className="h-4 w-4 mr-1.5" /> Save Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="security">
          <Card className="border-white/10 bg-theme-darker">
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Configure system security options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="session-timeout" className="mb-2 block">Session Timeout (minutes)</Label>
                <Input 
                  type="number" 
                  id="session-timeout"
                  className="bg-theme-darker border-white/10"
                  defaultValue={30}
                  min={1}
                  max={120}
                />
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-xs text-gray-400">Require 2FA for all logins</p>
                  </div>
                  <Switch checked defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>IP Restrictions</Label>
                    <p className="text-xs text-gray-400">Limit access to specific IP ranges</p>
                  </div>
                  <Switch checked defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Activity Logging</Label>
                    <p className="text-xs text-gray-400">Log all user actions</p>
                  </div>
                  <Switch checked defaultChecked />
                </div>
                
                <div className="pt-4">
                  <Button 
                    className="w-full bg-destructive/20 hover:bg-destructive/30 text-destructive-foreground" 
                    variant="outline"
                  >
                    <Lock className="h-4 w-4 mr-1.5" /> Change Password
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t border-white/10 mt-4 flex justify-end gap-2">
              <Button variant="ghost" className="border-white/10">Cancel</Button>
              <Button 
                className="bg-theme-blue hover:bg-theme-blue/90"
                onClick={handleSaveSettings}
              >
                <Save className="h-4 w-4 mr-1.5" /> Save Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
