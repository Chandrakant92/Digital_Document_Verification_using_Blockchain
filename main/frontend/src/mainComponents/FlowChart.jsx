import { useCallback, useEffect, useState } from 'react';
import ReactFlow, { Background, Controls, addEdge, applyEdgeChanges, applyNodeChanges, useEdgesState, useNodesState } from 'reactflow';
import 'reactflow/dist/style.css';
import StudentNode from './CustomNode';




// we define the nodeTypes outside of the component to prevent re-renderings
// you could also use useMemo inside the component
const nodeTypes = { studentNode: StudentNode };

function FlowChart() {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    useEffect(() => {
        const button1 = (selectedFileName) => {
            // Send data to node-2
            setNodes((nds) =>
                nds.map((node) => {
                    if (node.id !== 'node-2') {
                        return node;
                    }
                    return {
                        ...node,
                        data: {
                            ...node.data,
                            label: selectedFileName,
                        },
                    };
                })
            );
        };


        setNodes([
            {
                id: 'node-1', type: 'studentNode', position: { x: 0, y: 10 },
                data: { button1: button1, },
            },
            {
                id: 'node-2',
                type: 'output',
                targetPosition: 'top',
                position: { x: 0, y: 200 },
                data: { label: 'node 2' },
            },
            {
                id: 'node-3',
                type: 'output',
                targetPosition: 'top',
                position: { x: 200, y: 200 },
                data: { label: 'node 3' },
            },
        ]
        );
        setEdges(
            [
                { id: 'edge-1', source: 'node-1', target: 'node-2', sourceHandle: 'a' },
                { id: 'edge-2', source: 'node-1', target: 'node-3', sourceHandle: 'b' },
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
