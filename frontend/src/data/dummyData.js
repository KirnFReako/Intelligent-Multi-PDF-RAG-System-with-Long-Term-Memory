export const pdfList = [
    {
        id: 'pdf-1',
        name: 'System_Architecture_v2.pdf',
        size: '2.4 MB',
        sizeBytes: 2516582,
        pages: 45,
        uploadedAt: '2026-02-25T10:30:00Z',
        status: 'processed',
    },
    {
        id: 'pdf-2',
        name: 'ML_Pipeline_Design.pdf',
        size: '1.8 MB',
        sizeBytes: 1887436,
        pages: 32,
        uploadedAt: '2026-02-26T14:15:00Z',
        status: 'processed',
    },
    {
        id: 'pdf-3',
        name: 'Data_Preprocessing_Guide.pdf',
        size: '3.1 MB',
        sizeBytes: 3250585,
        pages: 58,
        uploadedAt: '2026-02-27T09:00:00Z',
        status: 'processed',
    },
    {
        id: 'pdf-4',
        name: 'Deployment_Handbook.pdf',
        size: '1.2 MB',
        sizeBytes: 1258291,
        pages: 24,
        uploadedAt: '2026-02-28T16:45:00Z',
        status: 'processed',
    },
];

export const chatMessages = [
    {
        id: 'msg-1',
        role: 'user',
        content: 'What is the system architecture of the RAG pipeline described in the documents?',
        timestamp: '2026-02-28T10:00:00Z',
    },
    {
        id: 'msg-2',
        role: 'assistant',
        content:
            'Based on Document 2, the system architecture includes embedding generation and FAISS vector storage. The pipeline follows a three-stage process:\n\n1. **Document Ingestion** — PDFs are parsed, chunked into semantic segments, and preprocessed for embedding.\n2. **Vector Storage** — Text embeddings are generated using a transformer model and stored in a FAISS index for fast similarity search.\n3. **Retrieval & Generation** — User queries are embedded, matched against stored vectors, and relevant context is passed to the LLM for response generation.\n\nThe architecture also incorporates a long-term memory module that persists conversation history and retrieval patterns across sessions.',
        timestamp: '2026-02-28T10:00:05Z',
        sources: [
            { doc: 'System_Architecture_v2.pdf', page: 3, relevance: 0.94 },
            { doc: 'ML_Pipeline_Design.pdf', page: 8, relevance: 0.87 },
        ],
        confidence: 0.87,
    },
    {
        id: 'msg-3',
        role: 'user',
        content: 'How does the preprocessing step handle different PDF formats?',
        timestamp: '2026-02-28T10:01:00Z',
    },
    {
        id: 'msg-4',
        role: 'assistant',
        content:
            'According to the Data Preprocessing Guide (pages 12-18), the system handles different PDF formats through a multi-layered parsing approach:\n\n• **Text-based PDFs** are processed using PyPDF2 for direct text extraction\n• **Scanned PDFs** undergo OCR processing via Tesseract with language detection\n• **Mixed-format PDFs** use a hybrid approach that detects page types and routes to the appropriate parser\n\nThe preprocessing pipeline also includes:\n- Table detection and structured data extraction\n- Image caption generation for embedded figures\n- Header/footer removal and page number cleanup\n- Unicode normalization and encoding standardization',
        timestamp: '2026-02-28T10:01:08Z',
        sources: [
            { doc: 'Data_Preprocessing_Guide.pdf', page: 12, relevance: 0.96 },
            { doc: 'Data_Preprocessing_Guide.pdf', page: 15, relevance: 0.91 },
            { doc: 'System_Architecture_v2.pdf', page: 7, relevance: 0.78 },
        ],
        confidence: 0.92,
    },
];

export const comparisonResult = {
    doc1: 'System_Architecture_v2.pdf',
    doc2: 'ML_Pipeline_Design.pdf',
    similarityScore: 0.82,
    similarities: [
        'Both documents describe a transformer-based embedding generation pipeline',
        'FAISS is referenced as the primary vector store in both documents',
        'Both outline a retrieval-augmented generation workflow with context injection',
        'Shared reference to chunking strategies with 512-token window sizes',
        'Both mention the importance of metadata preservation during ingestion',
    ],
    differences: [
        'Architecture doc focuses on system-level design; ML doc focuses on model training specifics',
        'Architecture doc uses microservices approach; ML doc describes monolithic training pipeline',
        'ML doc includes hyperparameter tuning details not found in architecture doc',
        'Architecture doc covers deployment and scaling; ML doc covers experimentation workflows',
        'Architecture doc references Kubernetes orchestration; ML doc references MLflow tracking',
    ],
};

export const memoryHistory = [
    {
        id: 'mem-1',
        question: 'What is the system architecture of the RAG pipeline?',
        timestamp: '2026-02-28T10:00:00Z',
        messageCount: 4,
        pdfsUsed: ['System_Architecture_v2.pdf', 'ML_Pipeline_Design.pdf'],
    },
    {
        id: 'mem-2',
        question: 'Explain the vector storage mechanism used in the system',
        timestamp: '2026-02-27T15:30:00Z',
        messageCount: 6,
        pdfsUsed: ['System_Architecture_v2.pdf'],
    },
    {
        id: 'mem-3',
        question: 'How does chunking affect retrieval accuracy?',
        timestamp: '2026-02-27T11:20:00Z',
        messageCount: 3,
        pdfsUsed: ['Data_Preprocessing_Guide.pdf', 'ML_Pipeline_Design.pdf'],
    },
    {
        id: 'mem-4',
        question: 'Compare deployment strategies mentioned across documents',
        timestamp: '2026-02-26T09:45:00Z',
        messageCount: 5,
        pdfsUsed: ['Deployment_Handbook.pdf', 'System_Architecture_v2.pdf'],
    },
    {
        id: 'mem-5',
        question: 'What preprocessing steps are applied to scanned PDFs?',
        timestamp: '2026-02-25T14:10:00Z',
        messageCount: 2,
        pdfsUsed: ['Data_Preprocessing_Guide.pdf'],
    },
    {
        id: 'mem-6',
        question: 'What LLM models are referenced for generation?',
        timestamp: '2026-02-24T16:30:00Z',
        messageCount: 4,
        pdfsUsed: ['ML_Pipeline_Design.pdf', 'System_Architecture_v2.pdf'],
    },
    {
        id: 'mem-7',
        question: 'Describe the evaluation metrics for retrieval quality',
        timestamp: '2026-02-23T10:00:00Z',
        messageCount: 3,
        pdfsUsed: ['ML_Pipeline_Design.pdf'],
    },
];

export const dashboardStats = {
    totalPDFs: 4,
    totalQuestions: 18,
    retrievalAccuracy: 92,
    avgResponseTime: 1.4,
};

export const recentActivity = [
    { id: 'act-1', action: 'Uploaded', target: 'Deployment_Handbook.pdf', time: '2 hours ago' },
    { id: 'act-2', action: 'Asked', target: 'How does preprocessing handle scanned PDFs?', time: '3 hours ago' },
    { id: 'act-3', action: 'Compared', target: 'Architecture vs ML Pipeline', time: '5 hours ago' },
    { id: 'act-4', action: 'Uploaded', target: 'Data_Preprocessing_Guide.pdf', time: '1 day ago' },
    { id: 'act-5', action: 'Asked', target: 'What is the system architecture?', time: '1 day ago' },
];
