import { useState, useEffect } from 'react';
import { Button, Backdrop, CircularProgress, Box } from '@mui/material';
import { z } from 'zod';
import { observer } from 'mobx-react-lite';

import { getMonthOptions, getYearOptions, convertZodErrorToLocalError } from 'src/utils/common';
import { IWork, WorkError } from 'src/services/api/workService';
import InputText from '../_form_element/InputText';
import Textarea from '../_form_element/Textarea';
import Checkbox from '../_form_element/Checkbox';
import DropdownList from '../_form_element/DropdownList';
import workStore from 'src/store/workStore';
import PopupForm from '../PopupForm';
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
  const [workError, setWorkError] = useState<WorkError>({});

  const handleOnClickCreate = async () => {
    try {
      const currentWork = workStore.currentWork;
      if (!currentWork) return;

      WorkSchema.parse(currentWork);
      await workStore.createWork(currentWork);
      showSnackbar('success', 'Success create');
      setWorkError({});
      props.setOpen(false);
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
      const currentWork = workStore.currentWork;
      if (!currentWork || !currentWork.id) return;

      WorkSchema.parse(currentWork);
      await workStore.updateWork(currentWork.id, currentWork);
      showSnackbar('success', 'Success update');
      setWorkError({});
      props.setOpen(false);
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
    workStore.setCurrentWork(null);
    setWorkError({});
    props.setOpen(false);
  }

  useEffect(() => {
    if (props.action === 'UPDATE' && props.open) {
      const currentWork = workStore.currentWork;
      if (currentWork?.id) {
        workStore.fetchWorkById(currentWork.id);
      }
    }
  }, [props.open]);

  const loadingCompo = (
    <Backdrop open={workStore.loading}>
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
          value={workStore.currentWork?.title ?? ''}
          onChange={(e) => workStore.setCurrentWork({ ...workStore.currentWork, title: e.target.value })}
          errorMsg={workError.title}
        />
        <InputText
          label={"Company name*"}
          value={workStore.currentWork?.companyName ?? ''}
          onChange={(e) => workStore.setCurrentWork({ ...workStore.currentWork, companyName: e.target.value })}
          errorMsg={workError.companyName}
        />
      </Box>
      <Box className={classes.formRow} sx={{ gap: 2 }}>
        <Textarea
          label={"Description*"}
          value={workStore.currentWork?.description ?? ''}
          onChange={(e) => workStore.setCurrentWork({ ...workStore.currentWork, description: e.target.value })}
          errorMsg={workError.description}
        />
      </Box>
      <Box className={classes.formRow} sx={{ gap: 2 }}>
        <Checkbox
          label={"Is current work*"}
          isChecked={workStore.currentWork?.isCurrent ?? false}
          onChange={(e) => workStore.setCurrentWork({
            ...workStore.currentWork,
            isCurrent: e.target.checked,
            endMonth: e.target.checked ? undefined : workStore.currentWork?.endMonth,
            endYear: e.target.checked ? undefined : workStore.currentWork?.endYear,
          })}
        />
      </Box>
      <Box className={classes.formRow} sx={{ gap: 2 }}>
        <DropdownList
          label={"Start date*"}
          value={workStore.currentWork?.startMonth?.toString() ?? ''}
          onChange={(e) => workStore.setCurrentWork({ ...workStore.currentWork, startMonth: Number(e.target.value) })}
          options={getMonthOptions()}
          errorMsg={workError.startMonth}
        />
        <DropdownList
          label={""}
          value={workStore.currentWork?.startYear?.toString() ?? ''}
          onChange={(e) => workStore.setCurrentWork({ ...workStore.currentWork, startYear: Number(e.target.value) })}
          options={getYearOptions()}
          errorMsg={workError.startYear}
        />
      </Box>
      <Box className={classes.formRow} sx={{ gap: 2 }}>
        <DropdownList
          label={"End date*"}
          value={workStore.currentWork?.endMonth?.toString() ?? ''}
          onChange={(e) => workStore.setCurrentWork({ ...workStore.currentWork, endMonth: Number(e.target.value) })}
          options={getMonthOptions()}
          isDisabled={workStore.currentWork?.isCurrent ?? false}
          errorMsg={workError.endMonth}
        />
        <DropdownList
          label={""}
          value={workStore.currentWork?.endYear?.toString() ?? ''}
          onChange={(e) => workStore.setCurrentWork({ ...workStore.currentWork, endYear: Number(e.target.value) })}
          options={getYearOptions()}
          isDisabled={workStore.currentWork?.isCurrent ?? false}
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
        onClick={() => props.action === "CREATE" ? handleOnClickCreate() : handleOnClickUpdate()}
        variant="contained"
        color="secondary">
        {props.action === "CREATE" ? "Create" : "Update"}
      </Button>
    </Box>
    {workStore.loading ? loadingCompo : <></>}
  </>)

  return (
    <>
      <PopupForm
        open={props.open}
        onClose={handleOnClickClose}
        setOpen={props.setOpen}
        title={props.action === "CREATE" ? "Create work" : "Edit work"}
        form={<>{workStore.loading ? (loadingCompo) : (formCompo)}</>}
      />
    </>
  );
};

export default observer(WorkForm);