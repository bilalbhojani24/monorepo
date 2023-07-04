# Frontend Repository

Welcome to the Frontend repository! This repository follows a monorepo architecture and consists of various packages and apps, primarily focused on speedboat development.

## Setup

Before getting started, ensure that you have the following requirements installed on your system:

-   Node (v18.4.0)
-   nvm (Comes along with Node)
-   package manager - pnpm (Install pnpm globally)

Follow the steps below to set up the repository on your local machine:

1.  Clone the repository: 

    `git clone https://github.com/browserstack/frontend.git` 
    
2.  Checkout to the master branch (or any branch of your choice):
   
    `git checkout master` 
    
3.  Convert the `.npmrc.sample` file to `.npmrc` and add your GitHub token in the same file.
4.  Navigate to the root folder of the repository and run the following commands:
  
    `pnpm install`
    
    `pnpm run build:dev-package` 
    

## How to Run/Build Packages/Apps

To run or build a specific package/app, follow these steps:

1.  Open your terminal and navigate to the specific path of the desired package/app. 
    
  Example: If you want to build/run the "tcm" package, run the following command:
    
  `cd path/to/tcm` 
    
2.  Build the package/app:
    
    `pnpm run build` 
    
3.  Run the package/app:
    
    `pnpm run dev` 
    

Please note that you may need to adjust the specific commands based on the package/app you want to build/run.

## Important links

- [Package list and dependency graph](https://browserstack.atlassian.net/wiki/spaces/ENG/pages/3874193452/Package+List+and+Dependency+Graph)
- [Bifrost Changelog](https://browserstack.atlassian.net/wiki/spaces/ENG/pages/3840344656/Bifrost+Change+log)
- [Utils Changelog](https://browserstack.atlassian.net/wiki/spaces/ENG/pages/3865149710/Utils+Package+Changelog)
- [Infra setup for APP](https://browserstack.atlassian.net/wiki/spaces/ENG/pages/3845490804/Process+Document+for+Infra+Setup+for+Hosting+a+Frontend+Product)
- [Frontend 2.0](https://browserstack.atlassian.net/wiki/spaces/ENG/pages/3820947043/Frontend+2.0)

## Additional Pointers

-   Ensure that you have the required version of Node.js (v18.4.0) installed on your system.
-   Make sure to set up the GitHub token in the `.npmrc` file to access the required dependencies.
-   If you encounter any issues during the setup or while running/building the packages/apps, please refer to the documentation or reach out to the team for assistance.

Happy coding STACKMATES!