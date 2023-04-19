const data = [
  {
    uuid: '0',
    name: 'file 1',
    isChecked: false,
    isIndeterminate: false,
    contents: [
      {
        uuid: '0-0',
        name: 'file 1a',
        isChecked: false,
        isIndeterminate: false,
        contents: null
      },
      {
        uuid: '0-1',
        name: 'file 1b',
        isChecked: false,
        isIndeterminate: false,
        contents: [
          {
            uuid: '0-1-0',
            name: 'file 1b1',
            isChecked: false,
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
    isChecked: false,
    isIndeterminate: false,
    contents: [
      {
        uuid: '1-0',
        name: 'file 2a',
        isChecked: false,
        isIndeterminate: false,
        contents: null
      },
      {
        uuid: '1-1',
        name: 'file 2b john',
        isChecked: false,
        isIndeterminate: false,
        contents: [
          {
            uuid: '1-1-0',
            name: 'file 2b1',
            isChecked: false,
            isIndeterminate: false,
            contents: [
              {
                uuid: '1-1-0-0',
                name: 'file 2b1a',
                isChecked: false,
                isIndeterminate: false,
                contents: [
                  {
                    uuid: '1-1-0-0-0',
                    name: 'file 2b1a1',
                    isChecked: false,
                    isIndeterminate: false
                  }
                ]
              }
            ]
          },
          {
            uuid: '1-1-1',
            name: 'file 2b2',
            isChecked: false,
            isIndeterminate: false,
            contents: [
              {
                uuid: '1-1-1-0',
                name: 'file 2b2a',
                isChecked: false,
                isIndeterminate: false,
                contents: [
                  {
                    uuid: '1-1-1-0-0',
                    name: 'file 2b2a1',
                    isChecked: false,
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
