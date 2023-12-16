import { Tree } from "primereact/tree";
import { useEffect, useState } from "react";
import "./SourceTree.css";

import sources from './sources.json'

export function SourceTree({ handleSourceSelection }) {
  const [nodes, setNodes] = useState(null);

  useEffect(() => {

    const tonode = (source) => {
        return {
            key: source.key,
            label: source.label,
            className: source.key,
            children: source.children?.map((child) => tonode(child))
        };
    }

    console.log('sources', sources)
    const nodes= sources.map(tonode)
      console.log(nodes)
    setNodes(nodes);
  }, []);

  const defaultSelection = {
    nmbgmr_groundwater_levels: { checked: false, partialChecked: false },
    groundwater_levels: { checked: false, partialChecked: false },
  };

  const [selectedFileKeys, setSelectedFileKeys] = useState(defaultSelection);
  return (
    <Tree
      className={"w-full"}
      selectionKeys={selectedFileKeys}
      onSelectionChange={(e) => {
        setSelectedFileKeys(e.value);
        handleSourceSelection(e.value);
      }}
      selectionMode={"checkbox"}
      filter={true}
      value={nodes}
    />
  );
}
