import React, { useState } from 'react';
import { 
  WifiOff, 
  Wifi, 
  HardDrive, 
  RefreshCw, 
  CheckCircle2, 
  Clock, 
  ArrowLeft, 
  Cpu, 
  BatteryMedium, 
  Smartphone, 
  UploadCloud, 
  Check, 
  AlertCircle,
  Database,
  Layers
} from 'lucide-react';
import { OFFLINE_PACKS, HARDWARE_DEVICE_SPECS, PENDING_SYNC_QUEUE } from '../data/mockData';

export default function OfflineStatus({ onBack, onNavigate }) {
  const [isOffline, setIsOffline] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncDone, setSyncDone] = useState(false);
  const [packs, setPacks] = useState(OFFLINE_PACKS);

  const handleRunSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setSyncDone(true);
      setTimeout(() => setSyncDone(false), 3000);
    }, 1500);
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-4 bg-[#fdfbf7] text-stone-800">
      <div className="space-y-3.5 overflow-y-auto">
        
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {onBack && (
              <button 
                onClick={onBack}
                className="p-1.5 rounded-full hover:bg-stone-200/60 text-stone-700 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <div>
              <h2 className="text-base font-extrabold text-stone-900 leading-tight">
                ऑफलाइन स्थिति (Offline Status)
              </h2>
              <p className="text-xs text-stone-500 font-medium">
                इंटरनेट मुक्त शिक्षण और स्थानीय डेटा
              </p>
            </div>
          </div>

          <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            255 MB सहेजा
          </span>
        </div>

        {/* Real-time Offline Status Hero Banner */}
        <div className="bg-gradient-to-br from-emerald-800 to-forest-900 text-white rounded-2xl p-4 shadow-sm space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                <WifiOff className="w-5 h-5 text-emerald-200" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm leading-tight text-white">
                  {isOffline ? 'ऑफलाइन मोड सक्रिय' : 'ऑनलाइन मोड (कनेक्टेड)'}
                </h3>
                <p className="text-xs text-emerald-200 font-medium">
                  {isOffline ? 'शून्य इंटरनेट पर 100% कार्यशील' : 'क्लाउड सिंक उपलब्ध'}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOffline(!isOffline)}
              className="text-xs font-bold px-2.5 py-1 bg-white/10 hover:bg-white/20 rounded-lg border border-white/20 transition-colors"
            >
              {isOffline ? 'ऑनलाइन बदलें' : 'ऑफलाइन बदलें'}
            </button>
          </div>

          <p className="text-xs text-emerald-100/90 leading-snug bg-white/5 p-2 rounded-xl border border-white/10">
            ✓ सभी अनुवाद मॉडल, पाठ योजनाएं, शब्दावली और ऑडियो फाइलें इस डिवाइस में पहले से सुरक्षित हैं।
          </p>
        </div>

        {/* Hardware & Low-End Tablet Spec Benchmark (Point 7 in Proposed Solution) */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-xs p-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
              <Smartphone className="w-3.5 h-3.5 text-[#75BDE0]" />
              <span>डिवाइस अनुकूलन (तकनीकी विनिर्देश)</span>
            </span>
            <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded">
              2 जीबी रैम अनुकूलित
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2 bg-stone-50 rounded-xl border border-stone-200 space-y-0.5">
              <span className="text-xs font-bold text-stone-500">मेमोरी भार / रैम</span>
              <p className="font-black text-stone-900">{HARDWARE_DEVICE_SPECS.ramUsed}</p>
              <span className="text-xs text-emerald-700 font-semibold">2 जीबी का मात्र 8.8%</span>
            </div>

            <div className="p-2 bg-stone-50 rounded-xl border border-stone-200 space-y-0.5">
              <span className="text-xs font-bold text-stone-500">अनुवाद विलंबता / गति</span>
              <p className="font-black text-[#2D4B5A]">1.4 सेकंड (अत्यंत तीव्र)</p>
              <span className="text-xs text-emerald-700 font-semibold">मानक (3 सेकंड से कम) पास</span>
            </div>
          </div>
        </div>

        {/* Downloaded Content Packs Breakdown */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-700 uppercase tracking-wide flex items-center gap-1.5">
              <HardDrive className="w-3.5 h-3.5 text-stone-500" />
              <span>ऑफ़लाइन डेटा पैक (255 एमबी)</span>
            </span>
            <span className="text-xs text-emerald-700 font-bold">100% डाउनलोडेड</span>
          </div>

          <div className="bg-white rounded-2xl border border-stone-200 shadow-xs divide-y divide-stone-100 overflow-hidden">
            {packs.map((pack) => (
              <div key={pack.id} className="p-2.5 flex items-center justify-between hover:bg-stone-50 transition-colors">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold text-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-stone-900 leading-tight">
                      {pack.name}
                    </h4>
                    <span className="text-xs text-stone-400 font-medium">
                      {pack.size} • {pack.items}
                    </span>
                  </div>
                </div>

                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  सहेजा
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Sync Queue */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-xs p-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
              <UploadCloud className="w-3.5 h-3.5 text-[#75BDE0]" />
              <span>प्रतीक्षारत सिंक कतार</span>
            </span>
            <span className="text-xs text-stone-500 font-bold">
              {PENDING_SYNC_QUEUE.length} रिकॉर्ड्स सुरक्षित
            </span>
          </div>

          <div className="divide-y divide-stone-100 text-xs">
            {PENDING_SYNC_QUEUE.map((item) => (
              <div key={item.id} className="py-1.5 flex items-center justify-between">
                <div>
                  <span className="font-bold text-stone-800 block text-xs">{item.type}</span>
                  <span className="text-xs text-stone-500">
                    {item.student || item.teacher || item.word} • {item.lesson || item.category}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold text-emerald-700 block">{item.score || 'स्थानीय सहेजा'}</span>
                  <span className="text-xs text-stone-400">{item.time}</span>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handleRunSync}
            disabled={isSyncing}
            className="w-full py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 mt-1"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'सिंक हो रहा है...' : syncDone ? 'सभी 4 रिकॉर्ड सिंक हो गए!' : 'क्लाउड सिंक परीक्षण करें'}</span>
          </button>
        </div>

      </div>

      {/* Bottom Footer */}
      <div className="pt-2">
        <div className="bg-white border border-stone-200 rounded-xl p-2 flex items-center justify-between text-xs">
          <span className="text-stone-600 font-medium">
            स्थिति: पूरी तरह सुरक्षित
          </span>
          <button 
            onClick={() => onNavigate('settings')}
            className="px-2.5 py-1 bg-[#75BDE0] text-white rounded-lg font-bold text-xs hover:bg-[#5baed6]"
          >
            सेटिंग्स देखें
          </button>
        </div>
      </div>
    </div>
  );
}
