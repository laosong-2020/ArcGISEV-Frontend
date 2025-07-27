// src/FlowPage/index.tsx

import React, { useEffect, useState, useCallback } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  type OnConnect,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

import { nodeTypes } from './nodes/index.js';
import { edgeTypes } from './edges/index.js';
import { fetchTopology } from '../utils/topology';

export default function FlowPage() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((edges) => addEdge(connection, edges)),
    [setEdges]
  );

  useEffect(() => {
    fetchTopology() 
      .then(({ nodes: newNodes, edges: newEdges }) => {
        setNodes(newNodes);
        setEdges(newEdges);
      })
  }, [setNodes, setEdges])

  return (
    <div className="h-full w-full">
      <ReactFlow nodes={nodes} nodeTypes={nodeTypes} onNodesChange={onNodesChange} edges={edges} edgeTypes={edgeTypes} onEdgesChange={onEdgesChange} onConnect={onConnect} fitView>
        <Background />
        <MiniMap />
        <Controls />
      </ReactFlow>
    </div>
  )
};