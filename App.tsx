import React, { useState } from 'react';
import { Disclaimer } from './components/Disclaimer';
import { ChatInterface } from './components/ChatInterface';
import { Activity, ShieldCheck, History, Menu, Settings, FolderHeart, User } from 'lucide-react';

const App: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="h-screen bg-medical-950 flex flex-col font-sans text-slate-200 overflow-hidden selection:bg-medical-accent selection:text-white">
      <Disclaimer />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className={`${sidebarOpen ? 'w-72 translate-x-0' : 'w-0 -translate-x-full opacity-0'} 
          bg-medical-900 border-r border-medical-800 flex flex-col transition-all duration-300 ease-in-out absolute md:relative z-40 h-full shadow-2xl md:shadow-none`}>
          
          <div className="p-5 border-b border-medical-800 flex items-center space-x-3">
             <div className="bg-medical-800 p-2 rounded-lg border border-medical-700">
               <Activity className="w-6 h-6 text-medical-accent" />
             </div>
             <div>
               <h1 className="text-lg font-bold text-slate-100 tracking-tight leading-none">ImplantAI</h1>
               <div className="flex items-center mt-1">
                 <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5 animate-pulse"></span>
                 <p className="text-[10px] text-slate-400 font-mono uppercase">System Online</p>
               </div>
             </div>
          </div>

          <div className="p-4">
             <button 
              onClick={() => window.location.reload()} 
              className="w-full bg-medical-accent/10 hover:bg-medical-accent/20 text-medical-accent border border-medical-accent/30 hover:border-medical-accent/50 px-4 py-3 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2 group"
            >
              <User className="w-4 h-4" />
              <span>Новый пациент</span>
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto px-4 py-2 space-y-6">
             {/* Section: Recent */}
             <div>
               <h2 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center">
                 <History className="w-3 h-3 mr-2" /> Recent Cases
               </h2>
               <div className="space-y-2">
                  {[1, 2].map((i) => (
                    <div key={i} className="p-3 rounded-lg border border-medical-800 bg-medical-950/30 hover:bg-medical-800 hover:border-medical-700 cursor-pointer transition-all group">
                       <div className="text-xs font-medium text-slate-300 mb-1 group-hover:text-white">Patient #{4000 + i}</div>
                       <div className="text-[10px] text-slate-500 font-mono flex justify-between">
                          <span>Maxilla / GBR</span>
                          <span>Yesterday</span>
                       </div>
                    </div>
                  ))}
               </div>
             </div>

             {/* Section: Protocols */}
             <div>
                <h2 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center">
                 <FolderHeart className="w-3 h-3 mr-2" /> Protocols
               </h2>
               <div className="space-y-1">
                 {['ITI Standard', 'Immediate Loading', 'Sinus Lift Lateral'].map((item) => (
                   <div key={item} className="text-xs text-slate-400 hover:text-medical-accent hover:bg-medical-800/50 px-2 py-2 rounded cursor-pointer transition-colors">
                     {item}
                   </div>
                 ))}
               </div>
             </div>
          </div>

           <div className="p-4 border-t border-medical-800">
             <div className="flex items-center justify-between text-slate-500 hover:text-slate-300 cursor-pointer transition-colors p-2 rounded hover:bg-medical-800">
               <div className="flex items-center gap-2">
                 <Settings className="w-4 h-4" />
                 <span className="text-xs font-medium">Settings</span>
               </div>
               <span className="text-[10px] bg-medical-800 px-1.5 py-0.5 rounded border border-medical-700">v2.1</span>
             </div>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col relative h-full bg-medical-950">
          
          {/* Header Mobile/Desktop */}
          <header className="h-14 border-b border-medical-800 flex items-center justify-between px-4 bg-medical-950">
            <div className="flex items-center">
              <button 
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="text-slate-400 hover:text-white p-2 hover:bg-medical-800 rounded-lg transition-colors mr-2"
              >
                <Menu className="w-5 h-5" />
              </button>
              <span className="md:hidden font-bold text-slate-100">ImplantAI</span>
            </div>
            
            <div className="flex items-center space-x-4">
               <div className="hidden md:flex items-center text-[10px] uppercase tracking-wider font-bold text-medical-accent bg-medical-900/50 px-3 py-1.5 rounded border border-medical-800/50">
                  <ShieldCheck className="w-3 h-3 mr-2" />
                  HIPAA Compliant Mode
               </div>
            </div>
          </header>

          <div className="flex-1 overflow-hidden relative">
            <ChatInterface />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;