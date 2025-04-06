import { useState, useEffect } from 'react';
import { Button, Backdrop, CircularProgress, Box } from '@mui/material';


import { getMonthOptions, getYearOptions } from 'src/utils/common';
import WorkService, { IWork } from 'src/services/api/workService';
import InputText from '../_form_element/InputText';
import Textarea from '../_form_element/Textarea';
import Checkbox from '../_form_element/Checkbox';
import DropdownList from '../_form_element/DropdownList';
import useWorkStore from 'src/store/workStore';
import PopupForm from '../PopupForm';

interface WorkFormProps {
  action: "UPDATE" | "CREATE";
  setOpen: (open: boolean) => void;
  open: boolean;
  // formStyle?: React.CSSProperties;
  // buttonStyle?: React.CSSProperties;
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


const WorkForm: React.FC<WorkFormProps> = (props) => {

  const { work, workLoading, workFormId, fetchCreateWork, fetchUpdateWork, fetchWorkById, setWork } = useWorkStore();

  const handleOnClickCreate = async () => {
    fetchCreateWork(work!)
  }

  const handleOnClickUpdate = async () => {
    fetchUpdateWork(work!)
  }

  const handleOnClickClose = async () => {
    props.setOpen(false);
  }

  useEffect(() => {
    console.log("props.action========");
    console.log(props.action);
    if (props.action === 'UPDATE') {
      fetchWorkById(workFormId!);
    }
  }, [props.open]);

  return (
    <>
      {
        <>

          <PopupForm
            open={props.open}
            setOpen={props.setOpen}
            title={props.action == "CREATE" ? "Create work" : "Edit work"}
            form={
              <>
                {workLoading ? (
                  <Backdrop
                    open={true}
                  >
                    <CircularProgress color="secondary" />
                  </Backdrop>
                )
                  :
                  (<>
                    <div style={formStyle}>
                      <Box
                        component="form"
                        sx={{ display: 'flex', flexDirection: 'column' }}
                        noValidate
                        autoComplete="off"
                      >
                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'end', justifyContent: 'space-between', gap: 2 }}>
                          <InputText
                            label={"Title*"}
                            value={work?.title ?? ''}
                            onChange={(e) => setWork({ ...work, title: e.target.value })}
                          // errorMsg={workErrors.title}
                          />
                          <InputText
                            label={"Company name*"}
                            value={work?.companyName ?? ''}
                            onChange={(e) => setWork({ ...work, companyName: e.target.value })}
                          // errorMsg={workErrors.companyName}
                          />
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'end', justifyContent: 'space-between', gap: 2 }}>
                          <Textarea
                            label={"Description*"}
                            value={work?.description ?? ''}
                            onChange={(e) => setWork({ ...work, description: e.target.value })}
                          // errorMsg={workErrors.title}
                          />
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'end', justifyContent: 'space-between', gap: 2 }}>
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
                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'end', justifyContent: 'space-between', gap: 2 }}>
                          <DropdownList
                            label={"Start date*"}
                            value={work?.startMonth?.toString()!}
                            onChange={(e) => setWork({ ...work, startMonth: Number(e.target.value) })}
                            options={getMonthOptions()}
                          // errorMsg={errors.start_month}
                          />
                          <DropdownList
                            label={""}
                            value={work?.startYear?.toString()!}
                            onChange={(e) => setWork({ ...work, startYear: Number(e.target.value) })}
                            options={getYearOptions()}
                          // errorMsg={errors.start_year}
                          />
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'end', justifyContent: 'space-between', gap: 2 }}>
                          < DropdownList
                            label={"End date*"}
                            value={work?.endMonth?.toString()!}
                            onChange={(e) => setWork({ ...work, endMonth: Number(e.target.value) })}
                            options={getMonthOptions()}
                            isDisabled={work?.isCurrent === 1}
                          // errorMsg={errors.end_month}
                          />
                          <DropdownList
                            label={""}
                            value={work?.endYear?.toString()!}
                            onChange={(e) => setWork({ ...work, endYear: Number(e.target.value) })}
                            options={getYearOptions()}
                            isDisabled={work?.isCurrent === 1}
                          // errorMsg={errors.end_year}
                          />
                        </Box>
                      </Box>
                    </div>
                    <div style={buttonStyle}>
                      <Button
                        onClick={() => handleOnClickClose()}
                        sx={{ color: '#FFFFFF' }}
                        variant='outlined'>
                        Close
                      </Button>
                      {
                        props.action == "CREATE" ?
                          <Button
                            onClick={() => handleOnClickCreate()}
                            variant="contained"
                            color="secondary">
                            Create
                          </Button> :
                          <Button
                            onClick={() => handleOnClickUpdate()}
                            variant="contained"
                            color="secondary">
                            Update
                          </Button>
                      }


                    </div>
                  </>
                  )}
              </>
            }
          />

        </>

      }
    </>
  );
};

export default WorkForm;