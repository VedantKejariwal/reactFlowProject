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
              <strong>Step 4</strong>
              <p style={{ fontSize: '12px', margin: '5px 0' }}>
              Extract GoodRatings,  BadRatings and compute NetRatings for each player
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
              <strong>Step 4.0: Create extract_ratings function that extracts accumulated good and bad ratings for each producer</strong>
              <p style={{ fontSize: '10px', margin: '5px' }}>

              def extract_ratings(review_str, index=0): <br />
    if review_str is nonempty: <br />
        try: <br />
            review_list = review_str parsed to list <br />
            if review_list and len(review_list) (greater than) 0: <br />
                last_array = last sublist of review_list <br />
                if last_array is a list and len(last_array) (greater than) index: <br />
                    return last_array[index] <br />
        except (ValueError, SyntaxError): <br />
            pass <br />
    return None <br />
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
              <strong>Step 4.1: Apply extract_ratings to create GoodRatings and BadRatings for df_reputation and df_warrants
              </strong>
              <p style={{ fontSize: '10px', margin: '5px' }}>
              
df_reputation['GoodRatings'] = df_reputation['reviews'].apply(
    lambda x: extract_ratings(x, 0) if pd.notnull(x) else None
) <br />

df_reputation['BadRatings'] = df_reputation['reviews'].apply(
    lambda x: extract_ratings(x, 1) if pd.notnull(x) else None
) <br />

df_warrants['GoodRatings'] = df_warrants['reviews'].apply(
    lambda x: extract_ratings(x, 0) if pd.notnull(x) else None
) <br />

df_warrants['BadRatings'] = df_warrants['reviews'].apply(
    lambda x: extract_ratings(x, 1) if pd.notnull(x) else None
) <br />
              </p>
            </div>
          ) 
        }, 
        style: { backgroundColor: '#d6eaf8', borderRadius: 10, width: '350px', padding:'5px' } 
      },
      { 
        id: '4', 
        position: { x: 800, y: 300 }, 
        data: { 
          label: (
            <div style={{ textAlign: 'center', width: '340px' }}>
              <strong>Step 4.2: Replace all NaN values with 0
              </strong>
              <p style={{ fontSize: '10px', margin: '5px' }}>
              
              df_warrants = df_warrants.assign( <br />
    GoodRatings=df_warrants['GoodRatings'].fillna(0), <br />
    BadRatings=df_warrants['BadRatings'].fillna(0) 
)<br />

df_reputation = df_reputation.assign( <br />
    GoodRatings=df_reputation['GoodRatings'].fillna(0), <br />
    BadRatings=df_reputation['BadRatings'].fillna(0)
) <br />
              </p>
            </div>
          ) 
        }, 
        style: { backgroundColor: '#d6eaf8', borderRadius: 10, width: '350px', padding:'5px' } 
      },
      { 
        id: '5', 
        position: { x: 300, y: 350 }, 
        data: { 
          label: (
            <div style={{ textAlign: 'center', width: '340px' }}>
              <strong>Step 4.3: Compute NetRatings = GoodRatings - BadRatings
              </strong>
              <p style={{ fontSize: '10px', margin: '5px' }}>
              
              
df_reputation['NetRatings'] = df_reputation['GoodRatings'] - df_reputation['BadRatings'] <br />

df_warrants['NetRatings'] = df_warrants['GoodRatings'] - df_warrants['BadRatings'] <br />
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
  { id: 'e3-4', source: '3', target: '4', type: 'floating', label: '' },
  { id: 'e4-5', source: '4', target: '5', type: 'floating', label: '' },
];

const edgeTypes = {
  floating: FloatingEdge,
};

// Define the ReactFlow component with controls
const DAF4 = () => {
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
export default DAF4;