import type { Node, BuiltInNode } from '@xyflow/react';

// export type PositionLoggerNode = Node<{ label: string }, 'position-logger'>;
// export type CustomNode = Node<{ label: string }, 'custom-node'>;
type SimpleNode = Node<{ label: string, icon: string }, 'simple-node'>;
type ComplexNode = Node<{ 
  label: string, 
  icon: string,
  // key is the key of the node data to be fetched from the backend
  key?: string,
  info?: { [key: string]: unknown}
}, 'complex-node'>;

type WebAdaptorNode = Node<{
  label: string,
  icon: string,
  info: { [key: string]: unknown | string }
}, 'adaptor-node'> 

export type AppNode = 
  BuiltInNode | SimpleNode | ComplexNode;
