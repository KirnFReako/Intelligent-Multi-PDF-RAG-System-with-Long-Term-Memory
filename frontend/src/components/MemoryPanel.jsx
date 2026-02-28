import React from 'react';
import { motion } from 'framer-motion';
import { Clock, MessageSquare, FileText, ChevronRight, Sparkles } from 'lucide-react';
import useStore from '../store/useStore';

export default function MemoryPanel() {
    const { memory, loadConversation } = useStore();

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diffMs = now - date;
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffDays = Math.floor(diffHours / 24);

        if (diffHours < 1) return 'Just now';
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays}d ago`;
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    if (memory.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-4">
                    <Clock className="w-8 h-8 text-gray-300" />
                </div>
                <h3 className="text-lg font-semibold text-gray-500">No Memories Yet</h3>
                <p className="text-sm text-gray-400 mt-1">
                    Your conversation history will appear here.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {memory.map((item, i) => (
                <motion.button
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.3 }}
                    whileHover={{ scale: 1.01, x: 4 }}
                    onClick={() => loadConversation(item.id)}
                    className="w-full text-left p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-soft hover:border-primary-200 transition-all group"
                >
                    <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-100 to-purple-100 flex items-center justify-center flex-shrink-0 group-hover:from-primary-200 group-hover:to-purple-200 transition-colors">
                            <Sparkles className="w-4 h-4 text-primary-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-700 group-hover:text-primary-700 transition-colors line-clamp-2">
                                {item.question}
                            </p>
                            <div className="flex items-center gap-3 mt-2">
                                <span className="flex items-center gap-1 text-[10px] text-gray-400">
                                    <Clock className="w-3 h-3" />
                                    {formatTime(item.timestamp)}
                                </span>
                                <span className="flex items-center gap-1 text-[10px] text-gray-400">
                                    <MessageSquare className="w-3 h-3" />
                                    {item.messageCount} messages
                                </span>
                                <span className="flex items-center gap-1 text-[10px] text-gray-400">
                                    <FileText className="w-3 h-3" />
                                    {item.pdfsUsed.length} PDFs
                                </span>
                            </div>
                            <div className="flex flex-wrap gap-1 mt-2">
                                {item.pdfsUsed.map((pdf, j) => (
                                    <span
                                        key={j}
                                        className="px-2 py-0.5 bg-gray-50 rounded-md text-[10px] text-gray-500 font-medium border border-gray-100"
                                    >
                                        {pdf}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-primary-500 transition-colors flex-shrink-0 mt-1" />
                    </div>
                </motion.button>
            ))}
        </div>
    );
}
