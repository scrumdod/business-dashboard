import React from 'react';
import { Widget } from './Widget';

interface ChartWidgetProps {
  title: string;
  onRemove: () => void;
  number?: number;
}

export const ChartWidget: React.FC<ChartWidgetProps> = ({ title, onRemove, number }) => {
  // Sample data for the chart
  const data = [
    { month: 'Jan', value: 65 },
    { month: 'Feb', value: 78 },
    { month: 'Mar', value: 52 },
    { month: 'Apr', value: 91 },
    { month: 'May', value: 85 },
    { month: 'Jun', value: 97 },
  ];

  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <Widget title={title} onRemove={onRemove} number={number}>
      <div style={{ flex: 1, display: 'flex', alignItems: 'end', gap: '10px', padding: '10px', minHeight: 0 }}>
        {data.map((item, index) => (
          <div
            key={index}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
              minHeight: 0,
            }}
          >
            <div
              style={{
                height: `${(item.value / maxValue) * 160}px`,
                background: `linear-gradient(to top, #667eea, #764ba2)`,
                width: '100%',
                borderRadius: '4px 4px 0 0',
                transition: 'all 0.3s ease',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                minHeight: '15px',
              }}
            />
            <span style={{ fontSize: '12px', fontWeight: '500' }}>{item.month}</span>
            <span style={{ fontSize: '11px', color: '#666' }}>{item.value}</span>
          </div>
        ))}
      </div>
    </Widget>
  );
};
