import React from 'react';
import { motion } from 'framer-motion';
import { Bot, User, FileText, ExternalLink } from 'lucide-react';

export default function ChatMessage({ message, index }) {
    const isUser = message.role === 'user';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.05, ease: 'easeOut' }}
            className={`flex gap-3 ${isUser ? 'flex-row' : 'flex-row'}`}
        >
            {/* Avatar */}
            <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-1 ${isUser
                        ? 'bg-gradient-to-br from-gray-700 to-gray-900'
                        : 'bg-gradient-to-br from-primary-500 to-primary-700'
                    }`}
            >
                {isUser ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
            </div>

            {/* Message Content */}
            <div className={`flex-1 max-w-[85%]`}>
                <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold text-gray-700">{isUser ? 'You' : 'RAG Assistant'}</span>
                    <span className="text-[10px] text-gray-400">
                        {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                </div>

                <div
                    className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${isUser
                            ? 'bg-gray-800 text-white rounded-tl-md'
                            : 'bg-white border border-gray-100 text-gray-700 rounded-tl-md shadow-soft'
                        }`}
                >
                    {message.content.split('\n').map((line, i) => (
                        <p key={i} className={i > 0 ? 'mt-2' : ''}>
                            {line.split(/(\*\*.*?\*\*)/).map((part, j) =>
                                part.startsWith('**') && part.endsWith('**') ? (
                                    <strong key={j} className={isUser ? 'text-primary-300' : 'text-primary-600'}>
                                        {part.slice(2, -2)}
                                    </strong>
                                ) : (
                                    <span key={j}>{part}</span>
                                )
                            )}
                        </p>
                    ))}
                </div>

                {/* Sources */}
                {!isUser && message.sources && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ delay: 0.3, duration: 0.3 }}
                        className="mt-2 flex flex-wrap gap-2"
                    >
                        {message.sources.map((source, i) => (
                            <span
                                key={i}
                                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-primary-50 text-primary-600 text-[11px] font-medium border border-primary-100 hover:bg-primary-100 transition-colors cursor-pointer"
                            >
                                <FileText className="w-3 h-3" />
                                {source.doc} (p.{source.page})
                                <ExternalLink className="w-2.5 h-2.5 opacity-50" />
                            </span>
                        ))}
                    </motion.div>
                )}

                {/* Confidence */}
                {!isUser && message.confidence && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mt-2 flex items-center gap-2"
                    >
                        <div className="h-1.5 w-20 bg-gray-100 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${message.confidence * 100}%` }}
                                transition={{ delay: 0.7, duration: 0.8, ease: 'easeOut' }}
                                className={`h-full rounded-full ${message.confidence >= 0.9
                                        ? 'bg-emerald-500'
                                        : message.confidence >= 0.8
                                            ? 'bg-primary-500'
                                            : 'bg-amber-500'
                                    }`}
                            />
                        </div>
                        <span className="text-[10px] font-semibold text-gray-400">
                            {Math.round(message.confidence * 100)}% confidence
                        </span>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
}
