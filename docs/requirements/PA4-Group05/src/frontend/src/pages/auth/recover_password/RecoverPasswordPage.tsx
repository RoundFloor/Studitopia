import './RecoverPassword.css'
import lock from '../../../shared/assets/icon/lock.svg'
import { Input, type InputState } from '../../../shared/ui/input'
import Button from '../../../shared/ui/button'
import arrow_right from '../../../shared/assets/icon/arrow-right.svg'
import { Link, useNavigate } from 'react-router'
import { useState } from 'react'

function RecoverPasswordPage() {
    const navigate = useNavigate();

    type UsernameState = {
        value: string;
        hint: string;
        state: InputState;
    };

    const [username, setUsername] = useState<UsernameState>({
        value: "",
        hint: "",
        state: "default",
    });

    function updateField(
        updates: Partial<UsernameState>
    ) {
        setUsername(prev => ({
            ...prev,
            ...updates
        }));
    }

    function validate_username(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value.trim()

        if (value == undefined) {
            updateField({
                value,
                state: "error",
                hint: "Undefined username"
            })
            return
        } else if (!value.includes('@')) {
            const regex = /^[a-z][a-z0-9]*([.][a-z0-9]+)*$/
            if (!regex.test(value)) {
                if (value[0] < 'a' || value[0] > 'z') {
                    updateField({
                        value,
                        state: "error",
                        hint: "Username must start by a lowercase"
                    })
                    return
                } else {
                    updateField({
                        value,
                        state: "error",
                        hint: "Username include only lowercase, numbers and dots"
                    })
                    return 
                }
            } else if (value.length < 8 || value.length > 32) {
                updateField({
                    value,
                    state: "error",
                    hint: "Username length must not smaller than 8 and larger than 32"
                })
                return
            }

            updateField({
                value,
                state: "success",
                hint: "Valid username format"
            })
        } else {
            const regex = /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
            if (!regex.test(value)) {
                updateField({
                    value,
                    state: "error",
                    hint: "Invalid email format"
                })
                return
            } 

            updateField({
                value,
                state: "success",
                hint: "Valid email format"
            })
        }
    }

    function sendOTP() {
        const trimmedIdentifier = username.value.trim();
        if (!trimmedIdentifier) {
            return; 
        }

        navigate("/auth/recover_otp", {
            state: {
                purpose: "password",
                identifier: trimmedIdentifier,
                type: trimmedIdentifier.includes("@") ? "email" : "username",
            },
        });
    }

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
                <Input onChange={validate_username} state={username.state} hint={username.hint} value={username.value}/>
            </div>
            <Button disabled={username.state != 'success'} onClick={sendOTP}>
                Send OTP
                <img src={arrow_right}/>
            </Button>
            <div className='link_content'>
                <img src={arrow_right}/> <Link to='/auth/login'>Back to Login</Link>
            </div>
        </form>
    </div>
}

export default RecoverPasswordPage