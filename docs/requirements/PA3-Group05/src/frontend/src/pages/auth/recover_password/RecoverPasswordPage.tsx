import './RecoverPassword.css'
import lock from '../../../shared/assets/icon/lock.svg'
import { Input } from '../../../shared/ui/input'
import Button from '../../../shared/ui/button'
import arrow_right from '../../../shared/assets/icon/arrow-right.svg'
import { Link } from 'react-router'

function RecoverPasswordPage() {

    return <div className='recover_password_page'>
        <form className='recover_form'>
            <div className='lock_sticker'>
                <img src={lock}></img>
            </div>
            <div className='form_introduction'>
                <p className='eye_brow'>
                    IT HAPPENS TO THE BEST OF US
                </p>
                <p className='title'>
                    LOST YOUR PASSWORD?
                </p>
                <p className='description'>
                    No stress. Enter your email and we’ll send you a link to reset it.
                </p>
            </div>
            <div>
                <label>EMAIL OR USERNAME</label>
                <Input />
            </div>
            <Button>
                Send reset link
                <img src={arrow_right}/>
            </Button>
            <div className='link_content'>
                <img src={arrow_right}/> <Link to='/auth/register'>Back to Login</Link>
            </div>
        </form>
    </div>
}

export default RecoverPasswordPage