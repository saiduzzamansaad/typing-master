import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useTypingStore } from '../../store';

export const SessionGraph: React.FC = () => {
  const { wpmHistory } = useTypingStore();

  const data = wpmHistory.map((wpm, index) => ({
    time: index + 1,
    wpm,
  }));

  return (
    <div className="mt-8">
      <h3 className="text-lg font-medium mb-4 text-gray-300">WPM Over Time</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis
              dataKey="time"
              stroke="#9CA3AF"
              label={{ value: 'Seconds', position: 'insideBottom', offset: -5 }}
            />
            <YAxis stroke="#9CA3AF" label={{ value: 'WPM', angle: -90, position: 'insideLeft' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1F2937',
                border: '1px solid #374151',
                borderRadius: '0.5rem',
              }}
              labelStyle={{ color: '#D1D5DB' }}
            />
            <Line
              type="monotone"
              dataKey="wpm"
              stroke="#3B82F6"
              strokeWidth={2}
              dot={{ fill: '#3B82F6' }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};