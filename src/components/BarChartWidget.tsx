import React from 'react';
import { Widget } from './Widget';

interface BarChartWidgetProps {
  title: string;
  onRemove: () => void;
  number?: number;
  data: Array<{ label: string; value: number; color?: string }>;
  prefix?: string;
}

export const BarChartWidget: React.FC<BarChartWidgetProps> = ({ 
  title, 
  onRemove, 
  number, 
  data, 
  prefix = '$' 
}) => {
  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <Widget title={title} onRemove={onRemove} number={number}>
      <div style={{ flex: 1, display: 'flex', alignItems: 'end', gap: '8px', padding: '10px', minHeight: 0 }}>
        {data.map((item, index) => (
          <div
            key={index}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px',
              minHeight: 0,
            }}
          >
            <div
              style={{
                height: `${(item.value / maxValue) * 120}px`,
                background: item.color || `linear-gradient(to top, #667eea, #764ba2)`,
                width: '100%',
                borderRadius: '4px 4px 0 0',
                transition: 'all 0.3s ease',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                minHeight: '8px',
                display: 'flex',
                alignItems: 'end',
                justifyContent: 'center',
                color: 'white',
                fontSize: '9px',
                fontWeight: 'bold',
                padding: '2px',
              }}
            >
              {item.value > 0 ? `${prefix}${item.value.toLocaleString()}` : ''}
            </div>
            <span style={{ fontSize: '10px', fontWeight: '500', textAlign: 'center' }}>
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </Widget>
  );
};
