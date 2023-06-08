/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { TableVirtuoso } from 'react-virtuoso';
import {
  MdAdd,
  MdClose,
  MdOutlineOpenInNew,
  MdSearch
} from '@browserstack/bifrost';
import {
  O11yButton,
  O11yHyperlink,
  O11yInputField,
  O11yRefTableBody,
  O11yTable,
  O11yTableRow
} from 'common/bifrostProxy';
import { DOC_KEY_MAPPING } from 'constants/common';
import { ROUTES } from 'constants/routes';
import { getHeaderSize, getProjects } from 'globalSlice/selectors';
import debounce from 'lodash/debounce';
import { getDocUrl, logOllyEvent } from 'utils/common';

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
  const navigate = useNavigate();

  const headerSize = useSelector(getHeaderSize);

  useEffect(() => {
    setProjectsList(projects.list);
    if (projects.list.length) {
      logOllyEvent({
        event: 'O11yProjectListingVisited',
        data: {
          num_projects: projects.list.length
        }
      });
    }
  }, [projects.list]);

  const debouncedSearchLogEvent = useMemo(
    () =>
      debounce(
        (text) =>
          logOllyEvent({
            event: 'O11yProjectListingSearched',
            data: {
              search_string: text
            }
          }),
        300
      ),
    []
  );

  const handleSearchTextChange = ({ target: { value } }) => {
    const lCaseVal = value?.toLowerCase();
    setSearchText(value);
    setProjectsList(
      projects.list.filter((item) =>
        item?.name?.toLowerCase().includes(lCaseVal)
      )
    );
    debouncedSearchLogEvent(lCaseVal);
  };

  const handleClearSearch = () => {
    setProjectsList(projects.list);
    setSearchText('');
  };

  if (!projects.isLoading && !projects.list.length) {
    return <Navigate to={ROUTES.get_started} />;
  }

  const handleClickNewProject = () => {
    navigate(ROUTES.get_started);
  };

  return (
    <div
      className="flex w-screen justify-center p-12"
      style={{
        height: `calc(100vh - ${headerSize}px)`
      }}
    >
      <div className="border-base-200 flex h-full w-full max-w-xl flex-col rounded-lg border bg-white shadow-sm">
        <section className="p-6 pb-2">
          <h1 className="border-b-base-200 mb-5 border-b pb-5 text-2xl font-medium leading-8">
            Welcome to Test Observability
          </h1>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-medium leading-6">
                Select a project to get started
              </h2>
              <h3 className="text-base-500 mt-1 text-sm leading-5">
                You can change your project at anytime
              </h3>
            </div>
            <O11yButton
              icon={<MdAdd className="text-xl text-white" />}
              iconPlacement="end"
              onClick={handleClickNewProject}
            >
              New Project
            </O11yButton>
          </div>
          <div className="mt-5">
            <O11yInputField
              id="onboarding-project-search"
              placeholder="Search using project name"
              value={searchText}
              onChange={handleSearchTextChange}
              addOnBeforeInline={<MdSearch className="text-base-400 text-xl" />}
              addOnAfterInline={
                <>
                  {searchText ? (
                    <O11yButton
                      variant="minimal"
                      colors="white"
                      icon={<MdClose className="text-base-800 text-xl" />}
                      onClick={handleClearSearch}
                      isIconOnlyButton
                      size="extra-small"
                    />
                  ) : null}
                </>
              }
            />
          </div>
        </section>
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
        <div className="flex justify-center bg-white px-6 pb-6 pt-4">
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
