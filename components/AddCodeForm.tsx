
import React, { useState } from 'react';
import { CodeStatus, InviteCode } from '../types';

interface AddCodeFormProps {
  onAdd: (code: InviteCode) => void;
}

const AddCodeForm: React.FC<AddCodeFormProps> = ({ onAdd }) => {
  const [code, setCode] = useState('');
  const [note, setNote] = useState('');
  const [user, setUser] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    const newCode: InviteCode = {
      id: Math.random().toString(36).substring(2, 11),
      code: code.trim(),
      note: note.trim(),
      status: CodeStatus.AVAILABLE,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      addedBy: user.trim() || '匿名群友'
    };

    onAdd(newCode);
    setCode('');
    setNote('');
    setIsOpen(false);
  };

  return (
    <div className="mb-8">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="w-full py-4 px-6 border-2 border-dashed border-indigo-200 rounded-xl text-indigo-600 font-semibold hover:border-indigo-400 hover:bg-indigo-50 transition-all flex items-center justify-center space-x-2 group"
        >
          <i className="fas fa-plus group-hover:scale-110 transition-transform"></i>
          <span>分享新邀请码</span>
        </button>
      ) : (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg text-slate-800">分享邀请码</h3>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-600">
              <i className="fas fa-times"></i>
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">邀请码 *</label>
              <input
                required
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="请输入您的邀请码"
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">分享者名称</label>
                <input
                  type="text"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  placeholder="匿名群友"
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">备注说明</label>
                <input
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="例如：需绑定手机"
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                />
              </div>
            </div>
            <div className="flex space-x-3 pt-2">
              <button
                type="submit"
                className="flex-1 bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100"
              >
                确认提交
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors font-medium"
              >
                取消
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddCodeForm;
