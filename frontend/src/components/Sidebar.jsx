import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard,
    MessageSquare,
    GitCompare,
    History,
    Settings,
    Brain,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react';
import useStore from '../store/useStore';

const navItems = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/chat', icon: MessageSquare, label: 'Chat with PDFs' },
    { path: '/compare', icon: GitCompare, label: 'Compare PDFs' },
    { path: '/memory', icon: History, label: 'Memory History' },
    { path: '/settings', icon: Settings, label: 'Settings' },
];

export default function Sidebar() {
    const { sidebarOpen, toggleSidebar } = useStore();

    return (
        <motion.aside
            initial={false}
            animate={{ width: sidebarOpen ? 260 : 72 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed left-0 top-0 h-screen bg-white border-r border-gray-200 z-40 flex flex-col shadow-soft"
        >
            {/* Logo */}
            <div className="flex items-center gap-3 px-4 h-16 border-b border-gray-100">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center flex-shrink-0">
                    <Brain className="w-5 h-5 text-white" />
                </div>
                <AnimatePresence>
                    {sidebarOpen && (
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden whitespace-nowrap"
                        >
                            <h1 className="text-base font-bold text-gray-800 leading-tight">RAG System</h1>
                            <p className="text-[10px] text-gray-400 font-medium tracking-wide uppercase">Multi-PDF AI</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-4 px-3 space-y-1">
                {navItems.map(({ path, icon: Icon, label }) => (
                    <NavLink
                        key={path}
                        to={path}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${isActive
                                ? 'bg-primary-50 text-primary-700 shadow-sm'
                                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                            }`
                        }
                    >
                        {({ isActive }) => (
                            <>
                                <div
                                    className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200 ${isActive
                                            ? 'bg-primary-100 text-primary-600'
                                            : 'bg-gray-100 text-gray-400 group-hover:bg-gray-200 group-hover:text-gray-600'
                                        }`}
                                >
                                    <Icon className="w-4 h-4" />
                                </div>
                                <AnimatePresence>
                                    {sidebarOpen && (
                                        <motion.span
                                            initial={{ opacity: 0, x: -5 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -5 }}
                                            transition={{ duration: 0.15 }}
                                            className="whitespace-nowrap"
                                        >
                                            {label}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </>
                        )}
                    </NavLink>
                ))}
            </nav>

            {/* Toggle Button */}
            <div className="px-3 pb-4">
                <button
                    onClick={toggleSidebar}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-all duration-200"
                >
                    {sidebarOpen ? (
                        <>
                            <ChevronLeft className="w-4 h-4" />
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                Collapse
                            </motion.span>
                        </>
                    ) : (
                        <ChevronRight className="w-4 h-4" />
                    )}
                </button>
            </div>
        </motion.aside>
    );
}
