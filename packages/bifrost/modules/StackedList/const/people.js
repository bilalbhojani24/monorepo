export const People = [
  {
    name: 'Calwin Hawkins',
    email: 'calwin.hawkins@example.com',
    image:
      'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    name: 'Kristen Ramos',
    email: 'kristen.ramos@example.com',
    image:
      'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    name: 'Ted Fox',
    email: 'ted.fox@example.com',
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  }
];

const info = 'Applied on January 7, 2020';
const statusText = 'Completed phone screening';

export const PeopleWithTwoCols = [
  {
    name: 'Ricardo Cooper',
    email: 'ricardo.cooper@example.com',
    image:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    info,
    statusText
  },
  {
    ...People[1],
    info,
    statusText
  },
  {
    ...People[2],
    info,
    statusText
  }
];

export const JobTitles = [
  'Back End Developer',
  'Front End Developer',
  'User Interface Designer'
];

export const GroupedPeople = [
  {
    title: 'A',
    people: [
      {
        image: People[1].image,
        name: 'Leslie Abbott',
        info: 'Co-Founder / CEO'
      },
      {
        image: People[2].image,
        name: 'Hector Adams',
        info: 'VP, Marketing'
      },
      {
        image: People[0].image,
        name: 'Blake Alexander',
        info: 'Account Coordinator'
      },
      {
        image: People[1].image,
        name: 'Fabricio Andrews',
        info: 'Senior Art Director'
      }
    ]
  },
  {
    title: 'B',
    people: People.map((person) => ({ ...person, info: person.email }))
  }
];

export const AvatarGroupPeople = [
  {
    name: 'Leonard Krasner',
    username: '@leonardkrasner',
    image: People[0].image
  },
  {
    name: 'Floyd Miles',
    username: '@floydmiles',
    image: People[1].image
  },
  {
    name: 'Emily Selman',
    username: '@emilyselman',
    image: People[2].image
  },
  {
    name: 'Kristin Watson',
    username: 'kristinwatson',
    image: People[0].image
  }
];

export const contentLinks = [
  {
    title: 'Gloria Roberston',
    time: '1d ago',
    content:
      'Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum natus facere. Enim rerum Doloremque dolorem maiores assumenda',
    subTitle: 'Velit placeat sit ducimus non sed'
  },
  {
    title: 'Virginia Abshire',
    time: '1d ago',
    content:
      'Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum natus facere. Enim rerum Doloremque dolorem maiores assumenda',
    subTitle: 'Nemo mollitia repudiandae adipisci explic'
  },
  {
    title: 'Kyle Gulgowski',
    time: '1d ago',
    content:
      'Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum natus facere. Enim rerum, Doloremque dolorem maiores assumenda',
    subTitle: 'Doloremque reprehenderit et harum quas'
  },
  {
    title: 'Hattie Haag',
    time: '10 ago',
    content:
      'Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum natus facere. Enim rerum, Doloremque dolorem maiores assumenda',
    subTitle: 'Eos sequi et aut ex impedit'
  },
  {
    title: 'Wilma Glover',
    time: '10 ago',
    content:
      'Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum natus facere Doloremque dolorem maiores assumenda',
    subTitle: 'Quisquam veniam explicabo'
  }
];

export const contentList = [
  {
    title: 'Office closed on July 2nd',
    content:
      'Cum qui rem deleniti. Suscipit in dolor veritatis sequi aut. Vero ut earum quis deleniti. Ut a sunt eum cum ut  Suscipit in dolor veritatis sequi aut. '
  },
  {
    title: 'New password policy',
    content:
      'Alias inventore ut autem optio voluptas et repellendus. Facere totam quaerat quam quo laudantium cumque  Suscipit in dolor veritatis sequi aut. '
  },
  {
    title: 'Office closed on July 2nd',
    content:
      'Tenetur libero voluptatem rerum occaecati qui est molestiae exercitationem. Voluptate quisquam iure  Suscipit in dolor veritatis sequi aut. '
  }
];
