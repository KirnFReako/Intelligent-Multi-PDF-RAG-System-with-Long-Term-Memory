import { create } from 'zustand';
import { pdfList, chatMessages, comparisonResult, memoryHistory } from '../data/dummyData';

const useStore = create((set, get) => ({
    // PDF State
    pdfs: [...pdfList],
    uploadPDF: (file) =>
        set((state) => ({
            pdfs: [
                ...state.pdfs,
                {
                    id: `pdf-${Date.now()}`,
                    name: file.name,
                    size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
                    sizeBytes: file.size,
                    pages: Math.floor(Math.random() * 50) + 10,
                    uploadedAt: new Date().toISOString(),
                    status: 'processed',
                },
            ],
        })),
    removePDF: (id) =>
        set((state) => ({
            pdfs: state.pdfs.filter((pdf) => pdf.id !== id),
        })),

    // Chat State
    messages: [...chatMessages],
    isTyping: false,
    addMessage: (content) => {
        const userMessage = {
            id: `msg-${Date.now()}`,
            role: 'user',
            content,
            timestamp: new Date().toISOString(),
        };

        set((state) => ({
            messages: [...state.messages, userMessage],
            isTyping: true,
        }));

        // Simulate AI response after delay
        setTimeout(() => {
            const aiMessage = {
                id: `msg-${Date.now() + 1}`,
                role: 'assistant',
                content:
                    'Based on the analysis of your uploaded documents, the relevant information has been retrieved from the vector store. The system identified multiple matching segments with high semantic similarity to your query. The key findings include context from the preprocessing pipeline and the retrieval mechanism that uses FAISS indices for efficient nearest-neighbor search.',
                timestamp: new Date().toISOString(),
                sources: [
                    { doc: 'System_Architecture_v2.pdf', page: 5, relevance: 0.91 },
                    { doc: 'ML_Pipeline_Design.pdf', page: 12, relevance: 0.84 },
                ],
                confidence: 0.89,
            };
            set((state) => ({
                messages: [...state.messages, aiMessage],
                isTyping: false,
            }));
        }, 2000);
    },

    // Comparison State
    selectedComparison: comparisonResult,
    setSelectedComparison: (comparison) => set({ selectedComparison: comparison }),

    // Memory State
    memory: [...memoryHistory],
    loadConversation: (memoryId) => {
        const mem = get().memory.find((m) => m.id === memoryId);
        if (mem) {
            set({
                messages: [
                    {
                        id: `msg-restored-1`,
                        role: 'user',
                        content: mem.question,
                        timestamp: mem.timestamp,
                    },
                    {
                        id: `msg-restored-2`,
                        role: 'assistant',
                        content: `This is a restored conversation about: "${mem.question}". The original discussion involved ${mem.messageCount} messages and referenced ${mem.pdfsUsed.join(', ')}.`,
                        timestamp: mem.timestamp,
                        sources: mem.pdfsUsed.map((doc, i) => ({ doc, page: i + 1, relevance: 0.85 + i * 0.03 })),
                        confidence: 0.88,
                    },
                ],
            });
        }
    },

    // Sidebar State
    sidebarOpen: true,
    toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
}));

export default useStore;
