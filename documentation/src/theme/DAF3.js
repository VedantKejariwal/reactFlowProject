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
              <strong>Step 3</strong>
              <p style={{ fontSize: '12px', margin: '5px 0' }}>
              Create Round arrays for each player
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
              <strong>Step 3.0: Extract 'numRounds' from the 'treatment' column</strong>
              <p style={{ fontSize: '10px', margin: '5px' }}>
              df_reputation['Rounds'] = df_reputation['treatment'].apply(lambda x: json.loads(x)['numRounds']) <br />
df_warrants['Rounds'] = df_warrants['treatment'].apply(lambda x: json.loads(x)['numRounds'])
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
              <strong>Step 3.1: Create the 'Round' column with a list from 1 to the value in 'Rounds'</strong>
              <p style={{ fontSize: '10px', margin: '5px' }}>
              df_reputation['Round'] = df_reputation['Rounds'].apply(lambda x: list(range(1, x+1))) <br />
              df_warrants['Round'] = df_warrants['Rounds'].apply(lambda x: list(range(1, x+1)))
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
const DAF3 = () => {
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
export default DAF3;