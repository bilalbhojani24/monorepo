import { Button } from '@browserstack/bifrost';
import { Tabs } from '@browserstack/bifrost';

const AllProjects = (props) => {
  return (
    <div>
      {/* header */}
      <div className="border-b-2 border-gray-200">
        <div className="flex justify-between mx-4 my-5">
          <span className="text-2xl font-bold text-gray-700 leading-7">All Projects</span>
          <Button>Add Project</Button>
        </div>
      </div>
      <div className="bg-gray-200">
        <Tabs tabsArray={[]} />
      </div>
      {/* tabs */}
      {/* table with search */}
    </div>
  );
};

export default AllProjects;
