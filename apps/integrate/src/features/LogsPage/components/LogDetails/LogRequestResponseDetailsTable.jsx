import React, { useMemo } from 'react';
import {
  CodeSnippet,
  CodeSnippetToolbar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@browserstack/bifrost';
import PropTypes from 'prop-types';

const LogRequestDetailsTable = ({ data, payloadOf }) => {
  const dataToRender = useMemo(() => Object.entries(data), [data]);
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell key="name" variant="header" textTransform="uppercase">
            Name
          </TableCell>
          <TableCell key="details" variant="header" textTransform="uppercase">
            Details
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {dataToRender.map((item) => {
          const { 0: itemName, 1: itemDetails } = item;
          return (
            <TableRow key={itemName}>
              <TableCell key="name">
                <p>{itemName}</p>
              </TableCell>
              <TableCell key="details">
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
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
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
