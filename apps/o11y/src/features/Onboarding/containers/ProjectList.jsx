/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable tailwindcss/no-arbitrary-value */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { TableVirtuoso } from 'react-virtuoso';
import {
  MdClose,
  MdFolderOpen,
  MdOutlineOpenInNew,
  MdSearch
} from '@browserstack/bifrost';
import {
  O11yHyperlink,
  O11yInputField,
  O11yRefTableBody,
  O11yTable,
  O11yTableCell,
  O11yTableRow
} from 'common/bifrostProxy';
import { DOC_KEY_MAPPING } from 'constants/common';
import { ROUTES } from 'constants/routes';
import { setActiveProject } from 'globalSlice';
import { getProjects } from 'globalSlice/selectors';
import { getDocUrl } from 'utils/common';
import { getTestingTrendPath } from 'utils/routeUtils';

const VTableRow = (props) => <O11yTableRow hover {...props} />;

export default function ProjectList() {
  const projects = useSelector(getProjects);
  const [searchText, setSearchText] = useState('');
  const [projectsList, setProjectsList] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    setProjectsList(projects.list);
  }, [projects.list]);

  const handleClickProjectLink = ({ id, name, normalisedName }) => {
    dispatch(
      setActiveProject({
        id,
        name,
        normalisedName
      })
    );
  };

  const handleSearchTextChange = (e) => {
    const val = e.target?.value?.toLowerCase();
    setSearchText(val);
    setProjectsList(
      projects.list.filter((item) => item?.name?.toLowerCase().includes(val))
    );
  };

  const handleClearSearch = () => {
    setProjectsList(projects.list);
    setSearchText('');
  };

  if (!projects.isLoading && !projects.list.length) {
    return <Navigate to={ROUTES.root} />;
  }

  return (
    <div className="flex h-[calc(100vh-3rem)] w-screen justify-center p-12">
      <div className="border-base-200 flex h-full w-full max-w-xl flex-col rounded-lg border shadow-sm">
        <div className="p-6 pb-2">
          <h1 className="border-b-base-200 mb-5 border-b pb-5 text-2xl font-medium leading-8">
            Welcome to Test Observability
          </h1>
          <h2 className="text-lg font-medium leading-6">
            Select a project to get started
          </h2>
          <h3 className="text-base-500 mt-1 text-sm leading-5">
            You can change your project at anytime
          </h3>
          <div className="mt-5">
            <O11yInputField
              id="onboarding-project-search"
              placeholder="Search using project name"
              value={searchText}
              onChange={handleSearchTextChange}
              leadingIcon={<MdSearch className="text-base-400 text-xl" />}
              isTrailingNodeClickable
              trailingIcon={
                <>
                  {searchText ? (
                    <MdClose
                      onClick={handleClearSearch}
                      className="text-base-800 cursor-pointer"
                    />
                  ) : null}
                </>
              }
            />
          </div>
        </div>
        {!!projectsList?.length && (
          <div className="flex-1 overflow-auto px-6">
            <TableVirtuoso
              style={{ height: '100%' }}
              data={projectsList}
              components={{
                Table: O11yTable,
                TableRow: VTableRow,
                TableBody: O11yRefTableBody
              }}
              itemContent={(index, project) => (
                <O11yTableCell wrapperClassName="py-0 first:pl-0 sm:first:pl-0 last:pr-0 sm:last:pr-0">
                  <Link
                    to={getTestingTrendPath(project.normalisedName)}
                    onClick={() => {
                      handleClickProjectLink(project);
                    }}
                  >
                    <div className="flex items-center gap-x-3 py-4 first:pl-1 last:pr-4 sm:first:pl-1 sm:last:pr-6">
                      <div className="bg-base-100 flex h-[40px] w-[40px] items-center justify-center rounded-full">
                        <MdFolderOpen className="text-base-400 text-xl" />
                      </div>
                      <p className="text-base-900 text-sm font-medium leading-5">
                        {project.name}
                      </p>
                    </div>
                  </Link>
                </O11yTableCell>
              )}
            />
          </div>
        )}
        <div className="flex justify-center bg-white px-5 py-2">
          <O11yHyperlink
            target="_blank"
            href={getDocUrl(DOC_KEY_MAPPING.introduction)}
            wrapperClassName="text-sm leading-5 font-medium text-base-700 hover:text-brand-700"
          >
            View Documentation
            <MdOutlineOpenInNew className="ml-1 h-4 w-4" />
          </O11yHyperlink>
        </div>
      </div>
    </div>
  );
}
