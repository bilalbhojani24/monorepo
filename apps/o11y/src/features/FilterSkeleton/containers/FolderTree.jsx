import React from 'react';
import {
  Checkbox,
  ListTree,
  ListTreeNode,
  ListTreeNodeContents,
  MdFolderSpecial,
  MdInsertDriveFile
} from '@browserstack/bifrost';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';

const FolderTree = ({
  data,
  openNodeMap,
  setOpenNodeMap,
  searchValue,
  filteredUUIDs,
  allowFilter,
  onCheckboxChange,
  isParentSearched,
  indent = 1
}) =>
  data?.map((item) => {
    if (
      allowFilter &&
      !filteredUUIDs?.filteredUUIDsWithHierarchy?.[item.uuid] &&
      !isParentSearched
    ) {
      return null;
    }
    const startIndex = item.name.toLowerCase().indexOf(searchValue);
    const endIndex = startIndex + searchValue.length;
    return (
      <ListTree
        key={item.name}
        indentationLevel={indent}
        isTreeOpen={openNodeMap[item.uuid]}
      >
        <ListTreeNode
          showIcon={false}
          label={
            <Checkbox
              isFullWidthLabel
              inputClassName="w-3 h-3"
              data={{
                label: (
                  <p className="flex items-center">
                    {!isEmpty(item.contents) ? (
                      <MdFolderSpecial className="text-info-400 mr-2 inline-block h-5 w-5 shrink-0 select-none" />
                    ) : (
                      <MdInsertDriveFile className="text-base-400 mr-2 inline-block h-5 w-5 shrink-0 select-none" />
                    )}
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
                  </p>
                ),
                value: item.uuid
              }}
              border={false}
              indeterminate={item.isIndeterminate}
              checked={item.isChecked}
              onChange={() => {
                onCheckboxChange(!item.isChecked, item);
              }}
              wrapperClassName="py-0"
              labelClassName="w-full flex"
            />
          }
          isNodeSelectable={false}
          onNodeOpen={() => {
            const newOpenNodeMap = { ...openNodeMap };
            if (newOpenNodeMap[item.uuid] !== undefined) {
              newOpenNodeMap[item.uuid] = !openNodeMap[item.uuid];
            } else {
              newOpenNodeMap[item.uuid] = true;
            }
            setOpenNodeMap({ ...newOpenNodeMap });
          }}
          isNodeSelected={false}
          isFocused={false}
          leadingIcon={<></>}
          hideArrowIcon={isEmpty(item.contents)}
        />
        {!!item?.contents && (
          <ListTreeNodeContents isTreeOpen={openNodeMap[item.uuid]}>
            <FolderTree
              openNodeMap={openNodeMap}
              setOpenNodeMap={setOpenNodeMap}
              onCheckboxChange={onCheckboxChange}
              filteredUUIDs={filteredUUIDs}
              allowFilter={allowFilter}
              data={item.contents}
              searchValue={searchValue}
              isParentSearched={
                !!filteredUUIDs?.searchedUUIDs?.[item.uuid] ||
                !!isParentSearched
              }
              indent={1 + indent}
            />
          </ListTreeNodeContents>
        )}
      </ListTree>
    );
  });

const dataItem = {
  uuid: PropTypes.string,
  name: PropTypes.string,
  isChecked: PropTypes.bool,
  isIndeterminate: PropTypes.bool,
  contents: PropTypes.arrayOf(PropTypes.shape({}))
};

FolderTree.propTypes = {
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

FolderTree.defaultProps = {
  indent: 1
};

export default FolderTree;
