"use client"

import {
  Handle,
  Position,
  NodeResizer,
  type Node,
  type NodeProps,
  type ResizeParams,
} from "@xyflow/react"

export type ImageNodeData = {
  src: string
  onResizeEnd?: (id: string, size: { width: number; height: number }) => void
}

export type ImageNodeType = Node<ImageNodeData, "imageNode">

export function ImageNode({
  id,
  data,
  selected,
}: NodeProps<ImageNodeType>) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl border bg-white shadow-lg">
      <Handle id="top" type="source" position={Position.Top} className="!z-20 !size-3 !border-2 !border-blue-500 !bg-white" isConnectable />
      <Handle id="right" type="source" position={Position.Right} className="!z-20 !size-3 !border-2 !border-blue-500 !bg-white" isConnectable />
      <Handle id="bottom" type="source" position={Position.Bottom} className="!z-20 !size-3 !border-2 !border-blue-500 !bg-white" isConnectable />
      <Handle id="left" type="source" position={Position.Left} className="!z-20 !size-3 !border-2 !border-blue-500 !bg-white" isConnectable />

      <NodeResizer
        isVisible={selected}
        minWidth={100}
        minHeight={100}
        keepAspectRatio
        color="#3b82f6"
        lineClassName="!border-blue-500"
        handleClassName="!h-3 !w-3 !rounded-sm !border !border-blue-500 !bg-white"
        onResizeEnd={(_, params: ResizeParams) => {
          data.onResizeEnd?.(id, {
            width: params.width,
            height: params.height,
          })
        }}
      />

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={data.src}
        alt=""
        draggable={false}
        className="h-full w-full object-cover"
      />
    </div>
  )
}
