import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Settings as SettingsIcon, Bell, Shield, Database } from 'lucide-react';
import { toast } from 'sonner';

const Settings = () => {
  const handleSave = () => {
    toast.success('Settings saved successfully');
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">
          Configure your fleet tracking system
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* GPS Configuration */}
        <Card className="bg-card border-border shadow-card p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <SettingsIcon className="h-5 w-5 text-primary" />
            GPS Device Configuration
          </h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="device-id">FMC920 Device ID</Label>
              <Input
                id="device-id"
                placeholder="Enter device ID"
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="api-endpoint">API Endpoint</Label>
              <Input
                id="api-endpoint"
                placeholder="https://api.example.com"
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="update-interval">Update Interval (seconds)</Label>
              <Input
                id="update-interval"
                type="number"
                defaultValue="5"
                className="mt-1.5"
              />
            </div>
          </div>
        </Card>

        {/* Alert Settings */}
        <Card className="bg-card border-border shadow-card p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            Alert Configuration
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Speed Violations</Label>
                <p className="text-sm text-muted-foreground">
                  Alert when speed limit is exceeded
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Geofence Violations</Label>
                <p className="text-sm text-muted-foreground">
                  Alert when zone boundaries are crossed
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Low Battery Warning</Label>
                <p className="text-sm text-muted-foreground">
                  Alert when device battery is low
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div>
              <Label htmlFor="speed-limit">Default Speed Limit (km/h)</Label>
              <Input
                id="speed-limit"
                type="number"
                defaultValue="50"
                className="mt-1.5"
              />
            </div>
          </div>
        </Card>

        {/* Security */}
        <Card className="bg-card border-border shadow-card p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Security
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Two-Factor Authentication</Label>
                <p className="text-sm text-muted-foreground">
                  Require 2FA for admin access
                </p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Auto-Lock Dashboard</Label>
                <p className="text-sm text-muted-foreground">
                  Lock after 15 minutes of inactivity
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </Card>

        {/* Data Management */}
        <Card className="bg-card border-border shadow-card p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Database className="h-5 w-5 text-primary" />
            Data Management
          </h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="retention">Data Retention (days)</Label>
              <Input
                id="retention"
                type="number"
                defaultValue="90"
                className="mt-1.5"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Auto-Export Daily Reports</Label>
                <p className="text-sm text-muted-foreground">
                  Export reports to cloud storage
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Button variant="outline" className="w-full">
              Export Historical Data
            </Button>
          </div>
        </Card>
      </div>

      <div className="flex justify-end gap-3">
        <Button variant="outline">Reset to Defaults</Button>
        <Button onClick={handleSave}>Save Changes</Button>
      </div>
    </div>
  );
};

export default Settings;
