import { listTreeCheckboxHelper } from '@browserstack/bifrost';
import isEmpty from 'lodash/isEmpty';

const { updateTargetNodes } = listTreeCheckboxHelper;

export function parseSimpleTreeData(treeData, { id, pId, rootPId }) {
  const keyNodes = {};
  const rootNodeList = [];

  // Fill in the map
  const nodeList = treeData.map((node) => {
    const clone = { ...node };
    const key = clone[id];
    keyNodes[key] = clone;
    clone.key = clone.key || key;
    return clone;
  });

  // Connect tree
  nodeList.forEach((node) => {
    const parentKey = node[pId];
    const parent = keyNodes[parentKey];

    // Fill parent
    if (parent) {
      parent.contents = parent.contents || [];
      parent.contents.push(node);
    }

    // Fill root tree node
    if (parentKey === rootPId || (!parent && rootPId === null)) {
      rootNodeList.push(node);
    }
  });

  return rootNodeList;
}

export const constructTreeData = (folders, selectedValues) => {
  const selectedNodes = {};
  let parsedTreeNodes = parseSimpleTreeData(folders, {
    id: 'id',
    pId: 'pId',
    rootPId: null
  });

  function recursiveTreeData(parentNodes = [], appendId = '') {
    parentNodes.forEach((pNode, index) => {
      const copyNode = pNode;
      copyNode.uuid = `${appendId}${index}`;
      copyNode.name = copyNode.label;
      copyNode.isChecked = false;
      copyNode.isIndeterminate = false;
      if (!isEmpty(copyNode.contents)) {
        recursiveTreeData(copyNode.contents, `${copyNode.uuid}-`);
      }
    });
    selectedValues?.forEach((sId) => {
      const matched = parentNodes.find((pNode) => pNode.id === sId);
      if (matched) {
        selectedNodes[matched.uuid] = matched;
        // matched.isChecked = true;
      }
    });
  }
  recursiveTreeData(parsedTreeNodes);
  Object.keys(selectedNodes).forEach((sNodeIdx) => {
    const { newItems } = updateTargetNodes(
      true,
      sNodeIdx,
      JSON.parse(JSON.stringify(parsedTreeNodes))
    );
    parsedTreeNodes = newItems;
  });
  return { treeData: parsedTreeNodes, selectedNodes };
};
