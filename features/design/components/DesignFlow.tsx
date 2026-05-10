"use client";

import {
  ReactFlow,
  Background,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
  useReactFlow,
  type NodeTypes,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { CanvasControls } from "./CanvasControls";
import { Toolbar } from "./Toolbar";
import { useDesignToolStore } from "@/stores/dialog-store";
import { SectionNode } from "./section";
import type { Node } from "@xyflow/react";
import { useCallback } from "react";

type SectionNode = Node<{ name: string }, "section">;

const nodeTypes: NodeTypes = {
  section: SectionNode,
};

const cursorClassMap: Record<string, string> = {
  move: "canvas-move-mode",
  drag: "canvas-hand-mode",
  scale: "canvas-scale-mode",
  note: "canvas-draw-mode",
  shape: "canvas-draw-mode",
  text: "canvas-draw-mode",
  scan: "",
  comment: "",
  grid: "",
};

function DesignFlowCanvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState<SectionNode>([]);
  const [edges, , onEdgesChange] = useEdgesState([]);
  const activeTool = useDesignToolStore((s) => s.activeTool);
  const setActiveTool = useDesignToolStore((s) => s.setActiveTool);
  const cursorClass = cursorClassMap[activeTool] ?? "";
  const { screenToFlowPosition } = useReactFlow();

  const handlePaneClick = useCallback(
    (event: React.MouseEvent) => {
      if (activeTool !== "shape") return;

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode: SectionNode = {
        id: crypto.randomUUID(),
        type: "section",
        position: {
          x: position.x - 128,
          y: position.y - 16,
        },
        data: { name: "Space" },
      };

      setNodes((prev) => [...prev, newNode]);
      setActiveTool("move");
    },
    [activeTool, screenToFlowPosition, setNodes, setActiveTool]
  );

  return (
    <>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onPaneClick={handlePaneClick}
        className={`absolute inset-0 ${cursorClass}`}
      >
        <Background />
      </ReactFlow>

      <div className="fixed bottom-4 left-0 right-0 z-50 flex items-center justify-center px-4">
        <Toolbar />
        <div className="absolute bottom-0 right-8">
          <CanvasControls />
        </div>
      </div>
    </>
  );
}

export default function DesignFlow() {
  return (
    <div className="relative h-screen w-screen">
      <ReactFlowProvider>
        <DesignFlowCanvas />
      </ReactFlowProvider>
    </div>
  );
}