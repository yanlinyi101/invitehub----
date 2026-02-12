
import React from 'react';
import { InviteCode, CodeStatus } from '../types';

interface InviteCodeCardProps {
  item: InviteCode;
  onUpdateStatus: (id: string, status: CodeStatus) => void;
  onDelete: (id: string) => void;
}

const InviteCodeCard: React.FC<InviteCodeCardProps> = ({ item, onUpdateStatus, onDelete }) => {
  const isAvailable = item.status === CodeStatus.AVAILABLE;
  const isLocked = item.status === CodeStatus.LOCKED;
  const isClaimed = item.status === CodeStatus.CLAIMED;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(item.code);
    if (isAvailable) {
      onUpdateStatus(item.id, CodeStatus.LOCKED);
    }
  };

  const handleConfirmClaim = () => {
    onUpdateStatus(item.id, CodeStatus.CLAIMED);
  };

  const handleRelease = () => {
    onUpdateStatus(item.id, CodeStatus.AVAILABLE);
  };

  const getTimeAgo = (timestamp: number) => {
    const diff = Date.now() - timestamp;
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return '刚刚';
    if (mins < 60) return `${mins}分钟前`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}小时前`;
    return new Date(timestamp).toLocaleDateString();
  };

  return (
    <div className={`relative bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
      isAvailable ? 'border-slate-200 shadow-sm hover:shadow-md' : 'border-slate-100 opacity-80'
    }`}>
      {/* Status Badge */}
      <div className="absolute top-0 right-0">
        <div className={`px-4 py-1 rounded-bl-xl text-xs font-bold uppercase tracking-wider ${
          isAvailable ? 'bg-green-100 text-green-700' : 
          isLocked ? 'bg-orange-100 text-orange-700' : 'bg-slate-100 text-slate-500'
        }`}>
          {isAvailable ? '可使用' : isLocked ? '锁定中' : '已领取'}
        </div>
      </div>

      <div className="p-6">
        <div className="mb-4">
          <div className="flex items-center space-x-2 text-slate-400 text-sm mb-1">
            <i className="fas fa-user-circle"></i>
            <span>{item.addedBy} 分享</span>
          </div>
          <div className="text-xs text-slate-400">
            {getTimeAgo(item.createdAt)}
          </div>
        </div>

        <div className="flex flex-col space-y-4">
          <div className="relative group">
            <div className={`font-mono text-2xl font-bold py-3 px-4 rounded-xl border-2 border-dashed text-center transition-colors ${
              isAvailable ? 'bg-slate-50 border-indigo-100 text-indigo-700' : 'bg-slate-100 border-slate-200 text-slate-400 line-through'
            }`}>
              {item.code}
            </div>
            {isAvailable && (
              <button 
                onClick={copyToClipboard}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer group-hover:opacity-10"
                title="点击复制并锁定"
              ></button>
            )}
          </div>

          {item.note && (
            <p className="text-sm text-slate-500 italic bg-slate-50 p-2 rounded-lg border border-slate-100">
              <i className="fas fa-info-circle mr-2"></i>
              {item.note}
            </p>
          )}

          <div className="grid grid-cols-1 gap-2">
            {isAvailable && (
              <button
                onClick={copyToClipboard}
                className="flex items-center justify-center space-x-2 w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition-all shadow-md shadow-indigo-100 active:scale-[0.98]"
              >
                <i className="fas fa-copy"></i>
                <span>复制并尝试</span>
              </button>
            )}

            {isLocked && (
              <div className="flex space-x-2">
                <button
                  onClick={handleConfirmClaim}
                  className="flex-1 bg-green-600 text-white font-bold py-3 rounded-xl hover:bg-green-700 transition-all shadow-md shadow-green-100"
                >
                  <i className="fas fa-check mr-2"></i>
                  确认成功
                </button>
                <button
                  onClick={handleRelease}
                  className="px-4 py-3 border border-orange-200 text-orange-600 rounded-xl hover:bg-orange-50 transition-all font-medium"
                  title="释放邀请码"
                >
                  <i className="fas fa-undo"></i>
                </button>
              </div>
            )}

            {isClaimed && (
              <div className="flex items-center justify-center space-x-2 text-slate-400 py-3 italic">
                <i className="fas fa-check-double"></i>
                <span>该邀请码已被成功领取</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Admin Action (Delete) */}
      <button 
        onClick={() => onDelete(item.id)}
        className="absolute bottom-2 right-2 text-slate-300 hover:text-red-400 transition-colors p-2 text-xs"
      >
        <i className="fas fa-trash-alt"></i>
      </button>
    </div>
  );
};

export default InviteCodeCard;
