import React, { useState } from 'react';
import { MdFolderSpecial } from 'react-icons/md';
import PropTypes from 'prop-types';

import Checkbox from '../Checkbox';
import ListTree from '../ListTree';
import ListTreeNode from '../ListTreeNode';
import ListTreeNodeContents from '../ListTreeNodeContents';

const ControlledNestedTreeWithCheckbox = ({
  data,
  filteredUUIDs,
  allowFilter,
  onCheckboxChange,
  isParentSelected,
  indent = 1
}) => {
  const [openNodeMap, setOpenNodeMap] = useState({
    'file 2': true,
    'file 2b': true,
    'file A': true
  });

  return data?.map((item) => {
    if (allowFilter && !filteredUUIDs[item.uuid] && !isParentSelected) {
      return null;
    }
    return (
      <ListTree
        key={item.name}
        indentationLevel={indent}
        isTreeOpen={openNodeMap[item.name]}
      >
        <ListTreeNode
          hideIcon
          label={
            <Checkbox
              inputClassName="w-3 h-3"
              data={{
                label: (
                  <>
                    <MdFolderSpecial className="text-info-400 mr-2 inline-block h-5 w-5 shrink-0 select-none" />
                    <span className="text-base-700 mr-2 text-xs leading-5">
                      {item.uuid} - {item.name}
                    </span>
                  </>
                ),
                value: item.uuid
              }}
              border={false}
              indeterminate={item.isIndeterminate}
              checked={item.isChecked}
              onChange={() => {
                onCheckboxChange(!item.isChecked, item.uuid);
              }}
              wrapperClassName="py-0"
              labelClassName="w-full flex"
            />
          }
          isNodeSelectable={false}
          description={`(level=${indent})`}
          onNodeOpen={() => {
            if (openNodeMap[item.name] !== undefined) {
              openNodeMap[item.name] = !openNodeMap[item.name];
            } else {
              openNodeMap[item.name] = true;
            }
            setOpenNodeMap({ ...openNodeMap });
          }}
          isNodeSelected={false}
          isFocused={false}
          leadingIcon={<></>}
        />
        {!!item?.contents && (
          <ListTreeNodeContents isTreeOpen={openNodeMap[item.name]}>
            <ControlledNestedTreeWithCheckbox
              onCheckboxChange={onCheckboxChange}
              filteredUUIDs={filteredUUIDs}
              allowFilter={allowFilter}
              data={item.contents}
              isParentSelected={filteredUUIDs[item.uuid] || isParentSelected}
              indent={1 + indent}
            />
          </ListTreeNodeContents>
        )}
      </ListTree>
    );
  });
};
export default ControlledNestedTreeWithCheckbox;

const dataItem = {
  uuid: PropTypes.string,
  name: PropTypes.string,
  isChecked: PropTypes.bool,
  isIndeterminate: PropTypes.bool,
  contents: PropTypes.arrayOf(PropTypes.shape({}))
};

ControlledNestedTreeWithCheckbox.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape(dataItem)).isRequired,
  onCheckboxChange: PropTypes.func.isRequired,
  indent: PropTypes.number
};

ControlledNestedTreeWithCheckbox.defaultProps = {
  indent: 1
};
