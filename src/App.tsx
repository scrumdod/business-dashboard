import { useState, useEffect, useRef } from 'react';
import Sortable from 'sortablejs';
import { WeatherWidget } from './components/WeatherWidget';
import { TodoWidget } from './components/TodoWidget';
import { NumberWidget } from './components/NumberWidget';
import { BarChartWidget } from './components/BarChartWidget';
import { AccountWidget } from './components/AccountWidget';
import { ExpenseWidget } from './components/ExpenseWidget';

export interface WidgetData {
  id: string;
  type: 'chart' | 'stats' | 'weather' | 'todo' | 'clock' | 'number';
  title: string;
  number?: number;
}

type ColumnCount = 1 | 2 | 3 | 4;

interface LayoutStorage {
  [key: number]: WidgetData[];
}

function App() {
  const defaultWidgets: WidgetData[] = [
    { id: '1', type: 'number', title: 'Weather', number: 1 },
    { id: '2', type: 'number', title: 'Invoices Owed to You', number: 2 },
    { id: '3', type: 'number', title: 'Task List', number: 3 },
    { id: '4', type: 'number', title: 'Total Cash In and Out', number: 4 },
    { id: '5', type: 'number', title: 'Bills You Need to Pay', number: 5 },
    { id: '6', type: 'number', title: 'Business Savings Account', number: 6 },
    { id: '7', type: 'number', title: 'Current Account', number: 7 },
    { id: '8', type: 'number', title: 'Expense Claims', number: 8 },
    { id: '9', type: 'number', title: 'Widget', number: 9 },
    { id: '10', type: 'number', title: 'Widget', number: 10 },
  ];

  const [widgets, setWidgets] = useState<WidgetData[]>(defaultWidgets);
  const [columnCount, setColumnCount] = useState<ColumnCount>(4);
  const [manualColumnOverride, setManualColumnOverride] = useState<ColumnCount | null>(null);
  const [overrideDefaults, setOverrideDefaults] = useState<boolean>(false);
  const [syncNotification, setSyncNotification] = useState<string>('');

  const gridRef = useRef<HTMLDivElement>(null);

  // Detect column count based on viewport width
  const detectColumnCount = (): ColumnCount => {
    if (manualColumnOverride) return manualColumnOverride;
    
    const width = window.innerWidth;
    if (width <= 480) return 1;
    if (width <= 768) return 2;
    if (width <= 1024) return 3;
    return 4;
  };

  // Save layout for specific column count
  const saveLayoutForColumns = (widgetList: WidgetData[], columns: ColumnCount) => {
    try {
      const existingLayouts = localStorage.getItem('dashboard-layouts');
      const layouts: LayoutStorage = existingLayouts ? JSON.parse(existingLayouts) : {};
      layouts[columns] = widgetList;
      localStorage.setItem('dashboard-layouts', JSON.stringify(layouts));
      
      // Also track that this layout is now "saved" (not default)
      const savedStatus = localStorage.getItem('dashboard-saved-status');
      const savedLayouts: {[key: number]: boolean} = savedStatus ? JSON.parse(savedStatus) : {};
      savedLayouts[columns] = true;
      localStorage.setItem('dashboard-saved-status', JSON.stringify(savedLayouts));
    } catch (error) {
      console.error('Error saving layout:', error);
    }
  };

  // Check if a layout has been saved (vs using defaults)
  const isLayoutSaved = (columns: ColumnCount): boolean => {
    try {
      const savedStatus = localStorage.getItem('dashboard-saved-status');
      if (savedStatus) {
        const savedLayouts: {[key: number]: boolean} = JSON.parse(savedStatus);
        return savedLayouts[columns] || false;
      }
    } catch (error) {
      console.error('Error checking saved status:', error);
    }
    return false;
  };

  // Load layout for specific column count
  const loadLayoutForColumns = (columns: ColumnCount): WidgetData[] => {
    try {
      const existingLayouts = localStorage.getItem('dashboard-layouts');
      if (existingLayouts) {
        const layouts: LayoutStorage = JSON.parse(existingLayouts);
        const savedLayout = layouts[columns];
        
        if (savedLayout) {
          // Check if all widgets have proper numbers, if not, fall back to default
          const hasValidNumbers = savedLayout.every(widget => widget.number && widget.number > 0);
          if (hasValidNumbers) {
            console.log('Loading saved layout for', columns, 'columns:', savedLayout.map(w => w.number));
            return savedLayout;
          } else {
            console.log('Saved layout has invalid numbers, using defaults');
          }
        }
      }
    } catch (error) {
      console.error('Error loading layout:', error);
    }
    console.log('Using default widgets for', columns, 'columns:', defaultWidgets.map(w => w.number));
    return defaultWidgets;
  };

  // Initialize column count and load initial layout
  useEffect(() => {
    const initialColumns = detectColumnCount();
    setColumnCount(initialColumns);
    const initialLayout = loadLayoutForColumns(initialColumns);
    setWidgets(initialLayout);
  }, []);

  // Handle window resize to update column count
  useEffect(() => {
    const handleResize = () => {
      const newColumnCount = detectColumnCount();
      if (newColumnCount !== columnCount) {
        // Save current layout before switching
        saveLayoutForColumns(widgets, columnCount);
        
        // Switch to new column count and load its layout
        setColumnCount(newColumnCount);
        const newLayout = loadLayoutForColumns(newColumnCount);
        setWidgets(newLayout);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [columnCount, widgets]);

  // Sortable drag and drop
  useEffect(() => {
    if (gridRef.current) {
      const sortable = Sortable.create(gridRef.current, {
        animation: 300,
        ghostClass: 'sortable-ghost',
        dragClass: 'sortable-drag',
        onEnd: (evt) => {
          const { oldIndex, newIndex } = evt;
          if (oldIndex !== undefined && newIndex !== undefined && oldIndex !== newIndex) {
            const newWidgets = [...widgets];
            const [movedWidget] = newWidgets.splice(oldIndex, 1);
            newWidgets.splice(newIndex, 0, movedWidget);
            setWidgets(newWidgets);
            saveLayoutForColumns(newWidgets, columnCount);
          }
        },
      });

      return () => sortable.destroy();
    }
  }, [widgets, columnCount]);

  const addWidget = () => {
    // Find the highest number currently in use across all widgets
    const existingNumbers = widgets.map(w => w.number || 0);
    const nextNumber = existingNumbers.length > 0 ? Math.max(...existingNumbers) + 1 : 1;
    
    const newWidget: WidgetData = {
      id: Date.now().toString(),
      type: 'number',
      title: 'Widget',
      number: nextNumber,
    };

    const updatedWidgets = [...widgets, newWidget];
    setWidgets(updatedWidgets);
    saveLayoutForColumns(updatedWidgets, columnCount);

    // Add the same widget to ALL other saved layouts
    try {
      const existingLayouts = localStorage.getItem('dashboard-layouts');
      if (existingLayouts) {
        const layouts: LayoutStorage = JSON.parse(existingLayouts);
        let updatedCount = 0;

        ([1, 2, 3, 4] as ColumnCount[]).forEach(cols => {
          if (cols !== columnCount && layouts[cols]) {
            layouts[cols] = [...layouts[cols], newWidget];
            updatedCount++;
          }
        });

        if (updatedCount > 0) {
          localStorage.setItem('dashboard-layouts', JSON.stringify(layouts));
          showSyncNotification(`Added widget to ${updatedCount} other layout${updatedCount > 1 ? 's' : ''}`);
        }
      }
    } catch (error) {
      console.error('Error adding widget to other layouts:', error);
    }
  };

  const removeWidget = (id: string) => {
    const updatedWidgets = widgets.filter(widget => widget.id !== id);
    setWidgets(updatedWidgets);
    saveLayoutForColumns(updatedWidgets, columnCount);

    // Remove the same widget from ALL other saved layouts
    try {
      const existingLayouts = localStorage.getItem('dashboard-layouts');
      if (existingLayouts) {
        const layouts: LayoutStorage = JSON.parse(existingLayouts);
        let updatedCount = 0;

        ([1, 2, 3, 4] as ColumnCount[]).forEach(cols => {
          if (cols !== columnCount && layouts[cols]) {
            const originalLength = layouts[cols].length;
            layouts[cols] = layouts[cols].filter(widget => widget.id !== id);
            if (layouts[cols].length !== originalLength) {
              updatedCount++;
            }
          }
        });

        if (updatedCount > 0) {
          localStorage.setItem('dashboard-layouts', JSON.stringify(layouts));
          showSyncNotification(`Removed widget from ${updatedCount} other layout${updatedCount > 1 ? 's' : ''}`);
        }
      }
    } catch (error) {
      console.error('Error removing widget from other layouts:', error);
    }
  };

  const resetLayout = () => {
    setWidgets(defaultWidgets);
    saveLayoutForColumns(defaultWidgets, columnCount);
  };

  const setManualColumns = (columns: ColumnCount) => {
    // Save current layout before switching
    saveLayoutForColumns(widgets, columnCount);
    
    // Set manual override and switch to new column count
    setManualColumnOverride(columns);
    setColumnCount(columns);
    
    // Load layout for new column count
    const newLayout = loadLayoutForColumns(columns);
    setWidgets(newLayout);
  };

  const resetToAutoColumns = () => {
    // Save current layout
    saveLayoutForColumns(widgets, columnCount);
    
    // Clear manual override and detect columns
    setManualColumnOverride(null);
    const autoColumns = detectColumnCount();
    setColumnCount(autoColumns);
    
    // Load layout for auto-detected column count
    const newLayout = loadLayoutForColumns(autoColumns);
    setWidgets(newLayout);
  };

  // Show sync notification
  const showSyncNotification = (message: string) => {
    setSyncNotification(message);
    setTimeout(() => setSyncNotification(''), 3000); // Clear after 3 seconds
  };

  // Save layout with override defaults logic
  const saveLayoutWithOverride = () => {
    if (!overrideDefaults) {
      // Just save current layout normally
      saveLayoutForColumns(widgets, columnCount);
      showSyncNotification('Layout saved');
      return;
    }

    // Override defaults: sync current sequence to unsaved layouts
    const currentSequence = widgets;
    let syncedCount = 0;

    try {
      ([1, 2, 3, 4] as ColumnCount[]).forEach(cols => {
        if (cols !== columnCount && !isLayoutSaved(cols)) {
          // This layout is still using defaults, so override it
          saveLayoutForColumns(currentSequence, cols);
          syncedCount++;
        }
      });

      // Always save the current layout too
      saveLayoutForColumns(currentSequence, columnCount);

      if (syncedCount > 0) {
        showSyncNotification(`Saved layout and synced to ${syncedCount} default layout${syncedCount > 1 ? 's' : ''}`);
      } else {
        showSyncNotification('Layout saved (no defaults to sync)');
      }
    } catch (error) {
      console.error('Error syncing layouts:', error);
      showSyncNotification('Error saving layout');
    }
  };

  const clearAllLayouts = () => {
    // Clear everything completely
    localStorage.clear(); // Clear ALL localStorage, not just dashboard-layouts
    console.log('=== COMPLETE RESET ===');
    console.log('Cleared ALL localStorage');
    console.log('Resetting to fresh default widgets:', defaultWidgets.map(w => ({ id: w.id, number: w.number })));
    
    // Force a complete reset with fresh widget instances
    const freshWidgets = defaultWidgets.map(widget => ({ ...widget }));
    setWidgets(freshWidgets);
    
    // Reset column state and override toggle
    setManualColumnOverride(null);
    setOverrideDefaults(false);
    const autoColumns = detectColumnCount();
    setColumnCount(autoColumns);
  };

  const renderWidget = (widget: WidgetData) => {
    const widgetNumber = widget.number || 0;
    const commonProps = {
      title: widget.title,
      onRemove: () => removeWidget(widget.id),
      number: widgetNumber,
    };

    // Render specific business widgets based on number
    switch (widgetNumber) {
      case 1: // Weather
        return <WeatherWidget {...commonProps} />;
      
      case 2: // Invoices Owed
        return <BarChartWidget 
          {...commonProps} 
          data={[
            { label: 'Client A', value: 2500, color: 'linear-gradient(to top, #48bb78, #38a169)' },
            { label: 'Client B', value: 1800, color: 'linear-gradient(to top, #4299e1, #3182ce)' },
            { label: 'Client C', value: 3200, color: 'linear-gradient(to top, #ed8936, #dd6b20)' },
            { label: 'Client D', value: 950, color: 'linear-gradient(to top, #9f7aea, #805ad5)' },
          ]}
        />;
      
      case 3: // Task List
        return <TodoWidget {...commonProps} />;
      
      case 4: // Cash In/Out
        return <BarChartWidget 
          {...commonProps} 
          data={[
            { label: 'Jan In', value: 8500, color: 'linear-gradient(to top, #48bb78, #38a169)' },
            { label: 'Jan Out', value: 4200, color: 'linear-gradient(to top, #f56565, #e53e3e)' },
            { label: 'Feb In', value: 9200, color: 'linear-gradient(to top, #48bb78, #38a169)' },
            { label: 'Feb Out', value: 3800, color: 'linear-gradient(to top, #f56565, #e53e3e)' },
          ]}
        />;
      
      case 5: // Bills to Pay
        return <BarChartWidget 
          {...commonProps} 
          data={[
            { label: 'Rent', value: 2000, color: 'linear-gradient(to top, #f56565, #e53e3e)' },
            { label: 'Utilities', value: 350, color: 'linear-gradient(to top, #ed8936, #dd6b20)' },
            { label: 'Software', value: 450, color: 'linear-gradient(to top, #4299e1, #3182ce)' },
            { label: 'Insurance', value: 280, color: 'linear-gradient(to top, #9f7aea, #805ad5)' },
          ]}
        />;
      
      case 6: // Business Savings
        return <AccountWidget 
          {...commonProps} 
          balance={5000} 
          accountType="Business Savings"
        />;
      
      case 7: // Current Account
        return <AccountWidget 
          {...commonProps} 
          balance={25000} 
          accountType="Current Account"
        />;
      
      case 8: // Expense Claims
        return <ExpenseWidget {...commonProps} />;
      
      default: // Keep numbered boxes for widgets 9, 10+
        return <NumberWidget 
          title={widget.title}
          onRemove={() => removeWidget(widget.id)}
          number={widgetNumber}
        />;
    }
  };

  
  return (
    <div className="app">
      {syncNotification && (
        <div style={{
          position: 'fixed',
          bottom: '160px',
          right: '20px',
          background: 'rgba(34, 197, 94, 0.9)',
          color: 'white',
          padding: '10px 15px',
          borderRadius: '6px',
          fontSize: '12px',
          fontWeight: '500',
          zIndex: 1000,
          backdropFilter: 'blur(10px)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
        }}>
          ✅ {syncNotification}
        </div>
      )}

      <div className="dashboard-controls">
        <div className="controls-row">
          <button className="control-btn add" onClick={addWidget}>
            + Add Widget
          </button>
          <button className="control-btn reset" onClick={resetLayout}>
            Reset Layout
          </button>
          <button className="control-btn" onClick={clearAllLayouts}>
            Clear All
          </button>
          <button 
            className="control-btn"
            onClick={saveLayoutWithOverride}
            style={{
              background: overrideDefaults ? 'rgba(102, 126, 234, 0.9)' : 'rgba(255, 255, 255, 0.9)',
              color: overrideDefaults ? 'white' : 'inherit'
            }}
          >
            💾 Save Layout
          </button>
        </div>
        
        <div className="controls-row">
          <label style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255, 255, 255, 0.9)',
            padding: '8px 12px',
            borderRadius: '6px',
            fontSize: '12px',
            fontWeight: '500',
            cursor: 'pointer',
            backdropFilter: 'blur(10px)'
          }}>
            <input
              type="checkbox"
              checked={overrideDefaults}
              onChange={(e) => setOverrideDefaults(e.target.checked)}
              style={{ accentColor: '#667eea' }}
            />
            Override Defaults
          </label>
        </div>
        
        <div className="controls-row">
          <div className="column-selector">
            {[1, 2, 3, 4].map((cols) => (
              <button
                key={cols}
                className={`column-btn ${columnCount === cols ? 'active' : ''}`}
                onClick={() => setManualColumns(cols as ColumnCount)}
                title={`${cols} column${cols > 1 ? 's' : ''}`}
              >
                {cols}
              </button>
            ))}
          </div>
          <button 
            className="control-btn" 
            onClick={resetToAutoColumns}
            title="Auto-detect columns based on screen size"
          >
            Auto
          </button>
        </div>
        
        <div className="layout-info">
          {columnCount} Column{columnCount > 1 ? 's' : ''} 
          {manualColumnOverride ? ' (Manual)' : ' (Auto)'}
          <br />
          {widgets.length} Widget{widgets.length !== 1 ? 's' : ''}
        </div>
      </div>

      <div ref={gridRef} className={`dashboard-grid columns-${columnCount}`}>
        {widgets.map((widget) => (
          <div key={widget.id}>
            {renderWidget(widget)}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
