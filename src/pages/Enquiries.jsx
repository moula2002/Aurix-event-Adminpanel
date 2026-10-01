import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  UserPlus, 
  Eye, 
  FileText,
  Calendar,
  ChevronDown,
  Download,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

// Stats will be computed dynamically from data
export default function Enquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://aurix-event-server.onrender.com/api/enquiries')
      .then(res => res.json())
      .then(data => {
        setEnquiries(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching enquiries:', err);
        setLoading(false);
      });
  }, []);

  // Dynamic Stats Calculation
  const totalEnquiries = enquiries.length;
  const newEnquiries = enquiries.filter(e => e.status === 'New').length;
  const contactedEnquiries = enquiries.filter(e => e.status === 'Contacted').length;
  const responseRate = totalEnquiries ? ((contactedEnquiries / totalEnquiries) * 100).toFixed(1) + '%' : '0%';

  const dynamicStats = [
    { 
      title: 'Total Enquiries', 
      value: totalEnquiries.toString(), 
      subtitle: 'All time',
      icon: MessageSquare,
      color: 'text-blue-600',
      bg: 'bg-blue-100'
    },
    { 
      title: 'New Enquiries', 
      value: newEnquiries.toString(), 
      subtitle: 'Awaiting response',
      icon: UserPlus,
      color: 'text-teal-600',
      bg: 'bg-teal-100'
    },
    { 
      title: 'Contacted', 
      value: contactedEnquiries.toString(), 
      subtitle: 'Followed up',
      icon: Eye,
      color: 'text-indigo-600',
      bg: 'bg-indigo-100'
    },
    { 
      title: 'Response Rate', 
      value: responseRate, 
      subtitle: 'Based on total',
      icon: FileText,
      color: 'text-rose-500',
      bg: 'bg-rose-100'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Enquiries</h1>
          <p className="text-sm text-slate-500 mt-1">Track and manage all your website enquiries in one place.</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {dynamicStats.map((stat, i) => (
          <div key={i} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
            <div className="flex items-start space-x-4">
              <div className={`p-3 rounded-full ${stat.bg} shrink-0`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-500 truncate">{stat.title}</p>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</h3>
                <div className="mt-2 text-xs">
                  <span className="text-slate-400">{stat.subtitle}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-8">
        <div className="p-5 border-b border-slate-200 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">Recent Enquiries</h2>
          <button className="flex items-center space-x-2 border border-slate-200 px-3 py-1.5 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-slate-600">
            <thead className="text-xs text-slate-500 bg-slate-50/50 capitalize border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-semibold">#</th>
                <th className="px-6 py-4 font-semibold">Name</th>
                <th className="px-6 py-4 font-semibold">Phone</th>
                <th className="px-6 py-4 font-semibold">Email</th>
                <th className="px-6 py-4 font-semibold">Service / Requirement</th>
                <th className="px-6 py-4 font-semibold">Message</th>
                <th className="px-6 py-4 font-semibold">Date & Time</th>
                <th className="px-6 py-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan="8" className="px-6 py-4 text-center text-slate-500">Loading enquiries...</td>
                </tr>
              ) : enquiries.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-6 py-4 text-center text-slate-500">No enquiries found</td>
                </tr>
              ) : (
                enquiries.map((enq, idx) => (
                  <tr key={enq._id || idx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900">{idx + 1}</td>
                  <td className="px-6 py-4 font-medium text-slate-900">{enq.name}</td>
                  <td className="px-6 py-4">{enq.phone || '-'}</td>
                  <td className="px-6 py-4">{enq.email}</td>
                  <td className="px-6 py-4">{enq.service || '-'}</td>
                  <td className="px-6 py-4 max-w-[200px] truncate" title={enq.message}>{enq.message || '-'}</td>
                  <td className="px-6 py-4 text-slate-500">{enq.date}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border
                      ${enq.status === 'New' 
                        ? 'bg-emerald-50 text-emerald-600 border-emerald-200' 
                        : 'bg-blue-50 text-blue-600 border-blue-200'
                      }`}>
                      {enq.status}
                    </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="p-4 border-t border-slate-200 flex items-center justify-between text-sm">
          <div className="text-slate-500">
            Showing <span className="font-medium text-slate-700">{enquiries.length > 0 ? 1 : 0} - {enquiries.length}</span> of <span className="font-medium text-slate-700">{totalEnquiries}</span> enquiries
          </div>
          <div className="flex items-center space-x-1">
            <button className="p-1 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-100 disabled:opacity-50" disabled>
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="px-3 py-1 rounded bg-blue-600 text-white font-medium">1</button>
            <button className="p-1 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-100 disabled:opacity-50" disabled>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
