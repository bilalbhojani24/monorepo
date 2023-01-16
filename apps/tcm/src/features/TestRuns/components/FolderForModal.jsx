import React from 'react';
import { useDispatch } from 'react-redux';
import { arrayOf, number, shape, string } from 'prop-types';

import { setCurrentFolder } from '../slices/testRunsSlice';

const FolderForModal = (props) => {
  const dispatch = useDispatch();
  const { allFolders } = props;

  dispatch(
    setCurrentFolder({ id: allFolders[0]?.id, name: allFolders[0]?.name }),
  );
  return (
    <div className="mt-4 mr-4 h-full grow-0 rounded-md border-2 border-solid border-base-200">
      <div className="border-b-2 border-solid border-base-200 p-4 text-sm font-semibold">
        Folders
      </div>
      <div className="flex flex-col">
        {allFolders?.map((item) => (
          <FolderItem title={item?.name} id={item.id} />
        ))}
      </div>
    </div>
  );
};

FolderForModal.defaultProps = {
  allFolders: arrayOf(
    shape({
      id: string,
      name: string,
      ui_position: number,
    }),
  ),
};

FolderForModal.defaultProps = {
  allFolders: [],
};

const FolderItem = ({ title, id }) => {
  const dispatch = useDispatch();

  const itemClickHandler = () => {
    dispatch(setCurrentFolder({ id, name: title }));
  };

  return (
    <div
      id={id}
      tabIndex="0"
      role="menuitem"
      className="w-full cursor-pointer border-b border-base-200 p-2"
      onClick={itemClickHandler}
      onKeyDown={itemClickHandler}
    >
      {title}
    </div>
  );
};

FolderItem.propTypes = {
  title: string,
  id: string,
};

FolderItem.defaultProps = {
  title: '',
  id: '',
};

export default FolderForModal;
