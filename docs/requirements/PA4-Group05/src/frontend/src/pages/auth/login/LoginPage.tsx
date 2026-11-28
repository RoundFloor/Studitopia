import { useState } from 'react'
import {Input, type InputState} from '../../../shared/ui/input'
import TickBox from '../../../shared/ui/tick_box'
import './LoginPage.css'
import { Link } from 'react-router'
import Button from '../../../shared/ui/button'
import arrow_right from '../../../shared/assets/icon/arrow-right.svg'
import university from '../../../shared/assets/icon/university.svg'
import { useLogin } from '../../../features/auth/login/login'
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
    
    function validateUsername(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value.trim()

        if (value == undefined) {
            updateField("username", {
                value,
                state: "error",
                hint: "Undefined username"
            })
            return
        } else if (!value.includes('@')) {
            const regex = /^[a-z][a-z0-9]*([.][a-z0-9]+)*$/
            if (!regex.test(value)) {
                if (value[0] < 'a' || value[0] > 'z') {
                    updateField("username", {
                        value,
                        state: "error",
                        hint: "Username must start by a lowercase"
                    })
                    return
                } else {
                    updateField("username", {
                        value,
                        state: "error",
                        hint: "Username include only lowercase, numbers and dots"
                    })
                    return 
                }
            } else if (value.length < 8 || value.length > 32) {
                updateField("username", {
                    value,
                    state: "error",
                    hint: "Username length must not smaller than 8 and larger than 32"
                })
                return
            }

            updateField("username", {
                value,
                state: "success",
                hint: "Valid username format"
            })
        } else {
            const regex = /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
            if (!regex.test(value)) {
                updateField("username", {
                    value,
                    state: "error",
                    hint: "Invalid email format"
                })
                return
            } 

            updateField("username", {
                value,
                state: "success",
                hint: "Valid email format"
            })
        }
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
        }

        let lowercase = false;
        let uppercase = false;
        let number = false;
        let special = false;

        for (let i = 0; i < value.length; i++) {
            if (value[i] >= "a" && value[i] <= "z") lowercase = true;
            else if (value[i] >= "A" && value[i] <= "Z") uppercase = true;
            else if (value[i] >= "0" && value[i] <= "9") number = true;
            else special = true;
        }

        if (!lowercase || !uppercase || !number || !special) {
            updateField("password", {
                value,
                state: "error",
                hint: "The password must contain at least one lowercase, uppercase, number and special character",
            });
            return;
        }

        if (value.length < 8 || value.length > 32) {
            updateField("password", {
                value,
                state: "error",
                hint: "The password must be between 8 and 32 characters",
            });
            return;
        }

        updateField("password", {
            value,
            state: "success",
            hint: "Valid password format",
        });
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
                    <label>USERNAME OR EMAIL</label>
                    <Input autoComplete='username' value={form.username.value} state={form.username.state} hint={form.username.hint} onChange={validateUsername} />
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
            <Button onClick={submit} disabled={loginMutation.isPending || ((form.username.hint != "Unknown error" && form.username.hint != "Invalid credentials") && (form.username.state != "success" || form.password.value == ""))}>
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