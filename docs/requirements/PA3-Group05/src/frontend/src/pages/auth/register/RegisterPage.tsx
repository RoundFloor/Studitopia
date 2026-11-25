import { useState } from 'react'
import {Input, type InputState} from '../../../shared/ui/input'
import TickBox from '../../../shared/ui/tick_box'
import './RegisterPage.css'
import { Link } from 'react-router'
import Button from '../../../shared/ui/button'
import arrow_right from '../../../shared/assets/icon/arrow-right.svg'
import { apiError, errorCode } from '../../../shared/api/error'
import { useRegister } from '../../../features/authentication/register/register'
import error from '../../../shared/assets/icon/error.svg'

function RegisterPage() {

    type FieldState = {
        value: string;
        hint: string;
        state: InputState;
    };

    type RegisterFormState = {
        displayname: FieldState;
        username: FieldState;
        email: FieldState;
        password: FieldState;
        confirmed_password: FieldState;
    };

    const [agree, setAgree] = useState(false)

    const [warning, setWarning] = useState("")

    const registerMutation = useRegister()

    const [form, setForm] = useState<RegisterFormState>({
        displayname: {
            value: "",
            hint: "",
            state: "default"
        },
        username: {
            value: "",
            hint: "",
            state: "default",
        },
        email: {
            value: "",
            hint: "",
            state: "default"
        },
        password: {
            value: "",
            hint: "",
            state: "default",
        },
        confirmed_password: {
            value: "",
            hint: "",
            state: "default"
        }
    });

    type FieldName = keyof RegisterFormState;

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

    function validate_displayname(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value

        const regex = /^[a-zA-Z0-9]+([ ][a-zA-Z0-9]+)*$/
        if (value == undefined) {
            updateField("displayname", {
                value,
                state: "error",
                hint: "Undefined display name"
            })
            return
        } else if (!regex.test(value)) {
            updateField("displayname", {
                value,
                state: "error",
                hint: "Display name only includes letter, number and space"
            })
            return
        } else if (value.length < 8 || value.length > 32) {
            updateField("displayname", {
                value,
                state: "error",
                hint: "Display name length must not smaller than 8 and larger than 32"
            })
            return
        }

        updateField("displayname", {
            value,
            state: "success",
            hint: "Valid display name format"
        })
    }
    
    function validate_username(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value.trim()

        const regex = /^[a-z][a-z0-9]*([.][a-z0-9]+)*$/
        if (value == undefined) {
            updateField("username", {
                value,
                state: "error",
                hint: "Undefined username"
            })
            return
        } else if (!regex.test(value)) {
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
    }

    function validate_email(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value.trim()

        const regex = /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
        if (value == undefined) {
            updateField("email", {
                value,
                state: "error",
                hint: "Undefined email"
            })
            return
        } else if (!regex.test(value)) {
            updateField("email", {
                value,
                state: "error",
                hint: "Invalid email format"
            })
            return
        } 

        updateField("email", {
            value,
            state: "success",
            hint: "Valid email format"
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

        if (value == form.confirmed_password.value) {
            updateField("confirmed_password", {
                state: "success",
                hint: ""
            })
        } else {
            updateField("confirmed_password", {
                state: "error",
                hint: "Password do not match"
            })
        }

        updateField("password", {
            value,
            state: "success",
            hint: "Valid password format",
        });
    }

    function validate_confirmed_password(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;

        if (value === undefined) {
            updateField("confirmed_password", {
                value,
                state: "error",
                hint: "Undefined confirmed password",
            });
            return;
        } else if (value != form.password.value) {
            updateField("confirmed_password", {
                value,
                state: "error",
                hint: "Password do not match"
            })
            return
        }

        updateField("confirmed_password", {
            value,
            state: "success",
            hint: ""
        })

    }

    function submit() {
        registerMutation.mutate(
            {
                displayname: form.displayname.value,
                username: form.username.value,
                email: form.email.value,
                password: form.password.value
            },
            {
                onError: (error) => {
                    if (error instanceof apiError) {
                        if (error.errorCode) {
                            switch (error.errorCode[0]) {
                                case errorCode.INVALID_DISPLAYNAME:
                                    updateField("displayname", {
                                        state: "error",
                                        hint: "Invalid display name"
                                    })
                                    return
                                case errorCode.DUPLICATED_EMAIL: 
                                    updateField("email", {
                                        state: "error",
                                        hint: "Email already exists"
                                    })
                                    return
                                case errorCode.DUPLICATED_USERNAME:
                                    updateField("username", {
                                        state: "error",
                                        hint: "Username already exists"
                                    })
                                    return
                                case errorCode.UNREGISTERED_EMAIL_DOMAIN: 
                                    updateField("email", {
                                        state: "error",
                                        hint: "Domain of this email wasn't registered"
                                    })
                                    return
                                case errorCode.INVALID_EMAIL:
                                    updateField("email", {
                                        state: "error",
                                        hint: "Invalid email format"
                                    })
                                    return
                                case errorCode.INVALID_USERNAME:
                                    updateField("username", {
                                        state: "error",
                                        hint: "Invalid username format"
                                    })
                                    return
                                case errorCode.INVALID_PASSWORD:
                                    updateField("password", {
                                        hint: "Invalid password format",
                                        state: "error"
                                    })
                                    return
                            }
                        }
                    }

                    setWarning("Unknown error")
                }
            }
        )
    }

    function validate_agree(checked: boolean) {
        setAgree(checked)
        if (checked == false) {
            setWarning("Please agree to the policy to continue")
            return
        } 
        setWarning("")
    }

    return <div className='register_page'>
        <form className='register_form'>
            <div className='form_introduction'>
                <p className='eye_brow'>
                    YOUR NEXT CHAPTER NEXT HERE                
                </p>
                <p className='title'>
                    JOIN THE STUDY CROWD
                </p>
                <p className='description'>
                    Big goals are better with good company. Let’s get you in.
                </p>
            </div>
            <div>
                <div>
                    <label>DISPLAY NAME</label>
                    <Input value={form.displayname.value} state={form.displayname.state} hint={form.displayname.hint} onChange={validate_displayname}/>
                </div>
                <div>
                    <label>USERNAME</label>
                    <Input value={form.username.value} state={form.username.state} hint={form.username.hint} onChange={validate_username}/>
                </div>
                <div>
                    <label>EMAIL</label>
                    <Input value={form.email.value} state={form.email.state} hint={form.email.hint} onChange={validate_email}/>
                </div>
                <div>
                    <label>PASSWORD</label>
                    <Input type='password' value={form.password.value} state={form.password.state} hint={form.password.hint} onChange={validate_password}/>
                </div>
                <div>
                    <label>CONFIRM PASSWORD</label>
                    <Input type='password' value={form.confirmed_password.value} state={form.confirmed_password.state} hint={form.confirmed_password.hint} onChange={validate_confirmed_password}/>
                </div>
                <div className='agree'>
                    <TickBox checked={agree} onChange={validate_agree}/>
                    <div className="link_content">
                        I agree to the <Link to="/term_service">Terms of service</Link> and <Link to="/privacy_policy">Privacy Policy</Link>
                    </div>
                </div>
                {warning != "" && 
                    <div className="hint_wrapper">
                        <img src={error}/>
                        <span>{warning}</span>
                    </div>}
            </div>
            <Button onClick={submit} disabled={registerMutation.isPending || (form.displayname.state != "success" ) || (form.username.state != "success") || (form.email.state != "success") || (form.password.state != "success") || (form.confirmed_password.state != "success")}>
                Create account  
                <img src={arrow_right}></img>
            </Button>
            <div className='link_content'>
                Already have an account? <Link to="/auth/login">Login</Link>
            </div>
        </form>        
    </div>
}

export default RegisterPage