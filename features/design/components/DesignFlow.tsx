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
import { ImageNode } from "./image-node";
import { StickyNoteNode, type StickyNoteColor } from "./sticky-note-node";
import { useCallback, useEffect, useRef } from "react";
import { useNodeSync } from "@/features/design/hooks/use-node-sync";
import { useParams } from "next/navigation";
import { nodeService, edgeService, type CanvasNode } from "@/features/design/services/node.service";
import { KojoAssistant } from "./kojo-assistant";
import { AssistantProvider } from "./assistant/runtime";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FlowNode = Node<any, any>;

const nodeTypes: NodeTypes = {
  section: SectionNode,
  shapeNode: ShapeNode,
  textNode: TextNode,
  imageNode: ImageNode,
  stickyNote: StickyNoteNode,
};

const cursorClassMap: Record<string, string> = {
  move: "canvas-move-mode",
  drag: "canvas-hand-mode",
  scale: "canvas-scale-mode",
  section: "canvas-draw-mode",
  shape: "canvas-draw-mode",
  text: "canvas-draw-mode",
  note: "canvas-draw-mode",
  scan: "",
  comment: "",
  grid: "",
};

function mapApiNodeToFlowNode(
  apiNode: CanvasNode,
  updateTextNode: (id: string, text: string) => void,
  handleResizeEnd: (id: string, size: { width: number; height: number }) => void,
  onChangeShape: (id: string, shape: ShapeType) => void,
  onChangeFill: (id: string, fill: string) => void,
  onChangeShapeLabel: (id: string, label: string) => void,
  onCommitShapeLabel: (id: string, label: string) => void,
  updateStickyNoteText: (id: string, text: string) => void,
  commitStickyNoteText: (id: string, text: string) => void,
  onChangeStickyNoteColor: (id: string, color: string) => void,
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
        fill: apiNode.style?.fill,
        stroke: apiNode.content?.stroke,
        label: apiNode.content?.label,
        onChangeShape,
        onChangeFill,
        onChangeLabel: onChangeShapeLabel,
        onCommitLabel: onCommitShapeLabel,
        onResizeEnd: handleResizeEnd,
      },
      style: apiNode.size ? { width: apiNode.size.w, height: apiNode.size.h } : { width: 150, height: 100 },
    }
  }

  if (apiNode.type === "imageNode") {
    return {
      id: apiNode.id,
      type: apiNode.type,
      position: { x: apiNode.position.x, y: apiNode.position.y },
      data: {
        src: apiNode.content?.src ?? "",
        onResizeEnd: handleResizeEnd,
      },
      style: apiNode.size ? { width: apiNode.size.w, height: apiNode.size.h } : { width: 320, height: 200 },
    }
  }

  if (apiNode.type === "stickyNote") {
    return {
      id: apiNode.id,
      type: apiNode.type,
      position: { x: apiNode.position.x, y: apiNode.position.y },
      data: {
        text: apiNode.content?.text ?? "",
        author: apiNode.content?.author ?? "",
        color: (apiNode.content?.color as StickyNoteColor) ?? "pink",
        onChangeText: updateStickyNoteText,
        onCommitText: commitStickyNoteText,
        onChangeColor: onChangeStickyNoteColor,
        onResizeEnd: handleResizeEnd,
      },
      style: apiNode.size ? { width: apiNode.size.w, height: apiNode.size.h } : { width: 240, height: 180 },
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
  const { createNode, updateNode, updateNodeId, deleteNode } = useNodeSync({ workspaceId });
  const mousePosition = useRef({ x: 0, y: 0 });

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

  const updateStickyNoteText = useCallback(
    (id: string, text: string) => {
      setNodes((nds) =>
        nds.map((n) =>
          n.id === id ? { ...n, data: { ...n.data, text } } : n
        )
      );
    },
    [setNodes]
  );

  const commitStickyNoteText = useCallback(
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

  const onChangeStickyNoteColor = useCallback(
    (id: string, color: string) => {
      setNodes((nds) =>
        nds.map((n) =>
          n.id === id ? { ...n, data: { ...n.data, color } } : n
        )
      );
      updateNode(id, { content: { color } });
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
      void nodes;
    },
    []
  );

  const onEdgesDelete = useCallback(
    (deletedEdges: Edge[]) => {
      deletedEdges.forEach((edge) => {
        edgeService.deleteEdge(workspaceId, edge.id).catch(console.error);
      });
    },
    [workspaceId]
  );

  const onNodesDelete = useCallback(
    (deletedNodes: FlowNode[]) => {
      deletedNodes.forEach((node) => {
        deleteNode(node.id);
        edges
          .filter((e) => e.source === node.id || e.target === node.id)
          .forEach((e) => {
            edgeService.deleteEdge(workspaceId, e.id).catch(console.error);
          });
      });
    },
    [deleteNode, edges, workspaceId]
  );

  const handleResizeEnd = useCallback(
    (nodeId: string, size: { width: number; height: number }) => {
      updateNode(nodeId, {
        size: { w: size.width, h: size.height },
      });
    },
    [updateNode]
  );

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      mousePosition.current = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
    },
    [screenToFlowPosition]
  );

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  useEffect(() => {
    const handleKeyDown = async (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'v') {
        e.preventDefault();
        try {
          const items = await navigator.clipboard.read();
          for (const item of items) {
            const imageTypes = item.types.filter(t => t.startsWith('image/'));
            if (imageTypes.length) {
              const blob = await item.getType(imageTypes[0]);
              const url = URL.createObjectURL(blob);
              
              // Load image to get natural dimensions
              const img = await new Promise<HTMLImageElement>((resolve, reject) => {
                const image = new Image();
                image.onload = () => resolve(image);
                image.onerror = reject;
                image.src = url;
              });
              
              const width = img.naturalWidth;
              const height = img.naturalHeight;
              const id = crypto.randomUUID();
              const position = {
                x: mousePosition.current.x - width / 2,
                y: mousePosition.current.y - height / 2,
              };

              const newNode: FlowNode = {
                id,
                type: 'imageNode',
                position,
                data: { src: url, onResizeEnd: handleResizeEnd },
                style: { width, height },
              };

              setNodes((prev) => [...prev, newNode]);
              createNode(id, {
                type: 'imageNode',
                position,
                size: { w: width, h: height },
                content: { src: url },
              }).then((res) => {
                if (res?.status === 'SUCCESS' && res.data) {
                  const serverId = res.data.id;
                  updateNodeId(id, serverId);
                  setNodes((prev) => prev.map((n) => (n.id === id ? { ...n, id: serverId } : n)));
                }
              });
            }
          }
        } catch (err) {
          console.warn('Clipboard read failed:', err);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setNodes, createNode, handleResizeEnd, updateNodeId, mousePosition]);

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
            selectable: true,
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

  const onChangeFill = useCallback(
    (nodeId: string, fill: string) => {
      setNodes((nds) =>
        nds.map((n) =>
          n.id === nodeId ? { ...n, data: { ...n.data, fill } } : n
        )
      );
      updateNode(nodeId, { style: { fill } });
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
            onChangeFill,
            onChangeShapeLabel,
            onCommitShapeLabel,
            updateStickyNoteText,
            commitStickyNoteText,
            onChangeStickyNoteColor
          )
        );
        setNodes(flowNodes);
      }
    }).catch(console.error);
  }, [workspaceId, setNodes, updateTextNode, handleResizeEnd, onChangeShape, onChangeFill, onChangeShapeLabel, onCommitShapeLabel, updateStickyNoteText, commitStickyNoteText, onChangeStickyNoteColor]);

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
          selectable: true,
          style: e.style || { stroke: "#111827", strokeWidth: 2 },
          markerEnd: { type: MarkerType.ArrowClosed },
          interactionWidth: 20,
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
        }).then((res) => {
          if (res?.status === "SUCCESS" && res.data) {
            const serverId = res.data.id;
            updateNodeId(id, serverId);
            setNodes((prev) => prev.map((n) => (n.id === id ? { ...n, id: serverId } : n)));
          }
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
            onChangeFill,
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
        }).then((res) => {
          if (res?.status === "SUCCESS" && res.data) {
            const serverId = res.data.id;
            updateNodeId(id, serverId);
            setNodes((prev) => prev.map((n) => (n.id === id ? { ...n, id: serverId } : n)));
          }
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
        }).then((res) => {
          if (res?.status === "SUCCESS" && res.data) {
            const serverId = res.data.id;
            updateNodeId(id, serverId);
            setNodes((prev) => prev.map((n) => (n.id === id ? { ...n, id: serverId } : n)));
          }
        });
        setActiveTool("move");
        return;
      }

      if (activeTool === "note") {
        const id = crypto.randomUUID();
        const newNode: FlowNode = {
          id,
          type: "stickyNote",
          position: { x: position.x - 120, y: position.y - 90 },
          data: {
            text: "",
            author: "",
            color: "pink",
            autoFocus: true,
            onChangeText: updateStickyNoteText,
            onCommitText: commitStickyNoteText,
            onChangeColor: onChangeStickyNoteColor,
            onResizeEnd: handleResizeEnd,
          },
          style: { width: 240, height: 180 },
        };
        setNodes((prev) => [...prev, newNode]);
        createNode(id, {
          type: "stickyNote",
          position: { x: newNode.position.x, y: newNode.position.y },
          size: { w: 240, h: 180 },
          content: { text: "", author: "", color: "pink" },
        }).then((res) => {
          if (res?.status === "SUCCESS" && res.data) {
            const serverId = res.data.id;
            updateNodeId(id, serverId);
            setNodes((prev) => prev.map((n) => (n.id === id ? { ...n, id: serverId } : n)));
          }
        });
        setActiveTool("move");
        return;
      }
    },
    [activeTool, screenToFlowPosition, setNodes, setActiveTool, updateTextNode, createNode, onChangeShape, onChangeFill, onChangeShapeLabel, onCommitShapeLabel, handleResizeEnd, updateNodeId, updateStickyNoteText, commitStickyNoteText, onChangeStickyNoteColor]
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
        onNodesDelete={onNodesDelete}
        onEdgesDelete={onEdgesDelete}
        connectionMode={ConnectionMode.Loose}
        className={`absolute inset-0 ${cursorClass}`}
        fitView
        panOnDrag={activeTool === "drag"}
        nodesDraggable={activeTool !== "drag" && activeTool !== "scale"}
        elementsSelectable={activeTool !== "drag"}
        selectionOnDrag={activeTool !== "drag"}
        deleteKeyCode={["Backspace", "Delete"]}
      >
        <Background />
      </ReactFlow>

      <div className="fixed bottom-4 left-0 right-0 z-50 flex items-center justify-center px-4">
        <Toolbar />
        <div className="absolute bottom-0 right-8">
          <CanvasControls />
        </div>
      </div>

      <AssistantProvider>
        <KojoAssistant />
      </AssistantProvider>
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