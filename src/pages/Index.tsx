import { LiveTracking } from '@/components/LiveTracking';
import { CommunicationPanel } from '@/components/CommunicationPanel';

const Index = () => {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Live Fleet Tracking</h1>
        <p className="text-muted-foreground">
          Real-time monitoring and control center for your delivery fleet
        </p>
      </div>
      
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <LiveTracking />
        </div>
        <div>
          <CommunicationPanel />
        </div>
      </div>
    </div>
  );
};

export default Index;
