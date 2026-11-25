import './SetPassword.css'
import key from '../../../shared/assets/icon/key.svg'
import { Input } from '../../../shared/ui/input'
import Button from '../../../shared/ui/button'
import arrow_right from '../../../shared/assets/icon/arrow-right.svg'
import { Link } from 'react-router'

function SetPasswordPage() {

    return <div className='set_password_page'>
        <form className='set_password_form'>
            <div className='key_sticker'>
                <img src={key}></img>
            </div>
            <div className='form_introduction'>
                <p className='eye_brow'>
                    FRESH START. SAME GREAT YOU.
                </p>
                <p className='title'>
                    SET NEW PASSWORD
                </p>
                <p className='description'>
                    Make it strong, make it yours. Let’s get you back to your study crew.
                </p>
            </div>
            <div>
                <div>
                    <label>NEW PASSWORD</label>
                    <Input />
                </div>
                <div>
                    <label>CONFIRMED PASSWORD</label>
                    <Input />
                </div>
            </div>
            <Button>
                Reset Password
                <img src={arrow_right}/>
            </Button>
            <div className='link_content'>
                <img src={arrow_right}/> <Link to='/auth/register'>Back to Login</Link>
            </div>
        </form>
    </div>
}

export default SetPasswordPage