import React, { useState, useEffect, useRef } from 'react';
import '../App.css';

const data = {
  id: '0',
  label: 'Item 0',
  children: [
    {
      id: '00',
      label: 'Item 00',
      children: [
        { id: '000', label: 'Item 000' },
        { id: '001', label: 'Item 001' },
        { id: '002', label: 'Item 002' },
      ],
    },
    {
      id: '01',
      label: 'Item 01',
      children: [
        { id: '010', label: 'Item 010' },
        { id: '011', label: 'Item 011' },
        { id: '012', label: 'Item 012' },
      ],
    },
  ],
};

const TreeNode = ({ node, state, setState }) => {
  const checkboxRef = useRef();

  const getNodeState = (node) => {
    if (!node.children) return state[node.id] ? 'checked' : 'unchecked';
  
    const childStates = node.children.map(getNodeState);
  
    const allChecked = childStates.every(s => s === 'checked');
    const allPartial = childStates.every(s => s === 'indeterminate');
    const allUnchecked = childStates.every(s => s === 'unchecked');
  
    // Leaf-parent logic (like Item 00, 01)
    if (allChecked || allPartial) return 'checked';
  
    // Mixed or one is partial/checked and others are not
    if (childStates.some(s => s !== childStates[0])) return 'indeterminate';
  
    // All are unchecked
    return 'unchecked';
  };
  

  const updateChildren = (node, checked, updated) => {
    updated[node.id] = checked;
    if (node.children) {
      node.children.forEach((child) => updateChildren(child, checked, updated));
    }
  };

  const handleChange = (e) => {
    const isChecked = e.target.checked;
    const updated = { ...state };
    updateChildren(node, isChecked, updated);
    setState(updated);
  };

  useEffect(() => {
    const status = getNodeState(node);
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = status === 'indeterminate';
    }
  });

  const checked = getNodeState(node) === 'checked';

  return (
    <div style={{ marginLeft: 20 }}>
   
      <label>
        <input
          type="checkbox"
          ref={checkboxRef}
          checked={checked}
          onChange={handleChange}
        />
        {node.label}
      </label>
      {node.children?.map((child) => (
        <TreeNode key={child.id} node={child} state={state} setState={setState} />
      ))}
    </div>
  );
};

function App() {
  const initState = {};
  const initTree = (node) => {
    initState[node.id] = false;
    node.children?.forEach(initTree);
  };
  initTree(data);

  const [state, setState] = useState(initState);

  return (
    <div className="App">
      <h2>Tri-State Tree View</h2>
      <TreeNode node={data} state={state} setState={setState} />
    </div>
  );
}

export default App;
