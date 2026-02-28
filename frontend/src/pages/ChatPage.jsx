import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X } from 'lucide-react';
import ChatWindow from '../components/ChatWindow';
import SourcePanel from '../components/SourcePanel';
import PDFUploader from '../components/PDFUploader';

export default function ChatPage() {
    const [showUploader, setShowUploader] = useState(false);

    return (
        <div className="h-[calc(100vh-7rem)] flex flex-col">
            {/* Upload Toggle */}
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h3 className="text-sm font-medium text-gray-600">
                        Ask questions about your uploaded documents
                    </h3>
                </div>
                <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setShowUploader(!showUploader)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${showUploader
                            ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            : 'bg-gradient-to-r from-primary-500 to-primary-700 text-white hover:shadow-glow'
                        }`}
                >
                    {showUploader ? (
                        <>
                            <X className="w-4 h-4" />
                            Close
                        </>
                    ) : (
                        <>
                            <Upload className="w-4 h-4" />
                            Upload PDFs
                        </>
                    )}
                </motion.button>
            </div>

            {/* Upload Panel */}
            <AnimatePresence>
                {showUploader && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mb-4 overflow-hidden"
                    >
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-soft p-4">
                            <PDFUploader />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Chat + Source Layout */}
            <div className="flex-1 grid lg:grid-cols-3 gap-4 min-h-0">
                <div className="lg:col-span-2 min-h-0">
                    <ChatWindow />
                </div>
                <div className="hidden lg:block min-h-0 overflow-y-auto">
                    <SourcePanel />
                </div>
            </div>
        </div>
    );
}
