import React from 'react';
import { RiDownloadFill, RiShareFill, RiUser3Fill } from 'react-icons/ri';
import { Badge, Button, Tabs } from '@browserstack/bifrost';

export default function ScanReport() {
  return (
    <div className="bg-base-50">
      <div className="flex justify-between p-6">
        <div className="flex-col">
          <div className="flex items-center">
            <h1 className="mb-2 mr-2 text-2xl font-bold">Main user flow</h1>
            <Badge
              text="Website scan report of Feb 2, 2023, 12:00 PM"
              wrapperClassName="mr-2 h-6"
            />
          </div>
          <span className="mr-2 flex items-center text-sm">
            <span className="mr-0.5">
              <RiUser3Fill color="#9CA3AF" />
            </span>{' '}
            <span className="text-base-500">Kaustubh Saxena</span>
          </span>
        </div>
        <div className="flex items-center">
          <Button
            colors="white"
            onClick={() => {}}
            size="small"
            type="subtle"
            wrapperClassName="h-10 mr-2"
            icon={<RiShareFill />}
            iconPlacement="end"
          >
            Share Link
          </Button>
          <Button
            onClick={() => {}}
            size="small"
            type="subtle"
            wrapperClassName="h-10 mr-2"
            icon={<RiDownloadFill />}
            iconPlacement="end"
          >
            Export
          </Button>
        </div>
      </div>
      <div className="pl-6">
        <Tabs
          defaultIndex="0"
          id="menu"
          onTabChange={() => {}}
          tabsArray={[
            {
              name: 'Summary'
            },
            {
              name: 'All Issues'
            },
            {
              name: 'Scan Logs'
            }
          ]}
        />
      </div>
    </div>
  );
}
