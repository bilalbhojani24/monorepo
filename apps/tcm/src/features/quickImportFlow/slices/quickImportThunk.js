// import { importProjects } from '../../../api/import.api';

// import {
//   importCleanUp,
//   setCheckImportStatusClicked,
//   setImportStarted,
//   setImportStatusOngoing
// } from './importSlice';

// export const startQuickImport =
//   (testManagementTool) => async (dispatch, getState) => {
//     const tool =
//       testManagementTool === 'testrails' ? 'testrail' : testManagementTool;
//     const creds =
//       tool === 'testrail' ? getState().testRailsCred : getState().zephyrCred;

//     const testManagementProjects = getState().projectsForTestManagementImport;

//     console.log('started quick import', creds, testManagementProjects);
//     dispatch(setImportStatusOngoing());
//     dispatch(importCleanUp());
//     dispatch(setImportStarted(true));
//     dispatch(setCheckImportStatusClicked(false));
//     try {
//       console.log('hello from try block');
//       const response = await importProjects(tool, {
//         ...creds,
//         testrail_projects: testManagementProjects
//           .map((project) => (project.checked ? project : null))
//           .filter((project) => project !== null)
//       });
//       console.log('response', response);
//     } catch (err) {
//       // set error state
//     }
//   };
