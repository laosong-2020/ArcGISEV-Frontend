import type { Edge, EdgeTypes } from '@xyflow/react';

export const initialEdges: Edge[] = [
  { 
    id: 'client->serverAdaptor', 
    source: 'client', 
    sourceHandle: 'bottom',
    target: 'serverAdaptor', 
    targetHandle: 'top',
    animated: true, 
    label: '443',
  },
  { 
    id: 'client->portalAdaptor', 
    source: 'client', 
    sourceHandle: 'bottom',
    target: 'portalAdaptor', 
    targetHandle: 'top',
    animated: true,
    label: '443',
  },
  { 
    id: 'serverAdaptor->server', 
    source: 'serverAdaptor', 
    sourceHandle: 'bottom',
    target: 'server', 
    targetHandle: 'top',
    animated: true,
    label: '6443',
  },
  { 
    id: 'portalAdaptor->portal', 
    source: 'portalAdaptor', 
    sourceHandle: 'bottom',
    target: 'portal', 
    targetHandle: 'top',
    animated: true,
    label: '7443',
  },
  { 
    id: 'portal->server', 
    source: 'portal', 
    sourceHandle: 'right',
    target: 'server', 
    targetHandle: 'left',
    animated: true
  },
  { 
    id: 'server->dataStore', 
    source: 'server', 
    sourceHandle: 'bottom',
    target: 'dataStore', 
    targetHandle: 'top',
    animated: true
  },
];

export const edgeTypes = {
  // Add your custom edge types here!
} satisfies EdgeTypes;
