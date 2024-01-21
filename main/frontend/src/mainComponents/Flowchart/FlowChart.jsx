import { useCallback, useEffect, useState } from 'react';
import ReactFlow, { Background, Controls, addEdge, applyEdgeChanges, applyNodeChanges, useEdgesState, useNodesState } from 'reactflow';
import 'reactflow/dist/style.css';
import StudentNode from './StudentNode';
import UniversityNode from './UniversityNode';
import DoqfyNode from './DoqfyNode';




// we define the nodeTypes outside of the component to prevent re-renderings
// you could also use useMemo inside the component
const nodeTypes = { studentNode: StudentNode,universityNode:UniversityNode,doqfyNode:DoqfyNode };

function FlowChart() {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
   
    
   
   
        
    
    useEffect(() => {
        setNodes([
            {
                id: 'node-1', 
                type: 'studentNode', 
                position: { x: 0, y: 100 },
                data:{}
            },
            {
                id: 'node-2',
                type: 'universityNode',
              
                position: { x: 0, y: 250 },
                data:{}
            },
            {
                id: 'node-3',
                type: 'doqfyNode',
                position: { x: 200, y: 200 },
                data: {  },
            },
        ]
        );
        setEdges(
            [
                { id: 'edge-1', source: 'node-1', target: 'node-3', sourceHandle: 'a' ,targetHandle:'c'},
                { id: 'edge-2', source: 'node-2', target: 'node-3', sourceHandle: 'b' ,targetHandle:"d"},
            ]
        );
    }, []);


    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            nodeTypes={nodeTypes}
            fitView
        > <Background />
            <Controls />
        </ReactFlow>
    );
}

export default FlowChart;
