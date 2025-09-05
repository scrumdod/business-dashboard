import React from 'react';

interface WidgetProps {
  title: string;
  children?: React.ReactNode;
  onRemove: () => void;
  number?: number;
}

export const Widget: React.FC<WidgetProps> = ({ title, children, onRemove, number }) => {
  return (
    <div className="widget">
      <div className="widget-title">
        {number && (
          <span style={{
            backgroundColor: '#667eea',
            color: 'white',
            borderRadius: '50%',
            width: '24px',
            height: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '12px',
            fontWeight: 'bold',
            marginRight: '8px',
            flexShrink: 0
          }}>
            {number}
          </span>
        )}
        {title}
        <button 
          onClick={onRemove}
          style={{
            marginLeft: 'auto',
            background: 'none',
            border: 'none',
            fontSize: '16px',
            cursor: 'pointer',
            color: '#999',
            transition: 'color 0.2s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#f56565'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#999'}
        >
          ×
        </button>
      </div>
      <div className="widget-content">
        {children || (
          <div style={{ textAlign: 'center', color: '#666' }}>
            Widget content goes here
          </div>
        )}
      </div>
    </div>
  );
};
