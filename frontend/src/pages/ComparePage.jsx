import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GitCompare, ChevronDown, FileText, ArrowRight } from 'lucide-react';
import ComparisonCard from '../components/ComparisonCard';
import useStore from '../store/useStore';

export default function ComparePage() {
    const { pdfs, selectedComparison } = useStore();
    const [doc1, setDoc1] = useState(pdfs[0]?.name || '');
    const [doc2, setDoc2] = useState(pdfs[1]?.name || '');
    const [showResult, setShowResult] = useState(false);

    const handleCompare = () => {
        if (doc1 && doc2 && doc1 !== doc2) {
            setShowResult(true);
        }
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            {/* Selection Panel */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl border border-gray-100 shadow-soft p-6"
            >
                <div className="flex items-center gap-2 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center">
                        <GitCompare className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-800">Document Comparison</h3>
                        <p className="text-xs text-gray-400">
                            Select two documents to analyze similarities and differences
                        </p>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch gap-4">
                    {/* Document 1 */}
                    <div className="flex-1">
                        <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">
                            First Document
                        </label>
                        <div className="relative">
                            <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <select
                                id="doc1-select"
                                value={doc1}
                                onChange={(e) => setDoc1(e.target.value)}
                                className="w-full pl-10 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-400 transition-all cursor-pointer"
                            >
                                <option value="">Select document...</option>
                                {pdfs.map((pdf) => (
                                    <option key={pdf.id} value={pdf.name}>
                                        {pdf.name}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                    </div>

                    {/* Arrow */}
                    <div className="flex items-end justify-center pb-3">
                        <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center">
                            <ArrowRight className="w-4 h-4 text-gray-400" />
                        </div>
                    </div>

                    {/* Document 2 */}
                    <div className="flex-1">
                        <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">
                            Second Document
                        </label>
                        <div className="relative">
                            <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <select
                                id="doc2-select"
                                value={doc2}
                                onChange={(e) => setDoc2(e.target.value)}
                                className="w-full pl-10 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-400 transition-all cursor-pointer"
                            >
                                <option value="">Select document...</option>
                                {pdfs.map((pdf) => (
                                    <option key={pdf.id} value={pdf.name}>
                                        {pdf.name}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-gray-400" />
                        </div>
                    </div>
                </div>

                {/* Compare Button */}
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleCompare}
                    disabled={!doc1 || !doc2 || doc1 === doc2}
                    className="w-full mt-5 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-primary-700 text-white text-sm font-semibold hover:shadow-glow transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    <GitCompare className="w-4 h-4" />
                    Compare Documents
                </motion.button>

                {doc1 && doc2 && doc1 === doc2 && (
                    <p className="text-xs text-amber-600 mt-2 text-center">
                        Please select two different documents to compare.
                    </p>
                )}
            </motion.div>

            {/* Comparison Result */}
            {showResult && selectedComparison && (
                <ComparisonCard
                    result={{
                        ...selectedComparison,
                        doc1,
                        doc2,
                    }}
                />
            )}
        </div>
    );
}
