import {
  ButtonTeal10,
  ButtonTeal100,
  ButtonTeal25,
  ButtonTeal75,
} from "project-a/components";

import "./global.css";

const App = () => {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <strong>Project A components</strong>
        <ButtonTeal10 />
        <ButtonTeal25 />
        <ButtonTeal75 />
        <ButtonTeal100 />
      </div>

      <div className="flex flex-col gap-2">
        <strong>
          Project B - `al` classes (75/100 were not used in project A)
        </strong>
        <button type="button" className="text-black bg-al-teal-10">
          AL Teal 10
        </button>
        <button type="button" className="text-black bg-al-teal-25">
          AL Teal 25
        </button>
        <button type="button" className="text-black bg-al-teal-75">
          AL Teal 75
        </button>
        <button type="button" className="text-black bg-al-teal-100">
          AL Teal 100
        </button>
      </div>
      <div className="flex flex-col gap-2">
        <strong>
          Project B - `custom` classes (None of the bellow were used in project
          A)
        </strong>
        <button type="button" className="text-black bg-custom-teal-10">
          Custom Teal 10
        </button>
        <button type="button" className="text-black bg-custom-teal-25">
          Custom Teal 25
        </button>
        <button type="button" className="text-black bg-custom-teal-75">
          Custom Teal 75
        </button>
        <button type="button" className="text-black bg-custom-teal-100">
          Custom Teal 100
        </button>
      </div>
    </section>
  );
};

export default App;
