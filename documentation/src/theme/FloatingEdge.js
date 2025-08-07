import React from 'react';
import { getBezierPath, useInternalNode } from '@xyflow/react';

const getEdgeParams = (sourceNode, targetNode) => {
  const sourceHandle = sourceNode.measured;
  const targetHandle = targetNode.measured;

  const sx = sourceNode.internals.positionAbsolute.x + sourceHandle.width / 2;
  const sy = sourceNode.internals.positionAbsolute.y + sourceHandle.height / 2;
  const tx = targetNode.internals.positionAbsolute.x + targetHandle.width / 2;
  const ty = targetNode.internals.positionAbsolute.y + targetHandle.height / 2;

  const sourcePos = 'right';
  const targetPos = 'left';

  return { sx, sy, tx, ty, sourcePos, targetPos };
};

const FloatingEdge = ({ id, source, target, markerEnd, style }) => {
  const sourceNode = useInternalNode(source);
  const targetNode = useInternalNode(target);

  if (!sourceNode || !targetNode) {
    return null;
  }

  const { sx, sy, tx, ty, sourcePos, targetPos } = getEdgeParams(
    sourceNode,
    targetNode
  );

  const [edgePath] = getBezierPath({
    sourceX: sx,
    sourceY: sy,
    sourcePosition: sourcePos,
    targetPosition: targetPos,
    targetX: tx,
    targetY: ty,
  });

  return (
    <>
      <svg style={{ height: 0 }}>
        <defs>
        <marker
  id={`arrowhead-${id}`}
  markerWidth="15"       // Increase the size of the arrowhead
  markerHeight="10"
  refX="15"              // Adjust the position of the arrowhead
  refY="5"               // Center the arrowhead vertically
  orient="auto"
  markerUnits="strokeWidth"
>
  <path d="M0,0 L15,5 L0,10 Z" fill="#000" />
</marker>
        </defs>
      </svg>
      <path
  id={id}
  className="react-flow__edge-path"
  d={edgePath}
  markerEnd="url(#arrowhead-static)" // Use a static marker ID for testing
  style={style}
/>
    </>
  );
};

export default FloatingEdge;