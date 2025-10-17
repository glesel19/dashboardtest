import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { TrendingUp, Clock, MapPin, Zap } from 'lucide-react';

// Mock data for charts
const speedData = [
  { time: '10:00', speed: 35, limit: 50 },
  { time: '11:00', speed: 42, limit: 50 },
  { time: '12:00', speed: 55, limit: 50 },
  { time: '13:00', speed: 38, limit: 50 },
  { time: '14:00', speed: 45, limit: 50 },
];

const routeData = [
  { location: 'Zone A', visits: 12, avgTime: 15 },
  { location: 'Zone B', visits: 8, avgTime: 22 },
  { location: 'Zone C', visits: 15, avgTime: 18 },
  { location: 'Zone D', visits: 6, avgTime: 25 },
];

const deliveryTimes = [
  { hour: '9:00', deliveries: 3 },
  { hour: '10:00', deliveries: 5 },
  { hour: '11:00', deliveries: 8 },
  { hour: '12:00', deliveries: 12 },
  { hour: '13:00', deliveries: 9 },
  { hour: '14:00', deliveries: 6 },
];

export const AnalyticsDashboard = () => {
  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <SummaryCard
          icon={<TrendingUp className="h-5 w-5" />}
          label="Avg Speed"
          value="43 km/h"
          change="+5%"
          trend="up"
        />
        <SummaryCard
          icon={<Clock className="h-5 w-5" />}
          label="Avg Delivery Time"
          value="18 min"
          change="-2 min"
          trend="down"
        />
        <SummaryCard
          icon={<MapPin className="h-5 w-5" />}
          label="Total Distance"
          value="124 km"
          change="+12%"
          trend="up"
        />
        <SummaryCard
          icon={<Zap className="h-5 w-5" />}
          label="Violations"
          value="2"
          change="-3"
          trend="down"
        />
      </div>

      {/* Charts */}
      <Card className="bg-card border-border shadow-card p-6">
        <Tabs defaultValue="speed" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="speed">Speed Analysis</TabsTrigger>
            <TabsTrigger value="routes">Route Heatmap</TabsTrigger>
            <TabsTrigger value="deliveries">Delivery Timeline</TabsTrigger>
          </TabsList>

          <TabsContent value="speed" className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-4">Speed Over Time</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={speedData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Line type="monotone" dataKey="speed" stroke="hsl(var(--primary))" strokeWidth={2} />
                  <Line type="monotone" dataKey="limit" stroke="hsl(var(--destructive))" strokeDasharray="5 5" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="routes" className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-4">Most Visited Zones</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={routeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="location" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar dataKey="visits" fill="hsl(var(--primary))" />
                  <Bar dataKey="avgTime" fill="hsl(var(--accent))" />
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-4 flex gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-primary rounded" />
                  <span>Visits</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-accent rounded" />
                  <span>Avg Time (min)</span>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="deliveries" className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-4">Deliveries by Hour</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={deliveryTimes}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="hour" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="deliveries"
                    stroke="hsl(var(--success))"
                    fill="hsl(var(--success) / 0.3)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

interface SummaryCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
}

const SummaryCard = ({ icon, label, value, change, trend }: SummaryCardProps) => {
  const isPositive = (trend === 'up' && !change.startsWith('-')) || (trend === 'down' && change.startsWith('-'));

  return (
    <Card className="bg-card border-border shadow-card p-6">
      <div className="flex items-center justify-between mb-2">
        <div className="p-2 bg-primary/10 rounded-lg text-primary">
          {icon}
        </div>
        <span className={`text-sm font-medium ${isPositive ? 'text-success' : 'text-warning'}`}>
          {change}
        </span>
      </div>
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </Card>
  );
};
