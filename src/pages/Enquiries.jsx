import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare,
  UserPlus,
  Eye,
  FileText,
  Calendar,
  ChevronDown,
  Download,
  ChevronLeft,
  ChevronRight,
  Trash2,
  Search,
  Filter
} from 'lucide-react';

export default function Enquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

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

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this enquiry?')) return;

    try {
      const res = await fetch(`https://aurix-event-server.onrender.com/api/enquiries/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setEnquiries(enquiries.filter(e => e._id !== id));
      }
    } catch (err) {
      console.error('Error deleting enquiry:', err);
    }
  };

  const filteredEnquiries = enquiries.filter(enq => 
    enq.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    enq.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    enq.service?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      bg: 'bg-blue-50',
      border: 'border-blue-100',
      gradient: 'from-blue-600 to-cyan-500'
    },
    {
      title: 'New Enquiries',
      value: newEnquiries.toString(),
      subtitle: 'Awaiting response',
      icon: UserPlus,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      border: 'border-emerald-100',
      gradient: 'from-emerald-500 to-teal-400'
    },
    {
      title: 'Contacted',
      value: contactedEnquiries.toString(),
      subtitle: 'Followed up',
      icon: Eye,
      color: 'text-violet-600',
      bg: 'bg-violet-50',
      border: 'border-violet-100',
      gradient: 'from-violet-600 to-purple-500'
    },
    {
      title: 'Response Rate',
      value: responseRate,
      subtitle: 'Based on total',
      icon: FileText,
      color: 'text-rose-600',
      bg: 'bg-rose-50',
      border: 'border-rose-100',
      gradient: 'from-rose-500 to-orange-400'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-800 to-slate-600">
            Enquiries
          </h1>
          <p className="text-sm text-slate-500 mt-1 font-medium">Track and manage all your website enquiries in one place.</p>
        </div>
        <div className="flex items-center gap-3">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center space-x-2 bg-white border border-slate-200 px-4 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 shadow-sm transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center space-x-2 bg-slate-900 px-4 py-2 rounded-xl text-sm font-semibold text-white hover:bg-slate-800 shadow-md shadow-slate-900/20 transition-all"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add Manual</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
      >
        {dynamicStats.map((stat, i) => (
          <motion.div 
            key={i} 
            variants={itemVariants}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 relative overflow-hidden group"
          >
            {/* Subtle background gradient blob */}
            <div className={`absolute -right-6 -top-6 w-24 h-24 bg-gradient-to-br ${stat.gradient} rounded-full opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-500`} />
            
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-500 mb-1">{stat.title}</p>
                <h3 className="text-3xl font-bold text-slate-900 tracking-tight">{stat.value}</h3>
              </div>
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.border} border shadow-inner shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs font-medium text-slate-400">
              <span className="bg-slate-100 px-2 py-1 rounded-md text-slate-500 mr-2">{stat.subtitle}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Table Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
      >
        {/* Table Toolbar */}
        <div className="p-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text"
              placeholder="Search enquiries by name, email or service..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center space-x-2 bg-white border border-slate-200 px-3 py-2 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-sm">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-[11px] text-slate-500 uppercase tracking-wider font-bold bg-slate-50/80 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 rounded-tl-xl">User</th>
                <th className="px-6 py-4">Contact Info</th>
                <th className="px-6 py-4">Service Required</th>
                <th className="px-6 py-4">Message</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right rounded-tr-xl">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <AnimatePresence>
                {loading ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center">
                      <div className="inline-flex items-center justify-center space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                      </div>
                      <p className="text-slate-500 mt-2 font-medium">Loading enquiries...</p>
                    </td>
                  </tr>
                ) : filteredEnquiries.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 mb-3">
                        <Search className="w-6 h-6 text-slate-400" />
                      </div>
                      <p className="text-slate-900 font-medium">No enquiries found</p>
                      <p className="text-slate-500 text-sm mt-1">Try adjusting your search or filters.</p>
                    </td>
                  </tr>
                ) : (
                  filteredEnquiries.map((enq, idx) => (
                    <motion.tr 
                      key={enq._id || idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2, delay: idx * 0.05 }}
                      className="hover:bg-blue-50/30 transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-blue-700 font-bold text-xs shadow-inner">
                            {enq.name?.charAt(0).toUpperCase() || '?'}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900">{enq.name}</p>
                            <p className="text-xs text-slate-500">ID: #{enq._id?.slice(-4) || 'N/A'}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-slate-900 font-medium">{enq.email}</p>
                        <p className="text-xs text-slate-500">{enq.phone || 'No phone provided'}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                          {enq.service || 'General Inquiry'}
                        </span>
                      </td>
                      <td className="px-6 py-4 max-w-[200px]">
                        <p className="truncate text-slate-600 text-sm" title={enq.message}>{enq.message || '-'}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center text-slate-600 text-sm">
                          <Calendar className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
                          {enq.date}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border shadow-sm
                        ${enq.status === 'New'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-blue-50 text-blue-700 border-blue-200'
                          }`}>
                          <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${enq.status === 'New' ? 'bg-emerald-500' : 'bg-blue-500'}`}></span>
                          {enq.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleDelete(enq._id)}
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                          title="Delete Enquiry"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </motion.tr>
                  ))
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-slate-200 flex items-center justify-between text-sm bg-slate-50/50">
          <div className="text-slate-500 font-medium">
            Showing <span className="text-slate-900">{filteredEnquiries.length > 0 ? 1 : 0} - {filteredEnquiries.length}</span> of <span className="text-slate-900">{totalEnquiries}</span> enquiries
          </div>
          <div className="flex items-center space-x-1">
            <button className="p-1.5 rounded-lg border border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-white disabled:opacity-50 transition-colors shadow-sm" disabled>
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="px-3 py-1.5 rounded-lg bg-slate-900 text-white font-semibold shadow-md shadow-slate-900/20">1</button>
            <button className="p-1.5 rounded-lg border border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-white disabled:opacity-50 transition-colors shadow-sm" disabled>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
