import './SetPassword.css'
import key from '../../../shared/assets/icon/key.svg'
import { Input, type InputState } from '../../../shared/ui/input'
import Button from '../../../shared/ui/button'
import arrow_right from '../../../shared/assets/icon/arrow-right.svg'
import { Link } from 'react-router'
import { useState } from 'react'

function SetPasswordPage() {

    type FieldState = {
        value: string;
        hint: string;
        state: InputState;
    };

    type SetPassWordFormState = {
        password: FieldState;
        confirmed_password: FieldState;
    };

    const [form, setForm] = useState<SetPassWordFormState>({
        password: {
            value: "",
            hint: "",
            state: "default",
        },
        confirmed_password: {
            value: "",
            hint: "",
            state: "default",
        },
    });

    type FieldName = keyof SetPassWordFormState;

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

    function resetPassword() {

    }

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
                    <Input type='password' onChange={validate_password} state={form.password.state} hint={form.password.hint} value={form.password.value}/>
                </div>
                <div>
                    <label>CONFIRMED PASSWORD</label>
                    <Input type='password' onChange={validate_confirmed_password} state={form.confirmed_password.state} hint={form.confirmed_password.hint} value={form.confirmed_password.value}/>
                </div>
            </div>
            <Button disabled={(form.password.state != 'success') || (form.confirmed_password.state != 'success')}>
                Reset Password
                <img src={arrow_right}/>
            </Button>
            <div className='link_content'>
                <img src={arrow_right}/> <Link to='/auth/login'>Back to Login</Link>
            </div>
        </form>
    </div>
}

export default SetPasswordPage