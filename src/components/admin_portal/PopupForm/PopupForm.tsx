import { Modal, Box } from '@mui/material';

import './PopupForm.css';

interface PopupFormProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    title: string;
    form: React.ReactElement<HTMLDivElement>;
}

const boxStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
    height: '70%',
    bgcolor: '#242528',
    borderRadius: '15px',
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
};

const titleStle = {
    fontSize: '20px',
}

const formStle = {
    height: '85%',
    overflow: 'scroll',
}

const buttonStle = {
    display: 'flex',
    justifyContent: 'end',
}

const PopupForm: React.FC<PopupFormProps> = ({ open, setOpen, title, form }) => {
    return (
        <div className='popup-form'>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={boxStyle}>
                    <div style={titleStle}>
                        {title}
                    </div>
                    <div style={formStle}>
                        {form}
                    </div>
                    <div style={buttonStle}>
                        <button onClick={() => setOpen(false)}>Close</button>
                        <button>Update</button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

export default PopupForm;