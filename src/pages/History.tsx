import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, TrendingUp } from 'lucide-react';

const historyData = [
  {
    date: '2024-01-15',
    routes: 8,
    distance: 124,
    avgSpeed: 43,
    violations: 2,
    deliveries: 12,
  },
  {
    date: '2024-01-14',
    routes: 6,
    distance: 98,
    avgSpeed: 41,
    violations: 1,
    deliveries: 10,
  },
  {
    date: '2024-01-13',
    routes: 7,
    distance: 112,
    avgSpeed: 45,
    violations: 0,
    deliveries: 11,
  },
];

const History = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Historical Data</h1>
        <p className="text-muted-foreground">
          Review past routes, performance, and delivery records
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="bg-card border-border shadow-card p-6">
          <h3 className="text-lg font-semibold mb-4">Select Date</h3>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md"
          />
        </Card>

        {/* History List */}
        <Card className="bg-card border-border shadow-card p-6 lg:col-span-2">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All Days</TabsTrigger>
              <TabsTrigger value="violations">Violations</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-4 mt-4">
              {historyData.map((day) => (
                <div
                  key={day.date}
                  className="p-4 bg-secondary/30 rounded-lg border border-border hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold">{day.date}</h4>
                    <Badge variant={day.violations > 0 ? 'destructive' : 'default'}>
                      {day.violations} violations
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-muted-foreground">Distance</p>
                        <p className="font-semibold">{day.distance} km</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-muted-foreground">Avg Speed</p>
                        <p className="font-semibold">{day.avgSpeed} km/h</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-muted-foreground">Routes</p>
                        <p className="font-semibold">{day.routes}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-muted-foreground">Deliveries</p>
                        <p className="font-semibold">{day.deliveries}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="violations" className="mt-4">
              <p className="text-muted-foreground text-center py-8">
                Showing only days with violations
              </p>
            </TabsContent>

            <TabsContent value="performance" className="mt-4">
              <p className="text-muted-foreground text-center py-8">
                Performance metrics and trends
              </p>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default History;
