import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { MdClose, MdSearch, MdSearchOff } from '@browserstack/bifrost';
import {
  O11yButton,
  O11yCheckbox,
  O11yEmptyState,
  O11yInputField,
  O11yModal,
  O11yModalBody,
  O11yModalFooter,
  O11yModalHeader,
  O11yStackedList,
  O11yStackedListCommon,
  O11yStackedListGroup,
  O11yStackedListItem
} from 'common/bifrostProxy';
import { toggleModal } from 'common/ModalToShow/slices/modalToShowSlice';
import { logOllyEvent } from 'utils/common';
import { o11yNotify } from 'utils/notification';

import { suggestedFrameworks } from '../constants';

function ReqFrameworkModal() {
  const dispatch = useDispatch();
  const [selectedFrameworks, setSelectedFrameworks] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [queryInput, setQueryInput] = useState('');
  const [filteredFrameworks, setFilteredFrameworks] =
    useState(suggestedFrameworks);

  const handleCloseModal = () => {
    dispatch(toggleModal({ version: '', data: {} }));
  };

  const handleFilterResults = (value) => {
    if (value) {
      const lCaseValue = value.toLocaleLowerCase();
      const updatedFrameworkList = {};
      Object.keys(suggestedFrameworks).forEach((language) => {
        if (language.toLocaleLowerCase().includes(lCaseValue)) {
          updatedFrameworkList[language] = suggestedFrameworks[language];
        } else {
          const foundFrameworks = suggestedFrameworks[language].filter(
            (framework) => framework.toLocaleLowerCase().includes(lCaseValue)
          );
          if (foundFrameworks.length) {
            updatedFrameworkList[language] = foundFrameworks;
          }
        }
      });
      setFilteredFrameworks(updatedFrameworkList);
    } else {
      setFilteredFrameworks(suggestedFrameworks);
    }
  };

  const handleSearchTextChange = ({ target: { value } }) => {
    setSearchText(value);
    handleFilterResults(value);
  };

  const handleClearSearch = () => {
    setSearchText('');
    handleFilterResults('');
  };

  const handleSelectFramework = (checked, framework) => {
    // console.log('selected, framework :>> ', selected, framework);
    if (checked) {
      setSelectedFrameworks((prev) => [...prev, framework]);
    } else {
      setSelectedFrameworks((prev) =>
        prev.filter((selected) => selected !== framework)
      );
    }
  };

  const handleSubmitChanges = () => {
    logOllyEvent({
      event: 'O11yFrameworkRequestSubmitted',
      data: {
        framework: selectedFrameworks,
        custom_framework: queryInput
      }
    });
    o11yNotify({
      type: 'success',
      title: 'Request submitted successfully',
      description:
        'Thanks for sharing your setup details. You can contact our support team for help with getting started.'
    });
    handleCloseModal();
  };

  return (
    <O11yModal show size="lg" onClose={handleCloseModal}>
      <O11yModalHeader
        dismissButton
        heading="Select framework"
        handleDismissClick={handleCloseModal}
      />
      <O11yModalBody className="flex flex-col">
        <div className="flex h-full flex-col overflow-hidden">
          <div className="mb-4 w-full">
            <O11yInputField
              addOnBeforeInline={<MdSearch className="text-base-400 text-lg" />}
              placeholder="Search"
              id="framework-search-value"
              value={searchText}
              onChange={handleSearchTextChange}
              wrapperClassName="bg-white"
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
          <div className="h-3/4 overflow-auto">
            {Object.keys(filteredFrameworks)?.length ? (
              <O11yStackedList>
                {Object.keys(filteredFrameworks).map((language) => (
                  <O11yStackedListGroup
                    key={language}
                    heading={
                      <p className="py-2 text-xs uppercase">{language}</p>
                    }
                  >
                    {filteredFrameworks[language].map((framework) => (
                      <O11yStackedListItem
                        isCard={false}
                        key={framework}
                        actions={
                          <O11yCheckbox
                            border={false}
                            checked={selectedFrameworks.includes(framework)}
                            onChange={({ target: { checked } }) =>
                              handleSelectFramework(checked, framework)
                            }
                          />
                        }
                      >
                        <O11yStackedListCommon title={framework} />
                      </O11yStackedListItem>
                    ))}
                  </O11yStackedListGroup>
                ))}
              </O11yStackedList>
            ) : (
              <div className="flex h-3/4 flex-col items-center justify-center p-12">
                <O11yEmptyState
                  title="No Results Found"
                  description="No matching results found. Try searching with another combination"
                  mainIcon={
                    <MdSearchOff className="text-base-500 inline-block h-12 w-12" />
                  }
                  buttonProps={{
                    children: 'Clear Filters',
                    onClick: handleClearSearch,
                    size: 'small'
                  }}
                />
              </div>
            )}
          </div>
          <div className="border-t-base-100 border-t py-4">
            <O11yInputField
              label="Don’t see your framework in the list? Let us know"
              id="user-name-value"
              placeholder="Enter framework name"
              value={queryInput}
              onChange={({ target: { value } }) => setQueryInput(value)}
            />
          </div>
        </div>
      </O11yModalBody>
      <O11yModalFooter position="right">
        <O11yButton colors="white" onClick={handleCloseModal}>
          Cancel
        </O11yButton>
        <O11yButton
          disabled={!selectedFrameworks.length && !queryInput}
          onClick={handleSubmitChanges}
          type="submit"
        >
          Confirm
        </O11yButton>
      </O11yModalFooter>
    </O11yModal>
  );
}

export default ReqFrameworkModal;
