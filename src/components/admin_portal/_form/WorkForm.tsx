import { useState, useEffect } from 'react';
import { Button } from '@mui/material';

import WorkService, { type Work } from 'src/services/api/workService';
import InputText from '../_form_element/InputText/InputText';

interface WorkFormProps {
  workData: Work;
  setOpen: (open: boolean) => void;
  // formStyle?: React.CSSProperties;
  // buttonStyle?: React.CSSProperties;
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

const formStyle = {
  height: '85%',
  overflow: 'scroll',
}

const buttonStyle = {
  display: 'flex',
  justifyContent: 'end',
  gap: '20px',
}


const WorkForm: React.FC<WorkFormProps> = ({
  workData,
  setOpen,
}) => {
  const [work, setWork] = useState<Work>(workData);
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);
  const [updateError, setUpdateError] = useState("");

  const workService = WorkService();

  const fetchUpdateWork = async () => {
    setIsUpdateLoading(true);
    try {
      await workService.updateWorkById(work.id!, work);
    } catch (err) {
      if (err instanceof Error) {
        setUpdateError(err.message);
      } else {
        setUpdateError("Unknown error");
      }
    } finally {
      setIsUpdateLoading(false);
    }
  };

  return (
    <>
      <div style={formStyle}>
        <form className="form work-form" >
          <div className='row'>
            <InputText
              label={"Title*"}
              value={work.title ?? ''}
              onChange={(e) => setWork({ ...work, title: e.target.value })}
            // errorMsg={workErrors.title}
            />
            <InputText
              label={"Company name*"}
              value={work.companyName ?? ''}
              onChange={(e) => setWork({ ...work, companyName: e.target.value })}
            // errorMsg={workErrors.companyName}
            />
          </div>
        </form>
      </div>
      <div style={buttonStyle}>
        <Button
          onClick={() => setOpen(false)}
          sx={{ color: '#FFFFFF' }}
          variant='outlined'>
          Close
        </Button>
        <Button
          onClick={() => fetchUpdateWork()}
          variant="contained"
          color="secondary">
          Update
        </Button>
      </div>
    </>
  );
};

export default WorkForm;