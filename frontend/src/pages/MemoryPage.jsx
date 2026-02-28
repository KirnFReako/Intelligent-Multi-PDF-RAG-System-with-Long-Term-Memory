import React from 'react';
import { motion } from 'framer-motion';
import { History, Search, Filter } from 'lucide-react';
import MemoryPanel from '../components/MemoryPanel';

export default function MemoryPage() {
    return (
        <div className="max-w-3xl mx-auto space-y-5">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl border border-gray-100 shadow-soft p-5"
            >
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-100 to-purple-100 flex items-center justify-center">
                        <History className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-800">Conversation Memory</h3>
                        <p className="text-xs text-gray-400">
                            Browse and reload your previous conversations with the AI
                        </p>
                    </div>
                </div>

                {/* Search / Filter */}
                <div className="flex gap-3">
                    <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-xl border border-gray-100">
                        <Search className="w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search conversations..."
                            className="bg-transparent text-sm text-gray-600 placeholder-gray-400 focus:outline-none w-full"
                        />
                    </div>
                    <button className="px-3 py-2 bg-gray-50 border border-gray-100 rounded-xl flex items-center gap-2 text-sm text-gray-500 hover:bg-gray-100 transition-colors">
                        <Filter className="w-4 h-4" />
                        <span className="hidden sm:inline">Filter</span>
                    </button>
                </div>
            </motion.div>

            {/* Memory List */}
            <MemoryPanel />
        </div>
    );
}
