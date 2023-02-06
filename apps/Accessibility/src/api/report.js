export const data = {
  success: true,
  data: {
    meta: {
      705: {
        startTimestamp: '2023-02-03T15:34:01Z',
        endTimestamp: '2023-02-03T15:34:43Z',
        startUrl: 'https://www.browserstack.com/',
        testId: 'TEST_1675438441950_67XaVCiULiFY',
        wcagVersion: {
          label: 'WCAG 2.1 AA',
          value: 'wcag21aa'
        },
        name: "Lee's test",
        needsReview: true,
        bestPractices: false,
        scanType: 'Full page',
        createdBy: {
          id: 5373131,
          name: 'Lee Vardaro'
        },
        engineInfo: {
          testEngine: {
            name: 'axe-core',
            version: '4.4.2'
          }
        }
      }
    },
    issueSummary: {
      componentCount: 31,
      issueCount: 326,
      pageCount: 3,
      minor: 1,
      moderate: 0,
      serious: 325,
      critical: 0
    },
    chartData: {
      issueCountByURL: [
        {
          url: 'https://www.browserstack.com/',
          count: 16
        },
        {
          url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
          count: 236
        },
        {
          url: 'https://www.browserstack.com/docs/',
          count: 74
        }
      ],
      issueCountByComponent: [
        {
          componentId: 'H1#',
          count: 3
        },
        {
          componentId: 'P#',
          count: 50
        },
        {
          componentId: 'BUTTON#btn.btn-secondary.btn-lg.col-md-3',
          count: 1
        },
        {
          componentId: 'H5#',
          count: 2
        },
        {
          componentId: 'H4#',
          count: 5
        },
        {
          componentId: 'A#sidenav-h1.sidenav-link.text-link',
          count: 50
        },
        {
          componentId: 'STRONG#alert-strong',
          count: 3
        },
        {
          componentId: 'STRONG#',
          count: 6
        },
        {
          componentId: 'A#text-link',
          count: 36
        },
        {
          componentId: 'H2#',
          count: 12
        },
        {
          componentId: 'LI#',
          count: 4
        },
        {
          componentId: 'SPAN#',
          count: 35
        },
        {
          componentId: 'CODE#.highlighter-rouge..language-plaintext',
          count: 12
        },
        {
          componentId: 'SPAN#token.function',
          count: 20
        },
        {
          componentId: 'SPAN#token.builtin.class-name',
          count: 3
        },
        {
          componentId: 'SPAN#token.string',
          count: 29
        },
        {
          componentId: 'A#tab-element--tag.active.show',
          count: 1
        },
        {
          componentId: 'A#tab-element--tag',
          count: 1
        },
        {
          componentId: 'CODE#..language-bash',
          count: 1
        },
        {
          componentId: 'SPAN#token.keyword',
          count: 14
        },
        {
          componentId: 'SPAN#token.function-variable.function',
          count: 2
        },
        {
          componentId: 'SPAN#token.parameter',
          count: 3
        },
        {
          componentId: 'H3#',
          count: 5
        },
        {
          componentId: 'BUTTON#btn',
          count: 2
        },
        {
          componentId: 'P#intro',
          count: 1
        },
        {
          componentId: 'SPAN#nav_item_name',
          count: 1
        },
        {
          componentId: 'P#site-home-intro',
          count: 1
        },
        {
          componentId:
            'UL#dropdown-menu.developers-dropdown-menu.small-dropdown-menu.active',
          count: 1
        },
        {
          componentId: 'DIV#highlight.code-body',
          count: 11
        },
        {
          componentId: 'PRE#highlight..language-bash',
          count: 4
        },
        {
          componentId: 'PRE#highlight..language-javascript',
          count: 7
        }
      ],
      issueCountByCategory: [
        {
          category: 'cat.keyboard',
          count: 0
        },
        {
          category: 'cat.text-alternatives',
          count: 0
        },
        {
          category: 'cat.aria',
          count: 22
        },
        {
          category: 'cat.name-role-value',
          count: 0
        },
        {
          category: 'cat.time-and-media',
          count: 0
        },
        {
          category: 'cat.forms',
          count: 0
        },
        {
          category: 'cat.structure',
          count: 1
        },
        {
          category: 'cat.color',
          count: 302
        },
        {
          category: 'cat.parsing',
          count: 0
        },
        {
          category: 'cat.semantics',
          count: 1
        },
        {
          category: 'cat.language',
          count: 0
        },
        {
          category: 'cat.sensory-and-visual-cues',
          count: 0
        },
        {
          category: 'cat.tables',
          count: 0
        }
      ]
    },
    reportData: [
      {
        nodes: [
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#111111',
                  fontSize: '48.8pt (65px)',
                  fontWeight: 'normal',
                  messageKey: 'bgGradient',
                  contrastRatio: 0,
                  expectedContrastRatio: '3:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a background gradient",
                relatedNodes: [
                  {
                    html: '\u003carticle class="hero-unit hero-unit--v2 hero-unit--exp"\u003e',
                    target: ['.hero-unit']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:02Z',
            htmltag: 'H1',
            page: {
              pageId: '8Ot3',
              timestamp: '2023-02-03T15:34:01Z',
              url: 'https://www.browserstack.com/',
              title:
                'Most Reliable App \u0026 Cross Browser Testing Platform | BrowserStack'
            },
            componentId: 'H1#',
            needsReview: true,
            issueId: 97547,
            html: '\u003ch1\u003eApp \u0026amp; Browser Testing Made Easy\u003c/h1\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a background gradient",
            impact: 'serious',
            target: ['h1'],
            url: 'https://www.browserstack.com/',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97547
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#333333',
                  fontSize: '15.8pt (21px)',
                  fontWeight: 'normal',
                  messageKey: 'bgGradient',
                  contrastRatio: 0,
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a background gradient",
                relatedNodes: [
                  {
                    html: '\u003carticle class="hero-unit hero-unit--v2 hero-unit--exp"\u003e',
                    target: ['.hero-unit']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:02Z',
            htmltag: 'P',
            page: {
              pageId: '8Ot3',
              timestamp: '2023-02-03T15:34:01Z',
              url: 'https://www.browserstack.com/',
              title:
                'Most Reliable App \u0026 Cross Browser Testing Platform | BrowserStack'
            },
            componentId: 'P#',
            needsReview: true,
            issueId: 97548,
            html: "\u003cp\u003eGive your users a seamless experience by testing on 3000+ real devices and browsers. Don't compromise with emulators and simulators.\u003c/p\u003e",
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a background gradient",
            impact: 'serious',
            target: ['.text-section \u003e p'],
            url: 'https://www.browserstack.com/',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97548
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#0067dd',
                  fontSize: '13.5pt (18px)',
                  fontWeight: 'normal',
                  messageKey: 'bgGradient',
                  contrastRatio: 0,
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a background gradient",
                relatedNodes: [
                  {
                    html: '\u003carticle class="hero-unit hero-unit--v2 hero-unit--exp"\u003e',
                    target: ['.hero-unit']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:02Z',
            htmltag: 'BUTTON',
            page: {
              pageId: '8Ot3',
              timestamp: '2023-02-03T15:34:01Z',
              url: 'https://www.browserstack.com/',
              title:
                'Most Reliable App \u0026 Cross Browser Testing Platform | BrowserStack'
            },
            componentId: 'BUTTON#btn.btn-secondary.btn-lg.col-md-3',
            needsReview: true,
            issueId: 97549,
            html: '\u003cbutton class="btn btn-secondary btn-lg col-md-3"\u003eGet a demo\u003c/button\u003e',
            classList: 'btn.btn-secondary.btn-lg.col-md-3',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a background gradient",
            impact: 'serious',
            target: [
              '.hero-custom-utm-params \u003e .btn-secondary.col-md-3.btn-lg'
            ],
            url: 'https://www.browserstack.com/',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97549
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#333333',
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'bgGradient',
                  contrastRatio: 0,
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a background gradient",
                relatedNodes: [
                  {
                    html: '\u003carticle class="hero-unit hero-unit--v2 hero-unit--exp"\u003e',
                    target: ['.hero-unit']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:02Z',
            htmltag: 'H5',
            page: {
              pageId: '8Ot3',
              timestamp: '2023-02-03T15:34:01Z',
              url: 'https://www.browserstack.com/',
              title:
                'Most Reliable App \u0026 Cross Browser Testing Platform | BrowserStack'
            },
            componentId: 'H5#',
            needsReview: true,
            issueId: 97550,
            html: '\u003ch5\u003eTest your Websites\u003c/h5\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a background gradient",
            impact: 'serious',
            target: [
              '.col-sm-7 \u003e .mb-9.row \u003e .product-cards-wrapper--line \u003e h5'
            ],
            url: 'https://www.browserstack.com/',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97550
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#333333',
                  fontSize: '15.8pt (21px)',
                  fontWeight: 'normal',
                  messageKey: 'bgOverlap',
                  contrastRatio: 0,
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it is overlapped by another element",
                relatedNodes: []
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:02Z',
            htmltag: 'H4',
            page: {
              pageId: '8Ot3',
              timestamp: '2023-02-03T15:34:01Z',
              url: 'https://www.browserstack.com/',
              title:
                'Most Reliable App \u0026 Cross Browser Testing Platform | BrowserStack'
            },
            componentId: 'H4#',
            needsReview: true,
            issueId: 97551,
            html: '\u003ch4\u003elive\u003c/h4\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it is overlapped by another element",
            impact: 'serious',
            target: [
              '.col-sm-4.m-w-100.no-pad:nth-child(1) \u003e .product-cards-wrapper--click \u003e .product-card.product-card-hero \u003e .product-card--heading \u003e h4'
            ],
            url: 'https://www.browserstack.com/',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97551
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#666666',
                  fontSize: '10.5pt (14px)',
                  fontWeight: 'normal',
                  messageKey: 'bgOverlap',
                  contrastRatio: 0,
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it is overlapped by another element",
                relatedNodes: []
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:02Z',
            htmltag: 'P',
            page: {
              pageId: '8Ot3',
              timestamp: '2023-02-03T15:34:01Z',
              url: 'https://www.browserstack.com/',
              title:
                'Most Reliable App \u0026 Cross Browser Testing Platform | BrowserStack'
            },
            componentId: 'P#',
            needsReview: true,
            issueId: 97552,
            html: '\u003cp\u003e Interactive cross browser testing \u003c/p\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it is overlapped by another element",
            impact: 'serious',
            target: [
              '.col-sm-4.m-w-100.no-pad:nth-child(1) \u003e .product-cards-wrapper--click \u003e .product-card.product-card-hero \u003e .product-card--heading \u003e p'
            ],
            url: 'https://www.browserstack.com/',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97552
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#333333',
                  fontSize: '15.8pt (21px)',
                  fontWeight: 'normal',
                  messageKey: 'bgOverlap',
                  contrastRatio: 0,
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it is overlapped by another element",
                relatedNodes: []
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:02Z',
            htmltag: 'H4',
            page: {
              pageId: '8Ot3',
              timestamp: '2023-02-03T15:34:01Z',
              url: 'https://www.browserstack.com/',
              title:
                'Most Reliable App \u0026 Cross Browser Testing Platform | BrowserStack'
            },
            componentId: 'H4#',
            needsReview: true,
            issueId: 97553,
            html: '\u003ch4\u003eAutomate\u003c/h4\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it is overlapped by another element",
            impact: 'serious',
            target: [
              '.col-sm-4.m-w-100.no-pad:nth-child(2) \u003e .product-cards-wrapper--click \u003e .product-card.product-card-hero \u003e .product-card--heading \u003e h4'
            ],
            url: 'https://www.browserstack.com/',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97553
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#666666',
                  fontSize: '10.5pt (14px)',
                  fontWeight: 'normal',
                  messageKey: 'bgOverlap',
                  contrastRatio: 0,
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it is overlapped by another element",
                relatedNodes: []
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:02Z',
            htmltag: 'P',
            page: {
              pageId: '8Ot3',
              timestamp: '2023-02-03T15:34:01Z',
              url: 'https://www.browserstack.com/',
              title:
                'Most Reliable App \u0026 Cross Browser Testing Platform | BrowserStack'
            },
            componentId: 'P#',
            needsReview: true,
            issueId: 97554,
            html: '\u003cp\u003e Selenium testing \u003cbr\u003e at scale \u003c/p\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it is overlapped by another element",
            impact: 'serious',
            target: [
              '.col-sm-4.m-w-100.no-pad:nth-child(2) \u003e .product-cards-wrapper--click \u003e .product-card.product-card-hero \u003e .product-card--heading \u003e p'
            ],
            url: 'https://www.browserstack.com/',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97554
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#333333',
                  fontSize: '15.8pt (21px)',
                  fontWeight: 'normal',
                  messageKey: 'bgOverlap',
                  contrastRatio: 0,
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it is overlapped by another element",
                relatedNodes: []
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:02Z',
            htmltag: 'H4',
            page: {
              pageId: '8Ot3',
              timestamp: '2023-02-03T15:34:01Z',
              url: 'https://www.browserstack.com/',
              title:
                'Most Reliable App \u0026 Cross Browser Testing Platform | BrowserStack'
            },
            componentId: 'H4#',
            needsReview: true,
            issueId: 97555,
            html: '\u003ch4\u003ePercy\u003c/h4\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it is overlapped by another element",
            impact: 'serious',
            target: [
              '.col-sm-4.m-w-100.no-pad:nth-child(3) \u003e .product-cards-wrapper--click \u003e .product-card.product-card-hero \u003e .product-card--heading \u003e h4'
            ],
            url: 'https://www.browserstack.com/',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97555
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#666666',
                  fontSize: '10.5pt (14px)',
                  fontWeight: 'normal',
                  messageKey: 'bgOverlap',
                  contrastRatio: 0,
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it is overlapped by another element",
                relatedNodes: []
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:02Z',
            htmltag: 'P',
            page: {
              pageId: '8Ot3',
              timestamp: '2023-02-03T15:34:01Z',
              url: 'https://www.browserstack.com/',
              title:
                'Most Reliable App \u0026 Cross Browser Testing Platform | BrowserStack'
            },
            componentId: 'P#',
            needsReview: true,
            issueId: 97556,
            html: '\u003cp\u003e Visual testing \u003cbr\u003e and review \u003c/p\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it is overlapped by another element",
            impact: 'serious',
            target: [
              '.col-sm-4.m-w-100.no-pad:nth-child(3) \u003e .product-cards-wrapper--click \u003e .product-card.product-card-hero \u003e .product-card--heading \u003e p'
            ],
            url: 'https://www.browserstack.com/',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97556
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#333333',
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'bgGradient',
                  contrastRatio: 0,
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a background gradient",
                relatedNodes: [
                  {
                    html: '\u003carticle class="hero-unit hero-unit--v2 hero-unit--exp"\u003e',
                    target: ['.hero-unit']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:02Z',
            htmltag: 'H5',
            page: {
              pageId: '8Ot3',
              timestamp: '2023-02-03T15:34:01Z',
              url: 'https://www.browserstack.com/',
              title:
                'Most Reliable App \u0026 Cross Browser Testing Platform | BrowserStack'
            },
            componentId: 'H5#',
            needsReview: true,
            issueId: 97557,
            html: '\u003ch5\u003eTest your Mobile Apps\u003c/h5\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a background gradient",
            impact: 'serious',
            target: [
              '.col-sm-5 \u003e .mb-9.row \u003e .product-cards-wrapper--line \u003e h5'
            ],
            url: 'https://www.browserstack.com/',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97557
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#333333',
                  fontSize: '15.8pt (21px)',
                  fontWeight: 'normal',
                  messageKey: 'bgOverlap',
                  contrastRatio: 0,
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it is overlapped by another element",
                relatedNodes: []
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:02Z',
            htmltag: 'H4',
            page: {
              pageId: '8Ot3',
              timestamp: '2023-02-03T15:34:01Z',
              url: 'https://www.browserstack.com/',
              title:
                'Most Reliable App \u0026 Cross Browser Testing Platform | BrowserStack'
            },
            componentId: 'H4#',
            needsReview: true,
            issueId: 97558,
            html: '\u003ch4\u003eapp live\u003c/h4\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it is overlapped by another element",
            impact: 'serious',
            target: [
              '.col-sm-6.m-w-100.no-pad:nth-child(1) \u003e .product-cards-wrapper--click \u003e .product-card.product-card-hero \u003e .product-card--heading \u003e h4'
            ],
            url: 'https://www.browserstack.com/',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97558
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#666666',
                  fontSize: '10.5pt (14px)',
                  fontWeight: 'normal',
                  messageKey: 'bgOverlap',
                  contrastRatio: 0,
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it is overlapped by another element",
                relatedNodes: []
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:02Z',
            htmltag: 'P',
            page: {
              pageId: '8Ot3',
              timestamp: '2023-02-03T15:34:01Z',
              url: 'https://www.browserstack.com/',
              title:
                'Most Reliable App \u0026 Cross Browser Testing Platform | BrowserStack'
            },
            componentId: 'P#',
            needsReview: true,
            issueId: 97559,
            html: '\u003cp\u003e Interactive mobile \u003cbr\u003e app testing \u003c/p\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it is overlapped by another element",
            impact: 'serious',
            target: [
              '.col-sm-6.m-w-100.no-pad:nth-child(1) \u003e .product-cards-wrapper--click \u003e .product-card.product-card-hero \u003e .product-card--heading \u003e p'
            ],
            url: 'https://www.browserstack.com/',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97559
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#333333',
                  fontSize: '15.8pt (21px)',
                  fontWeight: 'normal',
                  messageKey: 'bgOverlap',
                  contrastRatio: 0,
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it is overlapped by another element",
                relatedNodes: []
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:02Z',
            htmltag: 'H4',
            page: {
              pageId: '8Ot3',
              timestamp: '2023-02-03T15:34:01Z',
              url: 'https://www.browserstack.com/',
              title:
                'Most Reliable App \u0026 Cross Browser Testing Platform | BrowserStack'
            },
            componentId: 'H4#',
            needsReview: true,
            issueId: 97560,
            html: '\u003ch4\u003eapp automate\u003c/h4\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it is overlapped by another element",
            impact: 'serious',
            target: [
              '.col-sm-6.m-w-100.no-pad:nth-child(2) \u003e .product-cards-wrapper--click \u003e .product-card.product-card-hero \u003e .product-card--heading \u003e h4'
            ],
            url: 'https://www.browserstack.com/',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97560
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#666666',
                  fontSize: '10.5pt (14px)',
                  fontWeight: 'normal',
                  messageKey: 'bgOverlap',
                  contrastRatio: 0,
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it is overlapped by another element",
                relatedNodes: []
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:02Z',
            htmltag: 'P',
            page: {
              pageId: '8Ot3',
              timestamp: '2023-02-03T15:34:01Z',
              url: 'https://www.browserstack.com/',
              title:
                'Most Reliable App \u0026 Cross Browser Testing Platform | BrowserStack'
            },
            componentId: 'P#',
            needsReview: true,
            issueId: 97561,
            html: '\u003cp\u003e Automated mobile \u003cbr\u003e app testing \u003c/p\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it is overlapped by another element",
            impact: 'serious',
            target: [
              '.col-sm-6.m-w-100.no-pad:nth-child(2) \u003e .product-cards-wrapper--click \u003e .product-card.product-card-hero \u003e .product-card--heading \u003e p'
            ],
            url: 'https://www.browserstack.com/',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97561
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'A',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'A#sidenav-h1.sidenav-link.text-link',
            needsReview: true,
            issueId: 97636,
            html: '\u003ca tabindex="-1" aria-label="Core Concepts" data-name="Core Concepts" href="/docs/automate/selenium/browserstack-sdk/core-concepts" data-product-type="" title="Core Concepts" class="sidenav-h1 sidenav-link text-link"\u003e\n                  Core Concepts\n                \u003c/a\u003e',
            classList: 'sidenav-h1.sidenav-link.text-link',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['a[aria-label="Core Concepts"]'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97636
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'A',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'A#sidenav-h1.sidenav-link.text-link',
            needsReview: true,
            issueId: 97637,
            html: '\u003ca tabindex="-1" aria-label="SDK Benefits" data-name="SDK Benefits" href="/docs/automate/selenium/browserstack-sdk/benefits" data-product-type="" title="SDK Benefits" class="sidenav-h1 sidenav-link text-link"\u003e\n                  SDK Benefits\n                \u003c/a\u003e',
            classList: 'sidenav-h1.sidenav-link.text-link',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['a[aria-label="SDK Benefits"]'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97637
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'A',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'A#sidenav-h1.sidenav-link.text-link',
            needsReview: true,
            issueId: 97638,
            html: '\u003ca tabindex="-1" aria-label="Disable Flash" data-name="Disable Flash" href="/docs/automate/selenium/disable-flash" data-product-type="" title="Disable Flash" class="sidenav-h1 sidenav-link text-link"\u003e\n                  Disable Flash\n                \u003c/a\u003e',
            classList: 'sidenav-h1.sidenav-link.text-link',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['a[aria-label="Disable Flash"]'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97638
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'A',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'A#sidenav-h1.sidenav-link.text-link',
            needsReview: true,
            issueId: 97639,
            html: '\u003ca tabindex="-1" aria-label="Introduction" data-name="Introduction" href="/docs/automate/selenium/local-testing-introduction" data-product-type="" title="Introduction" class="sidenav-h1 sidenav-link text-link"\u003e\n                  Introduction\n                \u003c/a\u003e',
            classList: 'sidenav-h1.sidenav-link.text-link',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['a[aria-label="Introduction"]'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97639
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'A',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'A#sidenav-h1.sidenav-link.text-link',
            needsReview: true,
            issueId: 97640,
            html: '\u003ca tabindex="-1" aria-label="Folder testing" data-name="Folder testing" href="/docs/automate/selenium/folder-testing" data-product-type="" title="Folder testing" class="sidenav-h1 sidenav-link text-link"\u003e\n                  Folder testing\n                \u003c/a\u003e',
            classList: 'sidenav-h1.sidenav-link.text-link',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['a[aria-label="Folder testing"]'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97640
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'A',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'A#sidenav-h1.sidenav-link.text-link',
            needsReview: true,
            issueId: 97641,
            html: '\u003ca tabindex="-1" aria-label="Test Queuing" data-name="Test Queuing" href="/docs/automate/selenium/queue-tests" data-product-type="" title="Test Queuing" class="sidenav-h1 sidenav-link text-link"\u003e\n                  Test Queuing\n                \u003c/a\u003e',
            classList: 'sidenav-h1.sidenav-link.text-link',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['a[aria-label="Test Queuing"]'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97641
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'A',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'A#sidenav-h1.sidenav-link.text-link',
            needsReview: true,
            issueId: 97642,
            html: '\u003ca tabindex="-1" aria-label="File bugs" data-name="File bugs" href="/docs/automate/selenium/file-bugs" data-product-type="" title="File bugs" class="sidenav-h1 sidenav-link text-link"\u003e\n                  File bugs\n                \u003c/a\u003e',
            classList: 'sidenav-h1.sidenav-link.text-link',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['a[aria-label="File bugs"]'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97642
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'A',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'A#sidenav-h1.sidenav-link.text-link',
            needsReview: true,
            issueId: 97643,
            html: '\u003ca tabindex="-1" aria-label="Jenkins" data-name="Jenkins" href="/docs/automate/selenium/jenkins" data-product-type="" title="Jenkins" class="sidenav-h1 sidenav-link text-link"\u003e\n                  Jenkins\n                \u003c/a\u003e',
            classList: 'sidenav-h1.sidenav-link.text-link',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['a[aria-label="Jenkins"]'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97643
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'A',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'A#sidenav-h1.sidenav-link.text-link',
            needsReview: true,
            issueId: 97644,
            html: '\u003ca tabindex="-1" aria-label="Bamboo" data-name="Bamboo" href="/docs/automate/selenium/bamboo" data-product-type="" title="Bamboo" class="sidenav-h1 sidenav-link text-link"\u003e\n                  Bamboo\n                \u003c/a\u003e',
            classList: 'sidenav-h1.sidenav-link.text-link',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['a[aria-label="Bamboo"]'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97644
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'A',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'A#sidenav-h1.sidenav-link.text-link',
            needsReview: true,
            issueId: 97645,
            html: '\u003ca tabindex="-1" aria-label="TeamCity" data-name="TeamCity" href="/docs/automate/selenium/teamcity" data-product-type="" title="TeamCity" class="sidenav-h1 sidenav-link text-link"\u003e\n                  TeamCity\n                \u003c/a\u003e',
            classList: 'sidenav-h1.sidenav-link.text-link',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['a[aria-label="TeamCity"]'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97645
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'A',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'A#sidenav-h1.sidenav-link.text-link',
            needsReview: true,
            issueId: 97646,
            html: '\u003ca tabindex="-1" aria-label="CircleCI" data-name="CircleCI" href="/docs/automate/selenium/circleci" data-product-type="" title="CircleCI" class="sidenav-h1 sidenav-link text-link"\u003e\n                  CircleCI\n                \u003c/a\u003e',
            classList: 'sidenav-h1.sidenav-link.text-link',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['a[aria-label="CircleCI"]'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97646
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'A',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'A#sidenav-h1.sidenav-link.text-link',
            needsReview: true,
            issueId: 97647,
            html: '\u003ca tabindex="-1" aria-label="Travis CI" data-name="Travis CI" href="/docs/automate/selenium/travis-ci" data-product-type="" title="Travis CI" class="sidenav-h1 sidenav-link text-link"\u003e\n                  Travis CI\n                \u003c/a\u003e',
            classList: 'sidenav-h1.sidenav-link.text-link',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['a[aria-label="Travis CI"]'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97647
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'A',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'A#sidenav-h1.sidenav-link.text-link',
            needsReview: true,
            issueId: 97648,
            html: '\u003ca tabindex="-1" aria-label="GitLab CI/CD" data-name="GitLab CI/CD" href="/docs/automate/selenium/gitlab" data-product-type="" title="GitLab CI/CD" class="sidenav-h1 sidenav-link text-link"\u003e\n                  GitLab CI/CD\n                \u003c/a\u003e',
            classList: 'sidenav-h1.sidenav-link.text-link',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['a[aria-label="GitLab CI/CD"]'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97648
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'A',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'A#sidenav-h1.sidenav-link.text-link',
            needsReview: true,
            issueId: 97649,
            html: '\u003ca tabindex="-1" aria-label="GoCD" data-name="GoCD" href="/docs/automate/selenium/gocd" data-product-type="" title="GoCD" class="sidenav-h1 sidenav-link text-link"\u003e\n                  GoCD\n                \u003c/a\u003e',
            classList: 'sidenav-h1.sidenav-link.text-link',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['a[aria-label="GoCD"]'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97649
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'A',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'A#sidenav-h1.sidenav-link.text-link',
            needsReview: true,
            issueId: 97650,
            html: '\u003ca tabindex="-1" aria-label="Drone" data-name="Drone" href="/docs/automate/selenium/drone" data-product-type="" title="Drone" class="sidenav-h1 sidenav-link text-link"\u003e\n                  Drone\n                \u003c/a\u003e',
            classList: 'sidenav-h1.sidenav-link.text-link',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['a[aria-label="Drone"]'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97650
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'A',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'A#sidenav-h1.sidenav-link.text-link',
            needsReview: true,
            issueId: 97651,
            html: '\u003ca tabindex="-1" aria-label="Concourse" data-name="Concourse" href="/docs/automate/selenium/concourse" data-product-type="" title="Concourse" class="sidenav-h1 sidenav-link text-link"\u003e\n                  Concourse\n                \u003c/a\u003e',
            classList: 'sidenav-h1.sidenav-link.text-link',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['a[aria-label="Concourse"]'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97651
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'A',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'A#sidenav-h1.sidenav-link.text-link',
            needsReview: true,
            issueId: 97652,
            html: '\u003ca tabindex="-1" aria-label="AppVeyor" data-name="AppVeyor" href="/docs/automate/selenium/appveyor" data-product-type="" title="AppVeyor" class="sidenav-h1 sidenav-link text-link"\u003e\n                  AppVeyor\n                \u003c/a\u003e',
            classList: 'sidenav-h1.sidenav-link.text-link',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['a[aria-label="AppVeyor"]'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97652
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'A',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'A#sidenav-h1.sidenav-link.text-link',
            needsReview: true,
            issueId: 97653,
            html: '\u003ca tabindex="-1" aria-label="Harness" data-name="Harness" href="/docs/automate/selenium/harness" data-product-type="" title="Harness" class="sidenav-h1 sidenav-link text-link"\u003e\n                  Harness\n                \u003c/a\u003e',
            classList: 'sidenav-h1.sidenav-link.text-link',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['a[aria-label="Harness"]'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97653
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'A',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'A#sidenav-h1.sidenav-link.text-link',
            needsReview: true,
            issueId: 97654,
            html: '\u003ca tabindex="-1" aria-label="Semaphore" data-name="Semaphore" href="/docs/automate/selenium/semaphore" data-product-type="" title="Semaphore" class="sidenav-h1 sidenav-link text-link"\u003e\n                  Semaphore\n                \u003c/a\u003e',
            classList: 'sidenav-h1.sidenav-link.text-link',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['a[aria-label="Semaphore"]'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97654
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'A',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'A#sidenav-h1.sidenav-link.text-link',
            needsReview: true,
            issueId: 97655,
            html: '\u003ca tabindex="-1" aria-label="Selenium IDE" data-name="Selenium IDE" href="/docs/automate/selenium/selenium-ide" data-product-type="" title="Selenium IDE" class="sidenav-h1 sidenav-link text-link"\u003e\n                  Selenium IDE\n                \u003c/a\u003e',
            classList: 'sidenav-h1.sidenav-link.text-link',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['a[aria-label="Selenium IDE"]'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97655
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'A',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'A#sidenav-h1.sidenav-link.text-link',
            needsReview: true,
            issueId: 97656,
            html: '\u003ca tabindex="-1" aria-label="TestProject" data-name="TestProject" href="/docs/automate/selenium/testproject" data-product-type="" title="TestProject" class="sidenav-h1 sidenav-link text-link"\u003e\n                  TestProject\n                \u003c/a\u003e',
            classList: 'sidenav-h1.sidenav-link.text-link',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['a[aria-label="TestProject"]'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97656
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'A',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'A#sidenav-h1.sidenav-link.text-link',
            needsReview: true,
            issueId: 97657,
            html: '\u003ca tabindex="-1" aria-label="Testim" data-name="Testim" href="/docs/automate/selenium/testim" data-product-type="" title="Testim" class="sidenav-h1 sidenav-link text-link"\u003e\n                  Testim\n                \u003c/a\u003e',
            classList: 'sidenav-h1.sidenav-link.text-link',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['a[aria-label="Testim"]'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97657
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'A',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'A#sidenav-h1.sidenav-link.text-link',
            needsReview: true,
            issueId: 97658,
            html: '\u003ca tabindex="-1" aria-label="Ranorex" data-name="Ranorex" href="/docs/automate/selenium/ranorex" data-product-type="" title="Ranorex" class="sidenav-h1 sidenav-link text-link"\u003e\n                  Ranorex\n                \u003c/a\u003e',
            classList: 'sidenav-h1.sidenav-link.text-link',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['a[aria-label="Ranorex"]'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97658
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'A',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'A#sidenav-h1.sidenav-link.text-link',
            needsReview: true,
            issueId: 97659,
            html: '\u003ca tabindex="-1" aria-label="Oxygen" data-name="Oxygen" href="/docs/automate/selenium/oxygen" data-product-type="" title="Oxygen" class="sidenav-h1 sidenav-link text-link"\u003e\n                  Oxygen\n                \u003c/a\u003e',
            classList: 'sidenav-h1.sidenav-link.text-link',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['a[aria-label="Oxygen"]'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97659
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'A',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'A#sidenav-h1.sidenav-link.text-link',
            needsReview: true,
            issueId: 97660,
            html: '\u003ca tabindex="-1" aria-label="Leapwork" data-name="Leapwork" href="/docs/automate/selenium/leapwork" data-product-type="" title="Leapwork" class="sidenav-h1 sidenav-link text-link"\u003e\n                  Leapwork\n                \u003c/a\u003e',
            classList: 'sidenav-h1.sidenav-link.text-link',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['a[aria-label="Leapwork"]'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97660
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'A',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'A#sidenav-h1.sidenav-link.text-link',
            needsReview: true,
            issueId: 97661,
            html: '\u003ca tabindex="-1" aria-label="Qmetry" data-name="Qmetry" href="/docs/automate/selenium/qmetry" data-product-type="" title="Qmetry" class="sidenav-h1 sidenav-link text-link"\u003e\n                  Qmetry\n                \u003c/a\u003e',
            classList: 'sidenav-h1.sidenav-link.text-link',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['a[aria-label="Qmetry"]'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97661
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'A',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'A#sidenav-h1.sidenav-link.text-link',
            needsReview: true,
            issueId: 97662,
            html: '\u003ca tabindex="-1" aria-label="TestingWhiz" data-name="TestingWhiz" href="/docs/automate/selenium/testing-whiz" data-product-type="" title="TestingWhiz" class="sidenav-h1 sidenav-link text-link"\u003e\n                  TestingWhiz\n                \u003c/a\u003e',
            classList: 'sidenav-h1.sidenav-link.text-link',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['a[aria-label="TestingWhiz"]'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97662
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'A',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'A#sidenav-h1.sidenav-link.text-link',
            needsReview: true,
            issueId: 97663,
            html: '\u003ca tabindex="-1" aria-label="Testsigma" data-name="Testsigma" href="/docs/automate/selenium/testsigma" data-product-type="" title="Testsigma" class="sidenav-h1 sidenav-link text-link"\u003e\n                  Testsigma\n                \u003c/a\u003e',
            classList: 'sidenav-h1.sidenav-link.text-link',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['a[aria-label="Testsigma"]'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97663
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'A',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'A#sidenav-h1.sidenav-link.text-link',
            needsReview: true,
            issueId: 97664,
            html: '\u003ca tabindex="-1" aria-label="Cerberus" data-name="Cerberus" href="/docs/automate/selenium/cerberus" data-product-type="" title="Cerberus" class="sidenav-h1 sidenav-link text-link"\u003e\n                  Cerberus\n                \u003c/a\u003e',
            classList: 'sidenav-h1.sidenav-link.text-link',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['a[aria-label="Cerberus"]'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97664
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'A',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'A#sidenav-h1.sidenav-link.text-link',
            needsReview: true,
            issueId: 97665,
            html: '\u003ca tabindex="-1" aria-label="ACCELQ" data-name="ACCELQ" href="/docs/automate/selenium/accelq" data-product-type="" title="ACCELQ" class="sidenav-h1 sidenav-link text-link"\u003e\n                  ACCELQ\n                \u003c/a\u003e',
            classList: 'sidenav-h1.sidenav-link.text-link',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['a[aria-label="ACCELQ"]'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97665
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'A',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'A#sidenav-h1.sidenav-link.text-link',
            needsReview: true,
            issueId: 97666,
            html: '\u003ca tabindex="-1" aria-label="Status badge" data-name="Status badge" href="/docs/automate/selenium/status-badge" data-product-type="" title="Status badge" class="sidenav-h1 sidenav-link text-link"\u003e\n                  Status badge\n                \u003c/a\u003e',
            classList: 'sidenav-h1.sidenav-link.text-link',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['a[aria-label="Status badge"]'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97666
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'A',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'A#sidenav-h1.sidenav-link.text-link',
            needsReview: true,
            issueId: 97667,
            html: '\u003ca tabindex="-1" aria-label="Error codes" data-name="Error codes" href="/docs/automate/selenium/error-codes" data-product-type="" title="Error codes" class="sidenav-h1 sidenav-link text-link" target="_blank"\u003e\n                  Error codes\n                \u003c/a\u003e',
            classList: 'sidenav-h1.sidenav-link.text-link',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['a[aria-label="Error codes"]'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97667
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'A',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'A#sidenav-h1.sidenav-link.text-link',
            needsReview: true,
            issueId: 97668,
            html: '\u003ca tabindex="-1" aria-label="Desktop tiers" data-name="Desktop tiers" href="https://browserstack.com/automate/desktop-tiers" data-product-type="" title="Desktop tiers" class="sidenav-h1 sidenav-link text-link" target="_blank" rel="noopener noreferrer"\u003e',
            classList: 'sidenav-h1.sidenav-link.text-link',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['a[aria-label="Desktop tiers"]'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97668
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'A',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'A#sidenav-h1.sidenav-link.text-link',
            needsReview: true,
            issueId: 97669,
            html: '\u003ca tabindex="-1" aria-label="Device tiers" data-name="Device tiers" href="https://browserstack.com/device-tiers" data-product-type="" title="Device tiers" class="sidenav-h1 sidenav-link text-link" target="_blank" rel="noopener noreferrer"\u003e\n                  Device tiers\n                \u003c/a\u003e',
            classList: 'sidenav-h1.sidenav-link.text-link',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['a[aria-label="Device tiers"]'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97669
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'STRONG',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'STRONG#alert-strong',
            needsReview: true,
            issueId: 97670,
            html: '\u003cstrong class="alert-strong"\u003eImportant: \u003c/strong\u003e',
            classList: 'alert-strong',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['.alert-important \u003e span \u003e .alert-strong'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97670
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'STRONG',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'STRONG#',
            needsReview: true,
            issueId: 97671,
            html: '\u003cstrong\u003eSelenium-based\u003c/strong\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['li:nth-child(1) \u003e strong'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97671
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'A',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'A#text-link',
            needsReview: true,
            issueId: 97672,
            html: '\u003ca href="https://nightwatchjs.org/guide/migrating-to-nightwatch/from-protractor.html" target="_blank" rel="noopener noreferrer" class="text-link"\u003eNightwatch\u003c/a\u003e',
            classList: 'text-link',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: [
              'li:nth-child(1) \u003e ul \u003e li:nth-child(1) \u003e .text-link[rel="noopener noreferrer"][target="_blank"]'
            ],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97672
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'A',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'A#text-link',
            needsReview: true,
            issueId: 97673,
            html: '\u003ca href="https://webdriver.io/docs/protractor-migration/" target="_blank" rel="noopener noreferrer" class="text-link"\u003eWebdriverIO\u003c/a\u003e',
            classList: 'text-link',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: [
              'li:nth-child(1) \u003e ul \u003e li:nth-child(2) \u003e .text-link[rel="noopener noreferrer"][target="_blank"]'
            ],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97673
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'A',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'A#text-link',
            needsReview: true,
            issueId: 97674,
            html: '\u003ca href="https://docs.cypress.io/guides/migrating-to-cypress/protractor" target="_blank" rel="noopener noreferrer" class="text-link"\u003eCypress\u003c/a\u003e',
            classList: 'text-link',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: [
              'li:nth-child(2) \u003e ul \u003e li:nth-child(1) \u003e .text-link[rel="noopener noreferrer"][target="_blank"]'
            ],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97674
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'A',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'A#text-link',
            needsReview: true,
            issueId: 97675,
            html: '\u003ca href="https://playwright.dev/docs/protractor" target="_blank" rel="noopener noreferrer" class="text-link"\u003ePlaywright\u003c/a\u003e',
            classList: 'text-link',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: [
              'li:nth-child(2) \u003e ul \u003e li:nth-child(2) \u003e .text-link[rel="noopener noreferrer"][target="_blank"]'
            ],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97675
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'A',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'A#text-link',
            needsReview: true,
            issueId: 97676,
            html: '\u003ca href="https://testcafe.io/documentation/403554/recipes/migration/migrate-tests-from-protractor-to-testcafe" target="_blank" rel="noopener noreferrer" class="text-link"\u003eTestCafe\u003c/a\u003e',
            classList: 'text-link',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: [
              'span \u003e ul \u003e li:nth-child(2) \u003e ul \u003e li:nth-child(3) \u003e .text-link[rel="noopener noreferrer"][target="_blank"]'
            ],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97676
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#333333',
                  fontSize: '21.0pt (28px)',
                  fontWeight: 'normal',
                  messageKey: 'elmPartiallyObscured',
                  contrastRatio: 0,
                  expectedContrastRatio: '3:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it's partially obscured by another element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--content" id="main-content"\u003e',
                    target: ['#main-content']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'H2',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'H2#',
            needsReview: true,
            issueId: 97677,
            html: '\u003ch2 id="introduction"\u003eIntroduction\u003ca class="anchorjs-link tooltipped text-link" data-anchorjs-icon="#" data-clipboard-text="https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor#introduction"\u003e\n        \u003c/a\u003e\u003c/h2\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it's partially obscured by another element",
            impact: 'serious',
            target: ['#introduction'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97677
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#333333',
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'elmPartiallyObscured',
                  contrastRatio: 0,
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it's partially obscured by another element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--content" id="main-content"\u003e',
                    target: ['#main-content']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'P',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'P#',
            needsReview: true,
            issueId: 97678,
            html: '\u003cp\u003eBrowserStack gives you instant access to our Selenium Grid of 3000+ real devices and desktop browsers. Running your Selenium tests with Protractor on BrowserStack is simple. This guide will help you:\u003c/p\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it's partially obscured by another element",
            impact: 'serious',
            target: ['p:nth-child(5)'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97678
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#0067dd',
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'elmPartiallyObscured',
                  contrastRatio: 0,
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it's partially obscured by another element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--content" id="main-content"\u003e',
                    target: ['#main-content']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'A',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'A#text-link',
            needsReview: true,
            issueId: 97679,
            html: '\u003ca href="#run-your-first-test" class="text-link"\u003eRun your first test\u003c/a\u003e',
            classList: 'text-link',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it's partially obscured by another element",
            impact: 'serious',
            target: ['li:nth-child(1) \u003e a[href$="#run-your-first-test"]'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97679
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#0067dd',
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'elmPartiallyObscured',
                  contrastRatio: 0,
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it's partially obscured by another element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--content" id="main-content"\u003e',
                    target: ['#main-content']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'A',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'A#text-link',
            needsReview: true,
            issueId: 97680,
            html: '\u003ca href="#integrate-your-tests-with-browserstack" class="text-link"\u003eIntegrate your tests with BrowserStack\u003c/a\u003e',
            classList: 'text-link',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it's partially obscured by another element",
            impact: 'serious',
            target: ['ol \u003e li:nth-child(2) \u003e .text-link'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97680
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#0067dd',
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'elmPartiallyObscured',
                  contrastRatio: 0,
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it's partially obscured by another element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--content" id="main-content"\u003e',
                    target: ['#main-content']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'A',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'A#text-link',
            needsReview: true,
            issueId: 97681,
            html: '\u003ca href="#mark-tests-as-passed-or-failed" class="text-link"\u003eMark tests as passed or failed\u003c/a\u003e',
            classList: 'text-link',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it's partially obscured by another element",
            impact: 'serious',
            target: ['ol \u003e li:nth-child(3) \u003e .text-link'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97681
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cli\u003e\u003ca href="#debug-your-app" class="text-link"\u003eDebug your app\u003c/a\u003e\u003c/li\u003e',
                    target: ['ol \u003e li:nth-child(4)']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'A',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'A#text-link',
            needsReview: true,
            issueId: 97682,
            html: '\u003ca href="#debug-your-app" class="text-link"\u003eDebug your app\u003c/a\u003e',
            classList: 'text-link',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['li:nth-child(4) \u003e a[href$="#debug-your-app"]'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97682
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#333333',
                  fontSize: '21.0pt (28px)',
                  fontWeight: 'normal',
                  messageKey: 'elmPartiallyObscured',
                  contrastRatio: 0,
                  expectedContrastRatio: '3:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it's partially obscured by another element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--content" id="main-content"\u003e',
                    target: ['#main-content']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'H2',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'H2#',
            needsReview: true,
            issueId: 97683,
            html: '\u003ch2 id="prerequisites"\u003ePrerequisites\u003ca class="anchorjs-link tooltipped text-link" data-anchorjs-icon="#" data-clipboard-text="https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor#prerequisites"\u003e\n        \u003c/a\u003e\u003c/h2\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it's partially obscured by another element",
            impact: 'serious',
            target: ['#prerequisites'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97683
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#333333',
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'elmPartiallyObscured',
                  contrastRatio: 0,
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it's partially obscured by another element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--content" id="main-content"\u003e',
                    target: ['#main-content']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'LI',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'LI#',
            needsReview: true,
            issueId: 97684,
            html: '\u003cli\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it's partially obscured by another element",
            impact: 'serious',
            target: ['ul:nth-child(8) \u003e li'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97684
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'A',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'A#text-link',
            needsReview: true,
            issueId: 97685,
            html: '\u003ca href="https://www.browserstack.com/accounts/settings" target="_blank" class="text-link"\u003eaccount settings\u003c/a\u003e',
            classList: 'text-link',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: [
              'ul:nth-child(8) \u003e li \u003e .text-link[target="_blank"]:nth-child(1)'
            ],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97685
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#0067dd',
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'elmPartiallyObscured',
                  contrastRatio: 0,
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it's partially obscured by another element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--content" id="main-content"\u003e',
                    target: ['#main-content']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'A',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'A#text-link',
            needsReview: true,
            issueId: 97686,
            html: '\u003ca href="https://www.browserstack.com/users/sign_up" target="_blank" class="text-link"\u003esign up for a Free Trial\u003c/a\u003e',
            classList: 'text-link',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it's partially obscured by another element",
            impact: 'serious',
            target: [
              'ul:nth-child(8) \u003e li \u003e .text-link[target="_blank"]:nth-child(2)'
            ],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97686
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'A',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'A#text-link',
            needsReview: true,
            issueId: 97687,
            html: '\u003ca href="https://www.browserstack.com/pricing" target="_blank" class="text-link"\u003epurchase a plan\u003c/a\u003e',
            classList: 'text-link',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: [
              'ul:nth-child(8) \u003e li \u003e .text-link[target="_blank"]:nth-child(3)'
            ],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97687
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#333333',
                  fontSize: '21.0pt (28px)',
                  fontWeight: 'normal',
                  messageKey: 'elmPartiallyObscured',
                  contrastRatio: 0,
                  expectedContrastRatio: '3:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it's partially obscured by another element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--content" id="main-content"\u003e',
                    target: ['#main-content']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'H2',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'H2#',
            needsReview: true,
            issueId: 97688,
            html: '\u003ch2 id="run-your-first-test"\u003eRun your first test\u003ca class="anchorjs-link tooltipped text-link" data-anchorjs-icon="#" data-clipboard-text="https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor#run-your-first-test"\u003e\n        \u003c/a\u003e\u003c/h2\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it's partially obscured by another element",
            impact: 'serious',
            target: ['#run-your-first-test'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97688
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#333333',
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'elmPartiallyObscured',
                  contrastRatio: 0,
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it's partially obscured by another element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--content" id="main-content"\u003e',
                    target: ['#main-content']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'SPAN',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'SPAN#',
            needsReview: true,
            issueId: 97689,
            html: '\u003cspan\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it's partially obscured by another element",
            impact: 'serious',
            target: ['.alert-protip \u003e span'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97689
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'STRONG',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'STRONG#alert-strong',
            needsReview: true,
            issueId: 97690,
            html: '\u003cstrong class="alert-strong"\u003eProtip: \u003c/strong\u003e',
            classList: 'alert-strong',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['.alert-protip \u003e span \u003e .alert-strong'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97690
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#333333',
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'elmPartiallyObscured',
                  contrastRatio: 0,
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it's partially obscured by another element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--content" id="main-content"\u003e',
                    target: ['#main-content']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'LI',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'LI#',
            needsReview: true,
            issueId: 97691,
            html: '\u003cli\u003eEdit or add capabilities in the W3C format using our \u003ca href="https://www.browserstack.com/automate/capabilities?tag=selenium-4" target="_blank" class="text-link"\u003eW3C capability generator\u003c/a\u003e.\u003c/li\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it's partially obscured by another element",
            impact: 'serious',
            target: [
              '.alert-protip \u003e span \u003e ul \u003e li:nth-child(1)'
            ],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97691
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#0067dd',
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'elmPartiallyObscured',
                  contrastRatio: 0,
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it's partially obscured by another element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--content" id="main-content"\u003e',
                    target: ['#main-content']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'A',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'A#text-link',
            needsReview: true,
            issueId: 97692,
            html: '\u003ca href="https://www.browserstack.com/automate/capabilities?tag=selenium-4" target="_blank" class="text-link"\u003eW3C capability generator\u003c/a\u003e',
            classList: 'text-link',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it's partially obscured by another element",
            impact: 'serious',
            target: [
              'span \u003e ul \u003e li:nth-child(1) \u003e .text-link[target="_blank"]'
            ],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97692
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#333333',
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'elmPartiallyObscured',
                  contrastRatio: 0,
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it's partially obscured by another element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--content" id="main-content"\u003e',
                    target: ['#main-content']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'LI',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'LI#',
            needsReview: true,
            issueId: 97693,
            html: '\u003cli\u003e\n    Add the \u003ccode class=" highlighter-rouge  language-plaintext"\u003eseleniumVersion\u003c/code\u003e capability in your test script and set the value to \u003ccode class=" highlighter-rouge  language-plaintext"\u003e4.0.0\u003c/code\u003e.\n\n    \u003c!-- prettier-ignore --\u003e\n  \u003c/li\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it's partially obscured by another element",
            impact: 'serious',
            target: [
              '.alert-protip \u003e span \u003e ul \u003e li:nth-child(2)'
            ],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97693
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '9.8pt (13px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'CODE',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'CODE#.highlighter-rouge..language-plaintext',
            needsReview: true,
            issueId: 97694,
            html: '\u003ccode class=" highlighter-rouge  language-plaintext"\u003eseleniumVersion\u003c/code\u003e',
            classList: '.highlighter-rouge..language-plaintext',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['li:nth-child(2) \u003e .language-plaintext:nth-child(1)'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97694
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '9.8pt (13px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'CODE',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'CODE#.highlighter-rouge..language-plaintext',
            needsReview: true,
            issueId: 97695,
            html: '\u003ccode class=" highlighter-rouge  language-plaintext"\u003e4.0.0\u003c/code\u003e',
            classList: '.highlighter-rouge..language-plaintext',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['li:nth-child(2) \u003e .language-plaintext:nth-child(2)'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97695
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#333333',
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'elmPartiallyObscured',
                  contrastRatio: 0,
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it's partially obscured by another element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--content" id="main-content"\u003e',
                    target: ['#main-content']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'P',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'P#',
            needsReview: true,
            issueId: 97696,
            html: '\u003cp\u003eTo run your first Protractor test on BrowserStack, follow the steps below:\u003c/p\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it's partially obscured by another element",
            impact: 'serious',
            target: ['p:nth-child(11)'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97696
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#333333',
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'elmPartiallyObscured',
                  contrastRatio: 0,
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it's partially obscured by another element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--content" id="main-content"\u003e',
                    target: ['#main-content']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'P',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'P#',
            needsReview: true,
            issueId: 97697,
            html: '\u003cp\u003e\u003cstrong\u003eStep 1:\u003c/strong\u003e Clone the \u003ca href="https://github.com/browserstack/protractor-browserstack" target="_blank" rel="noopener noreferrer" class="text-link"\u003eprotractor-browserstack\u003c/a\u003e sample repo on GitHub using:\u003cbr\u003e\u003c/p\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it's partially obscured by another element",
            impact: 'serious',
            target: ['p:nth-child(12)'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97697
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'STRONG',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'STRONG#',
            needsReview: true,
            issueId: 97698,
            html: '\u003cstrong\u003eStep 1:\u003c/strong\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['p:nth-child(12) \u003e strong'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97698
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#0067dd',
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'elmPartiallyObscured',
                  contrastRatio: 0,
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it's partially obscured by another element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--content" id="main-content"\u003e',
                    target: ['#main-content']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'A',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'A#text-link',
            needsReview: true,
            issueId: 97699,
            html: '\u003ca href="https://github.com/browserstack/protractor-browserstack" target="_blank" rel="noopener noreferrer" class="text-link"\u003eprotractor-browserstack\u003c/a\u003e',
            classList: 'text-link',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it's partially obscured by another element",
            impact: 'serious',
            target: [
              'p:nth-child(12) \u003e .text-link[rel="noopener noreferrer"][target="_blank"]'
            ],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97699
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '9.8pt (13px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'SPAN',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'SPAN#token.function',
            needsReview: true,
            issueId: 97700,
            html: '\u003cspan class="token function"\u003egit\u003c/span\u003e',
            classList: 'token.function',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: [
              'pre[data-unique-index="0"] \u003e .language-bash \u003e .function.token'
            ],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97700
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '9.8pt (13px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'SPAN',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'SPAN#token.builtin.class-name',
            needsReview: true,
            issueId: 97701,
            html: '\u003cspan class="token builtin class-name"\u003ecd\u003c/span\u003e',
            classList: 'token.builtin.class-name',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: [
              'pre[data-unique-index="0"] \u003e .language-bash \u003e .builtin.class-name.token'
            ],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97701
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#333333',
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'elmPartiallyObscured',
                  contrastRatio: 0,
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it's partially obscured by another element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--content" id="main-content"\u003e',
                    target: ['#main-content']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'P',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'P#',
            needsReview: true,
            issueId: 97702,
            html: '\u003cp\u003e\u003cstrong\u003eStep 2:\u003c/strong\u003e Install the required dependencies by running the following command in your command line:\u003cbr\u003e\u003c/p\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it's partially obscured by another element",
            impact: 'serious',
            target: ['p:nth-child(14)'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97702
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'STRONG',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'STRONG#',
            needsReview: true,
            issueId: 97703,
            html: '\u003cstrong\u003eStep 2:\u003c/strong\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['p:nth-child(14) \u003e strong'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97703
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '9.8pt (13px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'SPAN',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'SPAN#token.function',
            needsReview: true,
            issueId: 97704,
            html: '\u003cspan class="token function"\u003enpm\u003c/span\u003e',
            classList: 'token.function',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: [
              'pre[data-unique-index="1"] \u003e .language-bash \u003e .function.token:nth-child(1)'
            ],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97704
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '9.8pt (13px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'SPAN',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'SPAN#token.function',
            needsReview: true,
            issueId: 97705,
            html: '\u003cspan class="token function"\u003einstall\u003c/span\u003e',
            classList: 'token.function',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['.function.token:nth-child(2)'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97705
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#333333',
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'elmPartiallyObscured',
                  contrastRatio: 0,
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it's partially obscured by another element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--content" id="main-content"\u003e',
                    target: ['#main-content']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'P',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'P#',
            needsReview: true,
            issueId: 97706,
            html: '\u003cp\u003e\u003cstrong\u003eStep 3:\u003c/strong\u003e Setup your credentials in the \u003ccode class=" highlighter-rouge  language-plaintext"\u003eprotractor-browserstack/conf/parallel.conf.js\u003c/code\u003e file as shown below:\u003cbr\u003e\u003c/p\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it's partially obscured by another element",
            impact: 'serious',
            target: ['p:nth-child(16)'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97706
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'STRONG',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'STRONG#',
            needsReview: true,
            issueId: 97707,
            html: '\u003cstrong\u003eStep 3:\u003c/strong\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['p:nth-child(16) \u003e strong'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97707
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '9.8pt (13px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'SPAN',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'SPAN#token.string',
            needsReview: true,
            issueId: 97708,
            html: '\u003cspan class="token string"\u003e\'browserstackUser\'\u003c/span\u003e',
            classList: 'token.string',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['.language-javascript \u003e .string.token:nth-child(5)'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97708
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '9.8pt (13px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'SPAN',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'SPAN#token.string',
            needsReview: true,
            issueId: 97709,
            html: '\u003cspan class="token string"\u003e\'browserstackKey\'\u003c/span\u003e',
            classList: 'token.string',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['.string.token:nth-child(13)'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97709
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#333333',
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'elmPartiallyObscured',
                  contrastRatio: 0,
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it's partially obscured by another element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--content" id="main-content"\u003e',
                    target: ['#main-content']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'P',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'P#',
            needsReview: true,
            issueId: 97710,
            html: '\u003cp\u003eAlternatively, you can set the environment variables in your system as shown below: \u003cbr\u003e\u003c/p\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it's partially obscured by another element",
            impact: 'serious',
            target: ['p:nth-child(19)'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97710
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#0067dd',
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'elmPartiallyObscured',
                  contrastRatio: 0,
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it's partially obscured by another element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--content" id="main-content"\u003e',
                    target: ['#main-content']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'A',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'A#tab-element--tag.active.show',
            needsReview: true,
            issueId: 97711,
            html: '\u003ca class="tab-element--tag active show" data-toggle="tab" data-header="MacOS_or_Linux" href="#MacOS_or_Linux" role="tab" aria-selected="true"\u003eMacOS or Linux\u003c/a\u003e',
            classList: 'tab-element--tag.active.show',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it's partially obscured by another element",
            impact: 'serious',
            target: ['a[data-header="MacOS_or_Linux"]'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97711
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#333333',
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'elmPartiallyObscured',
                  contrastRatio: 0,
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it's partially obscured by another element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--content" id="main-content"\u003e',
                    target: ['#main-content']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'A',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'A#tab-element--tag',
            needsReview: true,
            issueId: 97712,
            html: '\u003ca class="tab-element--tag" data-toggle="tab" data-header="Windows" href="#Windows" role="tab" aria-selected="false"\u003eWindows\u003c/a\u003e',
            classList: 'tab-element--tag',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it's partially obscured by another element",
            impact: 'serious',
            target: ['a[data-header="Windows"]'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97712
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '9.8pt (13px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'SPAN',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'SPAN#token.builtin.class-name',
            needsReview: true,
            issueId: 97713,
            html: '\u003cspan class="token builtin class-name"\u003eexport\u003c/span\u003e',
            classList: 'token.builtin.class-name',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: [
              'pre[data-unique-index="3"] \u003e .language-bash \u003e .builtin.class-name.token:nth-child(2)'
            ],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97713
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '9.8pt (13px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'SPAN',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'SPAN#token.string',
            needsReview: true,
            issueId: 97714,
            html: '\u003cspan class="token string"\u003e"leevardaro_SFq3K9"\u003c/span\u003e',
            classList: 'token.string',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['.language-bash \u003e .string.token:nth-child(5)'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97714
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '9.8pt (13px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'SPAN',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'SPAN#token.builtin.class-name',
            needsReview: true,
            issueId: 97715,
            html: '\u003cspan class="token builtin class-name"\u003eexport\u003c/span\u003e',
            classList: 'token.builtin.class-name',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['.builtin.class-name.token:nth-child(6)'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97715
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#333333',
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'elmPartiallyObscured',
                  contrastRatio: 0,
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it's partially obscured by another element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--content" id="main-content"\u003e',
                    target: ['#main-content']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'P',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'P#',
            needsReview: true,
            issueId: 97716,
            html: '\u003cp\u003e\u003cstrong\u003eStep 4:\u003c/strong\u003e Run your first test using the following command:\u003cbr\u003e\u003c/p\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it's partially obscured by another element",
            impact: 'serious',
            target: ['p:nth-child(21)'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97716
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'STRONG',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'STRONG#',
            needsReview: true,
            issueId: 97717,
            html: '\u003cstrong\u003eStep 4:\u003c/strong\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['p:nth-child(21) \u003e strong'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97717
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '9.8pt (13px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'CODE',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'CODE#..language-bash',
            needsReview: true,
            issueId: 97718,
            html: '\u003ccode class="  language-bash"\u003e   \u003cspan class="token function"\u003enpm\u003c/span\u003e run parallel\n\u003c/code\u003e',
            classList: '..language-bash',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['pre[data-unique-index="5"] \u003e .language-bash'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97718
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '9.8pt (13px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'SPAN',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'SPAN#token.function',
            needsReview: true,
            issueId: 97719,
            html: '\u003cspan class="token function"\u003enpm\u003c/span\u003e',
            classList: 'token.function',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: [
              'pre[data-unique-index="5"] \u003e .language-bash \u003e .function.token'
            ],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97719
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#333333',
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'elmPartiallyObscured',
                  contrastRatio: 0,
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it's partially obscured by another element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--content" id="main-content"\u003e',
                    target: ['#main-content']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'P',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'P#',
            needsReview: true,
            issueId: 97720,
            html: '\u003cp\u003eYou can visit \u003ca href="https://automate.browserstack.com" target="_blank" rel="noopener noreferrer" class="text-link"\u003eBrowserStack Automate Dashboard\u003c/a\u003e and see your test there once it has successfully completed.\u003c/p\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it's partially obscured by another element",
            impact: 'serious',
            target: ['p:nth-child(23)'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97720
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#0067dd',
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'elmPartiallyObscured',
                  contrastRatio: 0,
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it's partially obscured by another element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--content" id="main-content"\u003e',
                    target: ['#main-content']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'A',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'A#text-link',
            needsReview: true,
            issueId: 97721,
            html: '\u003ca href="https://automate.browserstack.com" target="_blank" rel="noopener noreferrer" class="text-link"\u003eBrowserStack Automate Dashboard\u003c/a\u003e',
            classList: 'text-link',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it's partially obscured by another element",
            impact: 'serious',
            target: [
              'p:nth-child(23) \u003e .text-link[rel="noopener noreferrer"][target="_blank"]'
            ],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97721
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#333333',
                  fontSize: '21.0pt (28px)',
                  fontWeight: 'normal',
                  messageKey: 'elmPartiallyObscured',
                  contrastRatio: 0,
                  expectedContrastRatio: '3:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it's partially obscured by another element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--content" id="main-content"\u003e',
                    target: ['#main-content']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'H2',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'H2#',
            needsReview: true,
            issueId: 97722,
            html: '\u003ch2 id="details-of-your-first-test"\u003eDetails of your first test\u003ca class="anchorjs-link tooltipped text-link" data-anchorjs-icon="#" data-clipboard-text="https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor#details-of-your-first-test"\u003e\n        \u003c/a\u003e\u003c/h2\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it's partially obscured by another element",
            impact: 'serious',
            target: ['#details-of-your-first-test'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97722
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#333333',
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'elmPartiallyObscured',
                  contrastRatio: 0,
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it's partially obscured by another element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--content" id="main-content"\u003e',
                    target: ['#main-content']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'P',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'P#',
            needsReview: true,
            issueId: 97723,
            html: '\u003cp\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it's partially obscured by another element",
            impact: 'serious',
            target: ['p:nth-child(25)'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97723
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '9.8pt (13px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'SPAN',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'SPAN#token.function',
            needsReview: true,
            issueId: 97724,
            html: '\u003cspan class="token function"\u003edescribe\u003c/span\u003e',
            classList: 'token.function',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: [
              'pre[data-unique-index="6"] \u003e .language-javascript \u003e .function.token:nth-child(1)'
            ],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97724
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '9.8pt (13px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'SPAN',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'SPAN#token.keyword',
            needsReview: true,
            issueId: 97725,
            html: '\u003cspan class="token keyword"\u003efunction\u003c/span\u003e',
            classList: 'token.keyword',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['.keyword.token:nth-child(5)'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97725
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '9.8pt (13px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'SPAN',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'SPAN#token.function',
            needsReview: true,
            issueId: 97726,
            html: '\u003cspan class="token function"\u003eit\u003c/span\u003e',
            classList: 'token.function',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['.function.token:nth-child(9)'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97726
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '9.8pt (13px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'SPAN',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'SPAN#token.keyword',
            needsReview: true,
            issueId: 97727,
            html: '\u003cspan class="token keyword"\u003efunction\u003c/span\u003e',
            classList: 'token.keyword',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['.keyword.token:nth-child(13)'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97727
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '9.8pt (13px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'SPAN',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'SPAN#token.function',
            needsReview: true,
            issueId: 97728,
            html: '\u003cspan class="token function"\u003eget\u003c/span\u003e',
            classList: 'token.function',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['.function.token:nth-child(19)'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97728
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '9.8pt (13px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'SPAN',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'SPAN#token.function',
            needsReview: true,
            issueId: 97729,
            html: '\u003cspan class="token function"\u003ethen\u003c/span\u003e',
            classList: 'token.function',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['.function.token:nth-child(24)'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97729
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '9.8pt (13px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'SPAN',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'SPAN#token.keyword',
            needsReview: true,
            issueId: 97730,
            html: '\u003cspan class="token keyword"\u003efunction\u003c/span\u003e',
            classList: 'token.keyword',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['.keyword.token:nth-child(26)'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97730
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '9.8pt (13px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'SPAN',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'SPAN#token.function',
            needsReview: true,
            issueId: 97731,
            html: '\u003cspan class="token function"\u003efindElement\u003c/span\u003e',
            classList: 'token.function',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['.function.token:nth-child(32)'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97731
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '9.8pt (13px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'SPAN',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'SPAN#token.function',
            needsReview: true,
            issueId: 97732,
            html: '\u003cspan class="token function"\u003ename\u003c/span\u003e',
            classList: 'token.function',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['.function.token:nth-child(35)'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97732
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '9.8pt (13px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'SPAN',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'SPAN#token.string',
            needsReview: true,
            issueId: 97733,
            html: '\u003cspan class="token string"\u003e\'q\'\u003c/span\u003e',
            classList: 'token.string',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: [
              'pre[data-unique-index="6"] \u003e .language-javascript \u003e .string.token:nth-child(37)'
            ],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97733
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '9.8pt (13px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'SPAN',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'SPAN#token.function',
            needsReview: true,
            issueId: 97734,
            html: '\u003cspan class="token function"\u003esendKeys\u003c/span\u003e',
            classList: 'token.function',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['.function.token:nth-child(41)'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97734
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '9.8pt (13px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'SPAN',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'SPAN#token.string',
            needsReview: true,
            issueId: 97735,
            html: '\u003cspan class="token string"\u003e\'BrowserStack\\n\'\u003c/span\u003e',
            classList: 'token.string',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: [
              'pre[data-unique-index="6"] \u003e .language-javascript \u003e .string.token:nth-child(43)'
            ],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97735
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '9.8pt (13px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'SPAN',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'SPAN#token.function',
            needsReview: true,
            issueId: 97736,
            html: '\u003cspan class="token function"\u003ethen\u003c/span\u003e',
            classList: 'token.function',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['.function.token:nth-child(46)'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97736
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '9.8pt (13px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'SPAN',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'SPAN#token.keyword',
            needsReview: true,
            issueId: 97737,
            html: '\u003cspan class="token keyword"\u003efunction\u003c/span\u003e',
            classList: 'token.keyword',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['.keyword.token:nth-child(48)'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97737
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '9.8pt (13px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'SPAN',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'SPAN#token.function',
            needsReview: true,
            issueId: 97738,
            html: '\u003cspan class="token function"\u003eexpect\u003c/span\u003e',
            classList: 'token.function',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['.function.token:nth-child(52)'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97738
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '9.8pt (13px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'SPAN',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'SPAN#token.function',
            needsReview: true,
            issueId: 97739,
            html: '\u003cspan class="token function"\u003egetTitle\u003c/span\u003e',
            classList: 'token.function',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['.function.token:nth-child(56)'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97739
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '9.8pt (13px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'SPAN',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'SPAN#token.function',
            needsReview: true,
            issueId: 97740,
            html: '\u003cspan class="token function"\u003etoEqual\u003c/span\u003e',
            classList: 'token.function',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['.function.token:nth-child(61)'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97740
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#333333',
                  fontSize: '21.0pt (28px)',
                  fontWeight: 'normal',
                  messageKey: 'elmPartiallyObscured',
                  contrastRatio: 0,
                  expectedContrastRatio: '3:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it's partially obscured by another element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--content" id="main-content"\u003e',
                    target: ['#main-content']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'H2',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'H2#',
            needsReview: true,
            issueId: 97741,
            html: '\u003ch2 id="integrate-your-tests-with-browserstack"\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it's partially obscured by another element",
            impact: 'serious',
            target: ['#integrate-your-tests-with-browserstack'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97741
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#333333',
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'elmPartiallyObscured',
                  contrastRatio: 0,
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it's partially obscured by another element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--content" id="main-content"\u003e',
                    target: ['#main-content']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'P',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'P#',
            needsReview: true,
            issueId: 97742,
            html: '\u003cp\u003eIn the sample repository, you can find \u003ccode class=" highlighter-rouge  language-plaintext"\u003econf/parallel.conf.js\u003c/code\u003e file which is responsible for configuring your test to run on BrowserStack. The useful sections of the file are shown below which enable the tests to run on BrowserStack:\u003c/p\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it's partially obscured by another element",
            impact: 'serious',
            target: ['p:nth-child(28)'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97742
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '9.8pt (13px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'SPAN',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'SPAN#token.string',
            needsReview: true,
            issueId: 97743,
            html: '\u003cspan class="token string"\u003e\'specs\'\u003c/span\u003e',
            classList: 'token.string',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: [
              'pre[data-unique-index="7"] \u003e .language-javascript \u003e .string.token:nth-child(4)'
            ],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97743
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '9.8pt (13px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'SPAN',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'SPAN#token.string',
            needsReview: true,
            issueId: 97744,
            html: '\u003cspan class="token string"\u003e\'browserstackUser\'\u003c/span\u003e',
            classList: 'token.string',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['.string.token:nth-child(10)'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97744
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '9.8pt (13px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'SPAN',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'SPAN#token.string',
            needsReview: true,
            issueId: 97745,
            html: '\u003cspan class="token string"\u003e\'browserstackKey\'\u003c/span\u003e',
            classList: 'token.string',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['.string.token:nth-child(18)'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97745
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '9.8pt (13px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'SPAN',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'SPAN#token.string',
            needsReview: true,
            issueId: 97746,
            html: '\u003cspan class="token string"\u003e\'build\'\u003c/span\u003e',
            classList: 'token.string',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['.string.token:nth-child(29)'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97746
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '9.8pt (13px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'SPAN',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'SPAN#token.string',
            needsReview: true,
            issueId: 97747,
            html: '\u003cspan class="token string"\u003e\'name\'\u003c/span\u003e',
            classList: 'token.string',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['.string.token:nth-child(33)'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97747
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '9.8pt (13px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'SPAN',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'SPAN#token.string',
            needsReview: true,
            issueId: 97748,
            html: '\u003cspan class="token string"\u003e\'parallel_test\'\u003c/span\u003e',
            classList: 'token.string',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['.string.token:nth-child(35)'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97748
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '9.8pt (13px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'SPAN',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'SPAN#token.string',
            needsReview: true,
            issueId: 97749,
            html: '\u003cspan class="token string"\u003e\'true\'\u003c/span\u003e',
            classList: 'token.string',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['.string.token:nth-child(39)'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97749
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '9.8pt (13px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'SPAN',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'SPAN#token.string',
            needsReview: true,
            issueId: 97750,
            html: '\u003cspan class="token string"\u003e\'browserName\'\u003c/span\u003e',
            classList: 'token.string',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['.string.token:nth-child(41)'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97750
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '9.8pt (13px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'SPAN',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'SPAN#token.string',
            needsReview: true,
            issueId: 97751,
            html: '\u003cspan class="token string"\u003e\'Chrome\'\u003c/span\u003e',
            classList: 'token.string',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: [
              'pre[data-unique-index="7"] \u003e .language-javascript \u003e .string.token:nth-child(43)'
            ],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97751
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '9.8pt (13px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'SPAN',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'SPAN#token.string',
            needsReview: true,
            issueId: 97752,
            html: '\u003cspan class="token string"\u003e\'multiCapabilities\'\u003c/span\u003e',
            classList: 'token.string',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['.string.token:nth-child(46)'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97752
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '9.8pt (13px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'SPAN',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'SPAN#token.string',
            needsReview: true,
            issueId: 97753,
            html: '\u003cspan class="token string"\u003e\'browserName\'\u003c/span\u003e',
            classList: 'token.string',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['.string.token:nth-child(50)'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97753
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '9.8pt (13px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'SPAN',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'SPAN#token.string',
            needsReview: true,
            issueId: 97754,
            html: '\u003cspan class="token string"\u003e\'Chrome\'\u003c/span\u003e',
            classList: 'token.string',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['.string.token:nth-child(52)'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97754
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '9.8pt (13px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'SPAN',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'SPAN#token.string',
            needsReview: true,
            issueId: 97755,
            html: '\u003cspan class="token string"\u003e\'browserName\'\u003c/span\u003e',
            classList: 'token.string',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['.string.token:nth-child(56)'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97755
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '9.8pt (13px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'SPAN',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'SPAN#token.string',
            needsReview: true,
            issueId: 97756,
            html: '\u003cspan class="token string"\u003e\'Safari\'\u003c/span\u003e',
            classList: 'token.string',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['.string.token:nth-child(58)'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97756
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '9.8pt (13px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'SPAN',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'SPAN#token.string',
            needsReview: true,
            issueId: 97757,
            html: '\u003cspan class="token string"\u003e\'browserName\'\u003c/span\u003e',
            classList: 'token.string',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['.string.token:nth-child(62)'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97757
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '9.8pt (13px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'SPAN',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'SPAN#token.string',
            needsReview: true,
            issueId: 97758,
            html: '\u003cspan class="token string"\u003e\'Firefox\'\u003c/span\u003e',
            classList: 'token.string',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['.string.token:nth-child(64)'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97758
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '9.8pt (13px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'SPAN',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'SPAN#token.string',
            needsReview: true,
            issueId: 97759,
            html: '\u003cspan class="token string"\u003e\'browserName\'\u003c/span\u003e',
            classList: 'token.string',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['.string.token:nth-child(68)'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97759
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '9.8pt (13px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'SPAN',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'SPAN#token.string',
            needsReview: true,
            issueId: 97760,
            html: '\u003cspan class="token string"\u003e\'IE\'\u003c/span\u003e',
            classList: 'token.string',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['.string.token:nth-child(70)'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97760
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '9.8pt (13px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'SPAN',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'SPAN#token.function-variable.function',
            needsReview: true,
            issueId: 97761,
            html: '\u003cspan class="token function-variable function"\u003eonComplete\u003c/span\u003e',
            classList: 'token.function-variable.function',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: [
              'pre[data-unique-index="7"] \u003e .language-javascript \u003e .function-variable.function.token'
            ],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97761
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '9.8pt (13px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'SPAN',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'SPAN#token.keyword',
            needsReview: true,
            issueId: 97762,
            html: '\u003cspan class="token keyword"\u003efunction\u003c/span\u003e',
            classList: 'token.keyword',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['.keyword.token:nth-child(77)'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97762
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '9.8pt (13px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'SPAN',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'SPAN#token.parameter',
            needsReview: true,
            issueId: 97763,
            html: '\u003cspan class="token parameter"\u003epassed\u003c/span\u003e',
            classList: 'token.parameter',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['.parameter.token:nth-child(79)'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97763
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '9.8pt (13px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'SPAN',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'SPAN#token.keyword',
            needsReview: true,
            issueId: 97764,
            html: '\u003cspan class="token keyword"\u003eif\u003c/span\u003e',
            classList: 'token.keyword',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['.keyword.token:nth-child(82)'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97764
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '9.8pt (13px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'SPAN',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'SPAN#token.function',
            needsReview: true,
            issueId: 97765,
            html: '\u003cspan class="token function"\u003eexecuteScript\u003c/span\u003e',
            classList: 'token.function',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['.function.token:nth-child(88)'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97765
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '9.8pt (13px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'SPAN',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'SPAN#token.keyword',
            needsReview: true,
            issueId: 97766,
            html: '\u003cspan class="token keyword"\u003eif\u003c/span\u003e',
            classList: 'token.keyword',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['.keyword.token:nth-child(94)'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97766
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '9.8pt (13px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'SPAN',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'SPAN#token.function',
            needsReview: true,
            issueId: 97767,
            html: '\u003cspan class="token function"\u003eexecuteScript\u003c/span\u003e',
            classList: 'token.function',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['.function.token:nth-child(99)'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97767
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '9.8pt (13px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'SPAN',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'SPAN#token.function',
            needsReview: true,
            issueId: 97768,
            html: '\u003cspan class="token function"\u003eforEach\u003c/span\u003e',
            classList: 'token.function',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['.function.token:nth-child(112)'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97768
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '9.8pt (13px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'SPAN',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'SPAN#token.keyword',
            needsReview: true,
            issueId: 97769,
            html: '\u003cspan class="token keyword"\u003efunction\u003c/span\u003e',
            classList: 'token.keyword',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['.keyword.token:nth-child(114)'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97769
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '9.8pt (13px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'SPAN',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'SPAN#token.parameter',
            needsReview: true,
            issueId: 97770,
            html: '\u003cspan class="token parameter"\u003ecaps\u003c/span\u003e',
            classList: 'token.parameter',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['.parameter.token:nth-child(116)'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97770
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '9.8pt (13px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'SPAN',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'SPAN#token.keyword',
            needsReview: true,
            issueId: 97771,
            html: '\u003cspan class="token keyword"\u003efor\u003c/span\u003e',
            classList: 'token.keyword',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['.keyword.token:nth-child(119)'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97771
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '9.8pt (13px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'SPAN',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'SPAN#token.keyword',
            needsReview: true,
            issueId: 97772,
            html: '\u003cspan class="token keyword"\u003evar\u003c/span\u003e',
            classList: 'token.keyword',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['.keyword.token:nth-child(121)'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97772
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '9.8pt (13px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'SPAN',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'SPAN#token.keyword',
            needsReview: true,
            issueId: 97773,
            html: '\u003cspan class="token keyword"\u003ein\u003c/span\u003e',
            classList: 'token.keyword',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['.keyword.token:nth-child(122)'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97773
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#333333',
                  fontSize: '21.0pt (28px)',
                  fontWeight: 'normal',
                  messageKey: 'elmPartiallyObscured',
                  contrastRatio: 0,
                  expectedContrastRatio: '3:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it's partially obscured by another element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--content" id="main-content"\u003e',
                    target: ['#main-content']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'H2',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'H2#',
            needsReview: true,
            issueId: 97774,
            html: '\u003ch2 id="mark-tests-as-passed-or-failed"\u003eMark tests as passed or failed\u003ca class="anchorjs-link tooltipped text-link" data-anchorjs-icon="#" data-clipboard-text="https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor#mark-tests-as-passed-or-failed"\u003e\n        \u003c/a\u003e\u003c/h2\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it's partially obscured by another element",
            impact: 'serious',
            target: ['#mark-tests-as-passed-or-failed'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97774
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#333333',
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'elmPartiallyObscured',
                  contrastRatio: 0,
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it's partially obscured by another element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--content" id="main-content"\u003e',
                    target: ['#main-content']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'P',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'P#',
            needsReview: true,
            issueId: 97775,
            html: '\u003cp\u003eBrowserStack does not know whether your test’s assertions have passed or failed because only the framework knows whether the assertions have passed.\u003c/p\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it's partially obscured by another element",
            impact: 'serious',
            target: ['p:nth-child(31)'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97775
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#333333',
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'elmPartiallyObscured',
                  contrastRatio: 0,
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it's partially obscured by another element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--content" id="main-content"\u003e',
                    target: ['#main-content']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'P',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'P#',
            needsReview: true,
            issueId: 97776,
            html: '\u003cp\u003eIn the \u003ccode class=" highlighter-rouge  language-plaintext"\u003eparallel.conf.js\u003c/code\u003e file that is used to run your Protractor tests, the following snippet is used to mark tests as passed or failed depending on the assertion status of your tests:\u003c/p\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it's partially obscured by another element",
            impact: 'serious',
            target: ['p:nth-child(32)'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97776
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '9.8pt (13px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'CODE',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'CODE#.highlighter-rouge..language-plaintext',
            needsReview: true,
            issueId: 97777,
            html: '\u003ccode class=" highlighter-rouge  language-plaintext"\u003eparallel.conf.js\u003c/code\u003e',
            classList: '.highlighter-rouge..language-plaintext',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['p:nth-child(32) \u003e .language-plaintext'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97777
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '9.8pt (13px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'SPAN',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'SPAN#token.function-variable.function',
            needsReview: true,
            issueId: 97778,
            html: '\u003cspan class="token function-variable function"\u003eonComplete\u003c/span\u003e',
            classList: 'token.function-variable.function',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: [
              'pre[data-unique-index="8"] \u003e .language-javascript \u003e .function-variable.function.token'
            ],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97778
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '9.8pt (13px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'SPAN',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'SPAN#token.keyword',
            needsReview: true,
            issueId: 97779,
            html: '\u003cspan class="token keyword"\u003efunction\u003c/span\u003e',
            classList: 'token.keyword',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['.keyword.token:nth-child(3)'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97779
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '9.8pt (13px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'SPAN',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'SPAN#token.parameter',
            needsReview: true,
            issueId: 97780,
            html: '\u003cspan class="token parameter"\u003epassed\u003c/span\u003e',
            classList: 'token.parameter',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: [
              'pre[data-unique-index="8"] \u003e .language-javascript \u003e .parameter.token'
            ],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97780
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '9.8pt (13px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'SPAN',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'SPAN#token.keyword',
            needsReview: true,
            issueId: 97781,
            html: '\u003cspan class="token keyword"\u003eif\u003c/span\u003e',
            classList: 'token.keyword',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['.keyword.token:nth-child(8)'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97781
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '9.8pt (13px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'SPAN',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'SPAN#token.function',
            needsReview: true,
            issueId: 97782,
            html: '\u003cspan class="token function"\u003eexecuteScript\u003c/span\u003e',
            classList: 'token.function',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['.function.token:nth-child(14)'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97782
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '9.8pt (13px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'SPAN',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'SPAN#token.keyword',
            needsReview: true,
            issueId: 97783,
            html: '\u003cspan class="token keyword"\u003eif\u003c/span\u003e',
            classList: 'token.keyword',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['.keyword.token:nth-child(20)'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97783
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '9.8pt (13px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'SPAN',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'SPAN#token.function',
            needsReview: true,
            issueId: 97784,
            html: '\u003cspan class="token function"\u003eexecuteScript\u003c/span\u003e',
            classList: 'token.function',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['.function.token:nth-child(25)'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97784
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#333333',
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'elmPartiallyObscured',
                  contrastRatio: 0,
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it's partially obscured by another element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--content" id="main-content"\u003e',
                    target: ['#main-content']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'P',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'P#',
            needsReview: true,
            issueId: 97785,
            html: '\u003cp\u003eThe above \u003ccode class=" highlighter-rouge  language-plaintext"\u003eonComplete\u003c/code\u003e function is invoked after every Protractor test that is executed. Based on the status of the assertions, a javascript executor is fired which marks the status of your test on BrowserStack.\u003c/p\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it's partially obscured by another element",
            impact: 'serious',
            target: ['p:nth-child(34)'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97785
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '9.8pt (13px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'CODE',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'CODE#.highlighter-rouge..language-plaintext',
            needsReview: true,
            issueId: 97786,
            html: '\u003ccode class=" highlighter-rouge  language-plaintext"\u003eonComplete\u003c/code\u003e',
            classList: '.highlighter-rouge..language-plaintext',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['p:nth-child(34) \u003e .language-plaintext'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97786
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#333333',
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'elmPartiallyObscured',
                  contrastRatio: 0,
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it's partially obscured by another element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--content" id="main-content"\u003e',
                    target: ['#main-content']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'P',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'P#',
            needsReview: true,
            issueId: 97787,
            html: '\u003cp\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it's partially obscured by another element",
            impact: 'serious',
            target: ['p:nth-child(35)'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97787
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#0067dd',
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'elmPartiallyObscured',
                  contrastRatio: 0,
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it's partially obscured by another element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--content" id="main-content"\u003e',
                    target: ['#main-content']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'A',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'A#text-link',
            needsReview: true,
            issueId: 97788,
            html: '\u003ca href="/docs/automate/selenium/view-test-results/mark-tests-as-pass-fail#mark-test-status-after-test-completion-using-rest-api" class="text-link"\u003emarking test using REST API\u003c/a\u003e',
            classList: 'text-link',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it's partially obscured by another element",
            impact: 'serious',
            target: ['p:nth-child(35) \u003e .text-link'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97788
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#333333',
                  fontSize: '21.0pt (28px)',
                  fontWeight: 'normal',
                  messageKey: 'elmPartiallyObscured',
                  contrastRatio: 0,
                  expectedContrastRatio: '3:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it's partially obscured by another element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--content" id="main-content"\u003e',
                    target: ['#main-content']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'H2',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'H2#',
            needsReview: true,
            issueId: 97789,
            html: '\u003ch2 id="debug-your-app"\u003eDebug your app\u003ca class="anchorjs-link tooltipped text-link" data-anchorjs-icon="#" data-clipboard-text="https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor#debug-your-app"\u003e\n        \u003c/a\u003e\u003c/h2\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it's partially obscured by another element",
            impact: 'serious',
            target: ['#debug-your-app'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97789
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#333333',
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'elmPartiallyObscured',
                  contrastRatio: 0,
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it's partially obscured by another element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--content" id="main-content"\u003e',
                    target: ['#main-content']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'P',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'P#',
            needsReview: true,
            issueId: 97790,
            html: '\u003cp\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it's partially obscured by another element",
            impact: 'serious',
            target: ['p:nth-child(37)'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97790
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#0067dd',
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'elmPartiallyObscured',
                  contrastRatio: 0,
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it's partially obscured by another element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--content" id="main-content"\u003e',
                    target: ['#main-content']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'A',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'A#text-link',
            needsReview: true,
            issueId: 97791,
            html: '\u003ca href="/docs/automate/selenium/debug-failed-tests" class="text-link"\u003ehow to debug tests\u003c/a\u003e',
            classList: 'text-link',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it's partially obscured by another element",
            impact: 'serious',
            target: ['p:nth-child(37) \u003e .text-link:nth-child(1)'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97791
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#0067dd',
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'elmPartiallyObscured',
                  contrastRatio: 0,
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it's partially obscured by another element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--content" id="main-content"\u003e',
                    target: ['#main-content']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'A',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'A#text-link',
            needsReview: true,
            issueId: 97792,
            html: '\u003ca href="https://automate.browserstack.com" target="_blank" rel="noopener noreferrer" class="text-link"\u003eAutomate Dashboard\u003c/a\u003e',
            classList: 'text-link',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it's partially obscured by another element",
            impact: 'serious',
            target: [
              'p:nth-child(37) \u003e .text-link[rel="noopener noreferrer"][target="_blank"]'
            ],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97792
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#333333',
                  fontSize: '15.8pt (21px)',
                  fontWeight: 'normal',
                  messageKey: 'elmPartiallyObscured',
                  contrastRatio: 0,
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it's partially obscured by another element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--content" id="main-content"\u003e',
                    target: ['#main-content']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'H3',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'H3#',
            needsReview: true,
            issueId: 97793,
            html: '\u003ch3 id="text-logs"\u003eText logs\u003c/h3\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it's partially obscured by another element",
            impact: 'serious',
            target: ['#text-logs'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97793
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#333333',
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'elmPartiallyObscured',
                  contrastRatio: 0,
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it's partially obscured by another element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--content" id="main-content"\u003e',
                    target: ['#main-content']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'P',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'P#',
            needsReview: true,
            issueId: 97794,
            html: '\u003cp\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it's partially obscured by another element",
            impact: 'serious',
            target: ['p:nth-child(39)'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97794
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#0067dd',
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'elmPartiallyObscured',
                  contrastRatio: 0,
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it's partially obscured by another element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--content" id="main-content"\u003e',
                    target: ['#main-content']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'A',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'A#text-link',
            needsReview: true,
            issueId: 97795,
            html: '\u003ca href="/docs/automate/api-reference/selenium/session#get-session-logs" class="text-link"\u003eREST API\u003c/a\u003e',
            classList: 'text-link',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it's partially obscured by another element",
            impact: 'serious',
            target: ['p:nth-child(39) \u003e .text-link'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97795
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#333333',
                  fontSize: '15.8pt (21px)',
                  fontWeight: 'normal',
                  messageKey: 'elmPartiallyObscured',
                  contrastRatio: 0,
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it's partially obscured by another element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--content" id="main-content"\u003e',
                    target: ['#main-content']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'H3',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'H3#',
            needsReview: true,
            issueId: 97796,
            html: '\u003ch3 id="visual-logs"\u003eVisual logs\u003c/h3\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it's partially obscured by another element",
            impact: 'serious',
            target: ['#visual-logs'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97796
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#333333',
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'elmPartiallyObscured',
                  contrastRatio: 0,
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it's partially obscured by another element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--content" id="main-content"\u003e',
                    target: ['#main-content']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'P',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'P#',
            needsReview: true,
            issueId: 97797,
            html: '\u003cp\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it's partially obscured by another element",
            impact: 'serious',
            target: ['p:nth-child(41)'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97797
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#333333',
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'elmPartiallyObscured',
                  contrastRatio: 0,
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it's partially obscured by another element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--content" id="main-content"\u003e',
                    target: ['#main-content']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'P',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'P#',
            needsReview: true,
            issueId: 97798,
            html: '\u003cp\u003eVisual Logs are disabled by default. In order to enable Visual Logs you will need to set \u003ccode class=" highlighter-rouge  language-plaintext"\u003ebrowserstack.debug\u003c/code\u003e capability to \u003ccode class=" highlighter-rouge  language-plaintext"\u003etrue\u003c/code\u003e.\u003c/p\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it's partially obscured by another element",
            impact: 'serious',
            target: ['p:nth-child(42)'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97798
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '9.8pt (13px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'CODE',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'CODE#.highlighter-rouge..language-plaintext',
            needsReview: true,
            issueId: 97799,
            html: '\u003ccode class=" highlighter-rouge  language-plaintext"\u003etrue\u003c/code\u003e',
            classList: '.highlighter-rouge..language-plaintext',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['p:nth-child(42) \u003e .language-plaintext:nth-child(2)'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97799
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '9.8pt (13px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'SPAN',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'SPAN#token.string',
            needsReview: true,
            issueId: 97800,
            html: '\u003cspan class="token string"\u003e\'capabilities\'\u003c/span\u003e',
            classList: 'token.string',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: [
              'pre[data-unique-index="9"] \u003e .language-javascript \u003e .string.token:nth-child(1)'
            ],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97800
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '9.8pt (13px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'SPAN',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'SPAN#token.string',
            needsReview: true,
            issueId: 97801,
            html: '\u003cspan class="token string"\u003e\'true\'\u003c/span\u003e',
            classList: 'token.string',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: [
              'pre[data-unique-index="9"] \u003e .language-javascript \u003e .string.token:nth-child(6)'
            ],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97801
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#333333',
                  fontSize: '15.8pt (21px)',
                  fontWeight: 'normal',
                  messageKey: 'elmPartiallyObscured',
                  contrastRatio: 0,
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it's partially obscured by another element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--content" id="main-content"\u003e',
                    target: ['#main-content']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'H3',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'H3#',
            needsReview: true,
            issueId: 97802,
            html: '\u003ch3 id="video-recording"\u003eVideo recording\u003c/h3\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it's partially obscured by another element",
            impact: 'serious',
            target: ['#video-recording'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97802
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#333333',
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'elmPartiallyObscured',
                  contrastRatio: 0,
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it's partially obscured by another element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--content" id="main-content"\u003e',
                    target: ['#main-content']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'P',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'P#',
            needsReview: true,
            issueId: 97803,
            html: '\u003cp\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it's partially obscured by another element",
            impact: 'serious',
            target: ['p:nth-child(45)'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97803
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'A',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'A#text-link',
            needsReview: true,
            issueId: 97804,
            html: '\u003ca href="https://www.browserstack.com/docs/automate/api-reference/selenium/session#get-session-details" target="_blank" class="text-link"\u003eREST API\u003c/a\u003e',
            classList: 'text-link',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['p:nth-child(45) \u003e .text-link[target="_blank"]'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97804
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#333333',
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'elmPartiallyObscured',
                  contrastRatio: 0,
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it's partially obscured by another element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--content" id="main-content"\u003e',
                    target: ['#main-content']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'SPAN',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'SPAN#',
            needsReview: true,
            issueId: 97805,
            html: '\u003cspan\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it's partially obscured by another element",
            impact: 'serious',
            target: ['.alert-note \u003e span'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97805
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'STRONG',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'STRONG#alert-strong',
            needsReview: true,
            issueId: 97806,
            html: '\u003cstrong class="alert-strong"\u003eNote: \u003c/strong\u003e',
            classList: 'alert-strong',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['.alert-note \u003e span \u003e .alert-strong'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97806
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '9.8pt (13px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'CODE',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'CODE#.highlighter-rouge..language-plaintext',
            needsReview: true,
            issueId: 97807,
            html: '\u003ccode class=" highlighter-rouge  language-plaintext"\u003efalse\u003c/code\u003e',
            classList: '.highlighter-rouge..language-plaintext',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['span \u003e .language-plaintext:nth-child(3)'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97807
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#333333',
                  fontSize: '15.8pt (21px)',
                  fontWeight: 'normal',
                  messageKey: 'elmPartiallyObscured',
                  contrastRatio: 0,
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it's partially obscured by another element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--content" id="main-content"\u003e',
                    target: ['#main-content']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'H3',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'H3#',
            needsReview: true,
            issueId: 97808,
            html: '\u003ch3 id="console-logs"\u003eConsole logs\u003c/h3\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it's partially obscured by another element",
            impact: 'serious',
            target: ['#console-logs'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97808
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#333333',
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'elmPartiallyObscured',
                  contrastRatio: 0,
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it's partially obscured by another element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--content" id="main-content"\u003e',
                    target: ['#main-content']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'P',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'P#',
            needsReview: true,
            issueId: 97809,
            html: '\u003cp\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it's partially obscured by another element",
            impact: 'serious',
            target: ['p:nth-child(48)'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97809
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'A',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'A#text-link',
            needsReview: true,
            issueId: 97810,
            html: '\u003ca href="/docs/automate/api-reference/selenium/session#get-session-details" class="text-link"\u003eREST API\u003c/a\u003e',
            classList: 'text-link',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['p:nth-child(48) \u003e .text-link'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97810
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#333333',
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'elmPartiallyObscured',
                  contrastRatio: 0,
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it's partially obscured by another element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--content" id="main-content"\u003e',
                    target: ['#main-content']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'P',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'P#',
            needsReview: true,
            issueId: 97811,
            html: '\u003cp\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it's partially obscured by another element",
            impact: 'serious',
            target: ['p:nth-child(49)'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97811
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'STRONG',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'STRONG#',
            needsReview: true,
            issueId: 97812,
            html: '\u003cstrong\u003eenabled\u003c/strong\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['p:nth-child(49) \u003e strong'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97812
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '9.8pt (13px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'CODE',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'CODE#.highlighter-rouge..language-plaintext',
            needsReview: true,
            issueId: 97813,
            html: '\u003ccode class=" highlighter-rouge  language-plaintext"\u003edisable\u003c/code\u003e',
            classList: '.highlighter-rouge..language-plaintext',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['p:nth-child(49) \u003e .language-plaintext:nth-child(3)'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97813
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '9.8pt (13px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'CODE',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'CODE#.highlighter-rouge..language-plaintext',
            needsReview: true,
            issueId: 97814,
            html: '\u003ccode class=" highlighter-rouge  language-plaintext"\u003eerrors\u003c/code\u003e',
            classList: '.highlighter-rouge..language-plaintext',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['.language-plaintext:nth-child(4)'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97814
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '9.8pt (13px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'CODE',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'CODE#.highlighter-rouge..language-plaintext',
            needsReview: true,
            issueId: 97815,
            html: '\u003ccode class=" highlighter-rouge  language-plaintext"\u003ewarnings\u003c/code\u003e',
            classList: '.highlighter-rouge..language-plaintext',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['.language-plaintext:nth-child(5)'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97815
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '9.8pt (13px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'CODE',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'CODE#.highlighter-rouge..language-plaintext',
            needsReview: true,
            issueId: 97816,
            html: '\u003ccode class=" highlighter-rouge  language-plaintext"\u003einfo\u003c/code\u003e',
            classList: '.highlighter-rouge..language-plaintext',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['.language-plaintext:nth-child(6)'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97816
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '9.8pt (13px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'CODE',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'CODE#.highlighter-rouge..language-plaintext',
            needsReview: true,
            issueId: 97817,
            html: '\u003ccode class=" highlighter-rouge  language-plaintext"\u003everbose\u003c/code\u003e',
            classList: '.highlighter-rouge..language-plaintext',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['.language-plaintext:nth-child(7)'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97817
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '9.8pt (13px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'SPAN',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'SPAN#token.string',
            needsReview: true,
            issueId: 97818,
            html: '\u003cspan class="token string"\u003e\'capabilities\'\u003c/span\u003e',
            classList: 'token.string',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: [
              'pre[data-unique-index="10"] \u003e .language-javascript \u003e .string.token:nth-child(1)'
            ],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97818
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '9.8pt (13px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'SPAN',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'SPAN#token.string',
            needsReview: true,
            issueId: 97819,
            html: '\u003cspan class="token string"\u003e\'errors\'\u003c/span\u003e',
            classList: 'token.string',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: [
              'pre[data-unique-index="10"] \u003e .language-javascript \u003e .string.token:nth-child(6)'
            ],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97819
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#333333',
                  fontSize: '15.8pt (21px)',
                  fontWeight: 'normal',
                  messageKey: 'elmPartiallyObscured',
                  contrastRatio: 0,
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it's partially obscured by another element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--content" id="main-content"\u003e',
                    target: ['#main-content']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'H3',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'H3#',
            needsReview: true,
            issueId: 97820,
            html: '\u003ch3 id="network-logs"\u003eNetwork logs\u003c/h3\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it's partially obscured by another element",
            impact: 'serious',
            target: ['#network-logs'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97820
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#333333',
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'elmPartiallyObscured',
                  contrastRatio: 0,
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it's partially obscured by another element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--content" id="main-content"\u003e',
                    target: ['#main-content']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'P',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'P#',
            needsReview: true,
            issueId: 97821,
            html: '\u003cp\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it's partially obscured by another element",
            impact: 'serious',
            target: ['p:nth-child(52)'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97821
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'A',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'A#text-link',
            needsReview: true,
            issueId: 97822,
            html: '\u003ca href="/docs/automate/api-reference/selenium/session#get-session-details" class="text-link"\u003eREST API\u003c/a\u003e',
            classList: 'text-link',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['p:nth-child(52) \u003e .text-link:nth-child(1)'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97822
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'A',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'A#text-link',
            needsReview: true,
            issueId: 97823,
            html: '\u003ca href="http://www.softwareishard.com/har/viewer/" target="_blank" rel="noopener noreferrer" class="text-link"\u003eHAR Viewer\u003c/a\u003e',
            classList: 'text-link',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: [
              'p:nth-child(52) \u003e .text-link[rel="noopener noreferrer"][target="_blank"]'
            ],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97823
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#333333',
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'elmPartiallyObscured',
                  contrastRatio: 0,
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it's partially obscured by another element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--content" id="main-content"\u003e',
                    target: ['#main-content']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'P',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'P#',
            needsReview: true,
            issueId: 97824,
            html: '\u003cp\u003eNetwork Logs are disabled by default. To enable Network Logs use the capability \u003ccode class=" highlighter-rouge  language-plaintext"\u003ebrowserstack.networkLogs\u003c/code\u003e with the value \u003ccode class=" highlighter-rouge  language-plaintext"\u003etrue\u003c/code\u003e, as shown below:\u003c/p\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it's partially obscured by another element",
            impact: 'serious',
            target: ['p:nth-child(53)'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97824
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '9.8pt (13px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'CODE',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'CODE#.highlighter-rouge..language-plaintext',
            needsReview: true,
            issueId: 97825,
            html: '\u003ccode class=" highlighter-rouge  language-plaintext"\u003etrue\u003c/code\u003e',
            classList: '.highlighter-rouge..language-plaintext',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['p:nth-child(53) \u003e .language-plaintext:nth-child(2)'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97825
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '9.8pt (13px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'SPAN',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'SPAN#token.string',
            needsReview: true,
            issueId: 97826,
            html: '\u003cspan class="token string"\u003e\'capabilities\'\u003c/span\u003e',
            classList: 'token.string',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: [
              'pre[data-unique-index="11"] \u003e .language-javascript \u003e .string.token:nth-child(1)'
            ],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97826
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '9.8pt (13px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'SPAN',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'SPAN#token.string',
            needsReview: true,
            issueId: 97827,
            html: '\u003cspan class="token string"\u003e\'true\'\u003c/span\u003e',
            classList: 'token.string',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: [
              'pre[data-unique-index="11"] \u003e .language-javascript \u003e .string.token:nth-child(6)'
            ],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97827
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#333333',
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'elmPartiallyObscured',
                  contrastRatio: 0,
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it's partially obscured by another element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--content" id="main-content"\u003e',
                    target: ['#main-content']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'P',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'P#',
            needsReview: true,
            issueId: 97828,
            html: '\u003cp\u003eIn addition to these logs BrowserStack also provides Raw logs, Selenium logs, Appium logs and Interactive session. You can find the \u003ca href="/docs/automate/selenium/debugging-options#nodejs" class="text-link"\u003ecomplete details to enable all the debugging options\u003c/a\u003e.\u003c/p\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it's partially obscured by another element",
            impact: 'serious',
            target: ['p:nth-child(55)'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97828
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#0067dd',
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'elmPartiallyObscured',
                  contrastRatio: 0,
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it's partially obscured by another element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--content" id="main-content"\u003e',
                    target: ['#main-content']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'A',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'A#text-link',
            needsReview: true,
            issueId: 97829,
            html: '\u003ca href="/docs/automate/selenium/debugging-options#nodejs" class="text-link"\u003ecomplete details to enable all the debugging options\u003c/a\u003e',
            classList: 'text-link',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it's partially obscured by another element",
            impact: 'serious',
            target: ['p:nth-child(55) \u003e .text-link'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97829
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#333333',
                  fontSize: '21.0pt (28px)',
                  fontWeight: 'normal',
                  messageKey: 'elmPartiallyObscured',
                  contrastRatio: 0,
                  expectedContrastRatio: '3:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it's partially obscured by another element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--content" id="main-content"\u003e',
                    target: ['#main-content']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'H2',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'H2#',
            needsReview: true,
            issueId: 97830,
            html: '\u003ch2 id="next-steps"\u003eNext steps\u003ca class="anchorjs-link tooltipped text-link" data-anchorjs-icon="#" data-clipboard-text="https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor#next-steps"\u003e\n        \u003c/a\u003e\u003c/h2\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it's partially obscured by another element",
            impact: 'serious',
            target: ['#next-steps'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97830
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#333333',
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'elmPartiallyObscured',
                  contrastRatio: 0,
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it's partially obscured by another element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--content" id="main-content"\u003e',
                    target: ['#main-content']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'P',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'P#',
            needsReview: true,
            issueId: 97831,
            html: '\u003cp\u003eOnce you have successfully run your first test on BrowserStack, you might want to do one of the following:\u003c/p\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it's partially obscured by another element",
            impact: 'serious',
            target: ['p:nth-child(57)'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97831
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#0067dd',
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'elmPartiallyObscured',
                  contrastRatio: 0,
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it's partially obscured by another element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--content" id="main-content"\u003e',
                    target: ['#main-content']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'A',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'A#text-link',
            needsReview: true,
            issueId: 97832,
            html: '\u003ca href="protractor/local-testing" target="_blank" class="text-link"\u003eTest privately hosted websites\u003c/a\u003e',
            classList: 'text-link',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it's partially obscured by another element",
            impact: 'serious',
            target: ['li:nth-child(1) \u003e a[href$="local-testing"]'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97832
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#0067dd',
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'elmPartiallyObscured',
                  contrastRatio: 0,
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it's partially obscured by another element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--content" id="main-content"\u003e',
                    target: ['#main-content']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'A',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'A#text-link',
            needsReview: true,
            issueId: 97833,
            html: '\u003ca href="protractor/run-tests-in-parallel" target="_blank" class="text-link"\u003eRun multiple tests in parallel\u003c/a\u003e',
            classList: 'text-link',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it's partially obscured by another element",
            impact: 'serious',
            target: [
              'ul:nth-child(58) \u003e li:nth-child(2) \u003e .text-link[target="_blank"]'
            ],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97833
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#0067dd',
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'elmPartiallyObscured',
                  contrastRatio: 0,
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it's partially obscured by another element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--content" id="main-content"\u003e',
                    target: ['#main-content']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'A',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'A#text-link',
            needsReview: true,
            issueId: 97834,
            html: '\u003ca href="https://www.browserstack.com/automate/capabilities" target="_blank" class="text-link"\u003eGenerate a list of capabilities that you want to use in tests\u003c/a\u003e',
            classList: 'text-link',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it's partially obscured by another element",
            impact: 'serious',
            target: [
              'ul:nth-child(58) \u003e li:nth-child(3) \u003e .text-link[target="_blank"]'
            ],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97834
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#0067dd',
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'elmPartiallyObscured',
                  contrastRatio: 0,
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it's partially obscured by another element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--content" id="main-content"\u003e',
                    target: ['#main-content']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'A',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'A#text-link',
            needsReview: true,
            issueId: 97835,
            html: '\u003ca href="/docs/automate/api-reference/selenium/introduction" target="_blank" class="text-link"\u003eFind information about your Projects, Builds and Sessions using our REST APIs\u003c/a\u003e',
            classList: 'text-link',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it's partially obscured by another element",
            impact: 'serious',
            target: [
              'ul:nth-child(58) \u003e li:nth-child(4) \u003e .text-link[target="_blank"]'
            ],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97835
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#333333',
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'elmPartiallyObscured',
                  contrastRatio: 0,
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it's partially obscured by another element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--content" id="main-content"\u003e',
                    target: ['#main-content']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'LI',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'LI#',
            needsReview: true,
            issueId: 97836,
            html: '\u003cli\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it's partially obscured by another element",
            impact: 'serious',
            target: ['ul:nth-child(58) \u003e li:nth-child(5)'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97836
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'A',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'A#text-link',
            needsReview: true,
            issueId: 97837,
            html: '\u003ca href="/docs/automate/selenium/jenkins" target="_blank" class="text-link"\u003eJenkins\u003c/a\u003e',
            classList: 'text-link',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: [
              'li:nth-child(5) \u003e .text-link[target="_blank"]:nth-child(1)'
            ],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97837
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'A',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'A#text-link',
            needsReview: true,
            issueId: 97838,
            html: '\u003ca href="/docs/automate/selenium/bamboo" target="_blank" class="text-link"\u003eBamboo\u003c/a\u003e',
            classList: 'text-link',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['.text-link[href$="bamboo"][target="_blank"]'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97838
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'A',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'A#text-link',
            needsReview: true,
            issueId: 97839,
            html: '\u003ca href="/docs/automate/selenium/teamcity" target="_blank" class="text-link"\u003eTeamCity\u003c/a\u003e',
            classList: 'text-link',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: [
              'li:nth-child(5) \u003e .text-link[target="_blank"]:nth-child(3)'
            ],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97839
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'A',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'A#text-link',
            needsReview: true,
            issueId: 97840,
            html: '\u003ca href="/docs/automate/selenium/azure-pipelines" target="_blank" class="text-link"\u003eAzure\u003c/a\u003e',
            classList: 'text-link',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['.text-link[target="_blank"]:nth-child(4)'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97840
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'A',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'A#text-link',
            needsReview: true,
            issueId: 97841,
            html: '\u003ca href="/docs/automate/selenium/circleci" target="_blank" class="text-link"\u003eCircleCI\u003c/a\u003e',
            classList: 'text-link',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['.text-link[target="_blank"]:nth-child(5)'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97841
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'A',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'A#text-link',
            needsReview: true,
            issueId: 97842,
            html: '\u003ca href="/docs/automate/selenium/bitbucket-pipeline" target="_blank" class="text-link"\u003eBitBucket\u003c/a\u003e',
            classList: 'text-link',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['.text-link[target="_blank"]:nth-child(6)'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97842
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'A',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'A#text-link',
            needsReview: true,
            issueId: 97843,
            html: '\u003ca href="/docs/automate/selenium/travis-ci" target="_blank" class="text-link"\u003eTravisCI\u003c/a\u003e',
            classList: 'text-link',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['.text-link[target="_blank"]:nth-child(7)'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97843
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'A',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'A#text-link',
            needsReview: true,
            issueId: 97844,
            html: '\u003ca href="/docs/automate/selenium/github-actions" target="_blank" class="text-link"\u003eGitHub Actions\u003c/a\u003e',
            classList: 'text-link',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['.text-link[target="_blank"]:nth-child(8)'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97844
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'BUTTON',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'BUTTON#btn',
            needsReview: true,
            issueId: 97845,
            html: '\u003cbutton aria-label="Yes, this page is helpful" tabindex="0" onclick="showFB(\'Yes\')" class="btn"\u003eYes\u003c/button\u003e',
            classList: 'btn',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['button[aria-label="Yes, this page is helpful"]'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97845
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'BUTTON',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'BUTTON#btn',
            needsReview: true,
            issueId: 97846,
            html: '\u003cbutton aria-label="No, this page is not helpful" tabindex="0" onclick="showFB(\'No\')" class="btn"\u003eNo\u003c/button\u003e',
            classList: 'btn',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['button[aria-label="No, this page is not helpful"]'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97846
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#333333',
                  fontSize: '31.5pt (42px)',
                  fontWeight: 'normal',
                  messageKey: 'elmPartiallyObscured',
                  contrastRatio: 0,
                  expectedContrastRatio: '3:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it's partially obscured by another element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--content" id="main-content"\u003e',
                    target: ['#main-content']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:31Z',
            htmltag: 'H1',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'H1#',
            needsReview: true,
            issueId: 97847,
            html: '\u003ch1 id="selenium-with-protractor"\u003eSelenium with Protractor\u003c/h1\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it's partially obscured by another element",
            impact: 'serious',
            target: ['#selenium-with-protractor'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97847
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#333333',
                  fontSize: '15.8pt (21px)',
                  fontWeight: 'normal',
                  messageKey: 'elmPartiallyObscured',
                  contrastRatio: 0,
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it's partially obscured by another element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--content" id="main-content"\u003e',
                    target: ['#main-content']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:31Z',
            htmltag: 'P',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'P#intro',
            needsReview: true,
            issueId: 97848,
            html: '\u003cp class="intro"\u003eA guide to run Selenium Webdriver tests with Protractor on BrowserStack.\u003c/p\u003e',
            classList: 'intro',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it's partially obscured by another element",
            impact: 'serious',
            target: ['.intro'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97848
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  bgColor: '#142434',
                  fgColor: '#0070f0',
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: null,
                  contrastRatio: 3.43,
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  'Element has insufficient color contrast of 3.43 (foreground color: #0070f0, background color: #142434, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1',
                relatedNodes: [
                  {
                    html: '\u003cheader class="header-habitat marketing-header"\u003e',
                    target: ['header']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:14Z',
            htmltag: 'SPAN',
            page: {
              pageId: 'tYfw',
              timestamp: '2023-02-03T15:34:13Z',
              url: 'https://www.browserstack.com/docs/',
              title: 'Developer Documentation Home | BrowserStack Docs'
            },
            componentId: 'SPAN#nav_item_name',
            needsReview: false,
            issueId: 97562,
            html: '\u003cspan class="nav_item_name"\u003e',
            classList: 'nav_item_name',
            failureSummary:
              'Fix any of the following:\n  Element has insufficient color contrast of 3.43 (foreground color: #0070f0, background color: #142434, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1',
            impact: 'serious',
            target: ['.nav_item_name'],
            url: 'https://www.browserstack.com/docs/',
            confirmed: true,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: true,
                hidden: false,
                impact: 'serious',
                issueId: 97562
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:14Z',
            htmltag: 'A',
            page: {
              pageId: 'tYfw',
              timestamp: '2023-02-03T15:34:13Z',
              url: 'https://www.browserstack.com/docs/',
              title: 'Developer Documentation Home | BrowserStack Docs'
            },
            componentId: 'A#sidenav-h1.sidenav-link.text-link',
            needsReview: true,
            issueId: 97563,
            html: '\u003ca tabindex="-1" aria-label="Selenium" data-name="Selenium" href="/docs/automate/selenium" data-product-type="" title="Selenium" class="sidenav-h1 sidenav-link text-link"\u003e\n                  Selenium\n                \u003c/a\u003e',
            classList: 'sidenav-h1.sidenav-link.text-link',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['a[aria-label="Selenium"]'],
            url: 'https://www.browserstack.com/docs/',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97563
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:14Z',
            htmltag: 'A',
            page: {
              pageId: 'tYfw',
              timestamp: '2023-02-03T15:34:13Z',
              url: 'https://www.browserstack.com/docs/',
              title: 'Developer Documentation Home | BrowserStack Docs'
            },
            componentId: 'A#sidenav-h1.sidenav-link.text-link',
            needsReview: true,
            issueId: 97564,
            html: '\u003ca tabindex="-1" aria-label="Cypress" data-name="Cypress" href="/docs/automate/cypress" data-product-type="" title="Cypress" class="sidenav-h1 sidenav-link text-link"\u003e\n                  Cypress\n                \u003c/a\u003e',
            classList: 'sidenav-h1.sidenav-link.text-link',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['a[aria-label="Cypress"]'],
            url: 'https://www.browserstack.com/docs/',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97564
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:14Z',
            htmltag: 'A',
            page: {
              pageId: 'tYfw',
              timestamp: '2023-02-03T15:34:13Z',
              url: 'https://www.browserstack.com/docs/',
              title: 'Developer Documentation Home | BrowserStack Docs'
            },
            componentId: 'A#sidenav-h1.sidenav-link.text-link',
            needsReview: true,
            issueId: 97565,
            html: '\u003ca tabindex="-1" aria-label="Playwright" data-name="Playwright" href="/docs/automate/playwright" data-product-type="" title="Playwright" class="sidenav-h1 sidenav-link text-link"\u003e\n                  Playwright\n                \u003c/a\u003e',
            classList: 'sidenav-h1.sidenav-link.text-link',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['a[aria-label="Playwright"]'],
            url: 'https://www.browserstack.com/docs/',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97565
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:14Z',
            htmltag: 'A',
            page: {
              pageId: 'tYfw',
              timestamp: '2023-02-03T15:34:13Z',
              url: 'https://www.browserstack.com/docs/',
              title: 'Developer Documentation Home | BrowserStack Docs'
            },
            componentId: 'A#sidenav-h1.sidenav-link.text-link',
            needsReview: true,
            issueId: 97566,
            html: '\u003ca tabindex="-1" aria-label="Puppeteer" data-name="Puppeteer" href="/docs/automate/puppeteer" data-product-type="" title="Puppeteer" class="sidenav-h1 sidenav-link text-link"\u003e\n                  Puppeteer\n                \u003c/a\u003e',
            classList: 'sidenav-h1.sidenav-link.text-link',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['a[aria-label="Puppeteer"]'],
            url: 'https://www.browserstack.com/docs/',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97566
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:14Z',
            htmltag: 'A',
            page: {
              pageId: 'tYfw',
              timestamp: '2023-02-03T15:34:13Z',
              url: 'https://www.browserstack.com/docs/',
              title: 'Developer Documentation Home | BrowserStack Docs'
            },
            componentId: 'A#sidenav-h1.sidenav-link.text-link',
            needsReview: true,
            issueId: 97567,
            html: '\u003ca tabindex="-1" aria-label="Percy" data-name="Percy" href="https://docs.percy.io/docs" data-product-type="" title="Percy" class="sidenav-h1 sidenav-link text-link" target="_blank" rel="noopener noreferrer"\u003e\n                  Percy\n                \u003c/a\u003e',
            classList: 'sidenav-h1.sidenav-link.text-link',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['a[aria-label="Percy"]'],
            url: 'https://www.browserstack.com/docs/',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97567
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:14Z',
            htmltag: 'A',
            page: {
              pageId: 'tYfw',
              timestamp: '2023-02-03T15:34:13Z',
              url: 'https://www.browserstack.com/docs/',
              title: 'Developer Documentation Home | BrowserStack Docs'
            },
            componentId: 'A#sidenav-h1.sidenav-link.text-link',
            needsReview: true,
            issueId: 97568,
            html: '\u003ca tabindex="-1" aria-label="Live" data-name="Live" href="/docs/live" data-product-type="" title="Live" class="sidenav-h1 sidenav-link text-link"\u003e\n                  Live\n                \u003c/a\u003e',
            classList: 'sidenav-h1.sidenav-link.text-link',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['a[aria-label="Live"]'],
            url: 'https://www.browserstack.com/docs/',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97568
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:14Z',
            htmltag: 'A',
            page: {
              pageId: 'tYfw',
              timestamp: '2023-02-03T15:34:13Z',
              url: 'https://www.browserstack.com/docs/',
              title: 'Developer Documentation Home | BrowserStack Docs'
            },
            componentId: 'A#sidenav-h1.sidenav-link.text-link',
            needsReview: true,
            issueId: 97569,
            html: '\u003ca tabindex="-1" aria-label="Appium" data-name="Appium" href="/docs/app-automate/appium" data-product-type="" title="Appium" class="sidenav-h1 sidenav-link text-link"\u003e\n                  Appium\n                \u003c/a\u003e',
            classList: 'sidenav-h1.sidenav-link.text-link',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['a[aria-label="Appium"]'],
            url: 'https://www.browserstack.com/docs/',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97569
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:14Z',
            htmltag: 'A',
            page: {
              pageId: 'tYfw',
              timestamp: '2023-02-03T15:34:13Z',
              url: 'https://www.browserstack.com/docs/',
              title: 'Developer Documentation Home | BrowserStack Docs'
            },
            componentId: 'A#sidenav-h1.sidenav-link.text-link',
            needsReview: true,
            issueId: 97570,
            html: '\u003ca tabindex="-1" aria-label="Espresso" data-name="Espresso" href="/docs/app-automate/espresso/getting-started" data-product-type="" title="Espresso" class="sidenav-h1 sidenav-link text-link"\u003e\n                  Espresso\n                \u003c/a\u003e',
            classList: 'sidenav-h1.sidenav-link.text-link',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['a[aria-label="Espresso"]'],
            url: 'https://www.browserstack.com/docs/',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97570
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:14Z',
            htmltag: 'A',
            page: {
              pageId: 'tYfw',
              timestamp: '2023-02-03T15:34:13Z',
              url: 'https://www.browserstack.com/docs/',
              title: 'Developer Documentation Home | BrowserStack Docs'
            },
            componentId: 'A#sidenav-h1.sidenav-link.text-link',
            needsReview: true,
            issueId: 97571,
            html: '\u003ca tabindex="-1" aria-label="XCUITest" data-name="XCUITest" href="/docs/app-automate/xcuitest/getting-started" data-product-type="" title="XCUITest" class="sidenav-h1 sidenav-link text-link"\u003e\n                  XCUITest\n                \u003c/a\u003e',
            classList: 'sidenav-h1.sidenav-link.text-link',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['a[aria-label="XCUITest"]'],
            url: 'https://www.browserstack.com/docs/',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97571
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:14Z',
            htmltag: 'A',
            page: {
              pageId: 'tYfw',
              timestamp: '2023-02-03T15:34:13Z',
              url: 'https://www.browserstack.com/docs/',
              title: 'Developer Documentation Home | BrowserStack Docs'
            },
            componentId: 'A#sidenav-h1.sidenav-link.text-link',
            needsReview: true,
            issueId: 97572,
            html: '\u003ca tabindex="-1" aria-label="EarlGrey" data-name="EarlGrey" href="/docs/app-automate/earlgrey/getting-started" data-product-type="" title="EarlGrey" class="sidenav-h1 sidenav-link text-link"\u003e\n                  EarlGrey\n                \u003c/a\u003e',
            classList: 'sidenav-h1.sidenav-link.text-link',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['a[aria-label="EarlGrey"]'],
            url: 'https://www.browserstack.com/docs/',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97572
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:14Z',
            htmltag: 'A',
            page: {
              pageId: 'tYfw',
              timestamp: '2023-02-03T15:34:13Z',
              url: 'https://www.browserstack.com/docs/',
              title: 'Developer Documentation Home | BrowserStack Docs'
            },
            componentId: 'A#sidenav-h1.sidenav-link.text-link',
            needsReview: true,
            issueId: 97573,
            html: '\u003ca tabindex="-1" aria-label="App Live" data-name="App Live" href="/docs/app-live" data-product-type="" title="App Live" class="sidenav-h1 sidenav-link text-link"\u003e\n                  App Live\n                \u003c/a\u003e',
            classList: 'sidenav-h1.sidenav-link.text-link',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['a[aria-label="App Live"]'],
            url: 'https://www.browserstack.com/docs/',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97573
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:14Z',
            htmltag: 'A',
            page: {
              pageId: 'tYfw',
              timestamp: '2023-02-03T15:34:13Z',
              url: 'https://www.browserstack.com/docs/',
              title: 'Developer Documentation Home | BrowserStack Docs'
            },
            componentId: 'A#sidenav-h1.sidenav-link.text-link',
            needsReview: true,
            issueId: 97574,
            html: '\u003ca tabindex="-1" aria-label="Local Testing" data-name="Local Testing" href="/docs/local-testing" data-product-type="" title="Local Testing" class="sidenav-h1 sidenav-link text-link"\u003e\n                  Local Testing\n                \u003c/a\u003e',
            classList: 'sidenav-h1.sidenav-link.text-link',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['a[aria-label="Local Testing"]'],
            url: 'https://www.browserstack.com/docs/',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97574
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:14Z',
            htmltag: 'A',
            page: {
              pageId: 'tYfw',
              timestamp: '2023-02-03T15:34:13Z',
              url: 'https://www.browserstack.com/docs/',
              title: 'Developer Documentation Home | BrowserStack Docs'
            },
            componentId: 'A#sidenav-h1.sidenav-link.text-link',
            needsReview: true,
            issueId: 97575,
            html: '\u003ca tabindex="-1" aria-label="Enterprise" data-name="Enterprise" href="/docs/enterprise" data-product-type="" title="Enterprise" class="sidenav-h1 sidenav-link text-link"\u003e\n                  Enterprise\n                \u003c/a\u003e',
            classList: 'sidenav-h1.sidenav-link.text-link',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['a[aria-label="Enterprise"]'],
            url: 'https://www.browserstack.com/docs/',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97575
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:14Z',
            htmltag: 'A',
            page: {
              pageId: 'tYfw',
              timestamp: '2023-02-03T15:34:13Z',
              url: 'https://www.browserstack.com/docs/',
              title: 'Developer Documentation Home | BrowserStack Docs'
            },
            componentId: 'A#sidenav-h1.sidenav-link.text-link',
            needsReview: true,
            issueId: 97576,
            html: '\u003ca tabindex="-1" aria-label="Screenshots" data-name="Screenshots" href="/support/screenshots" data-product-type="" title="Screenshots" class="sidenav-h1 sidenav-link text-link"\u003e\n                  Screenshots\n                \u003c/a\u003e',
            classList: 'sidenav-h1.sidenav-link.text-link',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['a[aria-label="Screenshots"]'],
            url: 'https://www.browserstack.com/docs/',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97576
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:14Z',
            htmltag: 'A',
            page: {
              pageId: 'tYfw',
              timestamp: '2023-02-03T15:34:13Z',
              url: 'https://www.browserstack.com/docs/',
              title: 'Developer Documentation Home | BrowserStack Docs'
            },
            componentId: 'A#sidenav-h1.sidenav-link.text-link',
            needsReview: true,
            issueId: 97577,
            html: '\u003ca tabindex="-1" aria-label="Speedlab" data-name="Speedlab" href="/docs/speedlab/guide/introduction" data-product-type="" title="Speedlab" class="sidenav-h1 sidenav-link text-link"\u003e\n                  Speedlab\n                \u003c/a\u003e',
            classList: 'sidenav-h1.sidenav-link.text-link',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: ['a[aria-label="Speedlab"]'],
            url: 'https://www.browserstack.com/docs/',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97577
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '9.0pt (12px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:14Z',
            htmltag: 'SPAN',
            page: {
              pageId: 'tYfw',
              timestamp: '2023-02-03T15:34:13Z',
              url: 'https://www.browserstack.com/docs/',
              title: 'Developer Documentation Home | BrowserStack Docs'
            },
            componentId: 'SPAN#',
            needsReview: true,
            issueId: 97578,
            html: '\u003cspan\u003eAutomate\u003c/span\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: [
              '.bstrap-wrapper:nth-child(4) \u003e .product-row.row:nth-child(1) \u003e .product-detail-card.col-md-4.text-link:nth-child(1) \u003e .product-container \u003e .product-container--header \u003e span'
            ],
            url: 'https://www.browserstack.com/docs/',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97578
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '9.0pt (12px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:14Z',
            htmltag: 'SPAN',
            page: {
              pageId: 'tYfw',
              timestamp: '2023-02-03T15:34:13Z',
              url: 'https://www.browserstack.com/docs/',
              title: 'Developer Documentation Home | BrowserStack Docs'
            },
            componentId: 'SPAN#',
            needsReview: true,
            issueId: 97579,
            html: '\u003cspan\u003eAutomate\u003c/span\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: [
              '.product-detail-card.col-md-4[href$="cypress"] \u003e .product-container \u003e .product-container--header \u003e span'
            ],
            url: 'https://www.browserstack.com/docs/',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97579
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '9.0pt (12px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:14Z',
            htmltag: 'SPAN',
            page: {
              pageId: 'tYfw',
              timestamp: '2023-02-03T15:34:13Z',
              url: 'https://www.browserstack.com/docs/',
              title: 'Developer Documentation Home | BrowserStack Docs'
            },
            componentId: 'SPAN#',
            needsReview: true,
            issueId: 97580,
            html: '\u003cspan\u003eAutomate\u003c/span\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: [
              '.product-detail-card.col-md-4[href$="playwright"] \u003e .product-container \u003e .product-container--header \u003e span'
            ],
            url: 'https://www.browserstack.com/docs/',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97580
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '9.0pt (12px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:14Z',
            htmltag: 'SPAN',
            page: {
              pageId: 'tYfw',
              timestamp: '2023-02-03T15:34:13Z',
              url: 'https://www.browserstack.com/docs/',
              title: 'Developer Documentation Home | BrowserStack Docs'
            },
            componentId: 'SPAN#',
            needsReview: true,
            issueId: 97581,
            html: '\u003cspan\u003eAutomate\u003c/span\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: [
              '.product-detail-card.col-md-4[href$="puppeteer"] \u003e .product-container \u003e .product-container--header \u003e span'
            ],
            url: 'https://www.browserstack.com/docs/',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97581
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#333333',
                  fontSize: '13.5pt (18px)',
                  fontWeight: 'normal',
                  messageKey: 'elmPartiallyObscured',
                  contrastRatio: 0,
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it's partially obscured by another element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--content" id="main-content"\u003e',
                    target: ['#main-content']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:14Z',
            htmltag: 'SPAN',
            page: {
              pageId: 'tYfw',
              timestamp: '2023-02-03T15:34:13Z',
              url: 'https://www.browserstack.com/docs/',
              title: 'Developer Documentation Home | BrowserStack Docs'
            },
            componentId: 'SPAN#',
            needsReview: true,
            issueId: 97582,
            html: '\u003cspan\u003e\n              \n              \u003cimg src="/docs/static/img/product-cards/puppeteer.svg" title="Puppeteer" loading="lazy"\u003e\n              \n\n            Puppeteer\n          \u003c/span\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it's partially obscured by another element",
            impact: 'serious',
            target: [
              '.product-detail-card.col-md-4[href$="puppeteer"] \u003e .product-container \u003e .product-container--content \u003e span'
            ],
            url: 'https://www.browserstack.com/docs/',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97582
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#666666',
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'elmPartiallyObscured',
                  contrastRatio: 0,
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it's partially obscured by another element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--content" id="main-content"\u003e',
                    target: ['#main-content']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:14Z',
            htmltag: 'P',
            page: {
              pageId: 'tYfw',
              timestamp: '2023-02-03T15:34:13Z',
              url: 'https://www.browserstack.com/docs/',
              title: 'Developer Documentation Home | BrowserStack Docs'
            },
            componentId: 'P#',
            needsReview: true,
            issueId: 97583,
            html: '\u003cp\u003eRun your Puppeteer tests across 100+ browser/OS combinations\u003c/p\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it's partially obscured by another element",
            impact: 'serious',
            target: [
              '.product-detail-card.col-md-4[href$="puppeteer"] \u003e .product-container \u003e .product-container--content \u003e p'
            ],
            url: 'https://www.browserstack.com/docs/',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97583
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '9.0pt (12px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:14Z',
            htmltag: 'SPAN',
            page: {
              pageId: 'tYfw',
              timestamp: '2023-02-03T15:34:13Z',
              url: 'https://www.browserstack.com/docs/',
              title: 'Developer Documentation Home | BrowserStack Docs'
            },
            componentId: 'SPAN#',
            needsReview: true,
            issueId: 97584,
            html: '\u003cspan\u003eAutomate\u003c/span\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: [
              '.bstrap-wrapper:nth-child(4) \u003e .product-row.row:nth-child(2) \u003e .product-detail-card.col-md-4.text-link:nth-child(2) \u003e .product-container \u003e .product-container--header \u003e span'
            ],
            url: 'https://www.browserstack.com/docs/',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97584
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#333333',
                  fontSize: '13.5pt (18px)',
                  fontWeight: 'normal',
                  messageKey: 'elmPartiallyObscured',
                  contrastRatio: 0,
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it's partially obscured by another element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--content" id="main-content"\u003e',
                    target: ['#main-content']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:14Z',
            htmltag: 'SPAN',
            page: {
              pageId: 'tYfw',
              timestamp: '2023-02-03T15:34:13Z',
              url: 'https://www.browserstack.com/docs/',
              title: 'Developer Documentation Home | BrowserStack Docs'
            },
            componentId: 'SPAN#',
            needsReview: true,
            issueId: 97585,
            html: '\u003cspan\u003e\n              \n              \u003cimg src="/docs/static/img/product-cards/javascript.svg" title="JS Testing" loading="lazy"\u003e\n              \n\n            JS Testing API\n          \u003c/span\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it's partially obscured by another element",
            impact: 'serious',
            target: [
              '.bstrap-wrapper:nth-child(4) \u003e .product-row.row:nth-child(2) \u003e .product-detail-card.col-md-4.text-link:nth-child(2) \u003e .product-container \u003e .product-container--content \u003e span'
            ],
            url: 'https://www.browserstack.com/docs/',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97585
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#666666',
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'elmPartiallyObscured',
                  contrastRatio: 0,
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it's partially obscured by another element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--content" id="main-content"\u003e',
                    target: ['#main-content']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:14Z',
            htmltag: 'P',
            page: {
              pageId: 'tYfw',
              timestamp: '2023-02-03T15:34:13Z',
              url: 'https://www.browserstack.com/docs/',
              title: 'Developer Documentation Home | BrowserStack Docs'
            },
            componentId: 'P#',
            needsReview: true,
            issueId: 97586,
            html: '\u003cp\u003eRun simple Javascript code on browsers using the JS Testing API\u003c/p\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it's partially obscured by another element",
            impact: 'serious',
            target: [
              '.bstrap-wrapper:nth-child(4) \u003e .product-row.row:nth-child(2) \u003e .product-detail-card.col-md-4.text-link:nth-child(2) \u003e .product-container \u003e .product-container--content \u003e p'
            ],
            url: 'https://www.browserstack.com/docs/',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97586
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '9.0pt (12px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:14Z',
            htmltag: 'SPAN',
            page: {
              pageId: 'tYfw',
              timestamp: '2023-02-03T15:34:13Z',
              url: 'https://www.browserstack.com/docs/',
              title: 'Developer Documentation Home | BrowserStack Docs'
            },
            componentId: 'SPAN#',
            needsReview: true,
            issueId: 97587,
            html: '\u003cspan\u003ePercy: visual testing\u003c/span\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: [
              'a[rel="noopener noreferrer"][href$="docs"][target="_blank"] \u003e .product-container \u003e .product-container--header \u003e span'
            ],
            url: 'https://www.browserstack.com/docs/',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97587
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#333333',
                  fontSize: '13.5pt (18px)',
                  fontWeight: 'normal',
                  messageKey: 'elmPartiallyObscured',
                  contrastRatio: 0,
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it's partially obscured by another element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--content" id="main-content"\u003e',
                    target: ['#main-content']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:14Z',
            htmltag: 'SPAN',
            page: {
              pageId: 'tYfw',
              timestamp: '2023-02-03T15:34:13Z',
              url: 'https://www.browserstack.com/docs/',
              title: 'Developer Documentation Home | BrowserStack Docs'
            },
            componentId: 'SPAN#',
            needsReview: true,
            issueId: 97588,
            html: '\u003cspan\u003e\n              \n              \u003cimg src="/docs/static/img/product-cards/percy.svg" title="Percy" loading="lazy"\u003e\n              \n\n            Percy\n          \u003c/span\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it's partially obscured by another element",
            impact: 'serious',
            target: [
              'a[rel="noopener noreferrer"][href$="docs"][target="_blank"] \u003e .product-container \u003e .product-container--content \u003e span'
            ],
            url: 'https://www.browserstack.com/docs/',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97588
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#666666',
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'elmPartiallyObscured',
                  contrastRatio: 0,
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it's partially obscured by another element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--content" id="main-content"\u003e',
                    target: ['#main-content']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:14Z',
            htmltag: 'P',
            page: {
              pageId: 'tYfw',
              timestamp: '2023-02-03T15:34:13Z',
              url: 'https://www.browserstack.com/docs/',
              title: 'Developer Documentation Home | BrowserStack Docs'
            },
            componentId: 'P#',
            needsReview: true,
            issueId: 97589,
            html: '\u003cp\u003eRun visual tests on desktop browsers and review changes with every commit.\u003c/p\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it's partially obscured by another element",
            impact: 'serious',
            target: [
              'a[rel="noopener noreferrer"][href$="docs"][target="_blank"] \u003e .product-container \u003e .product-container--content \u003e p'
            ],
            url: 'https://www.browserstack.com/docs/',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97589
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '9.0pt (12px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:14Z',
            htmltag: 'SPAN',
            page: {
              pageId: 'tYfw',
              timestamp: '2023-02-03T15:34:13Z',
              url: 'https://www.browserstack.com/docs/',
              title: 'Developer Documentation Home | BrowserStack Docs'
            },
            componentId: 'SPAN#',
            needsReview: true,
            issueId: 97590,
            html: '\u003cspan\u003eLive\u003c/span\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: [
              '.product-row.row:nth-child(3) \u003e .product-detail-card.col-md-4[href$="live"] \u003e .product-container \u003e .product-container--header \u003e span'
            ],
            url: 'https://www.browserstack.com/docs/',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97590
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#333333',
                  fontSize: '13.5pt (18px)',
                  fontWeight: 'normal',
                  messageKey: 'elmPartiallyObscured',
                  contrastRatio: 0,
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it's partially obscured by another element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--content" id="main-content"\u003e',
                    target: ['#main-content']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:14Z',
            htmltag: 'SPAN',
            page: {
              pageId: 'tYfw',
              timestamp: '2023-02-03T15:34:13Z',
              url: 'https://www.browserstack.com/docs/',
              title: 'Developer Documentation Home | BrowserStack Docs'
            },
            componentId: 'SPAN#',
            needsReview: true,
            issueId: 97591,
            html: '\u003cspan\u003e\n              \n              \u003cimg src="/docs/static/img/product-cards/live.svg" title="Live" loading="lazy"\u003e\n              \n\n            Live\n          \u003c/span\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it's partially obscured by another element",
            impact: 'serious',
            target: [
              '.product-row.row:nth-child(3) \u003e .product-detail-card.col-md-4[href$="live"] \u003e .product-container \u003e .product-container--content \u003e span'
            ],
            url: 'https://www.browserstack.com/docs/',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97591
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#666666',
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'elmPartiallyObscured',
                  contrastRatio: 0,
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it's partially obscured by another element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--content" id="main-content"\u003e',
                    target: ['#main-content']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:14Z',
            htmltag: 'P',
            page: {
              pageId: 'tYfw',
              timestamp: '2023-02-03T15:34:13Z',
              url: 'https://www.browserstack.com/docs/',
              title: 'Developer Documentation Home | BrowserStack Docs'
            },
            componentId: 'P#',
            needsReview: true,
            issueId: 97592,
            html: '\u003cp\u003eInteractively test and debug websites on desktop, real iOS and Android devices.\u003c/p\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it's partially obscured by another element",
            impact: 'serious',
            target: [
              '.product-row.row:nth-child(3) \u003e .product-detail-card.col-md-4[href$="live"] \u003e .product-container \u003e .product-container--content \u003e p'
            ],
            url: 'https://www.browserstack.com/docs/',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97592
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#333333',
                  fontSize: '21.0pt (28px)',
                  fontWeight: 'normal',
                  messageKey: 'elmPartiallyObscured',
                  contrastRatio: 0,
                  expectedContrastRatio: '3:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it's partially obscured by another element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--content" id="main-content"\u003e',
                    target: ['#main-content']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:14Z',
            htmltag: 'H2',
            page: {
              pageId: 'tYfw',
              timestamp: '2023-02-03T15:34:13Z',
              url: 'https://www.browserstack.com/docs/',
              title: 'Developer Documentation Home | BrowserStack Docs'
            },
            componentId: 'H2#',
            needsReview: true,
            issueId: 97593,
            html: '\u003ch2\u003eTest your mobile apps\u003c/h2\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it's partially obscured by another element",
            impact: 'serious',
            target: ['h2:nth-child(5)'],
            url: 'https://www.browserstack.com/docs/',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97593
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '9.0pt (12px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:14Z',
            htmltag: 'SPAN',
            page: {
              pageId: 'tYfw',
              timestamp: '2023-02-03T15:34:13Z',
              url: 'https://www.browserstack.com/docs/',
              title: 'Developer Documentation Home | BrowserStack Docs'
            },
            componentId: 'SPAN#',
            needsReview: true,
            issueId: 97594,
            html: '\u003cspan\u003eApp automate\u003c/span\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: [
              '.bstrap-wrapper:nth-child(6) \u003e .product-row.row:nth-child(1) \u003e .product-detail-card.col-md-4.text-link:nth-child(1) \u003e .product-container \u003e .product-container--header \u003e span'
            ],
            url: 'https://www.browserstack.com/docs/',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97594
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#333333',
                  fontSize: '13.5pt (18px)',
                  fontWeight: 'normal',
                  messageKey: 'elmPartiallyObscured',
                  contrastRatio: 0,
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it's partially obscured by another element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--content" id="main-content"\u003e',
                    target: ['#main-content']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:14Z',
            htmltag: 'SPAN',
            page: {
              pageId: 'tYfw',
              timestamp: '2023-02-03T15:34:13Z',
              url: 'https://www.browserstack.com/docs/',
              title: 'Developer Documentation Home | BrowserStack Docs'
            },
            componentId: 'SPAN#',
            needsReview: true,
            issueId: 97595,
            html: '\u003cspan\u003e\n              \n              \u003cimg src="/docs/static/img/product-cards/appium.svg" title="Appium" loading="lazy"\u003e\n              \n\n            Appium\n          \u003c/span\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it's partially obscured by another element",
            impact: 'serious',
            target: [
              '.bstrap-wrapper:nth-child(6) \u003e .product-row.row:nth-child(1) \u003e .product-detail-card.col-md-4.text-link:nth-child(1) \u003e .product-container \u003e .product-container--content \u003e span'
            ],
            url: 'https://www.browserstack.com/docs/',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97595
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#666666',
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'elmPartiallyObscured',
                  contrastRatio: 0,
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it's partially obscured by another element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--content" id="main-content"\u003e',
                    target: ['#main-content']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:14Z',
            htmltag: 'P',
            page: {
              pageId: 'tYfw',
              timestamp: '2023-02-03T15:34:13Z',
              url: 'https://www.browserstack.com/docs/',
              title: 'Developer Documentation Home | BrowserStack Docs'
            },
            componentId: 'P#',
            needsReview: true,
            issueId: 97596,
            html: '\u003cp\u003eTest your native and hybrid apps using Appium on real Android and iOS devices.\u003c/p\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it's partially obscured by another element",
            impact: 'serious',
            target: [
              '.bstrap-wrapper:nth-child(6) \u003e .product-row.row:nth-child(1) \u003e .product-detail-card.col-md-4.text-link:nth-child(1) \u003e .product-container \u003e .product-container--content \u003e p'
            ],
            url: 'https://www.browserstack.com/docs/',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97596
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '9.0pt (12px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:14Z',
            htmltag: 'SPAN',
            page: {
              pageId: 'tYfw',
              timestamp: '2023-02-03T15:34:13Z',
              url: 'https://www.browserstack.com/docs/',
              title: 'Developer Documentation Home | BrowserStack Docs'
            },
            componentId: 'SPAN#',
            needsReview: true,
            issueId: 97597,
            html: '\u003cspan\u003eApp automate\u003c/span\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: [
              '.bstrap-wrapper:nth-child(6) \u003e .product-row.row:nth-child(1) \u003e .product-detail-card.col-md-4.text-link:nth-child(2) \u003e .product-container \u003e .product-container--header \u003e span'
            ],
            url: 'https://www.browserstack.com/docs/',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97597
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#333333',
                  fontSize: '13.5pt (18px)',
                  fontWeight: 'normal',
                  messageKey: 'elmPartiallyObscured',
                  contrastRatio: 0,
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it's partially obscured by another element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--content" id="main-content"\u003e',
                    target: ['#main-content']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:14Z',
            htmltag: 'SPAN',
            page: {
              pageId: 'tYfw',
              timestamp: '2023-02-03T15:34:13Z',
              url: 'https://www.browserstack.com/docs/',
              title: 'Developer Documentation Home | BrowserStack Docs'
            },
            componentId: 'SPAN#',
            needsReview: true,
            issueId: 97598,
            html: '\u003cspan\u003e\n              \n              \u003cimg src="/docs/static/img/product-cards/espresso.svg" title="Espresso" loading="lazy"\u003e\n              \n\n            Espresso\n          \u003c/span\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it's partially obscured by another element",
            impact: 'serious',
            target: [
              '.bstrap-wrapper:nth-child(6) \u003e .product-row.row:nth-child(1) \u003e .product-detail-card.col-md-4.text-link:nth-child(2) \u003e .product-container \u003e .product-container--content \u003e span'
            ],
            url: 'https://www.browserstack.com/docs/',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97598
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#666666',
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'elmPartiallyObscured',
                  contrastRatio: 0,
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it's partially obscured by another element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--content" id="main-content"\u003e',
                    target: ['#main-content']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:14Z',
            htmltag: 'P',
            page: {
              pageId: 'tYfw',
              timestamp: '2023-02-03T15:34:13Z',
              url: 'https://www.browserstack.com/docs/',
              title: 'Developer Documentation Home | BrowserStack Docs'
            },
            componentId: 'P#',
            needsReview: true,
            issueId: 97599,
            html: '\u003cp\u003eTest your native and hybrid apps using Espresso on real Android devices.\u003c/p\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it's partially obscured by another element",
            impact: 'serious',
            target: [
              '.bstrap-wrapper:nth-child(6) \u003e .product-row.row:nth-child(1) \u003e .product-detail-card.col-md-4.text-link:nth-child(2) \u003e .product-container \u003e .product-container--content \u003e p'
            ],
            url: 'https://www.browserstack.com/docs/',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97599
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '9.0pt (12px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:14Z',
            htmltag: 'SPAN',
            page: {
              pageId: 'tYfw',
              timestamp: '2023-02-03T15:34:13Z',
              url: 'https://www.browserstack.com/docs/',
              title: 'Developer Documentation Home | BrowserStack Docs'
            },
            componentId: 'SPAN#',
            needsReview: true,
            issueId: 97600,
            html: '\u003cspan\u003eApp automate\u003c/span\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: [
              '.bstrap-wrapper:nth-child(6) \u003e .product-row.row:nth-child(1) \u003e .product-detail-card.col-md-4.text-link:nth-child(3) \u003e .product-container \u003e .product-container--header \u003e span'
            ],
            url: 'https://www.browserstack.com/docs/',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97600
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#333333',
                  fontSize: '13.5pt (18px)',
                  fontWeight: 'normal',
                  messageKey: 'elmPartiallyObscured',
                  contrastRatio: 0,
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it's partially obscured by another element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--content" id="main-content"\u003e',
                    target: ['#main-content']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:14Z',
            htmltag: 'SPAN',
            page: {
              pageId: 'tYfw',
              timestamp: '2023-02-03T15:34:13Z',
              url: 'https://www.browserstack.com/docs/',
              title: 'Developer Documentation Home | BrowserStack Docs'
            },
            componentId: 'SPAN#',
            needsReview: true,
            issueId: 97601,
            html: '\u003cspan\u003e\n              \n              \u003cimg src="/docs/static/img/product-cards/xcuitest.svg" title="XCUITest" loading="lazy"\u003e\n              \n\n            XCUITest\n          \u003c/span\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it's partially obscured by another element",
            impact: 'serious',
            target: [
              '.bstrap-wrapper:nth-child(6) \u003e .product-row.row:nth-child(1) \u003e .product-detail-card.col-md-4.text-link:nth-child(3) \u003e .product-container \u003e .product-container--content \u003e span'
            ],
            url: 'https://www.browserstack.com/docs/',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97601
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#666666',
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'elmPartiallyObscured',
                  contrastRatio: 0,
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it's partially obscured by another element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--content" id="main-content"\u003e',
                    target: ['#main-content']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:14Z',
            htmltag: 'P',
            page: {
              pageId: 'tYfw',
              timestamp: '2023-02-03T15:34:13Z',
              url: 'https://www.browserstack.com/docs/',
              title: 'Developer Documentation Home | BrowserStack Docs'
            },
            componentId: 'P#',
            needsReview: true,
            issueId: 97602,
            html: '\u003cp\u003eTest your native and hybrid apps using XCUITest on real iOS devices.\u003c/p\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it's partially obscured by another element",
            impact: 'serious',
            target: [
              '.bstrap-wrapper:nth-child(6) \u003e .product-row.row:nth-child(1) \u003e .product-detail-card.col-md-4.text-link:nth-child(3) \u003e .product-container \u003e .product-container--content \u003e p'
            ],
            url: 'https://www.browserstack.com/docs/',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97602
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '9.0pt (12px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:14Z',
            htmltag: 'SPAN',
            page: {
              pageId: 'tYfw',
              timestamp: '2023-02-03T15:34:13Z',
              url: 'https://www.browserstack.com/docs/',
              title: 'Developer Documentation Home | BrowserStack Docs'
            },
            componentId: 'SPAN#',
            needsReview: true,
            issueId: 97603,
            html: '\u003cspan\u003eApp automate\u003c/span\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: [
              '.bstrap-wrapper:nth-child(6) \u003e .product-row.row:nth-child(2) \u003e .product-detail-card.col-md-4.text-link:nth-child(1) \u003e .product-container \u003e .product-container--header \u003e span'
            ],
            url: 'https://www.browserstack.com/docs/',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97603
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#333333',
                  fontSize: '13.5pt (18px)',
                  fontWeight: 'normal',
                  messageKey: 'elmPartiallyObscured',
                  contrastRatio: 0,
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it's partially obscured by another element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--content" id="main-content"\u003e',
                    target: ['#main-content']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:14Z',
            htmltag: 'SPAN',
            page: {
              pageId: 'tYfw',
              timestamp: '2023-02-03T15:34:13Z',
              url: 'https://www.browserstack.com/docs/',
              title: 'Developer Documentation Home | BrowserStack Docs'
            },
            componentId: 'SPAN#',
            needsReview: true,
            issueId: 97604,
            html: '\u003cspan\u003e\n              \n              \u003cimg src="/docs/static/img/product-cards/earlgrey.svg" title="EarlGrey" loading="lazy"\u003e\n              \n\n            EarlGrey\n          \u003c/span\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it's partially obscured by another element",
            impact: 'serious',
            target: [
              '.bstrap-wrapper:nth-child(6) \u003e .product-row.row:nth-child(2) \u003e .product-detail-card.col-md-4.text-link:nth-child(1) \u003e .product-container \u003e .product-container--content \u003e span'
            ],
            url: 'https://www.browserstack.com/docs/',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97604
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#666666',
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'elmPartiallyObscured',
                  contrastRatio: 0,
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it's partially obscured by another element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--content" id="main-content"\u003e',
                    target: ['#main-content']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:14Z',
            htmltag: 'P',
            page: {
              pageId: 'tYfw',
              timestamp: '2023-02-03T15:34:13Z',
              url: 'https://www.browserstack.com/docs/',
              title: 'Developer Documentation Home | BrowserStack Docs'
            },
            componentId: 'P#',
            needsReview: true,
            issueId: 97605,
            html: '\u003cp\u003eTest your native and hybrid apps using EarlGrey on real iOS devices.\u003c/p\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it's partially obscured by another element",
            impact: 'serious',
            target: [
              '.bstrap-wrapper:nth-child(6) \u003e .product-row.row:nth-child(2) \u003e .product-detail-card.col-md-4.text-link:nth-child(1) \u003e .product-container \u003e .product-container--content \u003e p'
            ],
            url: 'https://www.browserstack.com/docs/',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97605
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '9.0pt (12px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:14Z',
            htmltag: 'SPAN',
            page: {
              pageId: 'tYfw',
              timestamp: '2023-02-03T15:34:13Z',
              url: 'https://www.browserstack.com/docs/',
              title: 'Developer Documentation Home | BrowserStack Docs'
            },
            componentId: 'SPAN#',
            needsReview: true,
            issueId: 97606,
            html: '\u003cspan\u003eApp automate\u003c/span\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: [
              '.bstrap-wrapper:nth-child(6) \u003e .product-row.row:nth-child(2) \u003e .product-detail-card.col-md-4.text-link:nth-child(2) \u003e .product-container \u003e .product-container--header \u003e span'
            ],
            url: 'https://www.browserstack.com/docs/',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97606
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#333333',
                  fontSize: '13.5pt (18px)',
                  fontWeight: 'normal',
                  messageKey: 'elmPartiallyObscured',
                  contrastRatio: 0,
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it's partially obscured by another element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--content" id="main-content"\u003e',
                    target: ['#main-content']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:14Z',
            htmltag: 'SPAN',
            page: {
              pageId: 'tYfw',
              timestamp: '2023-02-03T15:34:13Z',
              url: 'https://www.browserstack.com/docs/',
              title: 'Developer Documentation Home | BrowserStack Docs'
            },
            componentId: 'SPAN#',
            needsReview: true,
            issueId: 97607,
            html: '\u003cspan\u003e\n              \n              \u003cimg src="/docs/static/img/product-cards/icons8-flutter.svg" title="Flutter" loading="lazy"\u003e\n              \n\n            Flutter\n          \u003c/span\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it's partially obscured by another element",
            impact: 'serious',
            target: [
              '.bstrap-wrapper:nth-child(6) \u003e .product-row.row:nth-child(2) \u003e .product-detail-card.col-md-4.text-link:nth-child(2) \u003e .product-container \u003e .product-container--content \u003e span'
            ],
            url: 'https://www.browserstack.com/docs/',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97607
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#666666',
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'elmPartiallyObscured',
                  contrastRatio: 0,
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it's partially obscured by another element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--content" id="main-content"\u003e',
                    target: ['#main-content']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:14Z',
            htmltag: 'P',
            page: {
              pageId: 'tYfw',
              timestamp: '2023-02-03T15:34:13Z',
              url: 'https://www.browserstack.com/docs/',
              title: 'Developer Documentation Home | BrowserStack Docs'
            },
            componentId: 'P#',
            needsReview: true,
            issueId: 97608,
            html: '\u003cp\u003eTest your native and hybrid apps using Flutter on real Android and iOS devices.\u003c/p\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it's partially obscured by another element",
            impact: 'serious',
            target: [
              '.bstrap-wrapper:nth-child(6) \u003e .product-row.row:nth-child(2) \u003e .product-detail-card.col-md-4.text-link:nth-child(2) \u003e .product-container \u003e .product-container--content \u003e p'
            ],
            url: 'https://www.browserstack.com/docs/',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97608
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '9.0pt (12px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:14Z',
            htmltag: 'SPAN',
            page: {
              pageId: 'tYfw',
              timestamp: '2023-02-03T15:34:13Z',
              url: 'https://www.browserstack.com/docs/',
              title: 'Developer Documentation Home | BrowserStack Docs'
            },
            componentId: 'SPAN#',
            needsReview: true,
            issueId: 97609,
            html: '\u003cspan\u003eApp live\u003c/span\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: [
              '.product-detail-card.col-md-4[href$="app-live"] \u003e .product-container \u003e .product-container--header \u003e span'
            ],
            url: 'https://www.browserstack.com/docs/',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97609
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#333333',
                  fontSize: '13.5pt (18px)',
                  fontWeight: 'normal',
                  messageKey: 'elmPartiallyObscured',
                  contrastRatio: 0,
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it's partially obscured by another element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--content" id="main-content"\u003e',
                    target: ['#main-content']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:14Z',
            htmltag: 'SPAN',
            page: {
              pageId: 'tYfw',
              timestamp: '2023-02-03T15:34:13Z',
              url: 'https://www.browserstack.com/docs/',
              title: 'Developer Documentation Home | BrowserStack Docs'
            },
            componentId: 'SPAN#',
            needsReview: true,
            issueId: 97610,
            html: '\u003cspan\u003e\n              \n              \u003cimg src="/docs/static/img/product-cards/applive.svg" title="App Live" loading="lazy"\u003e\n              \n\n            App Live\n          \u003c/span\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it's partially obscured by another element",
            impact: 'serious',
            target: [
              '.product-detail-card.col-md-4[href$="app-live"] \u003e .product-container \u003e .product-container--content \u003e span'
            ],
            url: 'https://www.browserstack.com/docs/',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97610
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#666666',
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'elmPartiallyObscured',
                  contrastRatio: 0,
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it's partially obscured by another element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--content" id="main-content"\u003e',
                    target: ['#main-content']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:14Z',
            htmltag: 'P',
            page: {
              pageId: 'tYfw',
              timestamp: '2023-02-03T15:34:13Z',
              url: 'https://www.browserstack.com/docs/',
              title: 'Developer Documentation Home | BrowserStack Docs'
            },
            componentId: 'P#',
            needsReview: true,
            issueId: 97611,
            html: '\u003cp\u003eInteractively test native and hybrid mobile apps on real iOS and Android devices.\u003c/p\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it's partially obscured by another element",
            impact: 'serious',
            target: [
              '.product-detail-card.col-md-4[href$="app-live"] \u003e .product-container \u003e .product-container--content \u003e p'
            ],
            url: 'https://www.browserstack.com/docs/',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97611
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#333333',
                  fontSize: '21.0pt (28px)',
                  fontWeight: 'normal',
                  messageKey: 'elmPartiallyObscured',
                  contrastRatio: 0,
                  expectedContrastRatio: '3:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it's partially obscured by another element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--content" id="main-content"\u003e',
                    target: ['#main-content']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:14Z',
            htmltag: 'H2',
            page: {
              pageId: 'tYfw',
              timestamp: '2023-02-03T15:34:13Z',
              url: 'https://www.browserstack.com/docs/',
              title: 'Developer Documentation Home | BrowserStack Docs'
            },
            componentId: 'H2#',
            needsReview: true,
            issueId: 97612,
            html: '\u003ch2\u003eTest your Smart TV apps\u003c/h2\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it's partially obscured by another element",
            impact: 'serious',
            target: ['h2:nth-child(7)'],
            url: 'https://www.browserstack.com/docs/',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97612
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fontSize: '9.0pt (12px)',
                  fontWeight: 'normal',
                  messageKey: 'pseudoContent',
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined due to a pseudo element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--container"\u003e',
                    target: ['.docs--container']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:14Z',
            htmltag: 'SPAN',
            page: {
              pageId: 'tYfw',
              timestamp: '2023-02-03T15:34:13Z',
              url: 'https://www.browserstack.com/docs/',
              title: 'Developer Documentation Home | BrowserStack Docs'
            },
            componentId: 'SPAN#',
            needsReview: true,
            issueId: 97613,
            html: '\u003cspan\u003eApp automate\u003c/span\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element",
            impact: 'serious',
            target: [
              'a[href$="smart-tv"] \u003e .product-container \u003e .product-container--header \u003e span'
            ],
            url: 'https://www.browserstack.com/docs/',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97613
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#333333',
                  fontSize: '13.5pt (18px)',
                  fontWeight: 'normal',
                  messageKey: 'elmPartiallyObscured',
                  contrastRatio: 0,
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it's partially obscured by another element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--content" id="main-content"\u003e',
                    target: ['#main-content']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:14Z',
            htmltag: 'SPAN',
            page: {
              pageId: 'tYfw',
              timestamp: '2023-02-03T15:34:13Z',
              url: 'https://www.browserstack.com/docs/',
              title: 'Developer Documentation Home | BrowserStack Docs'
            },
            componentId: 'SPAN#',
            needsReview: true,
            issueId: 97614,
            html: '\u003cspan\u003e\n              \n              \u003cimg src="/docs/static/img/product-cards/appium.svg" title="Appium" loading="lazy"\u003e\n              \n\n            Appium\n          \u003c/span\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it's partially obscured by another element",
            impact: 'serious',
            target: [
              'a[href$="smart-tv"] \u003e .product-container \u003e .product-container--content \u003e span'
            ],
            url: 'https://www.browserstack.com/docs/',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97614
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#666666',
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'elmPartiallyObscured',
                  contrastRatio: 0,
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it's partially obscured by another element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--content" id="main-content"\u003e',
                    target: ['#main-content']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:14Z',
            htmltag: 'P',
            page: {
              pageId: 'tYfw',
              timestamp: '2023-02-03T15:34:13Z',
              url: 'https://www.browserstack.com/docs/',
              title: 'Developer Documentation Home | BrowserStack Docs'
            },
            componentId: 'P#',
            needsReview: true,
            issueId: 97615,
            html: '\u003cp\u003eTest your Fire TV OS apps using Appium on real Smart TV testing cloud with App Automate.\u003c/p\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it's partially obscured by another element",
            impact: 'serious',
            target: [
              'a[href$="smart-tv"] \u003e .product-container \u003e .product-container--content \u003e p'
            ],
            url: 'https://www.browserstack.com/docs/',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97615
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#333333',
                  fontSize: '21.0pt (28px)',
                  fontWeight: 'normal',
                  messageKey: 'elmPartiallyObscured',
                  contrastRatio: 0,
                  expectedContrastRatio: '3:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it's partially obscured by another element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--content" id="main-content"\u003e',
                    target: ['#main-content']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:14Z',
            htmltag: 'H2',
            page: {
              pageId: 'tYfw',
              timestamp: '2023-02-03T15:34:13Z',
              url: 'https://www.browserstack.com/docs/',
              title: 'Developer Documentation Home | BrowserStack Docs'
            },
            componentId: 'H2#',
            needsReview: true,
            issueId: 97616,
            html: '\u003ch2\u003eOther documentation \u0026amp; references\u003c/h2\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it's partially obscured by another element",
            impact: 'serious',
            target: ['h2:nth-child(9)'],
            url: 'https://www.browserstack.com/docs/',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97616
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#333333',
                  fontSize: '13.5pt (18px)',
                  fontWeight: 'normal',
                  messageKey: 'elmPartiallyObscured',
                  contrastRatio: 0,
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it's partially obscured by another element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--content" id="main-content"\u003e',
                    target: ['#main-content']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:14Z',
            htmltag: 'SPAN',
            page: {
              pageId: 'tYfw',
              timestamp: '2023-02-03T15:34:13Z',
              url: 'https://www.browserstack.com/docs/',
              title: 'Developer Documentation Home | BrowserStack Docs'
            },
            componentId: 'SPAN#',
            needsReview: true,
            issueId: 97617,
            html: '\u003cspan\u003e\n              \n\n            Local Testing\n          \u003c/span\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it's partially obscured by another element",
            impact: 'serious',
            target: [
              '.product-detail-card.col-md-4[href$="local-testing"] \u003e .product-container \u003e .product-container--content \u003e span'
            ],
            url: 'https://www.browserstack.com/docs/',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97617
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#666666',
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'elmPartiallyObscured',
                  contrastRatio: 0,
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it's partially obscured by another element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--content" id="main-content"\u003e',
                    target: ['#main-content']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:14Z',
            htmltag: 'P',
            page: {
              pageId: 'tYfw',
              timestamp: '2023-02-03T15:34:13Z',
              url: 'https://www.browserstack.com/docs/',
              title: 'Developer Documentation Home | BrowserStack Docs'
            },
            componentId: 'P#',
            needsReview: true,
            issueId: 97618,
            html: '\u003cp\u003eTest web apps hosted on internal and staging environments.\u003c/p\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it's partially obscured by another element",
            impact: 'serious',
            target: [
              '.product-detail-card.col-md-4[href$="local-testing"] \u003e .product-container \u003e .product-container--content \u003e p'
            ],
            url: 'https://www.browserstack.com/docs/',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97618
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#333333',
                  fontSize: '13.5pt (18px)',
                  fontWeight: 'normal',
                  messageKey: 'elmPartiallyObscured',
                  contrastRatio: 0,
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it's partially obscured by another element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--content" id="main-content"\u003e',
                    target: ['#main-content']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:14Z',
            htmltag: 'SPAN',
            page: {
              pageId: 'tYfw',
              timestamp: '2023-02-03T15:34:13Z',
              url: 'https://www.browserstack.com/docs/',
              title: 'Developer Documentation Home | BrowserStack Docs'
            },
            componentId: 'SPAN#',
            needsReview: true,
            issueId: 97619,
            html: '\u003cspan\u003e\n              \n\n            Screenshots\n          \u003c/span\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it's partially obscured by another element",
            impact: 'serious',
            target: [
              '.product-detail-card.col-md-4[href$="screenshots"] \u003e .product-container \u003e .product-container--content \u003e span'
            ],
            url: 'https://www.browserstack.com/docs/',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97619
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#666666',
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'elmPartiallyObscured',
                  contrastRatio: 0,
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it's partially obscured by another element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--content" id="main-content"\u003e',
                    target: ['#main-content']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:14Z',
            htmltag: 'P',
            page: {
              pageId: 'tYfw',
              timestamp: '2023-02-03T15:34:13Z',
              url: 'https://www.browserstack.com/docs/',
              title: 'Developer Documentation Home | BrowserStack Docs'
            },
            componentId: 'P#',
            needsReview: true,
            issueId: 97620,
            html: '\u003cp\u003eGenerate multiple screenshots using the Screenshots API.\u003c/p\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it's partially obscured by another element",
            impact: 'serious',
            target: [
              '.product-detail-card.col-md-4[href$="screenshots"] \u003e .product-container \u003e .product-container--content \u003e p'
            ],
            url: 'https://www.browserstack.com/docs/',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97620
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#333333',
                  fontSize: '13.5pt (18px)',
                  fontWeight: 'normal',
                  messageKey: 'elmPartiallyObscured',
                  contrastRatio: 0,
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it's partially obscured by another element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--content" id="main-content"\u003e',
                    target: ['#main-content']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:14Z',
            htmltag: 'SPAN',
            page: {
              pageId: 'tYfw',
              timestamp: '2023-02-03T15:34:13Z',
              url: 'https://www.browserstack.com/docs/',
              title: 'Developer Documentation Home | BrowserStack Docs'
            },
            componentId: 'SPAN#',
            needsReview: true,
            issueId: 97621,
            html: '\u003cspan\u003e\n              \n\n            Speedlab\n          \u003c/span\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it's partially obscured by another element",
            impact: 'serious',
            target: [
              '.bstrap-wrapper:nth-child(10) \u003e .product-row.row:nth-child(1) \u003e .product-detail-card.col-md-4.text-link:nth-child(3) \u003e .product-container \u003e .product-container--content \u003e span'
            ],
            url: 'https://www.browserstack.com/docs/',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97621
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#666666',
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'elmPartiallyObscured',
                  contrastRatio: 0,
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it's partially obscured by another element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--content" id="main-content"\u003e',
                    target: ['#main-content']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:14Z',
            htmltag: 'P',
            page: {
              pageId: 'tYfw',
              timestamp: '2023-02-03T15:34:13Z',
              url: 'https://www.browserstack.com/docs/',
              title: 'Developer Documentation Home | BrowserStack Docs'
            },
            componentId: 'P#',
            needsReview: true,
            issueId: 97622,
            html: '\u003cp\u003eYour guide for using SpeedLab and getting insights from the test results.\u003c/p\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it's partially obscured by another element",
            impact: 'serious',
            target: [
              '.bstrap-wrapper:nth-child(10) \u003e .product-row.row:nth-child(1) \u003e .product-detail-card.col-md-4.text-link:nth-child(3) \u003e .product-container \u003e .product-container--content \u003e p'
            ],
            url: 'https://www.browserstack.com/docs/',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97622
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#333333',
                  fontSize: '13.5pt (18px)',
                  fontWeight: 'normal',
                  messageKey: 'elmPartiallyObscured',
                  contrastRatio: 0,
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it's partially obscured by another element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--content" id="main-content"\u003e',
                    target: ['#main-content']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:14Z',
            htmltag: 'SPAN',
            page: {
              pageId: 'tYfw',
              timestamp: '2023-02-03T15:34:13Z',
              url: 'https://www.browserstack.com/docs/',
              title: 'Developer Documentation Home | BrowserStack Docs'
            },
            componentId: 'SPAN#',
            needsReview: true,
            issueId: 97623,
            html: '\u003cspan\u003e\n              \n\n            Enterprise\n          \u003c/span\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it's partially obscured by another element",
            impact: 'serious',
            target: [
              '.product-detail-card.col-md-4[href$="enterprise"] \u003e .product-container \u003e .product-container--content \u003e span'
            ],
            url: 'https://www.browserstack.com/docs/',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97623
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#666666',
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'elmPartiallyObscured',
                  contrastRatio: 0,
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it's partially obscured by another element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--content" id="main-content"\u003e',
                    target: ['#main-content']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:14Z',
            htmltag: 'P',
            page: {
              pageId: 'tYfw',
              timestamp: '2023-02-03T15:34:13Z',
              url: 'https://www.browserstack.com/docs/',
              title: 'Developer Documentation Home | BrowserStack Docs'
            },
            componentId: 'P#',
            needsReview: true,
            issueId: 97624,
            html: '\u003cp\u003eExplore Enterprise features, learn about data control and visualization.\u003c/p\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it's partially obscured by another element",
            impact: 'serious',
            target: [
              '.product-detail-card.col-md-4[href$="enterprise"] \u003e .product-container \u003e .product-container--content \u003e p'
            ],
            url: 'https://www.browserstack.com/docs/',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97624
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#333333',
                  fontSize: '13.5pt (18px)',
                  fontWeight: 'normal',
                  messageKey: 'elmPartiallyObscured',
                  contrastRatio: 0,
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it's partially obscured by another element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--content" id="main-content"\u003e',
                    target: ['#main-content']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:14Z',
            htmltag: 'SPAN',
            page: {
              pageId: 'tYfw',
              timestamp: '2023-02-03T15:34:13Z',
              url: 'https://www.browserstack.com/docs/',
              title: 'Developer Documentation Home | BrowserStack Docs'
            },
            componentId: 'SPAN#',
            needsReview: true,
            issueId: 97625,
            html: '\u003cspan\u003e\n              \n\n            Test University\n          \u003c/span\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it's partially obscured by another element",
            impact: 'serious',
            target: [
              '.bstrap-wrapper:nth-child(10) \u003e .product-row.row:nth-child(2) \u003e .product-detail-card.col-md-4.text-link:nth-child(2) \u003e .product-container \u003e .product-container--content \u003e span'
            ],
            url: 'https://www.browserstack.com/docs/',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97625
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#666666',
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'elmPartiallyObscured',
                  contrastRatio: 0,
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it's partially obscured by another element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--content" id="main-content"\u003e',
                    target: ['#main-content']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:14Z',
            htmltag: 'P',
            page: {
              pageId: 'tYfw',
              timestamp: '2023-02-03T15:34:13Z',
              url: 'https://www.browserstack.com/docs/',
              title: 'Developer Documentation Home | BrowserStack Docs'
            },
            componentId: 'P#',
            needsReview: true,
            issueId: 97626,
            html: '\u003cp\u003eSelf-paced learning courses to learn about integrating with BrowserStack .\u003c/p\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it's partially obscured by another element",
            impact: 'serious',
            target: [
              '.bstrap-wrapper:nth-child(10) \u003e .product-row.row:nth-child(2) \u003e .product-detail-card.col-md-4.text-link:nth-child(2) \u003e .product-container \u003e .product-container--content \u003e p'
            ],
            url: 'https://www.browserstack.com/docs/',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97626
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#333333',
                  fontSize: '31.5pt (42px)',
                  fontWeight: 'normal',
                  messageKey: 'elmPartiallyObscured',
                  contrastRatio: 0,
                  expectedContrastRatio: '3:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it's partially obscured by another element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--content" id="main-content"\u003e',
                    target: ['#main-content']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:23Z',
            htmltag: 'H1',
            page: {
              pageId: 'tYfw',
              timestamp: '2023-02-03T15:34:13Z',
              url: 'https://www.browserstack.com/docs/',
              title: 'Developer Documentation Home | BrowserStack Docs'
            },
            componentId: 'H1#',
            needsReview: true,
            issueId: 97627,
            html: '\u003ch1 id="documentation"\u003eDocumentation\u003c/h1\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it's partially obscured by another element",
            impact: 'serious',
            target: ['#documentation'],
            url: 'https://www.browserstack.com/docs/',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97627
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#333333',
                  fontSize: '15.8pt (21px)',
                  fontWeight: 'normal',
                  messageKey: 'elmPartiallyObscured',
                  contrastRatio: 0,
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it's partially obscured by another element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--content" id="main-content"\u003e',
                    target: ['#main-content']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:23Z',
            htmltag: 'P',
            page: {
              pageId: 'tYfw',
              timestamp: '2023-02-03T15:34:13Z',
              url: 'https://www.browserstack.com/docs/',
              title: 'Developer Documentation Home | BrowserStack Docs'
            },
            componentId: 'P#site-home-intro',
            needsReview: true,
            issueId: 97628,
            html: '\u003cp class="site-home-intro"\u003e\n  Welcome to BrowserStack developer documentation! Here you\'ll find everything\n  you need to test and debug your native, hybrid and web applications on real\n  devices and desktop browsers.\n\u003c/p\u003e',
            classList: 'site-home-intro',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it's partially obscured by another element",
            impact: 'serious',
            target: ['.site-home-intro'],
            url: 'https://www.browserstack.com/docs/',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97628
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#333333',
                  fontSize: '21.0pt (28px)',
                  fontWeight: 'normal',
                  messageKey: 'elmPartiallyObscured',
                  contrastRatio: 0,
                  expectedContrastRatio: '3:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it's partially obscured by another element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--content" id="main-content"\u003e',
                    target: ['#main-content']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:23Z',
            htmltag: 'H2',
            page: {
              pageId: 'tYfw',
              timestamp: '2023-02-03T15:34:13Z',
              url: 'https://www.browserstack.com/docs/',
              title: 'Developer Documentation Home | BrowserStack Docs'
            },
            componentId: 'H2#',
            needsReview: true,
            issueId: 97629,
            html: '\u003ch2\u003eTest your websites\u003c/h2\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it's partially obscured by another element",
            impact: 'serious',
            target: ['h2:nth-child(3)'],
            url: 'https://www.browserstack.com/docs/',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97629
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#333333',
                  fontSize: '13.5pt (18px)',
                  fontWeight: 'normal',
                  messageKey: 'elmPartiallyObscured',
                  contrastRatio: 0,
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it's partially obscured by another element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--content" id="main-content"\u003e',
                    target: ['#main-content']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:23Z',
            htmltag: 'SPAN',
            page: {
              pageId: 'tYfw',
              timestamp: '2023-02-03T15:34:13Z',
              url: 'https://www.browserstack.com/docs/',
              title: 'Developer Documentation Home | BrowserStack Docs'
            },
            componentId: 'SPAN#',
            needsReview: true,
            issueId: 97630,
            html: '\u003cspan\u003e\n              \n              \u003cimg src="/docs/static/img/product-cards/selenium.svg" title="Selenium" loading="lazy"\u003e\n              \n\n            Selenium\n          \u003c/span\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it's partially obscured by another element",
            impact: 'serious',
            target: [
              '.bstrap-wrapper:nth-child(4) \u003e .product-row.row:nth-child(1) \u003e .product-detail-card.col-md-4.text-link:nth-child(1) \u003e .product-container \u003e .product-container--content \u003e span'
            ],
            url: 'https://www.browserstack.com/docs/',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97630
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#666666',
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'elmPartiallyObscured',
                  contrastRatio: 0,
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it's partially obscured by another element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--content" id="main-content"\u003e',
                    target: ['#main-content']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:23Z',
            htmltag: 'P',
            page: {
              pageId: 'tYfw',
              timestamp: '2023-02-03T15:34:13Z',
              url: 'https://www.browserstack.com/docs/',
              title: 'Developer Documentation Home | BrowserStack Docs'
            },
            componentId: 'P#',
            needsReview: true,
            issueId: 97631,
            html: '\u003cp\u003eRun your Selenium tests on desktop browsers, real iOS and Android devices.\u003c/p\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it's partially obscured by another element",
            impact: 'serious',
            target: [
              '.bstrap-wrapper:nth-child(4) \u003e .product-row.row:nth-child(1) \u003e .product-detail-card.col-md-4.text-link:nth-child(1) \u003e .product-container \u003e .product-container--content \u003e p'
            ],
            url: 'https://www.browserstack.com/docs/',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97631
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#333333',
                  fontSize: '13.5pt (18px)',
                  fontWeight: 'normal',
                  messageKey: 'elmPartiallyObscured',
                  contrastRatio: 0,
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it's partially obscured by another element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--content" id="main-content"\u003e',
                    target: ['#main-content']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:23Z',
            htmltag: 'SPAN',
            page: {
              pageId: 'tYfw',
              timestamp: '2023-02-03T15:34:13Z',
              url: 'https://www.browserstack.com/docs/',
              title: 'Developer Documentation Home | BrowserStack Docs'
            },
            componentId: 'SPAN#',
            needsReview: true,
            issueId: 97632,
            html: '\u003cspan\u003e\n              \n              \u003cimg src="/docs/static/img/product-cards/cypress.svg" title="Cypress" loading="lazy"\u003e\n              \n\n            Cypress\n          \u003c/span\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it's partially obscured by another element",
            impact: 'serious',
            target: [
              '.product-detail-card.col-md-4[href$="cypress"] \u003e .product-container \u003e .product-container--content \u003e span'
            ],
            url: 'https://www.browserstack.com/docs/',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97632
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#666666',
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'elmPartiallyObscured',
                  contrastRatio: 0,
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it's partially obscured by another element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--content" id="main-content"\u003e',
                    target: ['#main-content']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:23Z',
            htmltag: 'P',
            page: {
              pageId: 'tYfw',
              timestamp: '2023-02-03T15:34:13Z',
              url: 'https://www.browserstack.com/docs/',
              title: 'Developer Documentation Home | BrowserStack Docs'
            },
            componentId: 'P#',
            needsReview: true,
            issueId: 97633,
            html: '\u003cp\u003eRun your Cypress tests on a range of desktop browsers on Windows 10 and macOS.\u003c/p\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it's partially obscured by another element",
            impact: 'serious',
            target: [
              '.product-detail-card.col-md-4[href$="cypress"] \u003e .product-container \u003e .product-container--content \u003e p'
            ],
            url: 'https://www.browserstack.com/docs/',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97633
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#333333',
                  fontSize: '13.5pt (18px)',
                  fontWeight: 'normal',
                  messageKey: 'elmPartiallyObscured',
                  contrastRatio: 0,
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it's partially obscured by another element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--content" id="main-content"\u003e',
                    target: ['#main-content']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:23Z',
            htmltag: 'SPAN',
            page: {
              pageId: 'tYfw',
              timestamp: '2023-02-03T15:34:13Z',
              url: 'https://www.browserstack.com/docs/',
              title: 'Developer Documentation Home | BrowserStack Docs'
            },
            componentId: 'SPAN#',
            needsReview: true,
            issueId: 97634,
            html: '\u003cspan\u003e\n              \n              \u003cimg src="/docs/static/img/product-cards/playwright.svg" title="Playwright" loading="lazy"\u003e\n              \n\n            Playwright\n          \u003c/span\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it's partially obscured by another element",
            impact: 'serious',
            target: [
              '.product-detail-card.col-md-4[href$="playwright"] \u003e .product-container \u003e .product-container--content \u003e span'
            ],
            url: 'https://www.browserstack.com/docs/',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97634
              }
            ]
          },
          {
            all: [],
            any: [
              {
                id: 'color-contrast',
                data: {
                  fgColor: '#666666',
                  fontSize: '12.0pt (16px)',
                  fontWeight: 'normal',
                  messageKey: 'elmPartiallyObscured',
                  contrastRatio: 0,
                  expectedContrastRatio: '4.5:1'
                },
                impact: 'serious',
                message:
                  "Element's background color could not be determined because it's partially obscured by another element",
                relatedNodes: [
                  {
                    html: '\u003cdiv class="docs--content" id="main-content"\u003e',
                    target: ['#main-content']
                  }
                ]
              }
            ],
            none: [],
            timestamp: '2023-02-03T15:34:23Z',
            htmltag: 'P',
            page: {
              pageId: 'tYfw',
              timestamp: '2023-02-03T15:34:13Z',
              url: 'https://www.browserstack.com/docs/',
              title: 'Developer Documentation Home | BrowserStack Docs'
            },
            componentId: 'P#',
            needsReview: true,
            issueId: 97635,
            html: '\u003cp\u003eRun your Playwright tests across 100+ browser/OS combinations\u003c/p\u003e',
            classList: '',
            failureSummary:
              "Fix any of the following:\n  Element's background color could not be determined because it's partially obscured by another element",
            impact: 'serious',
            target: [
              '.product-detail-card.col-md-4[href$="playwright"] \u003e .product-container \u003e .product-container--content \u003e p'
            ],
            url: 'https://www.browserstack.com/docs/',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97635
              }
            ]
          }
        ],
        impact: 'serious',
        id: 'color-contrast',
        help: 'Elements must have sufficient color contrast',
        description:
          'Ensures the contrast between foreground and background colors meets WCAG 2 AA contrast ratio thresholds',
        tags: ['cat.color', 'wcag2aa', 'wcag143']
      },
      {
        nodes: [
          {
            all: [],
            any: [],
            none: [
              {
                id: 'aria-prohibited-attr',
                data: {
                  role: null,
                  nodeName: 'div',
                  prohibited: ['aria-label'],
                  messageKey: 'noRoleSingular'
                },
                impact: 'serious',
                message:
                  'aria-label attribute is not well supported on a div with no valid role attribute.',
                relatedNodes: []
              }
            ],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'DIV',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'DIV#highlight.code-body',
            needsReview: true,
            issueId: 97850,
            html: '\u003cdiv class="highlight code-body" tabindex="0" aria-label="Code Snippet"\u003e',
            classList: 'highlight.code-body',
            failureSummary:
              'Fix all of the following:\n  aria-label attribute is not well supported on a div with no valid role attribute.',
            impact: 'serious',
            target: [
              '.doc-static--content.code_block_container.code-snippet-wrapper:nth-child(13) \u003e .codeblock \u003e .code-body.highlight[aria-label="Code Snippet"]'
            ],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97850
              }
            ]
          },
          {
            all: [],
            any: [],
            none: [
              {
                id: 'aria-prohibited-attr',
                data: {
                  role: null,
                  nodeName: 'pre',
                  prohibited: ['aria-label'],
                  messageKey: 'noRoleSingular'
                },
                impact: 'serious',
                message:
                  'aria-label attribute is not well supported on a pre with no valid role attribute.',
                relatedNodes: []
              }
            ],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'PRE',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'PRE#highlight..language-bash',
            needsReview: true,
            issueId: 97851,
            html: '\u003cpre class="highlight  language-bash" tabindex="0" data-unique-index="0" aria-label="Code Snippet"\u003e',
            classList: 'highlight..language-bash',
            failureSummary:
              'Fix all of the following:\n  aria-label attribute is not well supported on a pre with no valid role attribute.',
            impact: 'serious',
            target: ['pre[data-unique-index="0"]'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97851
              }
            ]
          },
          {
            all: [],
            any: [],
            none: [
              {
                id: 'aria-prohibited-attr',
                data: {
                  role: null,
                  nodeName: 'div',
                  prohibited: ['aria-label'],
                  messageKey: 'noRoleSingular'
                },
                impact: 'serious',
                message:
                  'aria-label attribute is not well supported on a div with no valid role attribute.',
                relatedNodes: []
              }
            ],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'DIV',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'DIV#highlight.code-body',
            needsReview: true,
            issueId: 97852,
            html: '\u003cdiv class="highlight code-body" tabindex="0" aria-label="Code Snippet"\u003e',
            classList: 'highlight.code-body',
            failureSummary:
              'Fix all of the following:\n  aria-label attribute is not well supported on a div with no valid role attribute.',
            impact: 'serious',
            target: [
              '.doc-static--content.code_block_container.code-snippet-wrapper:nth-child(15) \u003e .codeblock \u003e .code-body.highlight[aria-label="Code Snippet"]'
            ],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97852
              }
            ]
          },
          {
            all: [],
            any: [],
            none: [
              {
                id: 'aria-prohibited-attr',
                data: {
                  role: null,
                  nodeName: 'pre',
                  prohibited: ['aria-label'],
                  messageKey: 'noRoleSingular'
                },
                impact: 'serious',
                message:
                  'aria-label attribute is not well supported on a pre with no valid role attribute.',
                relatedNodes: []
              }
            ],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'PRE',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'PRE#highlight..language-bash',
            needsReview: true,
            issueId: 97853,
            html: '\u003cpre class="highlight  language-bash" tabindex="0" data-unique-index="1" aria-label="Code Snippet"\u003e\u003ccode class="  language-bash"\u003e    \u003cspan class="token function"\u003enpm\u003c/span\u003e \u003cspan class="token function"\u003einstall\u003c/span\u003e\n\u003c/code\u003e\u003cdiv class="highlight-code-marker"\u003e\u003c/div\u003e\u003c/pre\u003e',
            classList: 'highlight..language-bash',
            failureSummary:
              'Fix all of the following:\n  aria-label attribute is not well supported on a pre with no valid role attribute.',
            impact: 'serious',
            target: ['pre[data-unique-index="1"]'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97853
              }
            ]
          },
          {
            all: [],
            any: [],
            none: [
              {
                id: 'aria-prohibited-attr',
                data: {
                  role: null,
                  nodeName: 'div',
                  prohibited: ['aria-label'],
                  messageKey: 'noRoleSingular'
                },
                impact: 'serious',
                message:
                  'aria-label attribute is not well supported on a div with no valid role attribute.',
                relatedNodes: []
              }
            ],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'DIV',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'DIV#highlight.code-body',
            needsReview: true,
            issueId: 97854,
            html: '\u003cdiv class="highlight code-body" tabindex="0" aria-label="Code Snippet"\u003e',
            classList: 'highlight.code-body',
            failureSummary:
              'Fix all of the following:\n  aria-label attribute is not well supported on a div with no valid role attribute.',
            impact: 'serious',
            target: [
              '.doc-static--content.code_block_container.code-snippet-wrapper:nth-child(18) \u003e .codeblock \u003e .code-body.highlight[aria-label="Code Snippet"]'
            ],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97854
              }
            ]
          },
          {
            all: [],
            any: [],
            none: [
              {
                id: 'aria-prohibited-attr',
                data: {
                  role: null,
                  nodeName: 'pre',
                  prohibited: ['aria-label'],
                  messageKey: 'noRoleSingular'
                },
                impact: 'serious',
                message:
                  'aria-label attribute is not well supported on a pre with no valid role attribute.',
                relatedNodes: []
              }
            ],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'PRE',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'PRE#highlight..language-javascript',
            needsReview: true,
            issueId: 97855,
            html: '\u003cpre class="highlight  language-javascript" tabindex="0" data-unique-index="2" aria-label="Code Snippet"\u003e',
            classList: 'highlight..language-javascript',
            failureSummary:
              'Fix all of the following:\n  aria-label attribute is not well supported on a pre with no valid role attribute.',
            impact: 'serious',
            target: ['pre[data-unique-index="2"]'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97855
              }
            ]
          },
          {
            all: [],
            any: [],
            none: [
              {
                id: 'aria-prohibited-attr',
                data: {
                  role: null,
                  nodeName: 'div',
                  prohibited: ['aria-label'],
                  messageKey: 'noRoleSingular'
                },
                impact: 'serious',
                message:
                  'aria-label attribute is not well supported on a div with no valid role attribute.',
                relatedNodes: []
              }
            ],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'DIV',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'DIV#highlight.code-body',
            needsReview: true,
            issueId: 97856,
            html: '\u003cdiv class="highlight code-body" tabindex="0" aria-label="Code Snippet"\u003e',
            classList: 'highlight.code-body',
            failureSummary:
              'Fix all of the following:\n  aria-label attribute is not well supported on a div with no valid role attribute.',
            impact: 'serious',
            target: [
              '.tab-content--wrapper.code-snippet-wrapper[data-tag="MacOS_or_Linux"] \u003e .doc-static--content.code_block_container.code-snippet-wrapper \u003e .codeblock \u003e .code-body.highlight[aria-label="Code Snippet"]'
            ],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97856
              }
            ]
          },
          {
            all: [],
            any: [],
            none: [
              {
                id: 'aria-prohibited-attr',
                data: {
                  role: null,
                  nodeName: 'pre',
                  prohibited: ['aria-label'],
                  messageKey: 'noRoleSingular'
                },
                impact: 'serious',
                message:
                  'aria-label attribute is not well supported on a pre with no valid role attribute.',
                relatedNodes: []
              }
            ],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'PRE',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'PRE#highlight..language-bash',
            needsReview: true,
            issueId: 97857,
            html: '\u003cpre class="highlight  language-bash" tabindex="0" data-unique-index="3" aria-label="Code Snippet"\u003e',
            classList: 'highlight..language-bash',
            failureSummary:
              'Fix all of the following:\n  aria-label attribute is not well supported on a pre with no valid role attribute.',
            impact: 'serious',
            target: ['pre[data-unique-index="3"]'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97857
              }
            ]
          },
          {
            all: [],
            any: [],
            none: [
              {
                id: 'aria-prohibited-attr',
                data: {
                  role: null,
                  nodeName: 'div',
                  prohibited: ['aria-label'],
                  messageKey: 'noRoleSingular'
                },
                impact: 'serious',
                message:
                  'aria-label attribute is not well supported on a div with no valid role attribute.',
                relatedNodes: []
              }
            ],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'DIV',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'DIV#highlight.code-body',
            needsReview: true,
            issueId: 97858,
            html: '\u003cdiv class="highlight code-body" tabindex="0" aria-label="Code Snippet"\u003e',
            classList: 'highlight.code-body',
            failureSummary:
              'Fix all of the following:\n  aria-label attribute is not well supported on a div with no valid role attribute.',
            impact: 'serious',
            target: [
              '.doc-static--content.code_block_container.code-snippet-wrapper:nth-child(22) \u003e .codeblock \u003e .code-body.highlight[aria-label="Code Snippet"]'
            ],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97858
              }
            ]
          },
          {
            all: [],
            any: [],
            none: [
              {
                id: 'aria-prohibited-attr',
                data: {
                  role: null,
                  nodeName: 'pre',
                  prohibited: ['aria-label'],
                  messageKey: 'noRoleSingular'
                },
                impact: 'serious',
                message:
                  'aria-label attribute is not well supported on a pre with no valid role attribute.',
                relatedNodes: []
              }
            ],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'PRE',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'PRE#highlight..language-bash',
            needsReview: true,
            issueId: 97859,
            html: '\u003cpre class="highlight  language-bash" tabindex="0" data-unique-index="5" aria-label="Code Snippet"\u003e\u003ccode class="  language-bash"\u003e   \u003cspan class="token function"\u003enpm\u003c/span\u003e run parallel\n\u003c/code\u003e\u003cdiv class="highlight-code-marker"\u003e\u003c/div\u003e\u003c/pre\u003e',
            classList: 'highlight..language-bash',
            failureSummary:
              'Fix all of the following:\n  aria-label attribute is not well supported on a pre with no valid role attribute.',
            impact: 'serious',
            target: ['pre[data-unique-index="5"]'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97859
              }
            ]
          },
          {
            all: [],
            any: [],
            none: [
              {
                id: 'aria-prohibited-attr',
                data: {
                  role: null,
                  nodeName: 'div',
                  prohibited: ['aria-label'],
                  messageKey: 'noRoleSingular'
                },
                impact: 'serious',
                message:
                  'aria-label attribute is not well supported on a div with no valid role attribute.',
                relatedNodes: []
              }
            ],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'DIV',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'DIV#highlight.code-body',
            needsReview: true,
            issueId: 97860,
            html: '\u003cdiv class="highlight code-body" tabindex="0" aria-label="Code Snippet"\u003e',
            classList: 'highlight.code-body',
            failureSummary:
              'Fix all of the following:\n  aria-label attribute is not well supported on a div with no valid role attribute.',
            impact: 'serious',
            target: [
              '.doc-static--content.code_block_container.code-snippet-wrapper:nth-child(26) \u003e .codeblock \u003e .code-body.highlight[aria-label="Code Snippet"]'
            ],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97860
              }
            ]
          },
          {
            all: [],
            any: [],
            none: [
              {
                id: 'aria-prohibited-attr',
                data: {
                  role: null,
                  nodeName: 'pre',
                  prohibited: ['aria-label'],
                  messageKey: 'noRoleSingular'
                },
                impact: 'serious',
                message:
                  'aria-label attribute is not well supported on a pre with no valid role attribute.',
                relatedNodes: []
              }
            ],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'PRE',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'PRE#highlight..language-javascript',
            needsReview: true,
            issueId: 97861,
            html: '\u003cpre class="highlight  language-javascript" tabindex="0" data-unique-index="6" aria-label="Code Snippet"\u003e',
            classList: 'highlight..language-javascript',
            failureSummary:
              'Fix all of the following:\n  aria-label attribute is not well supported on a pre with no valid role attribute.',
            impact: 'serious',
            target: ['pre[data-unique-index="6"]'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97861
              }
            ]
          },
          {
            all: [],
            any: [],
            none: [
              {
                id: 'aria-prohibited-attr',
                data: {
                  role: null,
                  nodeName: 'div',
                  prohibited: ['aria-label'],
                  messageKey: 'noRoleSingular'
                },
                impact: 'serious',
                message:
                  'aria-label attribute is not well supported on a div with no valid role attribute.',
                relatedNodes: []
              }
            ],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'DIV',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'DIV#highlight.code-body',
            needsReview: true,
            issueId: 97862,
            html: '\u003cdiv class="highlight code-body" tabindex="0" aria-label="Code Snippet"\u003e',
            classList: 'highlight.code-body',
            failureSummary:
              'Fix all of the following:\n  aria-label attribute is not well supported on a div with no valid role attribute.',
            impact: 'serious',
            target: [
              '.doc-static--content.code_block_container.code-snippet-wrapper:nth-child(29) \u003e .codeblock \u003e .code-body.highlight[aria-label="Code Snippet"]'
            ],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97862
              }
            ]
          },
          {
            all: [],
            any: [],
            none: [
              {
                id: 'aria-prohibited-attr',
                data: {
                  role: null,
                  nodeName: 'pre',
                  prohibited: ['aria-label'],
                  messageKey: 'noRoleSingular'
                },
                impact: 'serious',
                message:
                  'aria-label attribute is not well supported on a pre with no valid role attribute.',
                relatedNodes: []
              }
            ],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'PRE',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'PRE#highlight..language-javascript',
            needsReview: true,
            issueId: 97863,
            html: '\u003cpre class="highlight  language-javascript" tabindex="0" data-unique-index="7" aria-label="Code Snippet"\u003e',
            classList: 'highlight..language-javascript',
            failureSummary:
              'Fix all of the following:\n  aria-label attribute is not well supported on a pre with no valid role attribute.',
            impact: 'serious',
            target: ['pre[data-unique-index="7"]'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97863
              }
            ]
          },
          {
            all: [],
            any: [],
            none: [
              {
                id: 'aria-prohibited-attr',
                data: {
                  role: null,
                  nodeName: 'div',
                  prohibited: ['aria-label'],
                  messageKey: 'noRoleSingular'
                },
                impact: 'serious',
                message:
                  'aria-label attribute is not well supported on a div with no valid role attribute.',
                relatedNodes: []
              }
            ],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'DIV',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'DIV#highlight.code-body',
            needsReview: true,
            issueId: 97864,
            html: '\u003cdiv class="highlight code-body" tabindex="0" aria-label="Code Snippet"\u003e',
            classList: 'highlight.code-body',
            failureSummary:
              'Fix all of the following:\n  aria-label attribute is not well supported on a div with no valid role attribute.',
            impact: 'serious',
            target: [
              '.doc-static--content.code_block_container.code-snippet-wrapper:nth-child(33) \u003e .codeblock \u003e .code-body.highlight[aria-label="Code Snippet"]'
            ],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97864
              }
            ]
          },
          {
            all: [],
            any: [],
            none: [
              {
                id: 'aria-prohibited-attr',
                data: {
                  role: null,
                  nodeName: 'pre',
                  prohibited: ['aria-label'],
                  messageKey: 'noRoleSingular'
                },
                impact: 'serious',
                message:
                  'aria-label attribute is not well supported on a pre with no valid role attribute.',
                relatedNodes: []
              }
            ],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'PRE',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'PRE#highlight..language-javascript',
            needsReview: true,
            issueId: 97865,
            html: '\u003cpre class="highlight  language-javascript" tabindex="0" data-unique-index="8" aria-label="Code Snippet"\u003e',
            classList: 'highlight..language-javascript',
            failureSummary:
              'Fix all of the following:\n  aria-label attribute is not well supported on a pre with no valid role attribute.',
            impact: 'serious',
            target: ['pre[data-unique-index="8"]'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97865
              }
            ]
          },
          {
            all: [],
            any: [],
            none: [
              {
                id: 'aria-prohibited-attr',
                data: {
                  role: null,
                  nodeName: 'div',
                  prohibited: ['aria-label'],
                  messageKey: 'noRoleSingular'
                },
                impact: 'serious',
                message:
                  'aria-label attribute is not well supported on a div with no valid role attribute.',
                relatedNodes: []
              }
            ],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'DIV',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'DIV#highlight.code-body',
            needsReview: true,
            issueId: 97866,
            html: '\u003cdiv class="highlight code-body" tabindex="0" aria-label="Code Snippet"\u003e',
            classList: 'highlight.code-body',
            failureSummary:
              'Fix all of the following:\n  aria-label attribute is not well supported on a div with no valid role attribute.',
            impact: 'serious',
            target: [
              '.doc-static--content.code_block_container.code-snippet-wrapper:nth-child(43) \u003e .codeblock \u003e .code-body.highlight[aria-label="Code Snippet"]'
            ],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97866
              }
            ]
          },
          {
            all: [],
            any: [],
            none: [
              {
                id: 'aria-prohibited-attr',
                data: {
                  role: null,
                  nodeName: 'pre',
                  prohibited: ['aria-label'],
                  messageKey: 'noRoleSingular'
                },
                impact: 'serious',
                message:
                  'aria-label attribute is not well supported on a pre with no valid role attribute.',
                relatedNodes: []
              }
            ],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'PRE',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'PRE#highlight..language-javascript',
            needsReview: true,
            issueId: 97867,
            html: '\u003cpre class="highlight  language-javascript" tabindex="0" data-unique-index="9" aria-label="Code Snippet"\u003e',
            classList: 'highlight..language-javascript',
            failureSummary:
              'Fix all of the following:\n  aria-label attribute is not well supported on a pre with no valid role attribute.',
            impact: 'serious',
            target: ['pre[data-unique-index="9"]'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97867
              }
            ]
          },
          {
            all: [],
            any: [],
            none: [
              {
                id: 'aria-prohibited-attr',
                data: {
                  role: null,
                  nodeName: 'div',
                  prohibited: ['aria-label'],
                  messageKey: 'noRoleSingular'
                },
                impact: 'serious',
                message:
                  'aria-label attribute is not well supported on a div with no valid role attribute.',
                relatedNodes: []
              }
            ],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'DIV',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'DIV#highlight.code-body',
            needsReview: true,
            issueId: 97868,
            html: '\u003cdiv class="highlight code-body" tabindex="0" aria-label="Code Snippet"\u003e',
            classList: 'highlight.code-body',
            failureSummary:
              'Fix all of the following:\n  aria-label attribute is not well supported on a div with no valid role attribute.',
            impact: 'serious',
            target: [
              '.doc-static--content.code_block_container.code-snippet-wrapper:nth-child(50) \u003e .codeblock \u003e .code-body.highlight[aria-label="Code Snippet"]'
            ],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97868
              }
            ]
          },
          {
            all: [],
            any: [],
            none: [
              {
                id: 'aria-prohibited-attr',
                data: {
                  role: null,
                  nodeName: 'pre',
                  prohibited: ['aria-label'],
                  messageKey: 'noRoleSingular'
                },
                impact: 'serious',
                message:
                  'aria-label attribute is not well supported on a pre with no valid role attribute.',
                relatedNodes: []
              }
            ],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'PRE',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'PRE#highlight..language-javascript',
            needsReview: true,
            issueId: 97869,
            html: '\u003cpre class="highlight  language-javascript" tabindex="0" data-unique-index="10" aria-label="Code Snippet"\u003e',
            classList: 'highlight..language-javascript',
            failureSummary:
              'Fix all of the following:\n  aria-label attribute is not well supported on a pre with no valid role attribute.',
            impact: 'serious',
            target: ['pre[data-unique-index="10"]'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97869
              }
            ]
          },
          {
            all: [],
            any: [],
            none: [
              {
                id: 'aria-prohibited-attr',
                data: {
                  role: null,
                  nodeName: 'div',
                  prohibited: ['aria-label'],
                  messageKey: 'noRoleSingular'
                },
                impact: 'serious',
                message:
                  'aria-label attribute is not well supported on a div with no valid role attribute.',
                relatedNodes: []
              }
            ],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'DIV',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'DIV#highlight.code-body',
            needsReview: true,
            issueId: 97870,
            html: '\u003cdiv class="highlight code-body" tabindex="0" aria-label="Code Snippet"\u003e',
            classList: 'highlight.code-body',
            failureSummary:
              'Fix all of the following:\n  aria-label attribute is not well supported on a div with no valid role attribute.',
            impact: 'serious',
            target: [
              '.doc-static--content.code_block_container.code-snippet-wrapper:nth-child(54) \u003e .codeblock \u003e .code-body.highlight[aria-label="Code Snippet"]'
            ],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97870
              }
            ]
          },
          {
            all: [],
            any: [],
            none: [
              {
                id: 'aria-prohibited-attr',
                data: {
                  role: null,
                  nodeName: 'pre',
                  prohibited: ['aria-label'],
                  messageKey: 'noRoleSingular'
                },
                impact: 'serious',
                message:
                  'aria-label attribute is not well supported on a pre with no valid role attribute.',
                relatedNodes: []
              }
            ],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'PRE',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'PRE#highlight..language-javascript',
            needsReview: true,
            issueId: 97871,
            html: '\u003cpre class="highlight  language-javascript" tabindex="0" data-unique-index="11" aria-label="Code Snippet"\u003e',
            classList: 'highlight..language-javascript',
            failureSummary:
              'Fix all of the following:\n  aria-label attribute is not well supported on a pre with no valid role attribute.',
            impact: 'serious',
            target: ['pre[data-unique-index="11"]'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'serious',
                issueId: 97871
              }
            ]
          }
        ],
        impact: 'serious',
        id: 'aria-allowed-attr',
        help: 'Elements must only use allowed ARIA attributes',
        description:
          "Ensures ARIA attributes are allowed for an element's role",
        tags: ['cat.aria', 'wcag2a', 'wcag412']
      },
      {
        nodes: [
          {
            all: [],
            any: [],
            none: [
              {
                id: 'only-listitems',
                impact: 'serious',
                message:
                  'List element has direct children that are not allowed inside \u003cli\u003e elements',
                relatedNodes: [
                  {
                    html: '\u003cspan class="dropdown-menu-arrow dropdown-menu-arrow-var"\u003e\u003c/span\u003e',
                    target: ['.dropdown-menu-arrow-var']
                  }
                ]
              }
            ],
            timestamp: '2023-02-03T15:34:11Z',
            htmltag: 'UL',
            page: {
              pageId: '8Ot3',
              timestamp: '2023-02-03T15:34:01Z',
              url: 'https://www.browserstack.com/',
              title:
                'Most Reliable App \u0026 Cross Browser Testing Platform | BrowserStack'
            },
            componentId:
              'UL#dropdown-menu.developers-dropdown-menu.small-dropdown-menu.active',
            needsReview: false,
            issueId: 97849,
            html: '\u003cul class="dropdown-menu developers-dropdown-menu small-dropdown-menu active" id="developers-menu-dropdown"\u003e',
            classList:
              'dropdown-menu.developers-dropdown-menu.small-dropdown-menu.active',
            failureSummary:
              'Fix all of the following:\n  List element has direct children that are not allowed inside \u003cli\u003e elements',
            impact: 'serious',
            target: ['#developers-menu-dropdown'],
            url: 'https://www.browserstack.com/',
            confirmed: true,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: true,
                hidden: false,
                impact: 'serious',
                issueId: 97849
              }
            ]
          }
        ],
        impact: 'serious',
        id: 'list',
        help: '\u003cul\u003e and \u003col\u003e must only directly contain \u003cli\u003e, \u003cscript\u003e or \u003ctemplate\u003e elements',
        description: 'Ensures that lists are structured correctly',
        tags: ['cat.structure', 'wcag2a', 'wcag131']
      },
      {
        nodes: [
          {
            all: [
              {
                id: 'identical-links-same-purpose',
                data: {
                  name: 'introduction',
                  urlProps: {
                    hash: '',
                    port: '',
                    search: {},
                    filename: '',
                    hostname: 'www.browserstack.com',
                    pathname:
                      '/docs/automate/selenium/local-testing-introduction/',
                    protocol: 'http:'
                  }
                },
                impact: 'minor',
                message:
                  'Check that links have the same purpose, or are intentionally ambiguous.',
                relatedNodes: [
                  {
                    html: '\u003ca tabindex="-1" title="introduction" data-name="introduction" class="sidenav-h2 active text-link" href="/docs/automate/selenium/getting-started/nodejs/protractor#introduction"\u003e\n                        Introduction \n                        \u003c/a\u003e',
                    target: ['a[title="introduction"]']
                  }
                ]
              }
            ],
            any: [],
            none: [],
            timestamp: '2023-02-03T15:34:29Z',
            htmltag: 'A',
            page: {
              pageId: 'EaoI',
              timestamp: '2023-02-03T15:34:28Z',
              url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
              title: 'Run Selenium tests with Protractor | BrowserStack Docs'
            },
            componentId: 'A#sidenav-h1.sidenav-link.text-link',
            needsReview: true,
            issueId: 97872,
            html: '\u003ca tabindex="-1" aria-label="Introduction" data-name="Introduction" href="/docs/automate/selenium/local-testing-introduction" data-product-type="" title="Introduction" class="sidenav-h1 sidenav-link text-link"\u003e\n                  Introduction\n                \u003c/a\u003e',
            classList: 'sidenav-h1.sidenav-link.text-link',
            failureSummary:
              'Fix all of the following:\n  Check that links have the same purpose, or are intentionally ambiguous.',
            impact: 'minor',
            target: ['a[aria-label="Introduction"]'],
            url: 'https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor',
            confirmed: null,
            hidden: false,
            reportId: [705],
            childNodes: [
              {
                reportId: 705,
                confirmed: null,
                hidden: false,
                impact: 'minor',
                issueId: 97872
              }
            ]
          }
        ],
        impact: 'minor',
        id: 'identical-links-same-purpose',
        help: 'Links with the same name must have a similar purpose',
        description:
          'Ensure that links with the same accessible name serve a similar purpose',
        tags: ['cat.semantics', 'wcag2aaa', 'wcag249']
      }
    ]
  }
};
