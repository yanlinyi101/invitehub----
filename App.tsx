
import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import AddCodeForm from './components/AddCodeForm';
import InviteCodeCard from './components/InviteCodeCard';
import { InviteCode, CodeStatus } from './types';

const STORAGE_KEY = 'invite_hub_codes_v1';

const App: React.FC = () => {
  const [codes, setCodes] = useState<InviteCode[]>([]);
  const [filter, setFilter] = useState<CodeStatus | 'all'>('all');

  // Load data from API
  useEffect(() => {
    fetch('/api/codes')
      .then(res => res.json())
      .then(data => setCodes(data))
      .catch(err => console.error("Failed to load codes:", err));
  }, []);

  // Save data on change - Removed localStorage sync
  // useEffect(() => {
  //   localStorage.setItem(STORAGE_KEY, JSON.stringify(codes));
  // }, [codes]);

  const handleAddCode = async (newCode: InviteCode) => {
    try {
      const res = await fetch('/api/codes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCode)
      });
      const data = await res.json();
      setCodes(prev => [data, ...prev]);
    } catch (err) {
      console.error("Failed to add code:", err);
      alert("发布失败，请稍后重试");
    }
  };

  const handleUpdateStatus = async (id: string, status: CodeStatus) => {
    // Optimistic update
    setCodes(prev => prev.map(c => 
      c.id === id ? { ...c, status, updatedAt: Date.now() } : c
    ));

    try {
      await fetch(`/api/codes/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
    } catch (err) {
      console.error("Failed to update status:", err);
      // Revert on error? For now just log it.
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('确定要删除这条分享吗？')) {
      try {
        await fetch(`/api/codes/${id}`, { method: 'DELETE' });
        setCodes(prev => prev.filter(c => c.id !== id));
      } catch (err) {
        console.error("Failed to delete:", err);
        alert("删除失败");
      }
    }
  };

  const filteredCodes = useMemo(() => {
    if (filter === 'all') return codes;
    return codes.filter(c => c.status === filter);
  }, [codes, filter]);

  const stats = useMemo(() => {
    return {
      total: codes.length,
      available: codes.filter(c => c.status === CodeStatus.AVAILABLE).length,
      claimed: codes.filter(c => c.status === CodeStatus.CLAIMED).length,
    };
  }, [codes]);

  return (
    <div className="min-h-screen pb-20">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <header className="mb-8 text-center md:text-left">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
            群友分享，互惠互利
          </h1>
          <p className="text-slate-600">
            领取后请及时锁定，避免重复尝试造成浪费。
          </p>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm text-center">
            <div className="text-2xl font-bold text-indigo-600">{stats.total}</div>
            <div className="text-xs text-slate-500 font-medium">总计</div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm text-center">
            <div className="text-2xl font-bold text-green-600">{stats.available}</div>
            <div className="text-xs text-slate-500 font-medium">待领取</div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm text-center">
            <div className="text-2xl font-bold text-slate-400">{stats.claimed}</div>
            <div className="text-xs text-slate-500 font-medium">已消耗</div>
          </div>
        </div>

        <AddCodeForm onAdd={handleAddCode} />

        {/* Filters */}
        <div className="flex items-center space-x-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${
              filter === 'all' ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
            }`}
          >
            全部显示
          </button>
          <button
            onClick={() => setFilter(CodeStatus.AVAILABLE)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${
              filter === CodeStatus.AVAILABLE ? 'bg-green-600 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
            }`}
          >
            仅看可用
          </button>
          <button
            onClick={() => setFilter(CodeStatus.LOCKED)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${
              filter === CodeStatus.LOCKED ? 'bg-orange-600 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
            }`}
          >
            正在尝试
          </button>
        </div>

        {/* List Grid */}
        {filteredCodes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCodes.map((item) => (
              <InviteCodeCard 
                key={item.id} 
                item={item} 
                onUpdateStatus={handleUpdateStatus}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
            <div className="text-slate-300 text-5xl mb-4">
              <i className="fas fa-inbox"></i>
            </div>
            <h3 className="text-slate-900 font-bold text-lg">暂无邀请码</h3>
            <p className="text-slate-500 max-w-xs mx-auto mt-2">
              快去发布第一个邀请码，开启互助分享之旅吧！
            </p>
          </div>
        )}
      </main>

      {/* Footer Info */}
      <footer className="max-w-5xl mx-auto px-4 mt-12 text-center text-slate-400 text-xs">
        <p>© 2024 InviteHub Community. 邀请码均由用户自发提供。</p>
      </footer>
    </div>
  );
};

export default App;
