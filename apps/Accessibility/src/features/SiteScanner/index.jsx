import React from 'react';
import {
  Badge,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@browserstack/bifrost';

const GRTColumns = [
  {
    name: 'Scan summary',
    key: 'scanSummary'
  },
  {
    name: 'Last scan summary',
    key: 'lastScanSummary'
  },
  {
    name: 'Page summary',
    key: 'pageSummary'
  }
];

const GRTRows = [
  {
    name: 'Your scans',
    people: [
      {
        scanSummary: (
          <div className="flex-col font-normal">
            <div>
              <span className="mr-2">Main Flow</span>
              <Badge text="WCAG 2.0" />
            </div>
            <div className="mt-0.5 font-light">
              <span className="mr-2">You</span>
              <span className="mr-2">25 pages</span>
              <Badge
                text="Active Scan"
                wrapperClassName="mr-2"
                modifier="primary"
              />
              <span className="mr-2">Next: Feb 2, 12 PM</span>
            </div>
          </div>
        ),
        lastScanSummary: (
          <div className="flex flex-col font-normal">
            <span className="text-black">10745 issues</span>
            <span>Last scan: Feb 2, 12 PM</span>
          </div>
        ),
        pageSummary: (
          <div>
            <span className="mr-4">10 success</span>
            <span className="mr-4">2 failed</span>
            <span>3 redirects</span>
          </div>
        )
      },
      {
        scanSummary: (
          <div className="flex-col font-normal">
            <div>
              <span className="mr-2">Main Flow</span>
              <Badge text="WCAG 2.0" />
            </div>
            <div className="mt-0.5 font-light">
              <span className="mr-2">You</span>
              <span className="mr-2">25 pages</span>
              <Badge
                text="Active Scan"
                wrapperClassName="mr-2"
                modifier="primary"
              />
              <span className="mr-2">Next: Feb 2, 12 PM</span>
            </div>
          </div>
        ),
        lastScanSummary: (
          <div className="flex flex-col font-normal">
            <span className="text-black">10745 issues</span>
            <span>Last scan: Feb 2, 12 PM</span>
          </div>
        ),
        pageSummary: (
          <div>
            <span className="mr-4">10 success</span>
            <span className="mr-4">2 failed</span>
            <span>3 redirects</span>
          </div>
        )
      }
    ]
  },
  {
    name: 'Others',
    people: [
      {
        scanSummary: (
          <div className="flex-col font-normal">
            <div>
              <span className="mr-2">Main Flow</span>
              <Badge text="WCAG 2.0" />
            </div>
            <div className="mt-0.5 font-light">
              <span className="mr-2">You</span>
              <span className="mr-2">25 pages</span>
              <Badge
                text="Active Scan"
                wrapperClassName="mr-2"
                modifier="primary"
              />
              <span className="mr-2">Next: Feb 2, 12 PM</span>
            </div>
          </div>
        ),
        lastScanSummary: (
          <div className="flex flex-col font-normal">
            <span className="text-black">10745 issues</span>
            <span>Last scan: Feb 2, 12 PM</span>
          </div>
        ),
        pageSummary: (
          <div>
            <span className="mr-4">10 success</span>
            <span className="mr-4">2 failed</span>
            <span>3 redirects</span>
          </div>
        )
      }
    ]
  }
];

export default function SiteScanner() {
  return (
    <div className="bg-base-50">
      <div className="p-6">
        <div>
          <h1 className="mb-2 text-2xl font-bold">Website Scanner</h1>
          <h3 className="text-base-500 mb-4 text-sm font-medium">
            Select reports to view them. You can select more than one report to
            consolidate and review reports.
          </h3>
        </div>
      </div>
      <Table containerWrapperClass="site-scanner__list">
        <>
          <TableHead wrapperClass="bg-white">
            <TableRow>
              {GRTColumns.map((col) => (
                <TableCell
                  key={col.key}
                  variant="header"
                  wrapperClass="text-gray-500"
                >
                  {col.name}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {GRTRows.map((row, idx) => (
              <>
                <TableRow>
                  <TableCell
                    variant="header"
                    colspan={GRTColumns.length}
                    wrapperClass="bg-base-50"
                  >
                    {row.name}
                  </TableCell>
                </TableRow>
                {row.people.map((per, perIdx) => (
                  /* eslint-disable-next-line react/no-array-index-key */
                  <TableRow key={idx + perIdx}>
                    {GRTColumns.map((column, colIdx) => {
                      const value = per[column.key];
                      return (
                        <TableCell
                          key={column.id}
                          wrapperClass={
                            colIdx === 0
                              ? 'text-base-900 font-medium'
                              : 'text-base-500'
                          }
                        >
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </>
            ))}
          </TableBody>
        </>
      </Table>
    </div>
  );
}
