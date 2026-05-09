'use client';

import { ReactFlow, Background, Controls } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

export default function DesignFlow() {
  return (
    <div className="w-screen h-screen">
      <ReactFlow nodes={[]} edges={[]}>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
