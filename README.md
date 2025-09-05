# Dashboard Proto

A beautiful, interactive React dashboard with draggable widgets built using CSS Grid and Sortable.js.

## Features

- 🎯 **Drag & Drop**: Rearrange widgets by dragging them around
- 📱 **Multi-Column Layouts**: Supports 1, 2, 3, or 4 column layouts
- 💾 **Smart Layout Persistence**: Saves different layouts for each column configuration
- 🔄 **Responsive Auto-Detection**: Automatically switches layouts based on screen size
- 🎛️ **Manual Column Control**: Override automatic detection with manual column selection
- 🎨 **Compact Design**: Optimized widget height for better screen usage
- 🧩 **Multiple Widget Types**: Chart, Stats, Weather, Todo List, Clock

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to the local server URL (typically http://localhost:5173)

## Usage

- **Drag Widgets**: Click and drag any widget to rearrange the layout
- **Column Selection**: Use the numbered buttons (1, 2, 3, 4) to manually set column count
- **Auto Mode**: Click "Auto" to let the system automatically detect optimal columns based on screen size
- **Add Widgets**: Click the "+ Add Widget" button to add random new widgets
- **Remove Widgets**: Click the × button in the top-right corner of any widget
- **Reset Layout**: Click "Reset Layout" to return to the default arrangement for current column count
- **Clear All**: Click "Clear All" to remove all saved layouts and start fresh

## Smart Layout System

The dashboard features an intelligent layout system that:

1. **Automatically detects** the optimal number of columns based on your screen size:
   - Mobile (≤480px): 1 column
   - Tablet (481-768px): 2 columns  
   - Desktop (769-1024px): 3 columns
   - Large screens (>1024px): 4 columns

2. **Saves separate layouts** for each column configuration - your 1-column mobile layout is independent from your 4-column desktop layout

3. **Remembers your preferences** - when you switch between devices or resize your browser, it loads the appropriate layout you've customized

4. **Manual override** - you can force any column count regardless of screen size using the column selector buttons

## Widget Types

1. **Statistics Widget**: Key metrics with trend indicators
2. **Chart Widget**: Animated bar chart visualization
3. **Weather Widget**: Current weather conditions (simulated data)
4. **Todo Widget**: Interactive task list with add/remove functionality
5. **Clock Widget**: Live time and date display

## Technologies Used

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Sortable.js** for drag-and-drop functionality
- **CSS Grid** for responsive layout
- **LocalStorage** for data persistence

## Customization

### Adding New Widget Types

1. Create a new widget component in `src/components/`
2. Add the widget type to the `WidgetData` interface in `App.tsx`
3. Update the `renderWidget` function to handle your new widget type
4. Update the `addWidget` function to include your new widget in the random selection

### Styling

The main styles are in `src/index.css`. The design uses:
- CSS Grid for layout
- Glassmorphism effects with backdrop-filter
- Smooth CSS transitions and hover effects
- Responsive breakpoints for mobile devices

## Browser Support

Modern browsers that support:
- CSS Grid
- CSS backdrop-filter
- ES6+ JavaScript features
