import React, { useMemo } from 'react';
import {
  CodeSnippet,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@browserstack/bifrost';

const LogRequestDetailsTable = ({ data = {} }) => {
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
                  <div className="max-w-md">
                    <CodeSnippet
                      code={JSON.stringify(JSON.parse(itemDetails), null, '\t')}
                      language="json"
                      maxHeight="200px"
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
export default LogRequestDetailsTable;
