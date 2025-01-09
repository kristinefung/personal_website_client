import { useState, useEffect } from 'react';
import { Button, Backdrop, CircularProgress } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from 'src/store';
import { clearSnackbar, showSnackbar } from 'src/reducer/ui';

import { getMonthOptions, getYearOptions } from 'src/utils/common';
import WorkService, { type Work } from 'src/services/api/workService';
import InputText from '../_form_element/InputText';
import Textarea from '../_form_element/Textarea';
import Checkbox from '../_form_element/Checkbox';
import DropdownList from '../_form_element/DropdownList';

interface WorkFormProps {
  action: "UPDATE" | "CREATE";
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
  action,
  workData,
  setOpen,
}) => {
  const [work, setWork] = useState<Work>(workData);
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);
  const [updateError, setUpdateError] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const workService = WorkService();

  const fetchUpdateWork = async () => {
    setIsUpdateLoading(true);
    try {
      await workService.updateWorkById(work.id!, work);
      dispatch(showSnackbar({ severity: "success", message: "Success!" }));
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

  const fetchCreateWork = async () => {
    setIsUpdateLoading(true);
    try {
      await workService.createWork(work);
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
          <div className='row'>
            <Textarea
              label={"Description*"}
              value={work.description ?? ''}
              onChange={(e) => setWork({ ...work, description: e.target.value })}
            // errorMsg={workErrors.title}
            />
          </div>
          <div className='row'>
            <Checkbox
              label={"Is current work*"}
              isChecked={work.isCurrent === 1}
              onChange={(e) => setWork({
                ...work,
                isCurrent: e.target.checked ? 1 : 0,
                endMonth: e.target.checked ? undefined : work.endMonth,
                endYear: e.target.checked ? undefined : work.endYear,
              })}
            />
          </div>
          <div className='row'>
            <DropdownList
              label={"Start date*"}
              value={work.startMonth?.toString()!}
              onChange={(e) => setWork({ ...work, startMonth: Number(e.target.value) })}
              options={getMonthOptions()}
            // errorMsg={errors.start_month}
            />
            <DropdownList
              label={""}
              value={work.startYear?.toString()!}
              onChange={(e) => setWork({ ...work, startYear: Number(e.target.value) })}
              options={getYearOptions()}
            // errorMsg={errors.start_year}
            />
          </div>
          <div className='row'>
            < DropdownList
              label={"End date*"}
              value={work.endMonth?.toString()!}
              onChange={(e) => setWork({ ...work, endMonth: Number(e.target.value) })}
              options={getMonthOptions()}
              isDisabled={work.isCurrent === 1}
            // errorMsg={errors.end_month}
            />
            <DropdownList
              label={""}
              value={work.endYear?.toString()!}
              onChange={(e) => setWork({ ...work, endYear: Number(e.target.value) })}
              options={getYearOptions()}
              isDisabled={work.isCurrent === 1}
            // errorMsg={errors.end_year}
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
        {
          action == "CREATE" ?
            <Button
              onClick={() => fetchCreateWork()}
              variant="contained"
              color="secondary">
              Create
            </Button> :
            <Button
              onClick={() => fetchUpdateWork()}
              variant="contained"
              color="secondary">
              Update
            </Button>
        }


      </div>
      {
        isUpdateLoading && (
          <Backdrop
            open={true}
          >
            <CircularProgress color="secondary" />
          </Backdrop>
        )
      }
    </>
  );
};

export default WorkForm;