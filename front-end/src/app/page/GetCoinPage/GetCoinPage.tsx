import 'bootstrap/dist/css/bootstrap.min.css'
import { useForm } from "react-hook-form";
import { mint } from '../../actions/users'

type TradingType = {
    amount: number,
    privateKeyPassword: string,
}

export const GetCoinPage = () => {
    const { handleSubmit, register, formState: { errors } } = useForm<TradingType>();
    const onSubmit = handleSubmit((data:any) => {
            console.log('a')
            mint(data).then(t => {
                console.log(t);
                alert('Successfully!')
            }).catch(e => {
                console.log(e);
                alert('Fail!')
            });
    });

    return (
        <> 
            <div className="container tradingPage pt-3">
                <form className="container" onSubmit={onSubmit}>
                    <div className="_title">
                        <i className="fa fa-paper-plane" aria-hidden="true" />
                        <span className="ml-3">Get Coin</span>
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
                            <button type="submit" className="btn col-3 col-md-2 btn-success btn-custom">Get Coin</button>
                            <button type="reset" className="btn ml-3 col-3 col-md-2 btn-secondary btn-custom">Reset</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}