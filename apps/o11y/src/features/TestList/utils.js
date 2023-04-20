import { listTreeCheckboxHelper } from '@browserstack/bifrost';

const { updateTargetNodes } = listTreeCheckboxHelper;

export const constructTreeData = (folders, selectedValues) => {
  const selectedNodes = {};
  function recursiveTreeData(rootPId = null, appendId = '', parentNodes = []) {
    let index = 0;
    folders.forEach((node) => {
      if (node.pId === rootPId) {
        parentNodes.push({
          uuid: `${appendId}${index}`,
          id: node.id,
          pId: node.pId,
          name: node.label,
          isChecked: false,
          isIndeterminate: false
        });
        index += 1;
      }
    });
    selectedValues?.forEach((sId) => {
      const matched = parentNodes.find((pNode) => pNode.id === sId);
      if (matched) {
        selectedNodes[matched.uuid] = matched;
        // matched.isChecked = true;
      }
    });
    parentNodes.forEach((parentNode) => {
      const contents = recursiveTreeData(
        parentNode.id,
        `${parentNode.uuid}-`,
        []
      );
      const clonedParentNode = parentNode;
      if (contents.length > 0) {
        clonedParentNode.contents = contents;
      } else {
        clonedParentNode.contents = null;
      }
    });
    return parentNodes;
  }
  let result = recursiveTreeData();
  Object.keys(selectedNodes).forEach((sNodeIdx) => {
    const { newItems } = updateTargetNodes(true, sNodeIdx, result);
    result = newItems;
  });
  return { treeData: result, selectedNodes };
};
