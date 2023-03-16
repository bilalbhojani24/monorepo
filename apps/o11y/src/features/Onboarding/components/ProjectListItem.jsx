import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdFolderOpen } from '@browserstack/bifrost';
import { O11yTableCell } from 'common/bifrostProxy';
import { setActiveProject } from 'globalSlice';
import PropTypes from 'prop-types';
import { logOllyEvent } from 'utils/common';
import { getTestingTrendPath } from 'utils/routeUtils';

export default function ProjectListItem({ project }) {
  const dispatch = useDispatch();
  const handleClickProjectLink = ({ id, name, normalisedName }) => {
    dispatch(
      setActiveProject({
        id,
        name,
        normalisedName
      })
    );
    logOllyEvent({
      event: 'O11yProjectListingProjectClicked',
      data: {
        project_name: name,
        project_id: id
      }
    });
  };
  return (
    <O11yTableCell wrapperClassName="py-0 first:pl-0 sm:first:pl-0 last:pr-0 sm:last:pr-0">
      <Link
        to={getTestingTrendPath(project.normalisedName)}
        onClick={() => {
          handleClickProjectLink(project);
        }}
      >
        <div className="flex items-center gap-x-3 py-4 first:pl-1 last:pr-4 sm:first:pl-1 sm:last:pr-6">
          <div className="bg-base-100 flex h-10 w-10 items-center justify-center rounded-full">
            <MdFolderOpen className="text-base-400 text-xl" />
          </div>
          <p className="text-base-900 text-sm font-medium leading-5">
            {project.name}
          </p>
        </div>
      </Link>
    </O11yTableCell>
  );
}

ProjectListItem.propTypes = {
  project: PropTypes.shape({
    name: PropTypes.string,
    normalisedName: PropTypes.string
  }).isRequired
};
