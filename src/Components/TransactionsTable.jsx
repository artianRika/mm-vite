import * as React from 'react';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer, TablePagination,
    TableRow,
} from '@mui/material';
import {supabase} from "../../utils/supabase.js";
import {useContext, useEffect, useState} from "react";
import {CurrencyContext} from "@/Context/CurrencyContext.jsx";
import moment from "moment";
import colors from "@/colors.js";


export default function TransactionsTable(props) {

    const { selectedCurrency } = useContext(CurrencyContext)
    const { fromDate, toDate } = props;

    const [rows, setRows] = useState([])
    const [transactions, setTransactions] = useState({})

    const getTransactions = async () => {
        const {data, error} = await supabase
            .from('Transactions')
            .select(`
                *,
                Currencies (
                  *,
                  Users (
                    *
                  )
                )
              `)
            .eq('currency_id', selectedCurrency.currency_id)
            .eq('Currencies.user_id', '3bf91472-8ad5-4e00-aa6e-90f1b28ff841')
            .gte('created_at', fromDate.toISOString())
            .lte('created_at', toDate.clone().endOf('day').toISOString())
            .order('created_at', { ascending: true });

        if(error) {
            console.log("error fetching the trans..")
        }
        else{
            setTransactions(data)
        }
    }
    useEffect(() => {
        getTransactions()
    }, [selectedCurrency, fromDate, toDate]);

    useEffect(() => {
        function createTransaction(date, name, amount, type) {
            return { date, name, amount, type };
        }

        if (transactions.length > 0) {
            const newRows = transactions.map(trans =>
                createTransaction(moment(trans.created_at).format("DD/MMM/YYYY"), trans.description, trans.transaction_amount, trans.transaction_type)
            );
            setRows(newRows);
        }else{
            setRows([])
        }
    }, [transactions]);


    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', mt: 1, py: 2}}>
            <TableContainer>
                <Table aria-label="transactions" size="small">
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => (
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
                                <TableCell
                                    sx={{
                                    fontSize: '1.1rem',
                                    flex: 1
                                    }}
                                >
                                    {row.date}</TableCell>

                                <TableCell
                                    sx={{
                                        flex: 1,
                                        fontSize: '1.1rem',
                                        color: row.type === "Income" ? colors.income : 'red',
                                        fontWeight: 500,
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
                                        color: row.type === "Income" ? colors.income : 'red',
                                        fontSize: '1.1rem',
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

            <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
