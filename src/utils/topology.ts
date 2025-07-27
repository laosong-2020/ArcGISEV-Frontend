// src/utils/topology.ts

import { AppNode } from '../FlowPage/nodes/types';
import { Edge } from '@xyflow/react';
import { initialNodes } from '../FlowPage/nodes';
import { initialEdges } from '../FlowPage/edges';

interface BackendNode {
  id: string;
  type: string;
  label: string;
  icon: string;
  info?: Record<string, unknown>;
  status?: string;
}

interface BackendEdge {
  source: string;
  target: string;
  status: string;
  messages?: string[];
}

interface BackendTopology {
  success: boolean;
  data: {
    nodes: BackendNode[];
    edges: BackendEdge[];
  };
}

export async function fetchTopology(): Promise<{
  nodes: AppNode[];
  edges: Edge[];
}> {
  const resp = await fetch(`${import.meta.env.VITE_BACKEND_HOST}:${import.meta.env.VITE_BACKEND_PORT}/api/topology`, {
    credentials: 'include',
  });
  if (!resp.ok) {
    throw new Error(`Topology fetch failed: ${resp.status}`);
  }

  const json: BackendTopology = await resp.json();
  if (!json.success) {
    throw new Error('Topology fetch responded with success=false');
  }

  const backend = json.data;

  // 1. reuse initialNodes 的 position
  const posMap = Object.fromEntries(
    initialNodes.map((n) => [n.id, n.position])
  );

  // 2. icon mapping
  const iconMap: Record<string, string> = {
    client:        '/icons/computer.svg',
    portalAdaptor: '/icons/webadaptor.svg',
    serverAdaptor: '/icons/webadaptor.svg',
    portal:        '/icons/portal.svg',
    server:        '/icons/server.svg',
    dataStore:     '/icons/datastore.svg',
  };

  // 3. build nodes in React Flow
  const nodes: AppNode[] = backend.nodes.map((bn) => ({
    id: bn.id,
    type: bn.type === 'static' ? 'simple-node' : 'complex-node',
    position: posMap[bn.id] ?? { x: 0, y: 0 },
    data: {
      label: bn.label,
      icon: iconMap[bn.id] ?? `/icons/${bn.icon}.svg`,
      key: bn.info?.machineName ? 'machineName' : 'id',
      info: bn.info ?? {},
      status: bn.status ?? 'unknown',
    },
  }));

  // 4. build edges in React Flow
  const edgeLookup = new Map<string, Edge>();
  initialEdges.forEach((ie) => {
    const key = `${ie.source}->${ie.target}`;
    edgeLookup.set(key, ie);
  });

  const edges: Edge[] = backend.edges.map((be) => {
  const key = `${be.source}->${be.target}`;
  const ie = edgeLookup.get(key);

  const isWarning = be.status === 'warning';
  const isConnected = be.status === 'Connected';

  return {
    id: key,
    source: be.source,
    target: be.target,
    sourceHandle: ie?.sourceHandle,
    targetHandle: ie?.targetHandle,
    // make it a solid line when warning
    animated: true,
    style: {
      stroke: isWarning ? '#fcd421' : undefined,
      strokeWidth: isWarning ? 2 : undefined,
      strokeDasharray: isWarning ? '0' : undefined,
    },
    label: ie?.label,
    type: ie?.type,
    data: {
      status: be.status,
      messages: be.messages || [],
    }
  };
});

  return { nodes, edges };
}
