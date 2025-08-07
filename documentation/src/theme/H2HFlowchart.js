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
import FloatingEdge from './FloatingEdge';

// Define color-coded nodes for Producers, Consumers, and Marketplace
const initialNodes = [
  { id: '1', position: { x: 50, y: 50 }, data: { label: 'Producer Initialization (Setup Producer)' }, style: { backgroundColor: '#ffdb99', borderRadius: 10 } },
  { id: '2', position: { x: 300, y: 50 }, data: { label: 'Producer Role Allocation (Assign Role)' }, style: { backgroundColor: '#ffffcc', borderRadius: 10 } },
  { id: '3', position: { x: 600, y: 50 }, data: { label: 'Producer Choice (Choose Product)' }, style: { backgroundColor: '#ccffcc', borderRadius: 10 } },
  { id: '4', position: { x: 900, y: 50 }, data: { label: 'Feedback (Receive Feedback)' }, style: { backgroundColor: '#ccffcc', borderRadius: 10 } },
  { id: '5', position: { x: 1200, y: 50 }, data: { label: 'Result Stage (Update Market Data)' }, style: { backgroundColor: '#ccffcc', borderRadius: 10 } },
  { id: '6', position: { x: 750, y: 200 }, data: { label: 'Product Market Place' }, style: { backgroundColor: '#ff9999', borderRadius: 10, fontWeight: 'bold' } },
  { id: '7', position: { x: 50, y: 350 }, data: { label: 'Consumer Initialization (Setup Consumer)' }, style: { backgroundColor: '#ffdb99', borderRadius: 10 } },
  { id: '8', position: { x: 300, y: 350 }, data: { label: 'Consumer Role Allocation (Assign Role)' }, style: { backgroundColor: '#ffffcc', borderRadius: 10 } },
  { id: '9', position: { x: 600, y: 350 }, data: { label: 'Consumer Choice (Make Purchase)' }, style: { backgroundColor: '#ccffcc', borderRadius: 10 } },
  { id: '10', position: { x: 900, y: 350 }, data: { label: 'Feedback Stage (Consumer Feedback)' }, style: { backgroundColor: '#ccffcc', borderRadius: 10 } },
  { id: '11', position: { x: 1200, y: 350 }, data: { label: 'Result Stage (Update Market Data)' }, style: { backgroundColor: '#ccffcc', borderRadius: 10 } },
];

// Define labeled arrows (edges) between nodes
const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', type: 'floating', label: 'Setup Producer' },
  { id: 'e2-3', source: '2', target: '3', type: 'floating', label: 'Assign Role' },
  { id: 'e3-4', source: '3', target: '4', type: 'floating', label: 'Choose Product' },
  { id: 'e4-5', source: '4', target: '5', type: 'floating', label: 'Receive Feedback' },
  { id: 'e3-6', source: '3', target: '6', type: 'floating', label: 'Send to Market' },
  { id: 'e4-6', source: '4', target: '6', type: 'floating', label: 'Consumer Decisions' },
  { id: 'e5-6', source: '5', target: '6', type: 'floating', label: 'Update Market Data' },
  { id: 'e7-8', source: '7', target: '8', type: 'floating', label: 'Setup Consumer' },
  { id: 'e8-9', source: '8', target: '9', type: 'floating', label: 'Assign Role' },
  { id: 'e9-10', source: '9', target: '10', type: 'floating', label: 'Make Purchase' },
  { id: 'e10-11', source: '10', target: '11', type: 'floating', label: 'Consumer Feedback' },
  { id: 'e9-6', source: '9', target: '6', type: 'floating', label: 'Buy Products' },
  { id: 'e10-6', source: '10', target: '6', type: 'floating', label: 'Review System' },
  { id: 'e11-6', source: '11', target: '6', type: 'floating', label: 'Update Market Data' },
];

const edgeTypes = {
  floating: FloatingEdge,
};

// Define the ReactFlow component with controls
const H2HFlowchart = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  return (
    <div style={{ width: '100%', height: '500px', background: '#eef5ff', padding: '10px', borderRadius: '10px' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        attributionPosition="top-right"
        edgeTypes={edgeTypes}
      >
        <MiniMap zoomable pannable style ={{width: 100, height: 100}}/>
        <Controls />
        <Background color="#ccc" gap={12} />
      </ReactFlow>
    </div>
  );
};

// Export the component
export default H2HFlowchart;