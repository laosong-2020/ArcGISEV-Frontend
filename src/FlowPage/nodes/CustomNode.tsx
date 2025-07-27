// src/components/CustomNodes.tsx
import React from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';

import { type SimpleNode, type ComplexNode } from './types';

export function SimpleNode({ data }: NodeProps<SimpleNode>) {
  return (
    
    <div className="w-40 p-4 border border-gray-300 rounded-md bg-white text-black text-sm">
      <div className="flex flex-col items-center justify-center gap-2">
        <img src={data.icon} className="w-8 h-8" />
        <span className="text-sm">{data.label}</span>
      </div>
      {/* You can render other info in data here using `Handle` */}
      <Handle 
        type="target" 
        id="top" 
        position={Position.Top} 
      />
      <Handle 
        type="target" 
        id="bottom" 
        position={Position.Bottom} 
      />
      <Handle 
        type="target" 
        id="left" 
        position={Position.Left} 
      />
      <Handle 
        type="target" 
        id="right" 
        position={Position.Right} 
      />
      <Handle 
        type="source" 
        id="bottom" 
        position={Position.Bottom} 
      />
      <Handle 
        type="source" 
        id="left" 
        position={Position.Left} 
      />
      <Handle 
        type="source" 
        id="right" 
        position={Position.Right} 
      />
    </div>

  )
};

export function ComplexNode({ data }: NodeProps<ComplexNode>) {
  return (
    
    <div className="w-40 p-4 border border-gray-300 rounded-md bg-white text-black text-sm">
      <div className="flex flex-col items-center justify-center gap-2">
        <img src={data.icon} className="w-8 h-8" />
        <span className="text-sm">{data.label}</span>
        <span className="text-xs">{data.info?.machineName}</span>
      </div>
      {/* You can render other info in data here using `Handle` */}
      <Handle 
        type="target" 
        id="top" 
        position={Position.Top} 
      />
      <Handle 
        type="target" 
        id="bottom" 
        position={Position.Bottom} 
      />
      <Handle 
        type="target" 
        id="left" 
        position={Position.Left} 
      />
      <Handle 
        type="target" 
        id="right" 
        position={Position.Right} 
      />
      <Handle 
        type="source" 
        id="bottom" 
        position={Position.Bottom}
      />
      <Handle 
        type="source" 
        id="left" 
        position={Position.Left} 
      />
      <Handle 
        type="source" 
        id="right" 
        position={Position.Right} 
      />
    </div>

  )
};