"use client";

import {
  ReactFlow,
  Background,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { CanvasControls } from "./CanvasControls";
import { Toolbar } from "./Toolbar";

export default function DesignFlow() {
  const [nodes, , onNodesChange] = useNodesState([]);
  const [edges, , onEdgesChange] = useEdgesState([]);

  return (
    <div className="relative h-screen w-screen">
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          className="absolute inset-0"
        >
          <Background />
        </ReactFlow>

        <div className="fixed bottom-4 left-0 right-0 z-50 flex items-center justify-center px-4">
          <Toolbar />
          <div className="absolute bottom-0 right-8">
            <CanvasControls />
          </div>
        </div>
      </ReactFlowProvider>
    </div>
  );
}
