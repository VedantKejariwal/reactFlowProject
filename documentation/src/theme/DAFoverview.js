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
                <a 
          href="/docs/DataAnalysisDocs/Step1" // Replace with the correct route
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
              <strong>Step 1</strong>
              <p style={{ fontSize: '12px', margin: '5px 0' }}>
              Extract reputation and warrants dataframes
              </p>
              </a>
            </div>
          ) 
        }, 
        style: { backgroundColor: '#3498db', borderRadius: 10 } 
      },
      { 
        id: '2', 
        position: { x: 250, y: 50 }, 
        data: { 
          label: (
            <div style={{ textAlign: 'center' }}>
                <a 
          href="/docs/DataAnalysisDocs/Step2"
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
              <strong>Step 2</strong>
              <p style={{ fontSize: '12px', margin: '5px 0' }}>
              Count units sold per round for each player (SoldStock)
              </p>
              </a>
            </div>
          ) 
        }, 
        style: { backgroundColor: '#3498db', borderRadius: 10 } 
      },
      { 
        id: '3', 
        position: { x: 500, y: 50 }, 
        data: { 
          label: (
            <div style={{ textAlign: 'center' }}>
                <a 
          href="/docs/DataAnalysisDocs/Step3"
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
              <strong>Step 3</strong>
              <p style={{ fontSize: '12px', margin: '5px 0' }}>
              Create Round arrays for each player
              </p>
              </a>
            </div>
          ) 
        }, 
        style: { backgroundColor: '#3498db', borderRadius: 10 } 
      },
      { 
        id: '4', 
        position: { x: 750, y: 50 }, 
        data: { 
          label: (
            <div style={{ textAlign: 'center' }}>
                <a 
          href="/docs/DataAnalysisDocs/Step4"
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
              <strong>Step 4</strong>
              <p style={{ fontSize: '12px', margin: '5px 0' }}>
              Extract GoodRatings,  BadRatings and compute NetRatings for each player
              </p>
              </a>
            </div>
          ) 
        }, 
        style: { backgroundColor: '#3498db', borderRadius: 10 } 
      },
      { 
        id: '5', 
        position: { x: 50, y: 300 }, 
        data: { 
          label: (
            <div style={{ textAlign: 'center' }}>
                <a 
          href="/docs/DataAnalysisDocs/Step5"
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
              <strong>Step 5</strong>
              <p style={{ fontSize: '12px', margin: '5px 0' }}>
              Create Condition, ProductCost, and ProductPrice
              </p>
              </a>
            </div>
          ) 
        }, 
        style: { backgroundColor: '#3498db', borderRadius: 10 } 
      },
      { 
        id: '6', 
        position: { x: 250, y: 320 }, 
        data: { 
          label: (
            <div style={{ textAlign: 'center' }}>
                <a 
          href="/docs/DataAnalysisDocs/Step6"
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
              <strong>Step 6</strong>
              <p style={{ fontSize: '12px', margin: '5px 0' }}>
              Create Challenged and NumChallenges
              </p>
              </a>
            </div>
          ) 
        }, 
        style: { backgroundColor: '#3498db', borderRadius: 10 } 
      },
      { 
        id: '7', 
        position: { x: 500, y: 300 }, 
        data: { 
          label: (
            <div style={{ textAlign: 'center' }}>
                <a 
          href="/docs/DataAnalysisDocs/Step7"
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
              <strong>Step 7</strong>
              <p style={{ fontSize: '12px', margin: '5px 0' }}>
              Combine reputation and warrants dataframes to create df_ads
              </p>
              </a>
            </div>
          ) 
        }, 
        style: { backgroundColor: '#3498db', borderRadius: 10 } 
      },
      { 
        id: '8', 
        position: { x: 750, y: 250 }, 
        data: { 
          label: (
            <div style={{ textAlign: 'center' }}>
                <a 
          href="/docs/DataAnalysisDocs/Step8"
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
              <strong>Step 8</strong>
              <p style={{ fontSize: '12px', margin: '5px 0' }}>
              Fetch basic statistics and perform comparative analyses of data fields 
              </p>
              </a>
            </div>
          ) 
        }, 
        style: { backgroundColor: '#3498db', borderRadius: 10 } 
      },
    ];

// Define labeled arrows (edges) between nodes
const initialEdges = [
    { id: 'e1-2', source: '1', target: '2', type: 'floating', label: '' },
    { id: 'e2-3', source: '2', target: '3', type: 'floating', label: '' },
    { id: 'e3-4', source: '3', target: '4', type: 'floating', label: '' },
    { id: 'e4-5', source: '4', target: '5', type: 'floating', label: '' },
    { id: 'e5-6', source: '5', target: '6', type: 'floating', label: '' },
    { id: 'e6-7', source: '6', target: '7', type: 'floating', label: '' },
    { id: 'e7-8', source: '7', target: '8', type: 'floating', label: '' },
  ];

  const edgeTypes = {
    floating: FloatingEdge,
  };

// Define the ReactFlow component with controls
const DAFoverview = () => {
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
export default DAFoverview;