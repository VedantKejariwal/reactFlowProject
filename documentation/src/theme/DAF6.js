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
              <strong>Step 6</strong>
              <p style={{ fontSize: '12px', margin: '5px 0' }}>
              Create Challenged and NumChallenges
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
              <strong>Step 6.0: Create process_challenges function to extract data from the ‘challenges’ column</strong>
              <p style={{ fontSize: '10px', margin: '5px' }}>

              def process_challenges(df): <br />
    1. define safe_literal_eval - parses a string value into a list <br />
    2. safe_literal_eval is applied to the 'challenges' column in each df <br />
    3. define process_challenges - for each round in that row's challenges, store a boolean value in Challenged <br />
        - also count the number of challenges in that round and store it in NumChallenges <br />
        - add Challenged and NumChallenges as new columns in each df <br />
    4. return df

              </p>
            </div>
          ) 
        }, 
        style: { backgroundColor: '#d6eaf8', borderRadius: 10, width: '350px', padding:'5px' } 
      },
      { 
        id: '3', 
        position: { x: 800, y: 50 }, 
        data: { 
          label: (
            <div style={{ textAlign: 'center', width: '340px' }}>
              <strong>Step 6.1: Apply process_challenges to both dataframes
              </strong>
              <p style={{ fontSize: '10px', margin: '5px' }}>
              
              df_reputation = process_challenges(df_reputation) <br />
df_warrants = process_challenges(df_warrants)
              </p>
            </div>
          ) 
        }, 
        style: { backgroundColor: '#d6eaf8', borderRadius: 10, width: '350px', padding:'5px' } 
      },
      { 
        id: '4', 
        position: { x: 600, y: 300 }, 
        data: { 
          label: (
            <div>
          <img 
            src="/img/DSF6output.png"
            alt="Step 6 Illustration" 
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
const DAF6 = () => {
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
export default DAF6;