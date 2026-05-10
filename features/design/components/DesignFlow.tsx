"use client";

import {
  ReactFlow,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  ReactFlowProvider,
  useReactFlow,
  ConnectionMode,
  MarkerType,
  type NodeTypes,
  type Node,
  type Edge,
  type Connection,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { CanvasControls } from "./CanvasControls";
import { Toolbar } from "./Toolbar";
import { useDesignToolStore } from "@/stores/dialog-store";
import { SectionNode } from "./section";
import { ShapeNode, type ShapeType } from "./shape-node";
import { TextNode } from "./text-node";
import { useCallback, useEffect, useState } from "react";
import { useNodeSync } from "@/features/design/hooks/use-node-sync";
import { useParams } from "next/navigation";
import { nodeService, edgeService, type CanvasNode } from "@/features/design/services/node.service";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FlowNode = Node<any, any>;

const nodeTypes: NodeTypes = {
  section: SectionNode,
  shapeNode: ShapeNode,
  textNode: TextNode,
};

const cursorClassMap: Record<string, string> = {
  move: "canvas-move-mode",
  drag: "canvas-hand-mode",
  scale: "canvas-scale-mode",
  note: "canvas-draw-mode",
  section: "canvas-draw-mode",
  shape: "canvas-draw-mode",
  text: "canvas-draw-mode",
  scan: "",
  comment: "",
  grid: "",
};

function mapApiNodeToFlowNode(
  apiNode: CanvasNode,
  updateTextNode: (id: string, text: string) => void,
  handleResizeEnd: (id: string, size: { width: number; height: number }) => void,
  onChangeShape: (id: string, shape: ShapeType) => void,
  onChangeShapeLabel: (id: string, label: string) => void,
  onCommitShapeLabel: (id: string, label: string) => void,
): FlowNode {
  if (apiNode.type === "textNode") {
    return {
      id: apiNode.id,
      type: apiNode.type,
      position: { x: apiNode.position.x, y: apiNode.position.y },
      data: { text: apiNode.content?.text ?? "", onChange: updateTextNode, onResizeEnd: handleResizeEnd },
      style: apiNode.size ? { width: apiNode.size.w, height: apiNode.size.h } : undefined,
    }
  }

  if (apiNode.type === "shapeNode") {
    return {
      id: apiNode.id,
      type: apiNode.type,
      position: { x: apiNode.position.x, y: apiNode.position.y },
      data: {
        shape: (apiNode.content?.shape as ShapeType) ?? "rounded",
        fill: apiNode.content?.fill,
        stroke: apiNode.content?.stroke,
        label: apiNode.content?.label,
        onChangeShape,
        onChangeLabel: onChangeShapeLabel,
        onCommitLabel: onCommitShapeLabel,
        onResizeEnd: handleResizeEnd,
      },
      style: apiNode.size ? { width: apiNode.size.w, height: apiNode.size.h } : { width: 150, height: 100 },
    }
  }

  return {
    id: apiNode.id,
    type: apiNode.type,
    position: { x: apiNode.position.x, y: apiNode.position.y },
    data: { name: apiNode.content?.name ?? "Space", onResizeEnd: handleResizeEnd },
    style: apiNode.size ? { width: apiNode.size.w, height: apiNode.size.h } : undefined,
  }
}

function DesignFlowCanvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState<FlowNode>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const activeTool = useDesignToolStore((s) => s.activeTool);
  const setActiveTool = useDesignToolStore((s) => s.setActiveTool);
  const cursorClass = cursorClassMap[activeTool] ?? "";
  const { screenToFlowPosition } = useReactFlow();
  const params = useParams();
  const workspaceId = params.slug as string;
  const { createNode, updateNode, deleteNode } = useNodeSync({ workspaceId });
  const [selectedNodeIds, setSelectedNodeIds] = useState<string[]>([]);

  const updateTextNode = useCallback(
    (id: string, text: string) => {
      setNodes((nds) =>
        nds.map((n) =>
          n.id === id ? { ...n, data: { ...n.data, text } } : n
        )
      );
      updateNode(id, { content: { text } });
    },
    [setNodes, updateNode]
  );

  const handleNodeDragStop = useCallback(
    (_: React.MouseEvent, node: FlowNode) => {
      updateNode(node.id, {
        position: { x: node.position.x, y: node.position.y },
      });
    },
    [updateNode]
  );

  const handleSelectionChange = useCallback(
    ({ nodes }: { nodes: Node[] }) => {
      setSelectedNodeIds(nodes.map((n) => n.id));
    },
    []
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.key === "Delete" || event.key === "Backspace") && selectedNodeIds.length > 0) {
        event.preventDefault();
        selectedNodeIds.forEach((nodeId) => {
          deleteNode(nodeId);
          setNodes((nds) => nds.filter((n) => n.id !== nodeId));
        });
        setSelectedNodeIds([]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedNodeIds, deleteNode, setNodes]);

  const handleResizeEnd = useCallback(
    (nodeId: string, size: { width: number; height: number }) => {
      updateNode(nodeId, {
        size: { w: size.width, h: size.height },
      });
    },
    [updateNode]
  );

  const onConnect = useCallback(
    (connection: Connection) => {
      if (!connection.source || !connection.target) return;

      const edgeId = crypto.randomUUID();
      setEdges((eds) =>
        addEdge(
          {
            ...connection,
            id: edgeId,
            type: "smoothstep",
            style: {
              stroke: "#111827",
              strokeWidth: 2,
            },
            markerEnd: {
              type: MarkerType.ArrowClosed,
            },
          },
          eds
        )
      );

      edgeService
        .createEdge(workspaceId, {
          from: {
            nodeId: connection.source,
            anchor: connection.sourceHandle || "right",
          },
          to: {
            nodeId: connection.target,
            anchor: connection.targetHandle || "left",
          },
        })
        .then((res) => {
          if (res.status !== "SUCCESS") {
            console.error("Failed to save edge:", res.message);
          }
        })
        .catch(console.error);
    },
    [setEdges, workspaceId]
  );

  const onChangeShape = useCallback(
    (nodeId: string, shape: ShapeType) => {
      setNodes((nds) =>
        nds.map((n) =>
          n.id === nodeId ? { ...n, data: { ...n.data, shape } } : n
        )
      );
      updateNode(nodeId, { content: { shape } });
    },
    [setNodes, updateNode]
  );

  const onChangeShapeLabel = useCallback(
    (nodeId: string, label: string) => {
      setNodes((nds) =>
        nds.map((n) =>
          n.id === nodeId ? { ...n, data: { ...n.data, label } } : n
        )
      );
    },
    [setNodes]
  );

  const onCommitShapeLabel = useCallback(
    (nodeId: string, label: string) => {
      setNodes((nds) =>
        nds.map((n) =>
          n.id === nodeId ? { ...n, data: { ...n.data, label } } : n
        )
      );
      updateNode(nodeId, { content: { label } });
    },
    [setNodes, updateNode]
  );

  useEffect(() => {
    if (!workspaceId) return;
    nodeService.getNodes(workspaceId).then((res) => {
      if (res.status === "SUCCESS" && res.data) {
        const flowNodes = res.data.map((n) =>
          mapApiNodeToFlowNode(
            n,
            updateTextNode,
            handleResizeEnd,
            onChangeShape,
            onChangeShapeLabel,
            onCommitShapeLabel
          )
        );
        setNodes(flowNodes);
      }
    }).catch(console.error);
  }, [workspaceId, setNodes, updateTextNode, handleResizeEnd, onChangeShape, onChangeShapeLabel, onCommitShapeLabel]);

  useEffect(() => {
    if (!workspaceId) return;
    edgeService.getEdges(workspaceId).then((res) => {
      if (res.status === "SUCCESS" && res.data) {
        const flowEdges: Edge[] = res.data.map((e) => ({
          id: e.id,
          source: e.from.nodeId,
          target: e.to.nodeId,
          sourceHandle: e.from.anchor,
          targetHandle: e.to.anchor,
          type: e.type || "smoothstep",
          style: e.style || { stroke: "#111827", strokeWidth: 2 },
          markerEnd: { type: MarkerType.ArrowClosed },
        }));
        setEdges(flowEdges);
      }
    }).catch(console.error);
  }, [workspaceId, setEdges]);

  const handlePaneClick = useCallback(
    (event: React.MouseEvent) => {
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      if (activeTool === "section") {
        const id = crypto.randomUUID();
        const newNode: FlowNode = {
          id,
          type: "section",
          position: { x: position.x - 128, y: position.y - 16 },
          data: { name: "Space", onResizeEnd: handleResizeEnd },
        };
        setNodes((prev) => [...prev, newNode]);
        createNode(id, {
          type: "section",
          position: { x: newNode.position.x, y: newNode.position.y },
          size: { w: 256, h: 128 },
          content: { name: "Space" },
        });
        setActiveTool("move");
        return;
      }

      if (activeTool === "shape") {
        const activeShape = useDesignToolStore.getState().activeShape;
        const id = crypto.randomUUID();
        const newNode: FlowNode = {
          id,
          type: "shapeNode",
          position: { x: position.x - 75, y: position.y - 50 },
          data: {
            shape: activeShape,
            label: "",
            onChangeShape,
            onChangeLabel: onChangeShapeLabel,
            onCommitLabel: onCommitShapeLabel,
            onResizeEnd: handleResizeEnd,
          },
          style: { width: 150, height: 100 },
        };
        setNodes((prev) => [...prev, newNode]);
        createNode(id, {
          type: "shapeNode",
          position: { x: newNode.position.x, y: newNode.position.y },
          size: { w: 150, h: 100 },
          content: { shape: activeShape },
        });
        setActiveTool("move");
        return;
      }

      if (activeTool === "text") {
        const id = crypto.randomUUID();
        const newNode: FlowNode = {
          id,
          type: "textNode",
          position: { x: position.x - 90, y: position.y - 24 },
          data: { text: "", autoFocus: true, onChange: updateTextNode, onResizeEnd: handleResizeEnd },
          style: { width: 180, height: 64 },
        };
        setNodes((prev) => [...prev, newNode]);
        createNode(id, {
          type: "textNode",
          position: { x: newNode.position.x, y: newNode.position.y },
          size: { w: 180, h: 64 },
          content: { text: "" },
        });
        setActiveTool("move");
        return;
      }
    },
    [activeTool, screenToFlowPosition, setNodes, setActiveTool, updateTextNode, createNode, onChangeShape, onChangeShapeLabel, onCommitShapeLabel, handleResizeEnd]
  );

  return (
    <>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onPaneClick={handlePaneClick}
        onNodeDragStop={handleNodeDragStop}
        onSelectionChange={handleSelectionChange}
        connectionMode={ConnectionMode.Loose}
        className={`absolute inset-0 ${cursorClass}`}
        fitView
        panOnDrag={activeTool === "drag"}
        nodesDraggable={activeTool !== "drag" && activeTool !== "scale"}
        elementsSelectable={activeTool !== "drag"}
        selectionOnDrag={activeTool !== "drag"}
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