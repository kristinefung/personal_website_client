import { useState, useEffect } from 'react';
import { Button, Backdrop, CircularProgress, Box } from '@mui/material';
import { z } from 'zod';

import { getMonthOptions, getYearOptions, convertZodErrorToLocalError } from 'src/utils/common';
import WorkService, { IWork } from 'src/services/api/workService';
import InputText from '../_form_element/InputText';
import Textarea from '../_form_element/Textarea';
import Checkbox from '../_form_element/Checkbox';
import DropdownList from '../_form_element/DropdownList';
import useWorkStore from 'src/store/workStore';
import PopupForm from '../PopupForm';
import { WorkError } from 'src/services/api/workService';
import { WorkSchema } from 'src/utils/validator';

import useStyles from 'src/style';
import useUiStore from 'src/store/uiStore';

interface WorkFormProps {
  action: "UPDATE" | "CREATE";
  setOpen: (open: boolean) => void;
  open: boolean;
}

const WorkForm: React.FC<WorkFormProps> = (props) => {
  const classes = useStyles();

  const { showSnackbar } = useUiStore();
  const { work, workLoading, updateWorkLoading, workFormId, fetchCreateWork, fetchUpdateWork, fetchWorkById, setWork, clearWork } = useWorkStore();
  const [workError, setWorkError] = useState<WorkError>({});

  const handleOnClickCreate = async () => {
    try {
      WorkSchema.parse(work);
      fetchCreateWork(work!);
      showSnackbar('success', 'Success create');
      setWorkError({});

    } catch (err) {
      if (err instanceof z.ZodError) {
        let validationError: WorkError = {};
        validationError = convertZodErrorToLocalError(err, validationError)
        setWorkError(validationError);
        return;
      }
      showSnackbar('error', 'Fail to create');
    }
  }

  const handleOnClickUpdate = async () => {
    try {
      WorkSchema.parse(work);
      fetchUpdateWork(work!);
      showSnackbar('success', 'Success update');
      setWorkError({});

    } catch (err) {
      if (err instanceof z.ZodError) {
        let validationError: WorkError = {};
        validationError = convertZodErrorToLocalError(err, validationError)
        setWorkError(validationError);
        return;
      }
      showSnackbar('error', 'Fail to update');
    }
  }

  const handleOnClickClose = async () => {
    clearWork();
    setWorkError({});
    props.setOpen(false);
  }

  useEffect(() => {
    if (props.action === 'UPDATE' && props.open) {
      fetchWorkById(workFormId!);
    }
  }, [props.open]);

  const loadingCompo = (
    <Backdrop open={workLoading || updateWorkLoading}>
      <CircularProgress color="secondary" />
    </Backdrop>
  )

  const formCompo = (<>
    <Box
      component="form"
      sx={{
        display: 'flex', flexDirection: 'column', height: '85%', overflow: 'scroll',
      }}
      noValidate
      autoComplete="off"
    >
      <Box className={classes.formRow} sx={{ gap: 2 }}>
        <InputText
          label={"Title*"}
          value={work?.title ?? ''}
          onChange={(e) => setWork({ ...work, title: e.target.value })}
          errorMsg={workError.title}
        />
        <InputText
          label={"Company name*"}
          value={work?.companyName ?? ''}
          onChange={(e) => setWork({ ...work, companyName: e.target.value })}
          errorMsg={workError.companyName}
        />
      </Box>
      <Box className={classes.formRow} sx={{ gap: 2 }}>
        <Textarea
          label={"Description*"}
          value={work?.description ?? ''}
          onChange={(e) => setWork({ ...work, description: e.target.value })}
          errorMsg={workError.description}
        />
      </Box>
      <Box className={classes.formRow} sx={{ gap: 2 }}>
        <Checkbox
          label={"Is current work*"}
          isChecked={work?.isCurrent === 1}
          onChange={(e) => setWork({
            ...work,
            isCurrent: e.target.checked ? 1 : 0,
            endMonth: e.target.checked ? undefined : work?.endMonth,
            endYear: e.target.checked ? undefined : work?.endYear,
          })}
        />
      </Box>
      <Box className={classes.formRow} sx={{ gap: 2 }}>
        <DropdownList
          label={"Start date*"}
          value={work?.startMonth?.toString()!}
          onChange={(e) => setWork({ ...work, startMonth: Number(e.target.value) })}
          options={getMonthOptions()}
          errorMsg={workError.startMonth}
        />
        <DropdownList
          label={""}
          value={work?.startYear?.toString()!}
          onChange={(e) => setWork({ ...work, startYear: Number(e.target.value) })}
          options={getYearOptions()}
          errorMsg={workError.startYear}
        />
      </Box>
      <Box className={classes.formRow} sx={{ gap: 2 }}>
        < DropdownList
          label={"End date*"}
          value={work?.endMonth?.toString()!}
          onChange={(e) => setWork({ ...work, endMonth: Number(e.target.value) })}
          options={getMonthOptions()}
          isDisabled={work?.isCurrent === 1}
          errorMsg={workError.endMonth}
        />
        <DropdownList
          label={""}
          value={work?.endYear?.toString()!}
          onChange={(e) => setWork({ ...work, endYear: Number(e.target.value) })}
          options={getYearOptions()}
          isDisabled={work?.isCurrent === 1}
          errorMsg={workError.endYear}
        />
      </Box>
    </Box>
    <Box sx={{
      display: 'flex',
      justifyContent: 'end',
      gap: '20px',
    }}>
      <Button
        onClick={() => handleOnClickClose()}
        sx={{ color: '#FFFFFF' }}
        variant='outlined'>
        Close
      </Button>
      <Button
        onClick={() => props.action == "CREATE" ? handleOnClickCreate() : handleOnClickUpdate()}
        variant="contained"
        color="secondary">
        {props.action == "CREATE" ? "Create" : "Update"}
      </Button>
    </Box>
    {updateWorkLoading ? loadingCompo : <></>}
  </>)

  return (
    <>
      <PopupForm
        open={props.open}
        onClose={handleOnClickClose}
        setOpen={props.setOpen}
        title={props.action == "CREATE" ? "Create work" : "Edit work"}
        form={<>{workLoading ? (loadingCompo) : (formCompo)}</>}
      />
    </>

  );
};

export default WorkForm;