import { useState } from 'react'
import {Input, type InputState} from '../../../shared/ui/input'
import TickBox from '../../../shared/ui/tick_box'
import './LoginPage.css'
import { Link } from 'react-router'
import Button from '../../../shared/ui/button'
import arrow_right from '../../../shared/assets/icon/arrow-right.svg'
import university from '../../../shared/assets/icon/university.svg'
import { useLogin } from '../../../features/authentication/login/login'
import { apiError, errorCode } from '../../../shared/api/error'

function LoginPage() {

    type FieldState = {
        value: string;
        hint: string;
        state: InputState;
    };

    type LoginFormState = {
        username: FieldState;
        password: FieldState;
    };

    const [rememberMe, setRememberMe] = useState(false)

    const loginMutation = useLogin()

    const [form, setForm] = useState<LoginFormState>({
        username: {
            value: "",
            hint: "",
            state: "default",
        },
        password: {
            value: "",
            hint: "",
            state: "default",
        },
    });

    type FieldName = keyof LoginFormState;

    function updateField(
        field: FieldName,
        updates: Partial<FieldState>
    ) {
        setForm(prev => ({
            ...prev,
            [field]: {
                ...prev[field],
                ...updates,
            },
        }));
    }
    
    function validate_username(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value.trim()

        if (value == undefined) {
            updateField("username", {
                value,
                state: "error",
                hint: "Undefined username or email"
            })
            return
        } else if (value == "") {
            updateField("username", {
                value,
                hint: "Username or email must not be blanked",
                state: "error"
            })
            return
        }

        updateField("username", {
            value,
            hint: "",
            state: "default"
        })
    }

    function validate_password(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;

        if (value === undefined) {
            updateField("password", {
                value,
                state: "error",
                hint: "Undefined password",
            });
            return;
        } else if (value == "") {
            updateField("password", {
                value,
                hint: "Password must not be blanked",
                state: "error"
            })
            return
        }

        updateField("password", {
            value,
            hint: "",
            state: "default"
        })
    }

    function submit() {
        let type
        if (form.username.value.includes('@')) type = "email"
        else type = "username"
        loginMutation.mutate(
            {
                type: type,
                data: {
                    identifier: form.username.value,
                    password: form.password.value
                }
            },
            {
                onError: (error) => {
                    if (error instanceof apiError && error.errorCode && error.errorCode[0] == errorCode.INVALID_CREDENTIALS) {
                        updateField("username", {
                            hint: "Invalid credentials",
                            state: "error"
                        })
                        updateField("password", {
                            hint: "Invalid credentials",
                            state: "error"
                        })
                        return
                    }

                    updateField("username", {
                        hint: "Unknown error",
                        state: "error"
                    })

                    updateField("password", {
                        hint: "Unknown error",
                        state: "error"
                    })
                }
            }
        )
    }

    return <div className='login_page'>
        <form className='login_form'>
            <div className='form_introduction'>
                <p className='eye_brow'>
                    HEY, STUDY BUDDY ✦
                </p>
                <p className='title'>
                    WELCOME BACK
                </p>
                <p className='description'>
                    Your next great study session starts here.
                </p>
            </div>
            <div>
                <div>
                    <label>EMAIL OR USERNAME</label>
                    <Input value={form.username.value} autoComplete='email' state={form.username.state} hint={form.username.hint} onChange={validate_username}/>
                </div>
                <div>
                    <label>PASSWORD</label>
                    <Input type='password' autoComplete='current_password' value={form.password.value} state={form.password.state} hint={form.password.hint} onChange={validate_password}/>
                </div>
                <div className='login_preference'>
                    <div className='remember'>
                        <TickBox checked={rememberMe} onChange={setRememberMe}/>
                        Remember me
                    </div>
                    <div>
                        <Link to="/auth/recover_password">Forgot password?</Link>
                    </div>
                </div>
            </div>
            <Button onClick={submit} disabled={loginMutation.isPending || (form.username.value == "") || (form.password.value == "")}>
                Login 
                <img src={arrow_right}></img>
            </Button>
            <div className='alt_divider'>
                <div className='divider'/>
                OR
                <div className='divider'/>
            </div>
            <div className='alt_method'>
                <Button variant='secondary' className='alt_button'>
                    <p className='google'>G</p>
                    Continue with Google
                </Button>
                <Button variant='secondary' className='alt_button'>
                    <img src={university}/>
                    Continue with university email
                </Button>
            </div>
            <div className='link_content'>
                <Link to='/auth/register'>Create an account</Link>
            </div>
        </form>        
    </div>
}

export default LoginPage