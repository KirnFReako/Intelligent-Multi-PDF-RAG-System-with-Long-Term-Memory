import React from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Bell, User, Sparkles } from 'lucide-react';
import useStore from '../store/useStore';

const pageTitles = {
    '/': 'Dashboard',
    '/chat': 'Chat with PDFs',
    '/compare': 'Compare PDFs',
    '/memory': 'Memory History',
    '/settings': 'Settings',
};

const pageDescriptions = {
    '/': 'Overview of your RAG system activity',
    '/chat': 'Ask questions about your uploaded documents',
    '/compare': 'Compare content across multiple PDFs',
    '/memory': 'Browse your previous conversations',
    '/settings': 'Configure your system preferences',
};

export default function Header() {
    const location = useLocation();
    const sidebarOpen = useStore((s) => s.sidebarOpen);
    const title = pageTitles[location.pathname] || 'RAG System';
    const description = pageDescriptions[location.pathname] || '';

    return (
        <motion.header
            initial={false}
            animate={{ marginLeft: sidebarOpen ? 260 : 72 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="sticky top-0 z-30 bg-white/80 backdrop-blur-lg border-b border-gray-100"
        >
            <div className="flex items-center justify-between px-6 h-16">
                <div>
                    <motion.h2
                        key={title}
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-lg font-semibold text-gray-800 flex items-center gap-2"
                    >
                        {title}
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary-50 text-primary-600 text-[10px] font-semibold uppercase tracking-wider">
                            <Sparkles className="w-3 h-3" />
                            AI Powered
                        </span>
                    </motion.h2>
                    <p className="text-xs text-gray-400 mt-0.5">{description}</p>
                </div>

                <div className="flex items-center gap-3">
                    {/* Search */}
                    <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-xl border border-gray-100 w-56">
                        <Search className="w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search documents..."
                            className="bg-transparent text-sm text-gray-600 placeholder-gray-400 focus:outline-none w-full"
                        />
                    </div>

                    {/* Notifications */}
                    <button className="relative w-9 h-9 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center hover:bg-gray-100 transition-colors">
                        <Bell className="w-4 h-4 text-gray-500" />
                        <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-primary-500 rounded-full border-2 border-white" />
                    </button>

                    {/* User Avatar */}
                    <button className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center hover:shadow-glow transition-shadow">
                        <User className="w-4 h-4 text-white" />
                    </button>
                </div>
            </div>
        </motion.header>
    );
}
