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
    { 
        id: '1', 
        position: { x: 50, y: 50 }, 
        data: { 
          label: (
            <div style={{ textAlign: 'center' }}>
              <strong>Step 2</strong>
              <p style={{ fontSize: '12px', margin: '5px 0' }}>
              Count units sold per round for each player (SoldStock)
              </p>
            </div>
          ) 
        }, 
        style: { backgroundColor: '#3498db', borderRadius: 10 } 
      },
      { 
        id: '2', 
        position: { x: 300, y: 50 }, 
        data: { 
          label: (
            <div style={{ textAlign: 'center', width: '340px' }}>
              <strong>Step 2.0: Create the count_sales function that counts number of sales in each round</strong>
              <p style={{ fontSize: '10px', margin: '5px' }}>
              def count_sales(sold): <br />
    try: <br />
        if sold is a string: <br />
            convert sold to a list <br />
        # Return array of sales count for each round for every producer <br />
        return [len(round_sales) for round_sales in sold] <br />
    except: <br />
        return [] 
              </p>
            </div>
          ) 
        }, 
        style: { backgroundColor: '#d6eaf8', borderRadius: 10, width: '350px', padding:'5px' } 
      },
      { 
        id: '3', 
        position: { x: 700, y: 50 }, 
        data: { 
          label: (
            <div style={{ textAlign: 'center', width: '340px' }}>
              <strong>Step 2.1: Apply the function to count sales per round for each player</strong>
              <p style={{ fontSize: '10px', margin: '5px' }}>
              df_reputation['SoldStock'] = df_reputation['sold'].apply(count_sales) <br />
df_warrants['SoldStock'] = df_warrants['sold'].apply(count_sales)
              </p>
            </div>
          ) 
        }, 
        style: { backgroundColor: '#d6eaf8', borderRadius: 10, width: '350px', padding:'5px' } 
      },
    ];

// Define labeled arrows (edges) between nodes
const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', type: 'floating', label: '' },
  { id: 'e2-3', source: '2', target: '3', type: 'floating', label: '' },
];

const edgeTypes = {
  floating: FloatingEdge,
};

// Define the ReactFlow component with controls
const DAF2 = () => {
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
        <MiniMap zoomable pannable style={{ width: 100, height: 100 }} />
        <Controls />
        <Background color="#ccc" gap={12} />
      </ReactFlow>
    </div>
  );
};

// Export the component
export default DAF2;