import 'bootstrap/dist/css/bootstrap.min.css'
import './TradingPage.scss'
import { useForm } from "react-hook-form";
import { RootStateOrAny, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {transferCoin} from '../../actions/users'

type TradingType = {
    amount: number,
    address: string,
    privateKeyPassword: string,
}

export const TradingPage = () => {
    const { handleSubmit, register, formState: { errors } } = useForm<TradingType>();
    const user = useSelector((state:RootStateOrAny) => state.user);
    const history = useHistory();
    const onSubmit = handleSubmit((data:any) => {
            console.log('a')
            transferCoin(data).then(t => {
                console.log(t);
            });
    });

    useEffect(() => {
        if (!user.authenticate) history.push('/login')
    });
    
    return (
        <> 
            <div className="container tradingPage pt-3">
                <form className="container" onSubmit={onSubmit}>
                    <div className="_title">
                        <i className="fa fa-paper-plane" aria-hidden="true" />
                        <span className="ml-3">Send Coin</span>
                    </div>
                    <div className="_body">
                        <div className="row form-element">
                            <label className="form-label col-12">
                                <div className="form-element-title">
                                    <span>Amount</span>
                                </div>
                            </label>
                            <input {...register("amount", {
                                    required: "Required",
                                    validate: value => value !== 0
                                })}
                                className="input100 form-control form-group col-12  input-custom" type="number" 
                                id="amount" name="amount"
                                placeholder="HPR 0.00" height="48px" data-lpignore="true" spellCheck="true"
                            />
                            <span className="focus-input100"></span>
                            <span className = "text-danger mr-5 col-12 ">
                                {errors.amount && 'Amount must larger than 0.00'}
                            </span>
                        </div>
                        <div className="row form-element">
                            <label className="form-label col-12">
                                <div className="form-element-title">
                                    <span>To</span>
                                </div>
                            </label>
                            <input {...register("address", {
                                    required: "Required",
                                    validate: value => value !== ""
                                })} id="address" name="address" 
                                className="input100 form-control form-group col-12  input-custom" 
                                type="text"
                            />
                            <span className="focus-input100"></span>
                            <span className = "text-danger mr-5 col-12 ">
                                {errors.address && 'Address must not empty'}
                            </span>
                        </div>
                        <div className="row form-element">
                            <label className="form-label col-12">
                                <div className="form-element-title">
                                    <span>Private Key Password</span>
                                </div>
                            </label>
                            <input {...register("privateKeyPassword", {
                                    required: "Required",
                                    validate: value => value !== ""
                                })} id="privateKeyPassword" name="privateKeyPassword"
                                className="input100 form-control form-group col-12  input-custom" 
                                type="password"
                            />
                            <span className="focus-input100"></span>
                            <span className = "text-danger mr-5 col-12 ">
                                {errors.privateKeyPassword && 'privateKeyPassword must not empty'}
                            </span>
                        </div>
                        <div className="row col-12 btn-controller">
                            <button type="submit" className="btn col-3 col-md-2 btn-success btn-custom">Send</button>
                            <button type="reset" className="btn ml-3 col-3 col-md-2 btn-secondary btn-custom">Reset</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}