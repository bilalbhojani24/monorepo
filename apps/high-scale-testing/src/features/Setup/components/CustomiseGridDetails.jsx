import React from 'react';
import {
  Button,
  ComboBox,
  ComboboxAddNewItem,
  ComboboxLabel,
  ComboboxOptionGroup,
  ComboboxOptionItem,
  ComboboxTrigger,
  Modal,
  ModalHeader,
  SelectMenu,
  SelectMenuLabel,
  SelectMenuOptionGroup,
  SelectMenuOptionItem,
  SelectMenuTrigger
} from '@browserstack/bifrost';
import PropTypes from 'prop-types';

const CustomiseGridDetails = ({
  currentProvidersInstanceTypes,
  currentProvidersRegions,
  dismissCustomiseGridDetailModal,
  displaySubnetsItemsArray,
  displayVPCItemsArray,
  instanceChangeHandler,
  isExactSubnetMatch,
  isExactVPCMatch,
  isSubnetLoading,
  isSaving,
  isVPCLoading,
  regionChangeHandler,
  saveBtnClickHandler,
  selectedInstanceType,
  selectedRegion,
  selectedSubnetValues,
  selectedVPCValue,
  setSubnetQuery,
  setVPCQuery,
  subnetChangeHandler,
  subnetInputChangeHandler,
  subnetQuery,
  showModal,
  vpcChangeHandler,
  VPCInputChangeHandler,
  VPCQuery
}) => {
  const RegionInputComponent = (
    <SelectMenu onChange={regionChangeHandler} value={selectedRegion}>
      <SelectMenuLabel>
        Region
        <span className="text-danger-600 ml-0.5">*</span>
      </SelectMenuLabel>
      <SelectMenuTrigger />
      <SelectMenuOptionGroup>
        {currentProvidersRegions?.map((item) => (
          <SelectMenuOptionItem key={item.value} option={item} />
        ))}
      </SelectMenuOptionGroup>
    </SelectMenu>
  );

  const InstanceTypeInputComponent = (
    <ComboBox
      onChange={instanceChangeHandler}
      value={selectedInstanceType}
      isMulti={false}
    >
      <ComboboxLabel>
        Instance Type
        <span className="text-danger-600 ml-0.5">*</span>
      </ComboboxLabel>
      <ComboboxTrigger placeholder="Placeholder" />
      <ComboboxOptionGroup>
        {currentProvidersInstanceTypes.map((item) => (
          <ComboboxOptionItem key={item.value} option={item} />
        ))}
      </ComboboxOptionGroup>
    </ComboBox>
  );

  const SubnetsInputComponent = (
    <ComboBox
      isMulti
      isRightLoading={isSubnetLoading}
      onChange={subnetChangeHandler}
      onOpenChange={(status) => {
        if (!status) setSubnetQuery('');
      }}
      value={selectedSubnetValues}
    >
      <ComboboxLabel>Subnets</ComboboxLabel>
      <ComboboxTrigger
        onInputValueChange={subnetInputChangeHandler}
        placeholder="Select Subnets"
      />
      <ComboboxOptionGroup
        addNewItemComponent={
          !isExactSubnetMatch && subnetQuery.length > 0 ? (
            <ComboboxAddNewItem
              suffix="as a new option (↵)"
              prefix="Add"
              showQuery
            />
          ) : null
        }
      >
        {displaySubnetsItemsArray.map((item) => (
          <ComboboxOptionItem key={item.value} option={item} />
        ))}
      </ComboboxOptionGroup>
    </ComboBox>
  );

  const VPCInputComponent = (
    <ComboBox
      isMulti={false}
      isRightLoading={isVPCLoading}
      onChange={vpcChangeHandler}
      onOpenChange={(status) => {
        if (!status) setVPCQuery('');
      }}
      value={selectedVPCValue}
    >
      <ComboboxLabel>VPC ID</ComboboxLabel>
      <ComboboxTrigger
        onInputValueChange={VPCInputChangeHandler}
        placeholder="Select VPC ID"
      />
      <ComboboxOptionGroup
        addNewItemComponent={
          !isExactVPCMatch && VPCQuery.length > 0 ? (
            <ComboboxAddNewItem
              suffix="as a new option (↵)"
              prefix="Add"
              showQuery
            />
          ) : null
        }
      >
        {displayVPCItemsArray.map((item) => (
          <ComboboxOptionItem key={item.value} option={item} />
        ))}
      </ComboboxOptionGroup>
    </ComboBox>
  );

  return (
    <Modal size="2xl" show={showModal}>
      <ModalHeader
        handleDismissClick={dismissCustomiseGridDetailModal}
        heading="Customise Settings"
      />
      <div className="px-6 pb-3">
        <div className="mb-5 flex flex-col">
          <div className=" mt-4 flex flex-row gap-4">
            <div className="w-1/2">{RegionInputComponent}</div>
            <div className="w-1/2">{InstanceTypeInputComponent}</div>
          </div>

          <div className="mt-4 flex flex-row gap-4">
            <div className="w-1/2">{VPCInputComponent}</div>
            <div className="w-1/2">{SubnetsInputComponent}</div>
          </div>
        </div>
        <div className="flex flex-row-reverse">
          <Button loading={isSaving} onClick={saveBtnClickHandler}>
            Save
          </Button>
        </div>
      </div>
    </Modal>
  );
};

CustomiseGridDetails.propTypes = {
  currentProvidersRegions: PropTypes.shape([]).isRequired,
  currentProvidersInstanceTypes: PropTypes.shape([]).isRequired,
  dismissCustomiseGridDetailModal: PropTypes.func.isRequired,
  displaySubnetsItemsArray: PropTypes.shape([]).isRequired,
  displayVPCItemsArray: PropTypes.shape([]).isRequired,
  instanceChangeHandler: PropTypes.func.isRequired,
  isExactSubnetMatch: PropTypes.bool.isRequired,
  isExactVPCMatch: PropTypes.bool.isRequired,
  isSaving: PropTypes.bool.isRequired,
  isSubnetLoading: PropTypes.bool.isRequired,
  isVPCLoading: PropTypes.bool.isRequired,
  regionChangeHandler: PropTypes.func.isRequired,
  saveBtnClickHandler: PropTypes.func.isRequired,
  selectedInstanceType: PropTypes.shape({}).isRequired,
  selectedRegion: PropTypes.shape({}).isRequired,
  selectedSubnetValues: PropTypes.shape({}).isRequired,
  selectedVPCValue: PropTypes.shape({}).isRequired,
  setSubnetQuery: PropTypes.shape({}).isRequired,
  setVPCQuery: PropTypes.shape({}).isRequired,
  subnetChangeHandler: PropTypes.func.isRequired,
  subnetInputChangeHandler: PropTypes.func.isRequired,
  subnetQuery: PropTypes.bool.isRequired,
  showModal: PropTypes.bool.isRequired,
  vpcChangeHandler: PropTypes.func.isRequired,
  VPCInputChangeHandler: PropTypes.func.isRequired,
  VPCQuery: PropTypes.bool.isRequired
};
export default CustomiseGridDetails;
