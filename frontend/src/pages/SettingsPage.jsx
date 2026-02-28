import React from 'react';
import { motion } from 'framer-motion';
import {
    Settings as SettingsIcon,
    Palette,
    Bell,
    Shield,
    Database,
    Cpu,
} from 'lucide-react';

const sections = [
    {
        title: 'Appearance',
        icon: Palette,
        settings: [
            { label: 'Theme', description: 'Light mode is currently active', type: 'toggle', enabled: true },
            { label: 'Compact Mode', description: 'Reduce spacing in the interface', type: 'toggle', enabled: false },
            { label: 'Animations', description: 'Enable smooth transitions', type: 'toggle', enabled: true },
        ],
    },
    {
        title: 'Notifications',
        icon: Bell,
        settings: [
            { label: 'Processing Complete', description: 'Notify when PDF processing finishes', type: 'toggle', enabled: true },
            { label: 'Weekly Reports', description: 'Receive weekly usage summaries', type: 'toggle', enabled: false },
        ],
    },
    {
        title: 'AI Configuration',
        icon: Cpu,
        settings: [
            { label: 'Model', description: 'GPT-4 Turbo', type: 'info' },
            { label: 'Embedding Model', description: 'text-embedding-ada-002', type: 'info' },
            { label: 'Chunk Size', description: '512 tokens', type: 'info' },
            { label: 'Top K Results', description: '5 documents', type: 'info' },
        ],
    },
    {
        title: 'Data & Storage',
        icon: Database,
        settings: [
            { label: 'Vector Store', description: 'FAISS — 1,247 chunks indexed', type: 'info' },
            { label: 'Storage Used', description: '42 MB of 500 MB', type: 'info' },
            { label: 'Auto-delete old conversations', description: 'Remove conversations older than 30 days', type: 'toggle', enabled: false },
        ],
    },
];

export default function SettingsPage() {
    return (
        <div className="max-w-3xl mx-auto space-y-5">
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 mb-2"
            >
                <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                    <SettingsIcon className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                    <h3 className="text-sm font-semibold text-gray-800">System Settings</h3>
                    <p className="text-xs text-gray-400">Configure your RAG system preferences</p>
                </div>
            </motion.div>

            {sections.map((section, si) => {
                const SectionIcon = section.icon;
                return (
                    <motion.div
                        key={section.title}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: si * 0.1 }}
                        className="bg-white rounded-2xl border border-gray-100 shadow-soft overflow-hidden"
                    >
                        <div className="px-5 py-4 border-b border-gray-50 flex items-center gap-2">
                            <SectionIcon className="w-4 h-4 text-primary-500" />
                            <h4 className="text-sm font-semibold text-gray-700">{section.title}</h4>
                        </div>
                        <div className="divide-y divide-gray-50">
                            {section.settings.map((setting, i) => (
                                <div
                                    key={i}
                                    className="px-5 py-3.5 flex items-center justify-between hover:bg-gray-50/50 transition-colors"
                                >
                                    <div>
                                        <p className="text-sm text-gray-700 font-medium">{setting.label}</p>
                                        <p className="text-xs text-gray-400 mt-0.5">{setting.description}</p>
                                    </div>
                                    {setting.type === 'toggle' ? (
                                        <button
                                            className={`relative w-10 h-6 rounded-full transition-colors ${setting.enabled ? 'bg-primary-500' : 'bg-gray-200'}`}
                                        >
                                            <motion.div
                                                initial={false}
                                                animate={{ x: setting.enabled ? 18 : 2 }}
                                                className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
                                            />
                                        </button>
                                    ) : (
                                        <span className="text-xs font-medium text-gray-500 bg-gray-50 px-2.5 py-1 rounded-lg">
                                            {setting.description}
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
}
