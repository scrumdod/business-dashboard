import React from 'react';
import { Widget } from './Widget';

interface AccountWidgetProps {
  title: string;
  onRemove: () => void;
  number?: number;
  balance: number;
  accountType: string;
}

export const AccountWidget: React.FC<AccountWidgetProps> = ({ 
  title, 
  onRemove, 
  number, 
  balance,
  accountType 
}) => {
  const isPositive = balance >= 0;
  
  return (
    <Widget title={title} onRemove={onRemove} number={number}>
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center',
        flex: 1,
        gap: '15px',
        textAlign: 'center'
      }}>
        <div style={{
          fontSize: '14px',
          color: '#666',
          fontWeight: '500',
          textTransform: 'uppercase',
          letterSpacing: '1px'
        }}>
          {accountType}
        </div>
        
        <div style={{ 
          fontSize: '36px', 
          fontWeight: 'bold', 
          color: isPositive ? '#48bb78' : '#f56565',
          textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
        }}>
          ${balance.toLocaleString()}
        </div>
        
        <div style={{
          fontSize: '12px',
          color: '#999',
          fontStyle: 'italic'
        }}>
          Current Balance
        </div>
        
        <div style={{
          display: 'flex',
          gap: '10px',
          marginTop: '10px'
        }}>
          <div style={{
            padding: '4px 8px',
            background: isPositive ? 'rgba(72, 187, 120, 0.1)' : 'rgba(245, 101, 101, 0.1)',
            borderRadius: '4px',
            fontSize: '10px',
            color: isPositive ? '#48bb78' : '#f56565'
          }}>
            {isPositive ? '● POSITIVE' : '● NEGATIVE'}
          </div>
        </div>
      </div>
    </Widget>
  );
};
