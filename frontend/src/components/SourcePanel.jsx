import React from 'react';
import { motion } from 'framer-motion';
import { FileText, ExternalLink, Shield, TrendingUp } from 'lucide-react';
import useStore from '../store/useStore';

export default function SourcePanel() {
    const { messages } = useStore();

    // Get the latest assistant message with sources
    const latestAiMsg = [...messages]
        .reverse()
        .find((m) => m.role === 'assistant' && m.sources);

    if (!latestAiMsg) {
        return (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-soft p-6 h-full flex flex-col items-center justify-center text-center">
                <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center mb-3">
                    <Shield className="w-7 h-7 text-gray-300" />
                </div>
                <h3 className="text-sm font-semibold text-gray-500">No Sources Yet</h3>
                <p className="text-xs text-gray-400 mt-1">
                    Sources and confidence scores will appear here after you ask a question.
                </p>
            </div>
        );
    }

    const confidencePercent = Math.round(latestAiMsg.confidence * 100);

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-soft p-5 space-y-5 h-full">
            {/* Confidence Score */}
            <div>
                <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-1.5">
                        <Shield className="w-4 h-4 text-primary-500" />
                        Confidence Score
                    </h3>
                    <span
                        className={`text-2xl font-bold ${confidencePercent >= 90
                                ? 'text-emerald-600'
                                : confidencePercent >= 80
                                    ? 'text-primary-600'
                                    : 'text-amber-600'
                            }`}
                    >
                        {confidencePercent}%
                    </span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${confidencePercent}%` }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className={`h-full rounded-full ${confidencePercent >= 90
                                ? 'bg-gradient-to-r from-emerald-400 to-emerald-600'
                                : confidencePercent >= 80
                                    ? 'bg-gradient-to-r from-primary-400 to-primary-600'
                                    : 'bg-gradient-to-r from-amber-400 to-amber-600'
                            }`}
                    />
                </div>
            </div>

            {/* Retrieved Sources */}
            <div>
                <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-1.5 mb-3">
                    <FileText className="w-4 h-4 text-primary-500" />
                    Retrieved Sources
                </h3>
                <div className="space-y-2">
                    {latestAiMsg.sources.map((source, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 + 0.3, duration: 0.3 }}
                            className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-primary-50 transition-colors cursor-pointer group"
                        >
                            <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0 group-hover:bg-red-100 transition-colors">
                                <FileText className="w-4 h-4 text-red-500" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs font-medium text-gray-700 truncate">{source.doc}</p>
                                <p className="text-[10px] text-gray-400">Page {source.page}</p>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <div className="flex items-center gap-1">
                                    <TrendingUp className="w-3 h-3 text-primary-500" />
                                    <span className="text-[10px] font-semibold text-primary-600">
                                        {Math.round(source.relevance * 100)}%
                                    </span>
                                </div>
                                <ExternalLink className="w-3 h-3 text-gray-300 group-hover:text-primary-500 transition-colors" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Retrieval Info */}
            <div className="p-3 bg-gradient-to-br from-primary-50 to-purple-50 rounded-xl border border-primary-100">
                <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="w-3.5 h-3.5 text-primary-600" />
                    <span className="text-[11px] font-semibold text-primary-700">Retrieval Details</span>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-2">
                    <div>
                        <p className="text-[10px] text-gray-500">Chunks Retrieved</p>
                        <p className="text-sm font-bold text-gray-700">{latestAiMsg.sources.length * 3}</p>
                    </div>
                    <div>
                        <p className="text-[10px] text-gray-500">Search Method</p>
                        <p className="text-sm font-bold text-gray-700">FAISS</p>
                    </div>
                    <div>
                        <p className="text-[10px] text-gray-500">Embedding Model</p>
                        <p className="text-sm font-bold text-gray-700">Ada-002</p>
                    </div>
                    <div>
                        <p className="text-[10px] text-gray-500">Latency</p>
                        <p className="text-sm font-bold text-gray-700">1.2s</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
