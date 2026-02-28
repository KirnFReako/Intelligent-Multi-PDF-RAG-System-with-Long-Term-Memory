import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles } from 'lucide-react';
import ChatMessage from './ChatMessage';
import useStore from '../store/useStore';

export default function ChatWindow() {
    const { messages, isTyping, addMessage } = useStore();
    const [input, setInput] = useState('');
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                top: scrollRef.current.scrollHeight,
                behavior: 'smooth',
            });
        }
    }, [messages, isTyping]);

    const handleSend = () => {
        if (!input.trim()) return;
        addMessage(input.trim());
        setInput('');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="flex flex-col h-full bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden">
            {/* Chat Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-5 space-y-5">
                {messages.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center justify-center h-full text-center py-20"
                    >
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center mb-4">
                            <Sparkles className="w-8 h-8 text-primary-500" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-700">Start a Conversation</h3>
                        <p className="text-sm text-gray-400 mt-1 max-w-sm">
                            Ask questions about your uploaded PDFs. The AI will retrieve relevant context and provide detailed answers.
                        </p>
                    </motion.div>
                ) : (
                    <AnimatePresence mode="popLayout">
                        {messages.map((msg, i) => (
                            <ChatMessage key={msg.id} message={msg} index={i} />
                        ))}
                    </AnimatePresence>
                )}

                {/* Typing Indicator */}
                <AnimatePresence>
                    {isTyping && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="flex items-center gap-3"
                        >
                            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                                <Sparkles className="w-4 h-4 text-white animate-pulse" />
                            </div>
                            <div className="px-4 py-3 rounded-2xl bg-white border border-gray-100 shadow-soft rounded-tl-md">
                                <div className="flex items-center gap-1.5">
                                    <span className="typing-dot" />
                                    <span className="typing-dot" />
                                    <span className="typing-dot" />
                                </div>
                            </div>
                            <span className="text-xs text-gray-400">AI is thinking...</span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Input Area */}
            <div className="border-t border-gray-100 bg-white px-4 py-3">
                <div className="flex items-end gap-2">
                    <div className="flex-1 relative">
                        <textarea
                            id="chat-input"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Ask something about your documents..."
                            rows={1}
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-400 resize-none transition-all"
                            style={{ minHeight: '42px', maxHeight: '120px' }}
                        />
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleSend}
                        disabled={!input.trim() || isTyping}
                        className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white hover:shadow-glow transition-all disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                    >
                        <Send className="w-4 h-4" />
                    </motion.button>
                </div>
            </div>
        </div>
    );
}
