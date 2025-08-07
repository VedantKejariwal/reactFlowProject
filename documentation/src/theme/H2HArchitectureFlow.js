import React, { useCallback } from 'react';
import {
  ReactFlow,
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

const initialNodes = [
  { id: '1', position: { x: 0, y: 50 }, data: { label: 'Consumer' }, style: { background: '#DFF6FF', borderRadius: '10px', padding: '10px' } },
  { id: '2', position: { x: 250, y: 50 }, data: { label: 'Consumer Initialization Data' }, style: { background: '#FFEDD5', borderRadius: '10px', padding: '10px' } },
  { id: '3', position: { x: 500, y: 50 }, data: { label: 'Consumer Choice Stage' }, style: { background: '#D1FADF', borderRadius: '10px', padding: '10px' } },
  { id: '4', position: { x: 750, y: 50 }, data: { label: 'Feedback Stage' }, style: { background: '#E3E4FA', borderRadius: '10px', padding: '10px' } },
  { id: '5', position: { x: 1000, y: 50 }, data: { label: 'Results Stage' }, style: { background: '#FFD6E0', borderRadius: '10px', padding: '10px' } },
  { id: '6', position: { x: 500, y: 200 }, data: { label: 'Producer' }, style: { background: '#FFC5A1', borderRadius: '10px', padding: '10px' } },
  { id: '7', position: { x: 0, y: 350 }, data: { label: 'Producer Initialization Data' }, style: { background: '#FBE7C6', borderRadius: '10px', padding: '10px' } },
  { id: '8', position: { x: 250, y: 350 }, data: { label: 'Producer Choice Stage' }, style: { background: '#D1E8E2', borderRadius: '10px', padding: '10px' } },
  { id: '9', position: { x: 500, y: 350 }, data: { label: 'Feedback Stage' }, style: { background: '#F3E8FF', borderRadius: '10px', padding: '10px' } },
  { id: '10', position: { x: 750, y: 350 }, data: { label: 'Results Stage' }, style: { background: '#A5D8FF', borderRadius: '10px', padding: '10px' } },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#8884d8' } },
  { id: 'e2-3', source: '2', target: '3', animated: true, style: { stroke: '#82ca9d' } },
  { id: 'e3-4', source: '3', target: '4', animated: true, style: { stroke: '#ff7300' } },
  { id: 'e4-5', source: '4', target: '5', animated: true, style: { stroke: '#d62728' } },
  { id: 'e6-7', source: '6', target: '7', animated: true, style: { stroke: '#17becf' } },
  { id: 'e7-8', source: '7', target: '8', animated: true, style: { stroke: '#9467bd' } },
  { id: 'e8-9', source: '8', target: '9', animated: true, style: { stroke: '#2ca02c' } },
  { id: 'e9-10', source: '9', target: '10', animated: true, style: { stroke: '#1f77b4' } },
];

const H2HArchitectureFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  return (
    <div style={{ width: '100%', height: '700px', background: '#F5F5F5', padding: '20px', borderRadius: '10px' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        attributionPosition="top-right"
      >
        <MiniMap zoomable pannable style={{ background: '#FFF' }} />
        <Controls />
        <Background color="#aaa" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
};

export default H2HArchitectureFlow;