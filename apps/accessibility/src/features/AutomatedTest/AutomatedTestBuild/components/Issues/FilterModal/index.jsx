import React from 'react';
import {
  Button,
  Checkbox,
  ComboBox,
  ComboboxLabel,
  ComboboxOptionGroup,
  ComboboxOptionItem,
  ComboboxTrigger,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from '@browserstack/bifrost';
import { severityOptions } from 'constants';

import useFilterModal from './useFilterModal';

export default function FilterModal() {
  const {
    selectedImpact,
    showNeedsReviewIssues,
    pageValue,
    selectedPages,
    selectedComponent,
    selectedCategory,
    urls,
    componentIds,
    categories,
    onCloseClick,
    setPageValue,
    categoryValue,
    setCategoryValue,
    componentValue,
    setComponentValue,
    onNeedsReviewChecked,
    onInputBoxChange,
    onApplyFilters,
    onUpdateFilters
  } = useFilterModal();

  return (
    <Modal show size="lg" onOverlayClick={onCloseClick}>
      <ModalHeader handleDismissClick={onCloseClick} heading="Filters" />
      <ModalBody>
        <div className="mb-6">
          <p className="text-base-700 mb-4 mr-4 text-sm font-medium">
            Severity
          </p>
          <div className="flex">
            {severityOptions.map((option) => (
              <Checkbox
                data={option}
                border={false}
                wrapperClassName="pt-0 w-24 mr-5"
                checked={selectedImpact.includes(option.value)}
                onChange={(e) => onInputBoxChange(option, e)}
              />
            ))}
          </div>
        </div>
        <div className="mb-6">
          <ComboBox
            onChange={(values) => onUpdateFilters('page', values)}
            value={selectedPages}
            isMulti
          >
            <ComboboxLabel>Pages</ComboboxLabel>
            <ComboboxTrigger
              placeholder="Select"
              onInputValueChange={(value) => setPageValue(value)}
            />
            <ComboboxOptionGroup maxWidth="30vw">
              {urls
                .filter(({ value }) =>
                  value.toLowerCase().includes(pageValue.toLowerCase())
                )
                .map((item) => (
                  <ComboboxOptionItem
                    option={item}
                    wrapperClassName="text-base-500 text-sm"
                  />
                ))}
            </ComboboxOptionGroup>
          </ComboBox>
        </div>
        <div className="mb-6">
          <ComboBox
            onChange={(values) => onUpdateFilters('component', values)}
            value={selectedComponent}
            isMulti
          >
            <ComboboxLabel>Components</ComboboxLabel>
            <ComboboxTrigger
              placeholder="Select"
              onInputValueChange={(value) => setComponentValue(value)}
            />
            <ComboboxOptionGroup maxWidth="30vw">
              {componentIds
                .filter(({ value }) =>
                  value.toLowerCase().includes(componentValue.toLowerCase())
                )
                .map((item) => (
                  <ComboboxOptionItem
                    option={item}
                    wrapperClassName="text-base-500 text-sm"
                  />
                ))}
            </ComboboxOptionGroup>
          </ComboBox>
        </div>
        <div className="mb-6">
          <ComboBox
            onChange={(values) => onUpdateFilters('category', values)}
            value={selectedCategory}
            isMulti
          >
            <ComboboxLabel>Category</ComboboxLabel>
            <ComboboxTrigger
              placeholder="Select"
              onInputValueChange={(value) => setCategoryValue(value)}
            />
            <ComboboxOptionGroup>
              {categories
                .filter(({ value }) =>
                  value.toLowerCase().includes(categoryValue.toLowerCase())
                )
                .map((item) => (
                  <ComboboxOptionItem
                    option={item}
                    wrapperClassName="text-base-500 text-sm"
                  />
                ))}
            </ComboboxOptionGroup>
          </ComboBox>
        </div>
        <Checkbox
          border={false}
          wrapperClassName="pt-0"
          data={{
            label: "Show only 'Needs Review' issues",
            value: 'needsReview'
          }}
          checked={showNeedsReviewIssues}
          onChange={onNeedsReviewChecked}
        />
      </ModalBody>
      <ModalFooter position="right">
        <Button onClick={onCloseClick} colors="white">
          Cancel
        </Button>
        <Button onClick={onApplyFilters}>OK</Button>
      </ModalFooter>
    </Modal>
  );
}
