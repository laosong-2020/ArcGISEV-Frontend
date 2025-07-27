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
  const [selectedEdge, setSelectedEdge] = useState<Edge | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      <ReactFlow 
        nodes={nodes} 
        nodeTypes={nodeTypes} 
        onNodesChange={onNodesChange} 
        edges={edges} 
        edgeTypes={edgeTypes} 
        onEdgesChange={onEdgesChange} 
        onConnect={onConnect} 
        fitView
        onEdgeClick={(event, edge) => {
          // 阻止默认选中行为（可选）
          event.preventDefault();
          // 存下这条 edge，打开模态框
          setSelectedEdge(edge);
          setIsModalOpen(true);
        }}
      >
        <Background />
        <MiniMap />
        <Controls />
      </ReactFlow>
      {/* Modal */}
      <input
  type="checkbox"
  id="edge-message-modal"
  className="modal-toggle"
  checked={isModalOpen}
  readOnly
/>
<div className="modal">
  <div className="modal-box p-6 relative">
    <label
      htmlFor="edge-message-modal"
      className="btn btn-sm btn-circle absolute right-2 top-2"
      onClick={() => setIsModalOpen(false)}
    >
      ✕
    </label>

    <h3 className="text-lg font-bold mb-4">Edge Messages</h3>
    {selectedEdge?.data?.messages?.length ? (
      <div className="space-y-4 max-h-80 overflow-auto">
        {selectedEdge.data.messages.map((msg: any, i: number) => (
          <div key={i} className="p-4 bg-base-200 rounded-lg">
            <p><span className="font-semibold">Data Item:</span> {msg.dataItem}</p>
            <p><span className="font-semibold">Path:</span> {msg.path}</p>
            <p><span className="font-semibold">State:</span> {msg.validationState}</p>
            <p><span className="font-semibold">Message:</span> {msg.message}</p>
          </div>
        ))}
      </div>
    ) : (
      <p>No messages attached to this edge.</p>
    )}
  </div>
</div>
    </div>
  )
};