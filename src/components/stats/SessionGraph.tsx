import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';
import { useTypingStore } from '../../store';

export const SessionGraph: React.FC = () => {
  const { wpm, wpmHistory, isTyping } = useTypingStore();
  const [graphData, setGraphData] = useState<Array<{ time: number; wpm: number }>>([]);
  const [updateInterval, setUpdateInterval] = useState<NodeJS.Timeout | null>(null);

  // Initialize or update graph data when typing starts/stops
  useEffect(() => {
    if (isTyping && wpm > 0) {
      // Update wpmHistory in store
      const newHistory = [...(wpmHistory || []), wpm].slice(-60); // Keep last 60 entries
      useTypingStore.getState().setWpmHistory(newHistory);
      
      // Create graph data from history
      const data = newHistory.map((value, index) => ({
        time: index + 1,
        wpm: Math.round(value),
      }));
      setGraphData(data);
    } else if (!isTyping && graphData.length === 0) {
      // Show sample data when not typing
      const sampleData = Array.from({ length: 30 }, (_, i) => ({
        time: i + 1,
        wpm: Math.floor(Math.random() * 20) + 40,
      }));
      setGraphData(sampleData);
    }
  }, [isTyping, wpm]);

  // Auto-update interval for simulation
  useEffect(() => {
    if (isTyping) {
      const interval = setInterval(() => {
        if (wpm > 0) {
          const newHistory = [...(wpmHistory || []), wpm].slice(-60);
          useTypingStore.getState().setWpmHistory(newHistory);
          
          const data = newHistory.map((value, index) => ({
            time: index + 1,
            wpm: Math.round(value),
          }));
          setGraphData(data);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isTyping, wpm]);

  // If no data, show placeholder
  if (!graphData || graphData.length === 0) {
    return (
      <div className="mt-8">
        <h3 className="text-lg font-medium mb-4 text-gray-300">WPM Over Time</h3>
        <div className="h-64 bg-gray-800/30 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <div className="text-gray-500 mb-2">Start typing to see your WPM graph</div>
            <div className="text-sm text-gray-600">
              Your typing speed will be plotted here in real-time
            </div>
          </div>
        </div>
      </div>
    );
  }

  const averageWPM = graphData.length > 0 
    ? Math.round(graphData.reduce((sum, point) => sum + point.wpm, 0) / graphData.length)
    : 0;

  const maxWPM = graphData.length > 0 
    ? Math.max(...graphData.map(point => point.wpm))
    : 0;

  const minWPM = graphData.length > 0 
    ? Math.min(...graphData.map(point => point.wpm))
    : 0;

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-300">WPM Over Time</h3>
        <div className="flex gap-4 text-sm">
          <div className="text-blue-400">
            Avg: <span className="font-bold">{averageWPM}</span>
          </div>
          <div className="text-green-400">
            Max: <span className="font-bold">{maxWPM}</span>
          </div>
          <div className="text-red-400">
            Min: <span className="font-bold">{minWPM}</span>
          </div>
        </div>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={graphData}>
            <defs>
              <linearGradient id="colorWpm" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="#374151" 
              horizontal={true}
              vertical={false}
            />
            
            <XAxis
              dataKey="time"
              stroke="#9CA3AF"
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
              axisLine={{ stroke: '#4B5563' }}
              tickLine={{ stroke: '#4B5563' }}
              label={{ 
                value: 'Seconds', 
                position: 'insideBottom', 
                offset: -5,
                fill: '#9CA3AF'
              }}
            />
            
            <YAxis
              stroke="#9CA3AF"
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
              axisLine={{ stroke: '#4B5563' }}
              tickLine={{ stroke: '#4B5563' }}
              domain={[Math.max(0, minWPM - 10), maxWPM + 10]}
              label={{ 
                value: 'WPM', 
                angle: -90, 
                position: 'insideLeft',
                fill: '#9CA3AF'
              }}
            />
            
            <Tooltip
              contentStyle={{
                backgroundColor: '#1F2937',
                border: '1px solid #374151',
                borderRadius: '0.5rem',
                color: '#D1D5DB',
              }}
              labelStyle={{ 
                color: '#9CA3AF',
                fontWeight: 'bold',
                marginBottom: '5px'
              }}
              formatter={(value: number) => [`${value} WPM`, 'Speed']}
              labelFormatter={(label) => `Time: ${label}s`}
            />
            
            <Area
              type="monotone"
              dataKey="wpm"
              stroke="#3B82F6"
              strokeWidth={2}
              fill="url(#colorWpm)"
              activeDot={{ 
                r: 6, 
                fill: '#3B82F6',
                stroke: '#FFFFFF',
                strokeWidth: 2
              }}
            />
            
            <Line
              type="monotone"
              dataKey="wpm"
              stroke="#10B981"
              strokeWidth={1}
              strokeDasharray="5 5"
              dot={false}
              activeDot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 text-sm text-gray-400 flex justify-between">
        <div>
          Data points: <span className="text-blue-400">{graphData.length}</span>
        </div>
        <div>
          Current: <span className="text-green-400">{Math.round(wpm)} WPM</span>
        </div>
        <div>
          Range: <span className="text-yellow-400">{minWPM} - {maxWPM} WPM</span>
        </div>
      </div>
    </div>
  );
};