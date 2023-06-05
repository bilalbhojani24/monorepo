import React from 'react';
import {
  Button,
  CodeSnippet,
  CodeSnippetToolbar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@browserstack/bifrost';
import { ChatWidget, toggleChatWidget } from '@browserstack/growth';

const GRTColumns = [
  {
    name: 'Name',
    key: 'name'
  },
  {
    name: 'Description',
    key: 'description'
  },
  {
    name: 'Default',
    key: 'default'
  },
  {
    name: '',
    key: 'action',
    cell: () => (
      <>
        <Button onClick={() => toggleChatWidget(true)}>Show widget</Button>
        <Button onClick={() => toggleChatWidget(false)}>Hide widget</Button>
      </>
    )
  }
];

const GRTRows = [
  {
    title: 'Prop',
    value: [
      {
        name: 'direction',
        description: 'The position of the chat widget button',
        default: 'right',
        isAction: false
      }
    ]
  },
  {
    title: 'Exported Utils',
    value: [
      {
        name: 'toggleChatWidget',
        description: 'This will toggle the chat widget button.',
        default: '-',
        isAction: true
      }
    ]
  }
];

const FreshChatWidget = () => (
  <div className="p-5">
    <h1 className="mb-5 text-center text-xl">
      FRESH CHAT WIDGET COMPONENT DOCUMENTATION AND DEMO
    </h1>
    <ChatWidget direction="right" />
    <Table>
      <TableHead wrapperClassName="bg-white">
        <TableRow>
          {GRTColumns.map((col) => (
            <TableCell key={col.key} variant="header">
              {col.name}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {GRTRows.map((row, idx) => (
          <React.Fragment key={row.title}>
            <TableRow>
              <TableCell
                variant="header"
                colspan={GRTColumns.length}
                wrapperClassName="bg-base-50"
              >
                {row.title}
              </TableCell>
            </TableRow>
            {row.value.map((per, perIdx) => {
              const key = idx + perIdx;
              return (
                <TableRow key={key}>
                  {GRTColumns.map((column, colIdx) => {
                    const value = per[column.key];
                    return (
                      <TableCell
                        key={column.id}
                        wrapperClassName={
                          colIdx === 0
                            ? 'text-base-900 font-medium'
                            : 'text-base-500'
                        }
                      >
                        {per.isAction ? (
                          <>
                            {column.cell ? (
                              <>{column.cell(row, toggleChatWidget)}</>
                            ) : (
                              value
                            )}
                          </>
                        ) : (
                          value
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </React.Fragment>
        ))}
      </TableBody>
    </Table>

    <div className="mt-5" />
    <CodeSnippet
      toolbar={
        <CodeSnippetToolbar
          leadingNode={
            <div className="flex items-center space-x-2">
              Feedbackwidget without renderProps
            </div>
          }
        />
      }
      language="react/jsx"
      code={`import { ChatWidget } from "@browserstack/growth; 
<ChatWidget direction = "right" />`}
    />

    <div className="mt-5" />
    <CodeSnippet
      toolbar={
        <CodeSnippetToolbar
          leadingNode={
            <div className="flex items-center space-x-2">
              Feedbackwidget Toggle Widget
            </div>
          }
        />
      }
      language="react/jsx"
      code={`import { ChatWidget, toggleChatWidget } from "@browserstack/growth;
      
<ChatWidget direction="right" />
<button onClick={() => toggleChatWidget(true)}>Show Widget</button>
<button onClick={() => toggleChatWidget(false)}>Hide Widget</button>
`}
    />
  </div>
);

export default FreshChatWidget;