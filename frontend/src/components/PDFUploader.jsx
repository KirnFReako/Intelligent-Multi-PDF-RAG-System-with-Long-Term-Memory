import React, { useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, X, CheckCircle, CloudUpload } from 'lucide-react';
import useStore from '../store/useStore';

export default function PDFUploader() {
    const { pdfs, uploadPDF, removePDF } = useStore();
    const [isDragging, setIsDragging] = useState(false);

    const handleDragOver = useCallback((e) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback(
        (e) => {
            e.preventDefault();
            setIsDragging(false);
            const files = Array.from(e.dataTransfer.files).filter(
                (f) => f.type === 'application/pdf'
            );
            files.forEach((file) => uploadPDF(file));
        },
        [uploadPDF]
    );

    const handleFileSelect = (e) => {
        const files = Array.from(e.target.files).filter(
            (f) => f.type === 'application/pdf'
        );
        files.forEach((file) => uploadPDF(file));
        e.target.value = '';
    };

    const formatSize = (bytes) => {
        if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
        return `${(bytes / 1024).toFixed(0)} KB`;
    };

    return (
        <div className="space-y-4">
            {/* Drop Zone */}
            <motion.div
                whileHover={{ scale: 1.01 }}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 cursor-pointer ${isDragging
                        ? 'border-primary-400 bg-primary-50'
                        : 'border-gray-200 bg-gray-50/50 hover:border-primary-300 hover:bg-primary-50/50'
                    }`}
            >
                <input
                    type="file"
                    accept=".pdf"
                    multiple
                    onChange={handleFileSelect}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    id="pdf-file-input"
                />
                <motion.div
                    animate={isDragging ? { scale: 1.1, y: -5 } : { scale: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center mx-auto mb-3">
                        <CloudUpload className={`w-7 h-7 ${isDragging ? 'text-primary-600' : 'text-primary-500'}`} />
                    </div>
                    <p className="text-sm font-semibold text-gray-700">
                        {isDragging ? 'Drop files here' : 'Drag & drop PDF files'}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">or click to browse • PDF only</p>
                </motion.div>
            </motion.div>

            {/* Uploaded Files */}
            <AnimatePresence mode="popLayout">
                {pdfs.map((pdf) => (
                    <motion.div
                        key={pdf.id}
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -20, scale: 0.95 }}
                        transition={{ duration: 0.25 }}
                        className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-soft transition-shadow group"
                    >
                        <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0">
                            <FileText className="w-5 h-5 text-red-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-700 truncate">{pdf.name}</p>
                            <div className="flex items-center gap-2 mt-0.5">
                                <span className="text-[10px] text-gray-400">{pdf.size}</span>
                                <span className="text-gray-300">•</span>
                                <span className="text-[10px] text-gray-400">{pdf.pages} pages</span>
                                <span className="text-gray-300">•</span>
                                <span className="inline-flex items-center gap-0.5 text-[10px] text-emerald-600 font-medium">
                                    <CheckCircle className="w-2.5 h-2.5" />
                                    Processed
                                </span>
                            </div>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => removePDF(pdf.id)}
                            className="w-7 h-7 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                        >
                            <X className="w-3.5 h-3.5" />
                        </motion.button>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
