const data = [
  {
    uuid: '0',
    name: 'file A',
    isChecked: true,
    isIndeterminate: false,
    contents: [
      {
        uuid: '0-0',
        name: 'file A-2-a',
        isChecked: true,
        isIndeterminate: false,
        contents: null
      },
      {
        uuid: '0-1',
        name: 'file A-2',
        isChecked: true,
        isIndeterminate: false,
        contents: [
          {
            uuid: '0-1-0',
            name: 'file A-2-b',
            isChecked: true,
            isIndeterminate: false,
            contents: null
          }
        ]
      }
    ]
  },
  {
    uuid: '1',
    name: 'file 2',
    isChecked: true,
    isIndeterminate: false,
    contents: [
      {
        uuid: '1-0',
        name: 'file 2a',
        isChecked: true,
        isIndeterminate: false,
        contents: null
      },
      {
        uuid: '1-1',
        name: 'file 2b',
        isChecked: true,
        isIndeterminate: false,
        contents: [
          {
            uuid: '1-1-0',
            name: 'file 2b1',
            isChecked: true,
            isIndeterminate: false,
            contents: [
              {
                uuid: '1-1-0-0',
                name: 'file 2b1a',
                isChecked: true,
                isIndeterminate: false,
                contents: [
                  {
                    uuid: '1-1-0-0-0',
                    name: 'file 2b1a1',
                    isChecked: true,
                    isIndeterminate: false
                  }
                ]
              }
            ]
          },
          {
            uuid: '1-1-1',
            name: 'file 2b2',
            isChecked: true,
            isIndeterminate: false,
            contents: [
              {
                uuid: '1-1-1-0',
                name: 'file 2b1a',
                isChecked: true,
                isIndeterminate: false,
                contents: [
                  {
                    uuid: '1-1-1ß-0-0',
                    name: 'file 2b1a1',
                    isChecked: true,
                    isIndeterminate: false
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
];

export default data;
