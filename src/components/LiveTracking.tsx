import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Navigation, Zap, MapPin, Clock, AlertTriangle } from 'lucide-react';

// Mock data - replace with real FMC920 GPS data
const mockData = {
  id: 'MOTO-001',
  driver: 'Marco Rossi',
  speed: 45,
  acceleration: 2.3,
  lat: 41.9028,
  lng: 12.4964,
  heading: 135,
  eta: '14:32',
  zone: 'Zone A',
  speedLimit: 50,
  isGeofenceViolation: false,
  isSpeedViolation: false,
};

export const LiveTracking = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);
  const [motorcycleData, setMotorcycleData] = useState(mockData);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    mapboxgl.accessToken = 'YOUR_MAPBOX_TOKEN_HERE';
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [motorcycleData.lng, motorcycleData.lat],
      zoom: 13,
      pitch: 45,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Create custom marker
    const el = document.createElement('div');
    el.className = 'custom-marker';
    el.style.width = '30px';
    el.style.height = '30px';
    el.style.backgroundImage = 'url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCAzMCAzMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxNSIgY3k9IjE1IiByPSIxNCIgZmlsbD0iIzM5OEJGRiIgZmlsbC1vcGFjaXR5PSIwLjIiLz48Y2lyY2xlIGN4PSIxNSIgY3k9IjE1IiByPSI4IiBmaWxsPSIjMzk4QkZGIi8+PC9zdmc+)';
    el.style.backgroundSize = 'cover';

    marker.current = new mapboxgl.Marker(el)
      .setLngLat([motorcycleData.lng, motorcycleData.lat])
      .addTo(map.current);

    // Simulate real-time updates
    const interval = setInterval(() => {
      setMotorcycleData(prev => ({
        ...prev,
        speed: Math.max(0, prev.speed + (Math.random() - 0.5) * 10),
        acceleration: (Math.random() - 0.5) * 5,
        lat: prev.lat + (Math.random() - 0.5) * 0.001,
        lng: prev.lng + (Math.random() - 0.5) * 0.001,
        isSpeedViolation: Math.random() > 0.8,
      }));
    }, 3000);

    return () => {
      clearInterval(interval);
      map.current?.remove();
    };
  }, []);

  useEffect(() => {
    if (marker.current) {
      marker.current.setLngLat([motorcycleData.lng, motorcycleData.lat]);
      map.current?.flyTo({
        center: [motorcycleData.lng, motorcycleData.lat],
        zoom: 13,
        duration: 1000,
      });
    }
  }, [motorcycleData.lat, motorcycleData.lng]);

  return (
    <Card className="bg-card border-border shadow-card overflow-hidden">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Navigation className="h-5 w-5 text-primary" />
              {motorcycleData.id}
            </h3>
            <p className="text-sm text-muted-foreground">{motorcycleData.driver}</p>
          </div>
          <div className="flex gap-2">
            <Badge variant={motorcycleData.isSpeedViolation ? "destructive" : "default"}>
              <div className="w-2 h-2 rounded-full bg-success mr-2 animate-pulse" />
              Live
            </Badge>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
        {/* Map */}
        <div className="lg:col-span-1">
          <div ref={mapContainer} className="h-[400px] rounded-lg overflow-hidden shadow-lg" />
        </div>

        {/* Metrics */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <MetricCard
              icon={<Zap className="h-4 w-4" />}
              label="Speed"
              value={`${motorcycleData.speed.toFixed(1)} km/h`}
              status={motorcycleData.isSpeedViolation ? 'danger' : 'normal'}
              limit={`Limit: ${motorcycleData.speedLimit} km/h`}
            />
            <MetricCard
              icon={<Zap className="h-4 w-4" />}
              label="Acceleration"
              value={`${motorcycleData.acceleration.toFixed(1)} m/s²`}
              status="normal"
            />
            <MetricCard
              icon={<MapPin className="h-4 w-4" />}
              label="Latitude"
              value={motorcycleData.lat.toFixed(6)}
              status="normal"
            />
            <MetricCard
              icon={<MapPin className="h-4 w-4" />}
              label="Longitude"
              value={motorcycleData.lng.toFixed(6)}
              status="normal"
            />
            <MetricCard
              icon={<Clock className="h-4 w-4" />}
              label="ETA"
              value={motorcycleData.eta}
              status="normal"
            />
            <MetricCard
              icon={<AlertTriangle className="h-4 w-4" />}
              label="Zone"
              value={motorcycleData.zone}
              status={motorcycleData.isGeofenceViolation ? 'warning' : 'normal'}
            />
          </div>

          {/* Alerts */}
          {(motorcycleData.isSpeedViolation || motorcycleData.isGeofenceViolation) && (
            <div className="p-4 bg-destructive/10 border border-destructive rounded-lg">
              <h4 className="font-semibold text-destructive mb-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Active Alerts
              </h4>
              <ul className="space-y-1 text-sm">
                {motorcycleData.isSpeedViolation && (
                  <li className="text-destructive-foreground">⚠️ Speed violation detected</li>
                )}
                {motorcycleData.isGeofenceViolation && (
                  <li className="text-destructive-foreground">⚠️ Geofence boundary crossed</li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  status: 'normal' | 'warning' | 'danger';
  limit?: string;
}

const MetricCard = ({ icon, label, value, status, limit }: MetricCardProps) => {
  const getBgColor = () => {
    switch (status) {
      case 'danger': return 'bg-destructive/10 border-destructive';
      case 'warning': return 'bg-warning/10 border-warning';
      default: return 'bg-secondary/50 border-border';
    }
  };

  return (
    <div className={`p-4 rounded-lg border ${getBgColor()} transition-colors`}>
      <div className="flex items-center gap-2 text-muted-foreground mb-1">
        {icon}
        <span className="text-xs font-medium">{label}</span>
      </div>
      <div className="text-xl font-bold">{value}</div>
      {limit && <div className="text-xs text-muted-foreground mt-1">{limit}</div>}
    </div>
  );
};
