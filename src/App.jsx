import React, { useCallback, useState } from "react";
import SocialPanel from "./SocialPanel";
import { NodeResizer } from "@xyflow/react";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Handle,
  Position,
  Panel,
  MarkerType,
} from "@xyflow/react";
import {
  Circle,
  Square,
  Diamond,
  Triangle,
  Download, 
  Upload,
  Undo, 
  Redo,
  Plus,
  Palette,
  X,
  Trash,
  Pin,
  
  ChevronDown,
} from "lucide-react";
import "@xyflow/react/dist/style.css";
import './index.css';


const colorPalette = {
  blue: { hex: "#3b82f6", name: "Blue" },
  green: { hex: "#22c55e", name: "Green" },
  orange: { hex: "#f97316", name: "Orange" },
  red: { hex: "#ef4444", name: "Red" },
  purple: { hex: "#a855f7", name: "Purple" },
};

const shapeIcons = {
  circle: Circle,
  rectangle: Square,
};

const CustomNode = ({ data, id, selected, width, height }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [nodeName, setNodeName] = useState(data.label);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleNameChange = (e) => {
    setNodeName(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      setIsEditing(false);
      data.onNameChange(id, nodeName);
    }
  };

  return (
    <div
      className={`
        flex items-center justify-center transition-all duration-300
        shadow-lg hover:shadow-xl border-2 border-white/10
      `}
      style={{
        backgroundColor: data.color,
        width: width, // Use dynamic width
        height: height, // Use dynamic height
        borderRadius: data.shape === 'circle' ? '50%' : '8px', // Dynamic border radius
        
      }}
      onDoubleClick={handleDoubleClick}
    >
      {/* Node Resizer */}
      {selected && (
        <NodeResizer
          minWidth={50}
          minHeight={50}
          isVisible={selected}
        />
      )}

      <div className=''>
        {isEditing ? (
          <input
            type="text"
            value={nodeName}
            onChange={handleNameChange}
            onKeyPress={handleKeyPress}
            onBlur={() => setIsEditing(false)}
            autoFocus
            className="bg-transparent border-none text-white text-center w-full outline-none "
          />
        ) : (
          <span className="text-white font-medium">{data.label}</span>
        )}
      </div>
      <Handle type="target" position={Position.Top} className="w-3 h-3 bg-white/50" />
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-white/50" />
    </div>
  );
};
const ColorButton = ({ color, hex, isSelected, onClick }) => (
  <button
    onClick={onClick}
    className={`
      relative w-8 h-8 rounded-full transition-all duration-300 transform
      hover:scale-110 hover:shadow-lg hover:shadow-${color}-500/20
      ${isSelected ? 'ring-2 ring-white ring-offset-2 ring-offset-gray-800' : ''}` 
    }
    style={{ backgroundColor: hex }}
  />
);

const ShapeButton = ({ shape, onClick, isSelected }) => {
  const IconComponent = shapeIcons[shape];
  return (
    <button
      onClick={() => onClick(shape)}
      className={`
        flex items-center justify-center p-3 rounded-xl
        transition-all duration-200 hover:scale-105
        ${isSelected ? 'bg-blue-500 shadow-lg shadow-blue-500/30' : 'bg-gray-700 hover:bg-gray-600'}
      `}
    >
      <IconComponent className="w-5 h-5 text-white" />
    </button>
  );
};

const ControlPanel = ({ onAddNode, onColorChange, selectedNode,onDelete, onExport, onImport,onUndo, onRedo, disableUndo, disableRedo }) => {
  return (
    <div className="bg-gray-900/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 p-6 w-64">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-700">
        <h2 className="text-lg font-semibold text-white">Flow Builder</h2>
        
        <div className="flex items-center gap-2">
          
          <span className="flex h-3 w-3">
            
            <span className="animate-ping absolute h-3 w-3 rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative rounded-full h-3 w-3 bg-blue-500"></span>
          </span>
        </div>
      </div>

      {/* Color Selection */}
      <div className="mt-6">
        <h3 className="text-sm font-medium text-gray-300 mb-3 ">Color Palette</h3>
        <div className="flex gap-3 pb-4 border-b border-gray-700">
          {Object.entries(colorPalette).map(([key, { hex, name }]) => (
            <ColorButton
              key={key}
              color={key}
              hex={hex}
              isSelected={selectedNode?.data?.color === hex}
              onClick={() => onColorChange(hex)}
            />
          ))}
        </div>
      </div>

      {/* Shape Selection */}
      <div className="mt-6">
        <h3 className="text-sm font-medium text-gray-300 mb-3">Add Shape</h3>
        <div className="grid grid-cols-2 gap-3 pb-4 border-b border-gray-700">
          {Object.keys(shapeIcons).map((shape) => (
            <ShapeButton
              key={shape}
              shape={shape}
              onClick={() => onAddNode(shape)}
              isSelected={selectedNode?.data?.shape === shape}
            />
          ))}
        </div>
      </div>

      {/* Export/Import Buttons */}
      <div className="mt-6 pb-4 border-b border-gray-700">
        <button
          onClick={onExport}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg"
        >
          <Download className="w-5 h-5" />
          <span>Export</span>
        </button>
        <button
          onClick={onImport}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg mt-2"
        >
          <Upload className="w-5 h-5" />
          <span>Import</span>
        </button>
      </div>

      {/* Delete Button */}
      {selectedNode && (
        <div className="mt-6 pb-4 border-b border-gray-700">
          <button
            onClick={onDelete}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg"
          >
            <Trash className="w-5 h-5" />
            <span>Delete</span>
          </button>
        </div>
      )}
      {selectedNode === null && (
        <div className="mt-6 pb-4 border-b border-gray-700">
          <button
            onClick={onDelete}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg"
          >
            <Trash className="w-5 h-5" />
            <span>Delete</span>
          </button>
          
        </div>
        
      )}
      <div className="flex items-center justify-between pb-4 border-b border-gray-700">
      <h2 className="text-sm mt-5 font-light text-white">Made with <a>React-Flow Library</a></h2></div>
      
    </div>
  );
};



