import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Checkbox from '../Checkbox';
import { MdFolderSpecial } from '../Icon';
import ListTree from '../ListTree';
import ListTreeNode from '../ListTreeNode';
import ListTreeNodeContents from '../ListTreeNodeContents';

const ControlledNestedTreeWithCheckbox = ({
  data,
  searchValue,
  filteredUUIDs,
  allowFilter,
  onCheckboxChange,
  isParentSearched,
  indent = 1
}) => {
  const [openNodeMap, setOpenNodeMap] = useState({
    'file 2': true,
    'file 2b': true,
    'file A': true
  });

  return data?.map((item) => {
    if (
      allowFilter &&
      !filteredUUIDs.filteredUUIDsWithHierarchy[item.uuid] &&
      !isParentSearched
    ) {
      return null;
    }
    const startIndex = item.name.indexOf(searchValue);
    const endIndex = startIndex + searchValue.length;
    return (
      <ListTree
        key={item.name}
        indentationLevel={indent}
        isTreeOpen={openNodeMap[item.name]}
      >
        <ListTreeNode
          showIcon={false}
          label={
            <Checkbox
              data={{
                label: (
                  <>
                    <MdFolderSpecial className="text-info-400 mr-2 inline-block h-5 w-5 shrink-0 select-none" />
                    <span className="text-base-700 mr-2 text-xs leading-5">
                      {searchValue.length && startIndex !== -1 ? (
                        <>
                          {item.name.slice(0, startIndex)}
                          <mark>{item.name.slice(startIndex, endIndex)}</mark>
                          {item.name.slice(endIndex, item.name.length)}
                        </>
                      ) : (
                        item.name
                      )}
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
            />
          }
          isNodeSelectable={false}
          description={item.uuid}
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
              searchValue={searchValue}
              isParentSearched={
                filteredUUIDs.searchedUUIDs[item.uuid] || isParentSearched
              }
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
  isParentSearched: PropTypes.bool.isRequired,
  filteredUUIDs: PropTypes.shape({
    filteredUUIDsWithHierarchy: PropTypes.shape({}).isRequired,
    searchedUUIDs: PropTypes.shape({}).isRequired
  }).isRequired,
  allowFilter: PropTypes.bool.isRequired,
  onCheckboxChange: PropTypes.func.isRequired,
  indent: PropTypes.number
};

ControlledNestedTreeWithCheckbox.defaultProps = {
  indent: 1
};
