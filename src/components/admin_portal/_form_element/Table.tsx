import * as React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import MoreOptionButton from '../MoreOptionButton';
import adminTheme from 'src/theme';

import {
    Table as MuiTable,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Skeleton,
    Tooltip,
    IconButton,
    Typography,
    Toolbar
} from '@mui/material';

export type Column = {
    id: string;
    label: string;
}

export type Row = {
    [key: string]: string | number; // Allows for dynamic keys and values
}

interface Props {
    title: string;
    isLoading: boolean;
    columns: Column[];
    data: Row[];
    handleOnClickEdit: (id: number | null) => void;
    handleOnClickCreate: () => void;
}

const Table: React.FC<Props> = (props) => {

    return (
        <>
            <TableContainer component={Paper} sx={{ backgroundColor: adminTheme.palette.primary.main, color: '#fff' }}>
                <Toolbar
                >
                    <Typography
                        sx={{ flex: '1 1 100%', color: adminTheme.palette.secondary.main }}
                        variant="h6"
                        id="tableTitle"
                        component="div"
                    >
                        {props.title}
                    </Typography>
                    <MoreOptionButton
                        options={[
                            { name: "Create", onClick: () => props.handleOnClickCreate() }
                        ]}
                    />
                </Toolbar>
                <MuiTable sx={{ minWidth: 650 }} aria-label="table">
                    <TableHead>
                        <TableRow>
                            {props.columns.map((column) => (
                                <TableCell key={column.id} align="left">
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {
                            props.isLoading ?
                                (
                                    Array.from(new Array(5)).map((_, index) => (
                                        <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            {props.columns.map((column) => (
                                                <TableCell key={column.id} align="left" >
                                                    <Skeleton variant="text" width="100%" />
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))
                                )
                                :
                                props.data.map((row, rowIndex) => (
                                    <TableRow key={rowIndex} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        {props.columns.map((column) => (
                                            column.id === 'action' ?
                                                <TableCell key={column.id} align="left" >
                                                    <Tooltip title="Edit">
                                                        <IconButton onClick={() => props.handleOnClickEdit(Number(row["action"]))}>
                                                            <EditIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </TableCell>
                                                :
                                                <TableCell key={column.id} align="left" >
                                                    {row[column.id]}
                                                </TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                    </TableBody>
                </MuiTable>
            </TableContainer>
        </>
    );
}

export default Table;
