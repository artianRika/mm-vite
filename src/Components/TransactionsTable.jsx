import * as React from 'react';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
} from '@mui/material';

function createTransaction(date, name, amount) {
    return { date, name, amount };
}

const rows = [
    createTransaction('12/02/2025', "Maro", 120),
    createTransaction('13/02/2025', "Ultra", 130),
    createTransaction('14/02/2025', "Withdraw", 6000),
];

export default function TransactionsTable() {
    return (
        <TableContainer component={Paper} sx={{ mt: 6, p: 1 }}>
            <Table aria-label="transactions" size="small">
                <TableBody>
                    {rows.map((row, index) => (
                        <TableRow
                            key={index}
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                mb: 1,
                                px: 1,
                                alignItems: 'center',
                            }}
                        >
                            <TableCell sx={{ flex: 1 }}>{row.date}</TableCell>

                            <TableCell
                                sx={{
                                    flex: 1,
                                    fontSize: '1.25rem',
                                    fontWeight: 500,
                                    lineHeight: 1,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    textAlign: 'center',
                                }}
                            >
                                {row.name}
                            </TableCell>

                            <TableCell
                                sx={{
                                    flex: 1,
                                    fontSize: '1rem',
                                    textAlign: 'right',
                                }}
                            >
                                {row.amount}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
