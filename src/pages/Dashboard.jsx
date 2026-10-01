import React, { useState, useEffect } from 'react';
import { 
  Users, 
  TrendingUp, 
  Activity,
  MessageSquare,
  FileText,
  User
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState({
    stats: [],
    chartData: [],
    recentEnquiries: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://aurix-event-server.onrender.com/api/dashboard/stats')
      .then(res => res.json())
      .then(data => {
        setDashboardData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching dashboard stats:', err);
        setLoading(false);
      });
  }, []);

  const icons = [MessageSquare, Users, Activity, TrendingUp];
  const colors = ['text-blue-500', 'text-teal-500', 'text-indigo-500', 'text-purple-500'];
  const bgs = ['bg-blue-50', 'bg-teal-50', 'bg-indigo-50', 'bg-purple-50'];

  if (loading) {
    return <div className="p-8 text-center text-slate-500">Loading dashboard data...</div>;
  }

  return (
    <>
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Overview</h1>
          <p className="text-slate-500 mt-1">Welcome back, here's what's happening today.</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-sm shadow-blue-200 font-medium transition-colors text-sm flex items-center">
          Generate Report
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {dashboardData.stats.map((stat, i) => {
          const Icon = icons[i % icons.length];
          return (
          <div key={i} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.05)] transition-shadow duration-300">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500 mb-1">{stat.label}</p>
                <h3 className="text-2xl font-bold text-slate-800">{stat.value}</h3>
              </div>
              <div className={`p-3 rounded-xl ${bgs[i % bgs.length]}`}>
                <Icon className={`w-5 h-5 ${colors[i % colors.length]}`} />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-blue-500 font-medium bg-blue-50 px-2 py-0.5 rounded-md">{stat.change}</span>
              <span className="text-slate-400 ml-2">from last month</span>
            </div>
          </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Chart Area */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-slate-800">Enquiries Overview</h2>
            <select className="bg-slate-50 border border-slate-200 text-slate-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 outline-none">
              <option>Last 7 months</option>
              <option>This year</option>
            </select>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dashboardData.chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ color: '#0f172a', fontWeight: 600 }}
                />
                <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Enquiries */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-slate-800">Recent Enquiries</h2>
            <a href="/enquiries" className="text-sm font-medium text-blue-600 hover:text-blue-700">View all</a>
          </div>
          
          <div className="space-y-5">
            {dashboardData.recentEnquiries.length === 0 ? (
              <p className="text-slate-500 text-sm text-center">No recent enquiries</p>
            ) : dashboardData.recentEnquiries.map((enq) => (
              <div key={enq._id} className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100">
                    <User className="w-4 h-4 text-slate-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-800">{enq.name}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{enq.service}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-slate-800">
                    {enq.date?.split(',')[0] || 'Today'}
                  </p>
                  <p className={`text-xs mt-0.5 font-medium ${enq.status === 'New' ? 'text-blue-500' : 'text-emerald-500'}`}>{enq.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </>
  );
}
