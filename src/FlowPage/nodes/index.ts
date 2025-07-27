import type { NodeTypes } from '@xyflow/react';

// import { PositionLoggerNode } from './PositionLoggerNode';
import { type AppNode } from './types';
import { SimpleNode, ComplexNode } from './CustomNode';

const backendHost = import.meta.env.VITE_BACKEND_HOST;
const backendPort = import.meta.env.VITE_BACKEND_PORT;


const nodeInfoApiMap: Record<string, string> = {
  portalAdaptor: `${backendHost}:${backendPort}/api/portal/webadaptor`,
  serverAdaptor: `${backendHost}:${backendPort}/api/server/webadaptor`,
  portal: `${backendHost}:${backendPort}/api/portal/machine`,
  server: `${backendHost}:${backendPort}/api/server/machine`,
  // others...
};

export const initialNodes: AppNode[] = [
  { 
    id: 'client', 
    type: 'simple-node', 
    position: { x: 0, y: 0 }, 
    data: { label: 'User Client', icon: "/icons/computer.svg" } 
  },
  {
    id: 'portalAdaptor',
    type: 'complex-node',
    position: { x: -200, y: 200 },
    data: { 
      label: 'Portal Web Adaptor',
      icon: "/icons/webadaptor.svg",
      key: 'id',
      info: {
        machineName: 'ECHO',
        machineIp: '10.14.54.163',
        webAdaptorUrl: 'https://echo.esri.com/portal',
        id: "7112ca8f-6476-41b4-904c-9a28ffb69f0a",
        httpPort: 80,
        httpsPort: 443,
      },
    },
  },
  { id: 'serverAdaptor',
    type: 'complex-node',
    position: { x: 200, y: 200 }, 
    data: { 
      label: 'Server Web Adaptor',
      icon: "/icons/webadaptor.svg",
      key: 'id',
      info: {
        machineName: 'ECHO',
        machineIp: '10.14.54.163',
        webAdaptorUrl: 'https://echo.esri.com/server',
        id: "3658fabe-776f-403d-9ed4-baa5072fb709",
        httpPort: -1,
        httpsPort: 443,
      }
    } 
  },
  {
    id: 'portal',
    type: 'complex-node',
    position: { x: -200, y: 400 },
    data: { 
      label: 'Portal for ArcGIS',
      icon: "/icons/portal.svg",
      key: 'machineName',
      info: {
        machineName: 'ECHO',
        // TODO: Add more info here
      }
    }
  },
  {
    id: 'server',
    type: 'complex-node',
    position: { x: 200, y: 400 },
    data: { 
      label: 'ArcGIS Server',
      icon: "/icons/server.svg",
      key: 'machineName',
      info: {
        machineName: 'ECHO',
        // TODO: Add more info here
      }
    },
  },
  {
    id: 'dataStore',
    type: 'complex-node',
    position: { x: 200, y: 600},
    data: { 
      label: 'ArcGIS Data Store',
      icon: "/icons/datastore.svg",
      info: {
        machineName: 'ECHO',
        // TODO: Add more info here
      }
    }
  }
];

export const nodeTypes = {
  // 'position-logger': PositionLoggerNode,
  // 'custom-node': CustomNode,
  'simple-node': SimpleNode,
  'complex-node': ComplexNode,
  // Add any of your custom nodes here!
} satisfies NodeTypes;

async function fetchNodeInfo(node: AppNode) {
  // get the api based on node id.
  const api = nodeInfoApiMap[node.id];
  if (!api) return null;
  try {
    // console.log(`Fetching ${api}...`);
    const res = await fetch(api, {
      method: 'GET',
      credentials: 'include',
    });
    const info = await res.json();
    // console.log(info);
    return info.data;
  } catch (err) {
    console.error(`Fetch ${node.id} info failed`, err);
    return null;
  }
}

export async function updateNodes(nodes: AppNode[]) {
  const newNodes = await Promise.all(
    nodes.map(async (node) => {
      const info = await fetchNodeInfo(node);
      return {
        ...node,
        data: {
          ...node.data,
          info,
        },
      };
    })
  );
  // console.log(newNodes);
  return newNodes;
  
}