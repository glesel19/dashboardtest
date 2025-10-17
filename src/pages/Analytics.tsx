import { AnalyticsDashboard } from '@/components/AnalyticsDashboard';

const Analytics = () => {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Daily Analytics</h1>
        <p className="text-muted-foreground">
          Comprehensive insights and performance metrics for your fleet
        </p>
      </div>
      <AnalyticsDashboard />
    </div>
  );
};

export default Analytics;
