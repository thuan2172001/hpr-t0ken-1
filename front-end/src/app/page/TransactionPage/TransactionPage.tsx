import { getLogs} from '../../actions';
import React, { useState, useEffect } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import './TransactionPage.scss'
import { Table } from 'react-bootstrap';
import Loading from '../LoadingPage/Loading'; 

export const TransactionPage = () => {
    const user = useSelector((state:RootStateOrAny) => state.user);
    const [transactionHistory, setTransactionHistory] = useState([]);
    const [loading, setLoading] = useState(true)
    // let timer = setTimeout(() => setReset(!reset), 20000)
    useEffect(() => {
        getLogs({address: user.user.wallet}).then(data => {
            console.log(data)
            setLoading(true)
            // clearTimeout(timer)
            data.length !== 0 && 
            setTransactionHistory(data.reverse().map((element:any, i:number) => 
                <tr className="row" key={i}>
                    <td className="col-4 hash-tag text-truncate"><span>
                        <a className="transaction-field" href={`https://etherscan.io/tx/${element.transactionHash}`}>{element.transactionHash}</a></span></td>
                    <td className="col-2 hash-tag text-truncate"><span>
                        {element.event}</span></td>
                    <td className="col-2 hash-tag text-truncate"><span>
                        <a className="transaction-field"href={`https://etherscan.io/address/${element.from}`}>{element.from}</a></span></td>
                    <td className="col-2 hash-tag text-truncate"><span>
                        <a className="transaction-field" href={`https://etherscan.io/address/${element.to}`}>{element.to}</a></span></td>
                    <td className="col-2 hash-tag text-truncate"><span>
                        {element.value}</span></td>
                </tr>
            ))
        }).then(() => setLoading(false)).catch((err:any) => {
            setLoading(false)
            console.log(err)
        })
    }, [user.user.wallet])

    const rerenderTransaction = () => {
        getLogs({address: user.user.wallet}).then(data => {
            setLoading(true)
            console.log(data)
            // clearTimeout(timer)
            setTransactionHistory(data.reverse().map((element:any, i:number) => 
                <tr className="row" key={i}>
                    <td className="col-4 hash-tag text-truncate"><span>
                        <a className="transaction-field" href={`https://etherscan.io/tx/${element.transactionHash}`}>{element.transactionHash}</a></span></td>
                    <td className="col-2 hash-tag text-truncate"><span>
                        {element.event}</span></td>
                    <td className="col-2 hash-tag text-truncate"><span>
                        <a className="transaction-field"href={`https://etherscan.io/address/${element.from}`}>{element.from}</a></span></td>
                    <td className="col-2 hash-tag text-truncate"><span>
                        <a className="transaction-field" href={`https://etherscan.io/address/${element.to}`}>{element.to}</a></span></td>
                    <td className="col-2 hash-tag text-truncate"><span>
                        {element.value}</span></td>
                </tr>
            ))
        }).then(() => setLoading(false)).catch((err:any) => {
            console.log(err)
        })
    }

    if (loading) return <Loading />
    return ( 
        <div className="container pt-5 pb-5">
            <h2 className="pt-1 pb-3">Transaction History <button style={{position:"relative", float:"right", marginRight: "8px"}} onClick={rerenderTransaction}>
                <i className="fas fa-history" /></button></h2>
            <Table className="transactionTable" responsive striped hover>
                <thead>
                    <tr className="row">
                        <th className="col-4">Transaction Hash</th>
                        <th className="col-2">Event</th>
                        <th className="col-2">From</th>
                        <th className="col-2">To</th>
                        <th className="col-2">Value (HPR)</th>
                    </tr>
                </thead>
                <tbody>
                    {transactionHistory}
                </tbody>
            </Table>
        </div>
    )
}
