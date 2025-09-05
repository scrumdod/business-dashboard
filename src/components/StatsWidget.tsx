import React from 'react';
import { Widget } from './Widget';

interface StatsWidgetProps {
  title: string;
  onRemove: () => void;
  number?: number;
}

export const StatsWidget: React.FC<StatsWidgetProps> = ({ title, onRemove, number }) => {
  const stats = [
    { label: 'Total Users', value: '12,543', change: '+15%', positive: true },
    { label: 'Revenue', value: '$45,231', change: '+8%', positive: true },
    { label: 'Bounce Rate', value: '2.1%', change: '-12%', positive: true },
    { label: 'Conversion', value: '3.7%', change: '+23%', positive: true },
  ];

  return (
    <Widget title={title} onRemove={onRemove} number={number}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
        {stats.map((stat, index) => (
          <div
            key={index}
            style={{
              textAlign: 'center',
              padding: '15px',
              background: 'rgba(255, 255, 255, 0.5)',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.3)',
            }}
          >
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#2d3748', marginBottom: '5px' }}>
              {stat.value}
            </div>
            <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>
              {stat.label}
            </div>
            <div
              style={{
                fontSize: '11px',
                color: stat.positive ? '#48bb78' : '#f56565',
                fontWeight: '500',
              }}
            >
              {stat.change}
            </div>
          </div>
        ))}
      </div>
    </Widget>
  );
};
