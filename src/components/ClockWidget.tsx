import React, { useState, useEffect } from 'react';
import { Widget } from './Widget';

interface ClockWidgetProps {
  title: string;
  onRemove: () => void;
  number?: number;
}

export const ClockWidget: React.FC<ClockWidgetProps> = ({ title, onRemove, number }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: true,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getTimeOfDay = () => {
    const hour = time.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <Widget title={title} onRemove={onRemove} number={number}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>
          {getTimeOfDay()}
        </div>
        
        <div style={{ 
          fontSize: '36px', 
          fontWeight: 'bold', 
          color: '#2d3748',
          fontFamily: 'monospace',
          marginBottom: '10px',
          letterSpacing: '1px'
        }}>
          {formatTime(time)}
        </div>
        
        <div style={{ 
          fontSize: '14px', 
          color: '#666',
          marginBottom: '15px'
        }}>
          {formatDate(time)}
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '10px',
          marginTop: '20px'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{time.getHours()}</div>
            <div style={{ fontSize: '11px', color: '#666' }}>Hours</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{time.getMinutes()}</div>
            <div style={{ fontSize: '11px', color: '#666' }}>Minutes</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{time.getSeconds()}</div>
            <div style={{ fontSize: '11px', color: '#666' }}>Seconds</div>
          </div>
        </div>
      </div>
    </Widget>
  );
};
