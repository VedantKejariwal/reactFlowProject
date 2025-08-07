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
        position: { x: 50, y: -100 }, 
        data: { 
          label: (
            <div style={{ textAlign: 'center' }}>
              <strong>Step 5</strong>
              <p style={{ fontSize: '12px', margin: '5px 0' }}>
              Create Condition, ProductCost, and ProductPrice
              </p>
            </div>
          ) 
        }, 
        style: { backgroundColor: '#3498db', borderRadius: 10 } 
      },
      { 
        id: '2', 
        position: { x: 300, y: -100 }, 
        data: { 
          label: (
            <div style={{ textAlign: 'center', width: '340px' }}>
              <strong>Step 5.0: Create prepare_and_process function using helper function process_row</strong>
              <p style={{ fontSize: '10px', margin: '5px' }}>

def prepare_and_process(df): <br />
    # Initialize Condition, ProductCost, and ProductPrice columns <br />
    df['Condition'] = None <br />
    df['ProductCost'] = None <br />
    df['ProductPrice'] = None <br />
    <br />
    # Apply the helper processing function, which computes Condition, ProductCost, and ProductPrice for each producer <br />
    return df.apply(process_row, axis=1)
              </p>
            </div>
          ) 
        }, 
        style: { backgroundColor: '#d6eaf8', borderRadius: 10, width: '350px', padding:'5px' } 
      },
      { 
        id: '3', 
        position: { x: 800, y: -100 }, 
        data: { 
          label: (
            <div style={{ textAlign: 'center', width: '340px' }}>
              <strong>SStep 5.1: Apply prepare_and_process to create Condition, ProductCost, and ProductPrice and manually set Condition to 0 for reputation and 1 for warrants 
              </strong>
              <p style={{ fontSize: '10px', margin: '5px' }}>
              
              df_reputation = prepare_and_process(df_reputation) <br />
df_warrants = prepare_and_process(df_warrants) <br />
<br />
df_reputation['Condition'] = 0 <br />
df_warrants['Condition'] = 1 <br />
              </p>
            </div>
          ) 
        }, 
        style: { backgroundColor: '#d6eaf8', borderRadius: 10, width: '350px', padding:'5px' } 
      },
      { 
        id: '4', 
        position: { x: 600, y: 150 }, 
        data: { 
          label: (
            <div>
                <strong>Sampled columns</strong>
          <img 
            src="/img/DSF5output.png"
            alt="Step 5 Illustration" 
            style={{ width: '100%', height: 'auto' }} 
          />
        </div>
          ) 
        }, 
        style: { width: '350px' } 
      },
    ];

// Define labeled arrows (edges) between nodes
const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', type: 'floating', label: '' },
  { id: 'e2-3', source: '2', target: '3', type: 'floating', label: '' },
  { id: 'e3-4', source: '3', target: '4', type: 'floating', label: 'Sampled columns' },
];

const edgeTypes = {
    floating: FloatingEdge,
  };

// Define the ReactFlow component with controls
const DAF5 = () => {
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
export default DAF5;