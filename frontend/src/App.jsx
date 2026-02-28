import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import ChatPage from './pages/ChatPage';
import ComparePage from './pages/ComparePage';
import MemoryPage from './pages/MemoryPage';
import SettingsPage from './pages/SettingsPage';
import useStore from './store/useStore';

export default function App() {
    const sidebarOpen = useStore((s) => s.sidebarOpen);

    return (
        <BrowserRouter>
            <div className="min-h-screen bg-gray-50">
                <Sidebar />
                <Header />
                <motion.main
                    initial={false}
                    animate={{ marginLeft: sidebarOpen ? 260 : 72 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="p-6 pt-4"
                >
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/chat" element={<ChatPage />} />
                        <Route path="/compare" element={<ComparePage />} />
                        <Route path="/memory" element={<MemoryPage />} />
                        <Route path="/settings" element={<SettingsPage />} />
                    </Routes>
                </motion.main>
            </div>
        </BrowserRouter>
    );
}
