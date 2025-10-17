import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Send, Phone, MapPin, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { toast } from 'sonner';

const quickSignals = [
  { id: 'pickup', label: 'Ready for Pickup', icon: CheckCircle, color: 'success' },
  { id: 'delay', label: 'Delayed', icon: Clock, color: 'warning' },
  { id: 'help', label: 'Need Help', icon: AlertCircle, color: 'destructive' },
  { id: 'return', label: 'Return to Base', icon: MapPin, color: 'default' },
];

export const CommunicationPanel = () => {
  const [selectedSignal, setSelectedSignal] = useState<string | null>(null);
  const [messages, setMessages] = useState([
    { id: 1, from: 'admin', text: 'Continue to next delivery', time: '14:20', status: 'delivered' },
    { id: 2, from: 'driver', text: 'Acknowledged', time: '14:21', status: 'delivered' },
  ]);

  const sendSignal = (signalId: string) => {
    const signal = quickSignals.find(s => s.id === signalId);
    if (!signal) return;

    setSelectedSignal(signalId);
    setTimeout(() => setSelectedSignal(null), 2000);

    toast.success(`Signal sent: ${signal.label}`);
    
    setMessages(prev => [...prev, {
      id: Date.now(),
      from: 'admin',
      text: signal.label,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      status: 'sent'
    }]);
  };

  return (
    <Card className="bg-card border-border shadow-card p-6">
      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Send className="h-5 w-5 text-primary" />
        Driver Communication
      </h3>

      {/* Quick Signals */}
      <div className="space-y-3 mb-6">
        <h4 className="text-sm font-medium text-muted-foreground">Quick Signals</h4>
        <div className="grid grid-cols-2 gap-3">
          {quickSignals.map((signal) => (
            <Button
              key={signal.id}
              variant={selectedSignal === signal.id ? 'default' : 'outline'}
              className="justify-start gap-2 h-auto py-3"
              onClick={() => sendSignal(signal.id)}
            >
              <signal.icon className="h-4 w-4" />
              <span className="text-sm">{signal.label}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Message History */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-muted-foreground">Recent Messages</h4>
        <div className="space-y-2 max-h-[300px] overflow-y-auto">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`p-3 rounded-lg ${
                msg.from === 'admin'
                  ? 'bg-primary/10 ml-8'
                  : 'bg-secondary/50 mr-8'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium capitalize">{msg.from}</span>
                <span className="text-xs text-muted-foreground">{msg.time}</span>
              </div>
              <p className="text-sm">{msg.text}</p>
              {msg.status && (
                <Badge variant="outline" className="mt-2 text-xs">
                  {msg.status}
                </Badge>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="mt-6 p-4 bg-destructive/10 border border-destructive rounded-lg">
        <Button variant="destructive" className="w-full gap-2">
          <Phone className="h-4 w-4" />
          Emergency Call
        </Button>
      </div>
    </Card>
  );
};
