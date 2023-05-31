import React, { useMemo } from 'react';
import { CodeSnippet } from '@browserstack/bifrost';
import {
  INTGTable,
  INTGTableBody,
  INTGTableCell,
  INTGTableHead,
  INTGTableRow
} from 'common/bifrostProxy';
import PropTypes from 'prop-types';

const LogRequestDetailsTable = ({ data }) => {
  const dataToRender = useMemo(() => Object.entries(data), [data]);
  return (
    <INTGTable>
      <INTGTableHead>
        <INTGTableRow>
          <INTGTableCell key="name" variant="header" textTransform="uppercase">
            Name
          </INTGTableCell>
          <INTGTableCell
            key="details"
            variant="header"
            textTransform="uppercase"
          >
            Details
          </INTGTableCell>
        </INTGTableRow>
      </INTGTableHead>
      <INTGTableBody>
        {dataToRender.map((item) => {
          const { 0: itemName, 1: itemDetails } = item;
          return (
            <INTGTableRow key={itemName}>
              <INTGTableCell key="name">
                <p>{itemName}</p>
              </INTGTableCell>
              <INTGTableCell key="details" wrapperClassName="whitespace-normal">
                {itemName === 'body' ? (
                  <div className="max-w-xl">
                    <CodeSnippet
                      code={JSON.stringify(JSON.parse(itemDetails), null, '\t')}
                      language="json"
                      maxHeight="400px"
                    />
                  </div>
                ) : (
                  <p>{itemDetails}</p>
                )}
              </INTGTableCell>
            </INTGTableRow>
          );
        })}
      </INTGTableBody>
    </INTGTable>
  );
};

LogRequestDetailsTable.propTypes = {
  data: PropTypes.shape({ [PropTypes.string]: PropTypes.string })
};

LogRequestDetailsTable.defaultProps = {
  data: {}
};

export default LogRequestDetailsTable;
