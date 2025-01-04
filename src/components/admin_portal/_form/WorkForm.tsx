import { useState } from 'react';

import { type Work } from 'src/services/api/workService';
import InputText from '../_form_element/InputText/InputText';

interface WorkFormProps {
  workData: Work;
  workErrors: WorkErrors
}

type WorkErrors = {
  title?: string;
  companyName?: string;
  description?: string;
  startMonth?: number;
  startYear?: number;
  endMonth?: number;
  endYear?: number;
  isCurrent?: number;
}

const WorkForm: React.FC<WorkFormProps> = ({
  workData,
  workErrors,
}) => {
  const [work, setWork] = useState<Work>(workData);

  return (
    <form className="form work-form" >
      <div className='row'>
        <InputText
          label={"Title*"}
          value={work.title}
          onChange={(e) => setWork({ ...work, title: e.target.value })}
          errorMsg={workErrors.title}
        />
        <InputText
          label={"Company name*"}
          value={work.companyName}
          onChange={(e) => setWork({ ...work, companyName: e.target.value })}
          errorMsg={workErrors.companyName}
        />
      </div>
    </form>
  );
};

export default WorkForm;