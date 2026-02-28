import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, BarChart3, ArrowRight } from 'lucide-react';

export default function ComparisonCard({ result }) {
    if (!result) return null;

    const scorePercent = Math.round(result.similarityScore * 100);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="bg-white rounded-2xl border border-gray-100 shadow-soft overflow-hidden"
        >
            {/* Header */}
            <div className="p-6 bg-gradient-to-r from-primary-50 via-purple-50 to-pink-50 border-b border-gray-100">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white/80 backdrop-blur flex items-center justify-center shadow-sm">
                            <BarChart3 className="w-5 h-5 text-primary-600" />
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-gray-800">Comparison Result</h3>
                            <p className="text-xs text-gray-500 mt-0.5">
                                {result.doc1} <ArrowRight className="inline w-3 h-3 mx-0.5" /> {result.doc2}
                            </p>
                        </div>
                    </div>

                    {/* Score Circle */}
                    <div className="relative w-16 h-16">
                        <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
                            <circle cx="32" cy="32" r="28" fill="none" stroke="#e5e7eb" strokeWidth="4" />
                            <motion.circle
                                cx="32"
                                cy="32"
                                r="28"
                                fill="none"
                                stroke="url(#gradient)"
                                strokeWidth="4"
                                strokeLinecap="round"
                                strokeDasharray={`${28 * 2 * Math.PI}`}
                                initial={{ strokeDashoffset: 28 * 2 * Math.PI }}
                                animate={{
                                    strokeDashoffset: 28 * 2 * Math.PI * (1 - result.similarityScore),
                                }}
                                transition={{ duration: 1.5, ease: 'easeOut' }}
                            />
                            <defs>
                                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#6366f1" />
                                    <stop offset="100%" stopColor="#a855f7" />
                                </linearGradient>
                            </defs>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-sm font-bold text-gray-800">{scorePercent}%</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Body */}
            <div className="p-6 grid md:grid-cols-2 gap-6">
                {/* Similarities */}
                <div>
                    <h4 className="text-sm font-semibold text-emerald-700 flex items-center gap-1.5 mb-3">
                        <CheckCircle className="w-4 h-4" />
                        Key Similarities
                    </h4>
                    <ul className="space-y-2">
                        {result.similarities.map((item, i) => (
                            <motion.li
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 + 0.3 }}
                                className="flex items-start gap-2 text-xs text-gray-600 leading-relaxed"
                            >
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
                                {item}
                            </motion.li>
                        ))}
                    </ul>
                </div>

                {/* Differences */}
                <div>
                    <h4 className="text-sm font-semibold text-rose-700 flex items-center gap-1.5 mb-3">
                        <XCircle className="w-4 h-4" />
                        Key Differences
                    </h4>
                    <ul className="space-y-2">
                        {result.differences.map((item, i) => (
                            <motion.li
                                key={i}
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 + 0.3 }}
                                className="flex items-start gap-2 text-xs text-gray-600 leading-relaxed"
                            >
                                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 flex-shrink-0" />
                                {item}
                            </motion.li>
                        ))}
                    </ul>
                </div>
            </div>
        </motion.div>
    );
}
