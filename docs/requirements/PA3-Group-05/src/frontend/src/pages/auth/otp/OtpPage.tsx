import './OtpPage.css'
import mail_open from '../../../shared/assets/icon/mail-open.svg'
import { useEffect, useRef, useState } from 'react'
import { Input } from '../../../shared/ui/input'
import Button from '../../../shared/ui/button'
import arrow_right from '../../../shared/assets/icon/arrow-right.svg'
import { Navigate, useLocation } from 'react-router'
import { useCreateOTP, useVerifyOTP } from '../../../features/authentication/otp/otp'
import { OTPStore } from '../../../entities/otp/otp-store'
import { apiError, errorCode } from '../../../shared/api/error'
function OtpPage() {

    const {state} = useLocation();
    const purpose = state?.purpose

    if (!purpose) {
        return <Navigate to="/auth/login" replace />;
    }

    const formatTime = (milliseconds: number) => {
        const totalSeconds = Math.ceil(milliseconds / 1000);

        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;

        return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    };

    function getRemainingTime() {
        if (OTPStore.get("active")) {
            return Math.max(0, OTPStore.get("active")?.expired_time - Date.now())
        }
        else {
            return 0
        }
    }

    const [remainingTime, setRemainingTime] = useState(getRemainingTime);

    const updateTime = () => {
            const active = OTPStore.get("active");

            const remaining = active
                ? Math.max(0, active.expired_time - Date.now())
                : 0;

                setRemainingTime(remaining);

            if (remaining > 0) {
                setTimeout(updateTime, 1000);
            }
        };
    

    const [warning, setWarning] = useState("")
    // const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (!purpose) {
            return;
        }

        const initializeOtp = async () => {
            try {
                console.log("Initialize")
                if (getRemainingTime() > 0) return 
                createOTPMutation.mutate(
                    "active",
                    {
                        onError: (_) => {
                            setWarning("Sending OTP failed")
                        },
                        onSuccess: (data) => {
                            updateTime()
                            OTPStore.save(data, "active")
                        }
                    }
                )

            } catch (error) {
                console.error(error);
            } finally {
                // setLoading(false);
            }
        };

        initializeOtp().then(_ => {
            console.log("Return value")
            updateTime()});
    }, [purpose]);

    const [otp, setOTP] = useState<string[]>(new Array(6).fill(""))
    const otpRef = useRef<(HTMLInputElement | null)[]>([]);

    const createOTPMutation = useCreateOTP()
    const verifyOTPMutation = useVerifyOTP()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value
        const digits = value.replace(/\D/g, "");
        if (!digits) {
            const newOtp = [...otp];
            newOtp[index] = "";
            setOTP(newOtp);
            return;
        }
        const newOtp = [...otp]
        const remaining = 6 - index;
        const values = digits.slice(0, remaining).split("");
        values.forEach((digit, i) => {
            newOtp[index + i] = digit;
        });
        setOTP(newOtp)
        const nextIndex = Math.min(index + values.length, 5);
        otpRef.current[nextIndex]?.focus();
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace") {
            e.preventDefault();

            const newOtp = [...otp];

            if (newOtp[index]) {
                
                newOtp[index] = "";
                setOTP(newOtp);
            } else if (index > 0) {
                
                otpRef.current[index - 1]?.focus();

                newOtp[index - 1] = "";
                setOTP(newOtp);
            }
        } else if (e.key === "ArrowLeft" && index > 0) {
            otpRef.current[index - 1]?.focus()
        } else if (e.key === "ArrowRight" && index < 5) {
            otpRef.current[index + 1]?.focus()
        }
    }

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData("text").trim();
        const regex = /^\d{6}$/
        if (regex.test(pasteData)) {
            setOTP(pasteData.split(""));
            otpRef.current[5]?.focus(); 
        }
    };

    function resendOTP() {
        console.log(getRemainingTime())
        if (getRemainingTime() > 0) return
        createOTPMutation.mutate(
            "active",
            {
                onError: (_) => {
                    setWarning("Sending OTP failed")
                },
                onSuccess: (data) => {
                    updateTime()
                    OTPStore.save(data, "active")
                }
            }
        )
    }

    function verifyOTP() {
        if (getRemainingTime() == 0 || !OTPStore.get("active")) {
            setWarning("Unknown error")
            return
        }
        otp.forEach((digit, _) => {
            if (digit == "") {
                setWarning("Unknown error")
                return
            }
        })
        verifyOTPMutation.mutate(
            {
                created_time: OTPStore.get("active")?.created_time,
                expired_time: OTPStore.get("active")?.expired_time,
                key: otp.join(''),
                type: "active"
            },
            {
                onError: (error) => {
                    console.log(error)
                    if (error instanceof apiError && error.errorCode && (error.errorCode[0] == errorCode.INVALID_OTP || error.errorCode[0] == errorCode.INVALID_SESSION)) {
                        setWarning("Invalid OTP")          
                        return              
                    } 
                    setWarning("Unknown error")
                }
            }
        )
    }

    return <div className='email_verify_page'>
        <form className='verify_form'>
            <div className='inbox_sticker'>
                <img src={mail_open}></img>
            </div>
            <div className='form_introduction'>
                <p className='eye_brow'>
                    ONE TINY STEP TO YOUR STUDY CREW
                </p>
                <p className='title'>
                    CHECK YOUR INBOX
                </p>
                <p className='description'>
                    We sent a 6-digit code to your email
                </p>
            </div>
            <div className='otp_container'>
                {otp.map((data, index) => (
                    <Input
                        key={index}
                        ref={(el) => {
                            otpRef.current[index] = el;
                        }}
                        type="text"
                        inputMode='numeric'
                        pattern="[0-9]*"
                        maxLength={1}
                        value={data}
                        onChange={(e) => handleChange(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        onPaste={handlePaste}
                        className='otp_input'>
                    </Input>
                ))}
                
            </div>
            {warning != "" && <p className='hint'>{warning}</p>}
            <p className='resend'>Resend code in {formatTime(remainingTime)}</p>
            <Button variant='tertiary' className='resend_button' onClick={resendOTP}>
                Resend email
            </Button>
            <Button onClick={verifyOTP} disabled={verifyOTPMutation.isPending}>
                Verify
                <img src={arrow_right}/>
            </Button>
        </form>
    </div>
}

export default OtpPage