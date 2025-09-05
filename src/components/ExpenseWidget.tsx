import React from 'react';
import { Widget } from './Widget';

interface Expense {
  id: number;
  description: string;
  amount: number;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
}

interface ExpenseWidgetProps {
  title: string;
  onRemove: () => void;
  number?: number;
}

export const ExpenseWidget: React.FC<ExpenseWidgetProps> = ({ title, onRemove, number }) => {
  const expenses: Expense[] = [
    { id: 1, description: 'Office Supplies', amount: 127.50, date: '2024-01-05', status: 'pending' },
    { id: 2, description: 'Business Lunch', amount: 85.00, date: '2024-01-04', status: 'approved' },
    { id: 3, description: 'Software License', amount: 299.99, date: '2024-01-03', status: 'pending' },
    { id: 4, description: 'Travel Expenses', amount: 450.25, date: '2024-01-02', status: 'pending' },
    { id: 5, description: 'Marketing Materials', amount: 175.00, date: '2024-01-01', status: 'approved' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return '#48bb78';
      case 'rejected': return '#f56565';
      default: return '#ed8936';
    }
  };

  const totalPending = expenses
    .filter(exp => exp.status === 'pending')
    .reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <Widget title={title} onRemove={onRemove} number={number}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1, minHeight: 0 }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '8px',
          background: 'rgba(237, 137, 54, 0.1)',
          borderRadius: '6px',
          fontSize: '12px'
        }}>
          <span style={{ fontWeight: '600' }}>Pending Claims</span>
          <span style={{ color: '#ed8936', fontWeight: 'bold' }}>
            ${totalPending.toLocaleString()}
          </span>
        </div>
        
        <div style={{ flex: 1, overflowY: 'auto', minHeight: 0, maxHeight: '150px' }}>
          {expenses.map(expense => (
            <div
              key={expense.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '8px 0',
                borderBottom: '1px solid #f0f0f0',
                fontSize: '11px'
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '500', marginBottom: '2px' }}>
                  {expense.description}
                </div>
                <div style={{ color: '#666', fontSize: '9px' }}>
                  {expense.date}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 'bold', marginBottom: '2px' }}>
                  ${expense.amount.toFixed(2)}
                </div>
                <div
                  style={{
                    fontSize: '8px',
                    color: getStatusColor(expense.status),
                    textTransform: 'uppercase',
                    fontWeight: '600'
                  }}
                >
                  {expense.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Widget>
  );
};
