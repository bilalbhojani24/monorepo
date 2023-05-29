import React, { useMemo } from 'react';
import { CodeSnippet, CodeSnippetToolbar } from '@browserstack/bifrost';
import PropTypes from 'prop-types';

import {
  INTGTable,
  INTGTableBody,
  INTGTableCell,
  INTGTableHead,
  INTGTableRow
} from '../../../../common/bifrostProxy';

const LogRequestDetailsTable = ({ data, payloadOf }) => {
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
              <INTGTableCell key="details">
                {itemName === 'body' ? (
                  <div className="max-w-xl">
                    <CodeSnippet
                      toolbar={
                        <CodeSnippetToolbar
                          leadingNode={
                            <div className="bg-base-50 flex items-center space-x-2">
                              <div>{payloadOf}</div>
                            </div>
                          }
                        />
                      }
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
  data: PropTypes.shape({ [PropTypes.string]: PropTypes.string }),
  payloadOf: PropTypes.string.isRequired
};

LogRequestDetailsTable.defaultProps = {
  data: {}
};

export default LogRequestDetailsTable;
