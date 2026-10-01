import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Lock, Bell, Globe, Save, Camera } from 'lucide-react';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('account');
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate save
    setTimeout(() => {
      setIsLoading(false);
      alert('Settings saved successfully!');
    }, 800);
  };

  const tabVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" } },
    exit: { opacity: 0, x: 20, transition: { duration: 0.2, ease: "easeIn" } }
  };

  const tabs = [
    { id: 'account', label: 'Account Settings', icon: User, gradient: 'from-blue-500 to-indigo-500' },
    { id: 'security', label: 'Security', icon: Lock, gradient: 'from-emerald-500 to-teal-500' },
    { id: 'notifications', label: 'Notifications', icon: Bell, gradient: 'from-violet-500 to-purple-500' },
    { id: 'site', label: 'Site Preferences', icon: Globe, gradient: 'from-rose-500 to-orange-500' }
  ];

  return (
    <div className="max-w-5xl mx-auto pb-10 space-y-8">
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h1 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-800 to-slate-600">
          Settings
        </h1>
        <p className="text-sm text-slate-500 mt-1 font-medium">Manage your account and application preferences.</p>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Navigation */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full md:w-72 shrink-0"
        >
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden p-3">
            <nav className="flex flex-col space-y-1">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button 
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center px-4 py-3 text-sm font-semibold transition-all duration-300 rounded-xl relative overflow-hidden group ${
                      isActive ? 'text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {isActive && (
                      <motion.div 
                        layoutId="activeTab"
                        className={`absolute inset-0 bg-gradient-to-r ${tab.gradient} z-0`}
                        initial={false}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    <tab.icon className={`w-5 h-5 mr-3 relative z-10 transition-colors duration-300 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-600'}`} />
                    <span className="relative z-10">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </motion.div>

        {/* Settings Content area */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex-1 bg-white rounded-3xl shadow-sm border border-slate-200/80 overflow-hidden relative"
        >
          <form onSubmit={handleSave} className="flex flex-col h-full">
            <div className="flex-1 p-8">
              <AnimatePresence mode="wait">
                {/* Account Settings Tab */}
                {activeTab === 'account' && (
                  <motion.div key="account" variants={tabVariants} initial="hidden" animate="visible" exit="exit" className="space-y-8">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900 tracking-tight">Account Profile</h2>
                      <p className="text-sm text-slate-500 mt-1">Update your personal details and public profile.</p>
                    </div>
                    
                    <div className="flex items-center space-x-6 pb-6 border-b border-slate-100">
                      <div className="relative group cursor-pointer">
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-blue-500/20 ring-4 ring-white transition-transform duration-300 group-hover:scale-105">
                          AK
                        </div>
                        <div className="absolute inset-0 bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <Camera className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div>
                        <button type="button" className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-all shadow-sm mb-2">
                          Change Avatar
                        </button>
                        <p className="text-xs font-medium text-slate-400">JPG, GIF or PNG. 2MB max.</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-1.5">
                        <label className="block text-sm font-bold text-slate-700">First Name</label>
                        <input type="text" defaultValue="Anirudh" className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white outline-none text-sm font-medium text-slate-900 transition-all shadow-sm" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-sm font-bold text-slate-700">Last Name</label>
                        <input type="text" defaultValue="K" className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white outline-none text-sm font-medium text-slate-900 transition-all shadow-sm" />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-sm font-bold text-slate-700">Email Address</label>
                      <input type="email" defaultValue="admin@aurix.com" className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white outline-none text-sm font-medium text-slate-900 transition-all shadow-sm" />
                    </div>
                  </motion.div>
                )}

                {/* Security Tab */}
                {activeTab === 'security' && (
                  <motion.div key="security" variants={tabVariants} initial="hidden" animate="visible" exit="exit" className="space-y-8">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900 tracking-tight">Security</h2>
                      <p className="text-sm text-slate-500 mt-1">Ensure your account is using a strong password.</p>
                    </div>
                    
                    <div className="space-y-5">
                      <div className="space-y-1.5">
                        <label className="block text-sm font-bold text-slate-700">Current Password</label>
                        <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white outline-none text-sm font-medium text-slate-900 transition-all shadow-sm" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-sm font-bold text-slate-700">New Password</label>
                        <input type="password" placeholder="Leave blank to keep current" className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white outline-none text-sm font-medium text-slate-900 transition-all shadow-sm" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-sm font-bold text-slate-700">Confirm New Password</label>
                        <input type="password" placeholder="Must match new password" className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white outline-none text-sm font-medium text-slate-900 transition-all shadow-sm" />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Notifications Tab */}
                {activeTab === 'notifications' && (
                  <motion.div key="notifications" variants={tabVariants} initial="hidden" animate="visible" exit="exit" className="space-y-8">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900 tracking-tight">Notifications</h2>
                      <p className="text-sm text-slate-500 mt-1">Manage when and how you are notified.</p>
                    </div>
                    
                    <div className="space-y-4">
                      <label className="flex items-center justify-between p-5 bg-white border border-slate-200 rounded-2xl hover:border-slate-300 transition-colors shadow-sm cursor-pointer group">
                        <div className="pr-4">
                          <h3 className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">Email Alerts for New Enquiries</h3>
                          <p className="text-sm text-slate-500 mt-1 font-medium">Receive an email immediately when a user submits an enquiry form.</p>
                        </div>
                        <div className="relative inline-flex items-center cursor-pointer shrink-0">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-12 h-7 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600 shadow-inner"></div>
                        </div>
                      </label>
                      
                      <label className="flex items-center justify-between p-5 bg-white border border-slate-200 rounded-2xl hover:border-slate-300 transition-colors shadow-sm cursor-pointer group">
                        <div className="pr-4">
                          <h3 className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">Weekly Summary Report</h3>
                          <p className="text-sm text-slate-500 mt-1 font-medium">Get a weekly email summarizing new enquiries and website activity.</p>
                        </div>
                        <div className="relative inline-flex items-center cursor-pointer shrink-0">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-12 h-7 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600 shadow-inner"></div>
                        </div>
                      </label>
                    </div>
                  </motion.div>
                )}

                {/* Site Preferences Tab */}
                {activeTab === 'site' && (
                  <motion.div key="site" variants={tabVariants} initial="hidden" animate="visible" exit="exit" className="space-y-8">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900 tracking-tight">Site Preferences</h2>
                      <p className="text-sm text-slate-500 mt-1">Configure general website information.</p>
                    </div>
                    
                    <div className="space-y-5">
                      <div className="space-y-1.5">
                        <label className="block text-sm font-bold text-slate-700">Company / Brand Name</label>
                        <input type="text" defaultValue="Aurix Events" className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white outline-none text-sm font-medium text-slate-900 transition-all shadow-sm" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-sm font-bold text-slate-700">Contact Email Displayed on Site</label>
                        <input type="email" defaultValue="hello@aurix.com" className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white outline-none text-sm font-medium text-slate-900 transition-all shadow-sm" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-sm font-bold text-slate-700">Contact Phone Displayed on Site</label>
                        <input type="text" defaultValue="+91 98765 43210" className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white outline-none text-sm font-medium text-slate-900 transition-all shadow-sm" />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="px-8 py-5 bg-slate-50/80 border-t border-slate-200/80 flex justify-end shrink-0">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit" 
                disabled={isLoading}
                className="flex items-center px-6 py-2.5 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 transition-all shadow-md shadow-slate-900/20 disabled:opacity-70"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Saving...</span>
                  </div>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    <span>Save Changes</span>
                  </>
                )}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