const nodeTypes = {
  custom: (props) => <CustomNode {...props} />,
};

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedEdge, setSelectedEdge] = useState(null);
  const [theme, setTheme] = useState("dark");

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, markerEnd: { type: MarkerType.ArrowClosed } }, eds)),
    [setEdges]
  );

  const handleNodeClick = useCallback((event, node) => {
    setSelectedNode(node);
    setSelectedEdge(null); // Reset edge selection when a node is clicked
  }, []);

  const handleEdgeClick = useCallback((event, edge) => {
    setSelectedEdge(edge);
    setSelectedNode(null); // Reset node selection when an edge is clicked
  }, []);

  const addNode = (shape) => {
    const newNode = {
      id: `${nodes.length + 1}`,
      position: { 
        x: Math.random() * 500, 
        y: Math.random() * 300 
      },
      data: { 
        label: `${shape} ${nodes.length + 1}`,
        shape: shape,
        color: colorPalette.blue.hex,
        onNameChange: handleNameChange,
      },
      type: 'custom',
      width: shape === 'circle' ? 100 : 160, // Initial width
      height: shape === 'circle' ? 100 : 80, // Initial height
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const handleColorChange = (color) => {
    if (selectedNode) {
      setNodes((nds) =>
        nds.map((node) =>
          node.id === selectedNode.id
            ? { ...node, data: { ...node.data, color } }
            : node
        )
      );
      setSelectedNode({
        ...selectedNode,
        data: { ...selectedNode.data, color }
      });
    }
  };

  const handleNameChange = (id, newName) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === id
          ? { ...node, data: { ...node.data, label: newName } }
          : node
      )
    );
  };

  const handleDelete = () => {
    if (selectedNode) {
      setNodes((nds) => nds.filter((node) => node.id !== selectedNode.id));
      setSelectedNode(null);
    }
    if (selectedEdge) {
      setEdges((eds) => eds.filter((edge) => edge.id !== selectedEdge.id));
      setSelectedEdge(null);
    }
  };

  // Export function to download the nodes and edges as a file
  const handleExport = () => {
    const data = JSON.stringify({ nodes, edges });
    const blob = new Blob([data], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "flow_data.json";
    link.click();
  };

  // Import function to load nodes and edges from a file
  const handleImport = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const { nodes, edges } = JSON.parse(e.target.result);
        setNodes(nodes);
        setEdges(edges);
      };
      reader.readAsText(file);
    };
    input.click();
  };

  return (
    <div className={`w-screen h-screen ${theme === "dark" ? "bg-gray-900" : "bg-white"}`}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={handleNodeClick}
        onEdgeClick={handleEdgeClick}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background 
          variant="dots" 
          gap={12} 
          size={1} 
          color={theme === "dark" ? "#4a5568" : ""} 
        />
        <Controls className="bg-gray-900/90 border border-white/10 rounded-lg p-2" />
        <MiniMap 
          className={`bg-${theme === "dark" ? "gray-900" : "white"}/90 border border-white/10 rounded-lg`}
          nodeColor={(node) => node.data.color}
          maskColor={theme === "dark" ? "#334155" : "#f3f4f6"}
        />
        <Panel position="top-left">
          <ControlPanel
            onAddNode={addNode}
            onColorChange={handleColorChange}
            selectedNode={selectedNode}
            onDelete={handleDelete}
            onExport={handleExport}
            onImport={handleImport}
          />
        </Panel>
        <Panel position="top-right">
          <SocialPanel/>
        </Panel>
      </ReactFlow>
    </div>
  );
}