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
        position: { x: 50, y: -800 }, 
        data: { 
          label: (
            <div style={{ textAlign: 'center' }}>
              <strong>Step 7</strong>
              <p style={{ fontSize: '12px', margin: '5px 0' }}>
              Combine reputation and warrants dataframes to create df_ads
              </p>
            </div>
          ) 
        }, 
        style: { backgroundColor: '#3498db', borderRadius: 10 } 
      },
      { 
        id: '2', 
        position: { x: 300, y: -800 }, 
        data: { 
          label: (
            <div style={{ textAlign: 'center', width: '340px' }}>
              <strong>Step 7.0.0: Rename columns appropriately</strong>
              <p style={{ fontSize: '10px', margin: '5px' }}>
                
                   
              
                    df_warrants.rename(columns=('productQuality': 'ProductQuality',
                    'score': 'Scores',
                    'brandName': 'BrandName',
                    'warrants': 'Warranted',
                    'changedBrand':'BrandChanged'), inplace=True) <br />
                    
                    <br />df_reputation.rename(columns=('productQuality': 'ProductQuality',
                    'score': 'Scores',
                    'brandName': 'BrandName',
                    'warrants': 'Warranted',
                    'changedBrand':'BrandChanged'), inplace=True)
                    
                
              </p>
            </div>
          ) 
        }, 
        style: { backgroundColor: '#d6eaf8', borderRadius: 10, width: '350px', padding:'5px' } 
      },
      { 
        id: '3', 
        position: { x: 800, y: -800 }, 
        data: { 
          label: (
            <div style={{ textAlign: 'center', width: '340px' }}>
              <strong>Step 7.0.1: Split participantID to PlayerID (consumer) and ProducerID (producer)
              </strong>
              <p style={{ fontSize: '10px', margin: '5px' }}>
              
              
df_reputation['PlayerID'] = df_reputation['participantID'].where(df_reputation['role'] == 'consumer') <br />
df_reputation['ProducerID'] = df_reputation['participantID'].where(df_reputation['role'] == 'producer') <br />

df_warrants['PlayerID'] = df_warrants['participantID'].where(df_warrants['role'] == 'consumer') <br />
df_warrants['ProducerID'] = df_warrants['participantID'].where(df_warrants['role'] == 'producer') <br />
              </p>
            </div>
          ) 
        }, 
        style: { backgroundColor: '#d6eaf8', borderRadius: 10, width: '350px', padding:'5px' } 
      },
      { 
        id: '4', 
        position: { x: 800, y: -500 }, 
        data: { 
          label: (
            <div style={{ textAlign: 'center', width: '340px' }}>
              <strong>Step 7.1.: Process Warranted and create WarrantCount in df_warrants
              </strong>
              <p style={{ fontSize: '10px', margin: '5px' }}>
              1. define extract_consumer_count - extracts the `consumerCount` value from the `treatment` column <br />
2. apply extract_consumer_count to create a new `consumerCount` column <br />
3. define generate_warrant_count - generates a `WarrantCount` list based on the 'Warranted' column <br />
        - if Warranted is None, return None <br />
        - if Warranted is a list, generate a list of counts based on the boolean values <br />
4. apply generate_warrant_count to create a new `WarrantCount` column: <br />
df_warrants["WarrantCount"] = df_warrants.apply(lambda row: generate_warrant_count(row["Warranted"], row["consumerCount"]), axis=1) <br />
              </p>
            </div>
          ) 
        }, 
        style: { backgroundColor: '#d6eaf8', borderRadius: 10, width: '350px', padding:'5px' } 
      },
      { 
        id: '5', 
        position: { x: 400, y: -450 }, 
        data: { 
          label: (
            <div>
                <strong>Sampled columns</strong>
          <img 
            src="/img/DSF7output1.png"
            alt="Step 7 Illustration" 
            style={{ width: '100%', height: 'auto' }} 
          />
        </div>
          ) 
        }, 
        style: { width: '350px' } 
      },
      {
      id: '6', 
        position: { x: 800, y: -150 }, 
        data: { 
          label: (
            <div style={{ textAlign: 'center', width: '340px' }}>
              <strong>Step 7.2.0.: Combine df_warrants and df_reputation into df_ads
              </strong>
              <p style={{ fontSize: '10px', margin: '5px' }}>
              # Strip spaces from column names and standardize the format <br />
df_reputation.columns = df_reputation.columns.str.strip() <br />
df_warrants.columns = df_warrants.columns.str.strip() <br />
 
# Identify the common columns between warrants and reputation df <br />
common_cols = list(set(df_reputation.columns) & set(df_warrants.columns)) <br />

# Combine all ads into a single dataframe <br />
df_ads = pd.concat((df_warrants[common_cols], df_reputation[common_cols]), axis=0) <br />
              </p>
            </div>
          ) 
        }, 
        style: { backgroundColor: '#d6eaf8', borderRadius: 10, width: '350px', padding:'5px' } 
      },
      {
        id: '7', 
          position: { x: 400, y: -150 }, 
          data: { 
            label: (
              <div style={{ textAlign: 'center', width: '340px' }}>
                <strong>Step 7.2.1.: Process the ProductCost and ProductPrice columns to count the occurrences of low quality, high quality, not warranted, and warranted products
                </strong>
                <p style={{ fontSize: '10px', margin: '5px' }}>
                # Initialize lists to hold the counts <br />
low_quality_count = 0 <br />
high_quality_count = 0 <br />
not_warranted_count = 0 <br />
warranted_count = 0 <br />

# Iterate through the ProductCost and ProductPrice columns to count the occurrences <br />
for product_cost, product_price in zip(df_ads['ProductCost'], df_ads['ProductPrice']): <br />
    if isinstance(product_cost, str): <br />
        product_cost = ast.literal_eval(product_cost)  # Convert string to list <br />
    if isinstance(product_price, str): <br />
        product_price = ast.literal_eval(product_price)  # Convert string to list <br />

        <br /># Count occurrences of 2 (low quality) and 6 (high quality) in ProductCost <br />
    if isinstance(product_cost, list): <br />
        low_quality_count += product_cost.count(2) <br />
        high_quality_count += product_cost.count(6) <br />

        <br /># Count occurrences of 10 (not warranted) and 12 (warranted) in ProductPrice <br />
    if isinstance(product_price, list): <br />
        not_warranted_count += product_price.count(10) <br />
        warranted_count += product_price.count(12) <br />

        <br /># Print the counts<br />
                </p>
              </div>
            ) 
          }, 
          style: { backgroundColor: '#d6eaf8', borderRadius: 10, width: '350px', padding:'5px' } 
        },
        { 
            id: '8', 
            position: { x: 20, y: 0 }, 
            data: { 
              label: (
                <div>
                    <strong>Sampled columns</strong>
              <img 
                src="/img/DSF7output2.png"
                alt="Step 7 Illustration" 
                style={{ width: '100%', height: 'auto' }} 
              />
            </div>
              ) 
            }, 
            style: { width: '350px' } 
          },
          {
            id: '9', 
              position: { x: 400, y: 500 }, 
              data: { 
                label: (
                  <div style={{ textAlign: 'center', width: '340px' }}>
                    <strong>Step 7.2.2.: Combine df_warrants and df_reputation into df_ads
                    </strong>
                    <p style={{ fontSize: '10px', margin: '5px' }}>
                    # Strip spaces from column names and standardize the format <br />
df_reputation.columns = df_reputation.columns.str.strip() <br />
df_warrants.columns = df_warrants.columns.str.strip() <br />
 
<br /># Identify the common columns between warrants and reputation df <br />
common_cols = list(set(df_reputation.columns) & set(df_warrants.columns)) <br />

<br /># Combine all ads into a single dataframe <br />
df_ads = pd.concat((df_warrants[common_cols], df_reputation[common_cols]), axis=0) <br />
                    </p>
                  </div>
                ) 
              }, 
              style: { backgroundColor: '#d6eaf8', borderRadius: 10, width: '350px', padding:'5px' } 
            },
            {
                id: '10', 
                  position: { x: 0, y: 500 }, 
                  data: { 
                    label: (
                      <div style={{ textAlign: 'center', width: '340px' }}>
                        <strong>Step 7.2.3.: Add RatingIndicator to df_ads
                        </strong>
                        <p style={{ fontSize: '10px', margin: '5px' }}>
                        # Initialize RatingIndicator <br />
df_ads['RatingIndicator'] = 0 <br />

<br /># Set RatingIndicator to 1 if the consumer has any good or bad ratings at all <br />
df_ads.loc[(df_ads['GoodRatings'] greater than 0) | (df_ads['BadRatings'] greater than 0), 'RatingIndicator'] = 1 <br />
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
    { id: 'e4-6', source: '4', target: '6', type: 'floating', label: '' },
    { id: 'e6-7', source: '6', target: '7', type: 'floating', label: '' },
    { id: 'e7-8', source: '7', target: '8', type: 'floating', label: '' },
    { id: 'e7-9', source: '7', target: '9', type: 'floating', label: '' },
    { id: 'e9-10', source: '9', target: '10', type: 'floating', label: '' },
  ];

  const edgeTypes = {
    floating: FloatingEdge,
  };

// Define the ReactFlow component with controls
const DAF7 = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  return (
    <div style={{ width: '100%', height: '1000px', background: '#eef5ff', padding: '10px', borderRadius: '10px' }}>
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
export default DAF7;