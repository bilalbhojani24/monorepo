/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { TableVirtuoso } from 'react-virtuoso';
import { MdClose, MdOutlineOpenInNew, MdSearch } from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import {
  O11yHyperlink,
  O11yInputField,
  O11yRefTableBody,
  O11yTable,
  O11yTableRow
} from 'common/bifrostProxy';
import { DOC_KEY_MAPPING, WRAPPER_GAP_CLASS } from 'constants/common';
import { ROUTES } from 'constants/routes';
import { getProjects } from 'globalSlice/selectors';
import { getDocUrl } from 'utils/common';

import ProjectListItem from '../components/ProjectListItem';

const TableRow = (props) => <O11yTableRow hover {...props} />;
const Table = (props) => (
  <O11yTable
    containerWrapperClass="md:rounded-none shadow-none ring-0 shadow-none border-none"
    {...props}
  />
);

export default function ProjectList() {
  const projects = useSelector(getProjects);
  const [searchText, setSearchText] = useState('');
  const [projectsList, setProjectsList] = useState([]);

  useEffect(() => {
    setProjectsList(projects.list);
  }, [projects.list]);

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
    return <Navigate to={ROUTES.get_started} />;
  }

  return (
    <div
      className={twClassNames(
        'flex w-screen justify-center p-12',
        WRAPPER_GAP_CLASS
      )}
    >
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
                Table,
                TableRow,
                TableBody: O11yRefTableBody
              }}
              itemContent={(index, project) => (
                <ProjectListItem project={project} />
              )}
            />
          </div>
        )}
        <div className="flex justify-center bg-white px-5 py-2">
          <O11yHyperlink
            target="_blank"
            href={getDocUrl({ path: DOC_KEY_MAPPING.introduction })}
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
