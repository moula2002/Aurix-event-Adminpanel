import React, { useState } from 'react';
import { Search, Send, User, MoreVertical } from 'lucide-react';

const initialConversations = [
  {
    id: 1,
    name: 'Sarah Jenkins',
    avatar: 'SJ',
    lastMessage: 'Thanks for the event details!',
    time: '10:42 AM',
    unread: 2,
    messages: [
      { id: 1, text: 'Hi, I am looking to plan a corporate event.', sender: 'them', time: '10:30 AM' },
      { id: 2, text: 'Hello Sarah! We can certainly help with that. What date were you thinking?', sender: 'me', time: '10:35 AM' },
      { id: 3, text: 'Thanks for the event details!', sender: 'them', time: '10:42 AM' }
    ]
  },
  {
    id: 2,
    name: 'Michael Chen',
    avatar: 'MC',
    lastMessage: 'Is the venue available on the 15th?',
    time: 'Yesterday',
    unread: 0,
    messages: [
      { id: 1, text: 'Is the venue available on the 15th?', sender: 'them', time: 'Yesterday' }
    ]
  },
  {
    id: 3,
    name: 'Emma Watson',
    avatar: 'EW',
    lastMessage: 'Perfect, I will send the deposit today.',
    time: 'Mon',
    unread: 0,
    messages: [
      { id: 1, text: 'Perfect, I will send the deposit today.', sender: 'them', time: 'Mon' }
    ]
  }
];

export default function Messages() {
  const [conversations, setConversations] = useState(initialConversations);
  const [activeId, setActiveId] = useState(1);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const activeConv = conversations.find(c => c.id === activeId);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setConversations(conversations.map(conv => {
      if (conv.id === activeId) {
        return {
          ...conv,
          lastMessage: newMessage,
          time: 'Just now',
          messages: [
            ...conv.messages,
            { id: Date.now(), text: newMessage, sender: 'me', time: 'Just now' }
          ]
        };
      }
      return conv;
    }));
    setNewMessage('');
  };

  const filteredConversations = conversations.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-[calc(100vh-8rem)] bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex">
      {/* Sidebar - Conversation List */}
      <div className="w-1/3 border-r border-slate-200 flex flex-col bg-slate-50/50">
        <div className="p-4 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-800 mb-4">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search conversations..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm transition-all"
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.map(conv => (
            <div 
              key={conv.id} 
              onClick={() => {
                setActiveId(conv.id);
                // clear unread when clicking
                setConversations(conversations.map(c => c.id === conv.id ? { ...c, unread: 0 } : c));
              }}
              className={`p-4 border-b border-slate-100 cursor-pointer transition-colors flex items-start space-x-3 
                ${activeId === conv.id ? 'bg-blue-50/50' : 'hover:bg-slate-50'}`}
            >
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold shrink-0">
                {conv.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className={`text-sm font-medium truncate ${conv.unread > 0 ? 'text-slate-900' : 'text-slate-700'}`}>
                    {conv.name}
                  </h3>
                  <span className="text-xs text-slate-400">{conv.time}</span>
                </div>
                <div className="flex justify-between items-center">
                  <p className={`text-sm truncate ${conv.unread > 0 ? 'text-slate-800 font-medium' : 'text-slate-500'}`}>
                    {conv.lastMessage}
                  </p>
                  {conv.unread > 0 && (
                    <span className="w-4 h-4 bg-blue-600 rounded-full text-[10px] flex items-center justify-center text-white font-medium ml-2 shrink-0">
                      {conv.unread}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      {activeConv ? (
        <div className="flex-1 flex flex-col bg-white">
          {/* Chat Header */}
          <div className="h-16 border-b border-slate-200 px-6 flex items-center justify-between shrink-0">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                {activeConv.avatar}
              </div>
              <div>
                <h3 className="font-medium text-slate-900">{activeConv.name}</h3>
                <p className="text-xs text-emerald-500 flex items-center mt-0.5">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-1.5"></span>
                  Online
                </p>
              </div>
            </div>
            <button className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {activeConv.messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[70%] rounded-2xl px-4 py-2.5 ${
                  msg.sender === 'me' 
                    ? 'bg-blue-600 text-white rounded-br-none' 
                    : 'bg-slate-100 text-slate-800 rounded-bl-none'
                }`}>
                  <p className="text-sm">{msg.text}</p>
                  <span className={`text-[10px] mt-1 block ${msg.sender === 'me' ? 'text-blue-100' : 'text-slate-400'}`}>
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-slate-200 bg-slate-50/50">
            <form onSubmit={handleSendMessage} className="flex space-x-3">
              <input 
                type="text" 
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-white border border-slate-300 rounded-full px-5 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm transition-all"
              />
              <button 
                type="submit"
                disabled={!newMessage.trim()}
                className="w-11 h-11 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 transition-colors shrink-0 shadow-sm"
              >
                <Send className="w-4 h-4 ml-0.5" />
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center bg-slate-50">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <User className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-lg font-medium text-slate-800">No conversation selected</h3>
          <p className="text-slate-500 mt-1 text-sm">Choose a message from the sidebar to start chatting</p>
        </div>
      )}
    </div>
  );
}
