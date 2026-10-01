import React, { useState } from 'react';
import { User, Lock, Bell, Globe, Save } from 'lucide-react';

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

  return (
    <div className="max-w-5xl mx-auto pb-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Settings</h1>
        <p className="text-sm text-slate-500 mt-1">Manage your account and application preferences.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar Navigation */}
        <div className="w-full md:w-64 shrink-0">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <nav className="flex flex-col">
              <button 
                type="button"
                onClick={() => setActiveTab('account')}
                className={`flex items-center px-4 py-3 text-sm font-medium transition-colors border-l-2 ${activeTab === 'account' ? 'bg-blue-50/50 border-blue-600 text-blue-700' : 'border-transparent text-slate-600 hover:bg-slate-50'}`}
              >
                <User className={`w-4 h-4 mr-3 ${activeTab === 'account' ? 'text-blue-600' : 'text-slate-400'}`} />
                Account Settings
              </button>
              <button 
                type="button"
                onClick={() => setActiveTab('security')}
                className={`flex items-center px-4 py-3 text-sm font-medium transition-colors border-l-2 ${activeTab === 'security' ? 'bg-blue-50/50 border-blue-600 text-blue-700' : 'border-transparent text-slate-600 hover:bg-slate-50'}`}
              >
                <Lock className={`w-4 h-4 mr-3 ${activeTab === 'security' ? 'text-blue-600' : 'text-slate-400'}`} />
                Security
              </button>
              <button 
                type="button"
                onClick={() => setActiveTab('notifications')}
                className={`flex items-center px-4 py-3 text-sm font-medium transition-colors border-l-2 ${activeTab === 'notifications' ? 'bg-blue-50/50 border-blue-600 text-blue-700' : 'border-transparent text-slate-600 hover:bg-slate-50'}`}
              >
                <Bell className={`w-4 h-4 mr-3 ${activeTab === 'notifications' ? 'text-blue-600' : 'text-slate-400'}`} />
                Notifications
              </button>
              <button 
                type="button"
                onClick={() => setActiveTab('site')}
                className={`flex items-center px-4 py-3 text-sm font-medium transition-colors border-l-2 ${activeTab === 'site' ? 'bg-blue-50/50 border-blue-600 text-blue-700' : 'border-transparent text-slate-600 hover:bg-slate-50'}`}
              >
                <Globe className={`w-4 h-4 mr-3 ${activeTab === 'site' ? 'text-blue-600' : 'text-slate-400'}`} />
                Site Preferences
              </button>
            </nav>
          </div>
        </div>

        {/* Settings Content area */}
        <div className="flex-1 bg-white rounded-xl shadow-sm border border-slate-200">
          <form onSubmit={handleSave}>
            {/* Account Settings Tab */}
            {activeTab === 'account' && (
              <div className="p-6">
                <h2 className="text-lg font-bold text-slate-900 mb-4">Account Settings</h2>
                <div className="space-y-5">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xl font-bold">
                      AK
                    </div>
                    <div>
                      <button type="button" className="px-3 py-1.5 bg-white border border-slate-300 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors shadow-sm mb-1">
                        Change Avatar
                      </button>
                      <p className="text-xs text-slate-500">JPG, GIF or PNG. 1MB max.</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">First Name</label>
                      <input type="text" defaultValue="Anirudh" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Last Name</label>
                      <input type="text" defaultValue="K" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm transition-all" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                    <input type="email" defaultValue="admin@aurix.com" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm transition-all" />
                  </div>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="p-6">
                <h2 className="text-lg font-bold text-slate-900 mb-4">Security</h2>
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Current Password</label>
                    <input type="password" placeholder="••••••••" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">New Password</label>
                    <input type="password" placeholder="Leave blank to keep current" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Confirm New Password</label>
                    <input type="password" placeholder="Must match new password" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm transition-all" />
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="p-6">
                <h2 className="text-lg font-bold text-slate-900 mb-4">Notifications</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-lg">
                    <div>
                      <h3 className="font-medium text-slate-800 text-sm">Email Alerts for New Enquiries</h3>
                      <p className="text-xs text-slate-500 mt-0.5">Receive an email immediately when a user submits an enquiry form.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-lg">
                    <div>
                      <h3 className="font-medium text-slate-800 text-sm">Weekly Summary Report</h3>
                      <p className="text-xs text-slate-500 mt-0.5">Get a weekly email summarizing new enquiries and website activity.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Site Preferences Tab */}
            {activeTab === 'site' && (
              <div className="p-6">
                <h2 className="text-lg font-bold text-slate-900 mb-4">Site Preferences</h2>
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Company / Brand Name</label>
                    <input type="text" defaultValue="Aurix Events" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Contact Email Displayed on Site</label>
                    <input type="email" defaultValue="hello@aurix.com" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Contact Phone Displayed on Site</label>
                    <input type="text" defaultValue="+91 98765 43210" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm transition-all" />
                  </div>
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button 
                type="submit" 
                disabled={isLoading}
                className="flex items-center px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-70"
              >
                {isLoading ? (
                  <>Saving...</>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
