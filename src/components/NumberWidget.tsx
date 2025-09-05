import React from 'react';
import { Widget } from './Widget';

interface NumberWidgetProps {
  title: string;
  number: number;
  onRemove: () => void;
}

export const NumberWidget: React.FC<NumberWidgetProps> = ({ title, number, onRemove }) => {
  return (
    <Widget title={title} onRemove={onRemove} number={number}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'column',
        gap: '15px'
      }}>
        <div style={{ 
          fontSize: '72px', 
          fontWeight: 'bold', 
          color: '#667eea',
          textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
        }}>
          {number}
        </div>
        <div style={{
          fontSize: '14px',
          color: '#666',
          textAlign: 'center',
          fontStyle: 'italic'
        }}>
          Widget #{number}
        </div>
      </div>
    </Widget>
  );
};
