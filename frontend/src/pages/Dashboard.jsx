import React from 'react';
import { motion } from 'framer-motion';
import {
    FileText,
    MessageSquare,
    Target,
    Zap,
    TrendingUp,
    ArrowUpRight,
    Upload,
    Clock,
} from 'lucide-react';
import { dashboardStats, recentActivity, pdfList } from '../data/dummyData';

const statCards = [
    {
        label: 'Total PDFs Uploaded',
        value: dashboardStats.totalPDFs,
        suffix: '',
        icon: FileText,
        color: 'from-primary-500 to-primary-700',
        bgColor: 'bg-primary-50',
        textColor: 'text-primary-600',
        change: '+2 this week',
    },
    {
        label: 'Questions Asked',
        value: dashboardStats.totalQuestions,
        suffix: '',
        icon: MessageSquare,
        color: 'from-purple-500 to-purple-700',
        bgColor: 'bg-purple-50',
        textColor: 'text-purple-600',
        change: '+5 today',
    },
    {
        label: 'Retrieval Accuracy',
        value: dashboardStats.retrievalAccuracy,
        suffix: '%',
        icon: Target,
        color: 'from-emerald-500 to-emerald-700',
        bgColor: 'bg-emerald-50',
        textColor: 'text-emerald-600',
        change: '+3% vs last week',
    },
    {
        label: 'Avg Response Time',
        value: dashboardStats.avgResponseTime,
        suffix: 's',
        icon: Zap,
        color: 'from-amber-500 to-amber-700',
        bgColor: 'bg-amber-50',
        textColor: 'text-amber-600',
        change: '-0.2s improvement',
    },
];

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1 },
    },
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function Dashboard() {
    return (
        <div className="space-y-6">
            {/* Stats Grid */}
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            >
                {statCards.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <motion.div
                            key={stat.label}
                            variants={item}
                            whileHover={{ y: -4, scale: 1.02 }}
                            className="bg-white rounded-2xl border border-gray-100 p-5 shadow-soft hover:shadow-soft-lg transition-all cursor-default"
                        >
                            <div className="flex items-start justify-between">
                                <div
                                    className={`w-10 h-10 rounded-xl ${stat.bgColor} flex items-center justify-center`}
                                >
                                    <Icon className={`w-5 h-5 ${stat.textColor}`} />
                                </div>
                                <span className="flex items-center gap-0.5 text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                                    <TrendingUp className="w-2.5 h-2.5" />
                                    {stat.change}
                                </span>
                            </div>
                            <div className="mt-4">
                                <motion.p
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.3, duration: 0.5, type: 'spring' }}
                                    className="text-2xl font-bold text-gray-800"
                                >
                                    {stat.value}
                                    <span className="text-base font-semibold text-gray-400">{stat.suffix}</span>
                                </motion.p>
                                <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
                            </div>
                        </motion.div>
                    );
                })}
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Recent Activity */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-soft p-5"
                >
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                            <Clock className="w-4 h-4 text-primary-500" />
                            Recent Activity
                        </h3>
                        <button className="text-xs text-primary-600 font-medium hover:text-primary-700 transition-colors">
                            View All
                        </button>
                    </div>
                    <div className="space-y-3">
                        {recentActivity.map((act, i) => (
                            <motion.div
                                key={act.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.08 + 0.5 }}
                                className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                            >
                                <div
                                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${act.action === 'Uploaded'
                                            ? 'bg-primary-50'
                                            : act.action === 'Asked'
                                                ? 'bg-purple-50'
                                                : 'bg-emerald-50'
                                        }`}
                                >
                                    {act.action === 'Uploaded' ? (
                                        <Upload className="w-4 h-4 text-primary-500" />
                                    ) : act.action === 'Asked' ? (
                                        <MessageSquare className="w-4 h-4 text-purple-500" />
                                    ) : (
                                        <ArrowUpRight className="w-4 h-4 text-emerald-500" />
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm text-gray-700 truncate">
                                        <span className="font-medium">{act.action}</span>{' '}
                                        <span className="text-gray-500">{act.target}</span>
                                    </p>
                                </div>
                                <span className="text-[10px] text-gray-400 whitespace-nowrap">{act.time}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Quick Overview */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-white rounded-2xl border border-gray-100 shadow-soft p-5"
                >
                    <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2 mb-4">
                        <FileText className="w-4 h-4 text-primary-500" />
                        Document Library
                    </h3>
                    <div className="space-y-3">
                        {pdfList.map((pdf, i) => (
                            <motion.div
                                key={pdf.id}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.08 + 0.6 }}
                                className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 transition-colors"
                            >
                                <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0">
                                    <FileText className="w-4 h-4 text-red-500" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-medium text-gray-700 truncate">{pdf.name}</p>
                                    <p className="text-[10px] text-gray-400">{pdf.size} • {pdf.pages} pages</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* System Status */}
                    <div className="mt-5 p-3 bg-gradient-to-br from-primary-50 to-purple-50 rounded-xl border border-primary-100">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                            <span className="text-[11px] font-semibold text-primary-700">System Status</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <p className="text-[10px] text-gray-500">Vector Store</p>
                                <p className="text-xs font-semibold text-emerald-600">Online</p>
                            </div>
                            <div>
                                <p className="text-[10px] text-gray-500">LLM Endpoint</p>
                                <p className="text-xs font-semibold text-emerald-600">Active</p>
                            </div>
                            <div>
                                <p className="text-[10px] text-gray-500">Total Chunks</p>
                                <p className="text-xs font-semibold text-gray-700">1,247</p>
                            </div>
                            <div>
                                <p className="text-[10px] text-gray-500">Index Size</p>
                                <p className="text-xs font-semibold text-gray-700">42 MB</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
