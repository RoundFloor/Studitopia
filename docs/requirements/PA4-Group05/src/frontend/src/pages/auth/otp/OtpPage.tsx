import './OtpPage.css'
import mail_open from '../../../shared/assets/icon/mail-open.svg'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Input } from '../../../shared/ui/input'
import Button from '../../../shared/ui/button'
import arrow_right from '../../../shared/assets/icon/arrow-right.svg'
import { Navigate, useLocation } from 'react-router'
import { useCreateOTP, useVerifyOTP } from '../../../features/auth/otp/otp'
import { OTPStore } from '../../../entities/otp/otp-store'
import { apiError, errorCode } from '../../../shared/api/error'
import LoadingPage from '../../loading/LoadingPage'
function OtpPage() {

    const {state} = useLocation();
    const purpose = state?.purpose
    // let identifier, type

    const [otp, setOTP] = useState<string[]>(new Array(6).fill(""))
    const otpRef = useRef<(HTMLInputElement | null)[]>([]);
    const [warning, setWarning] = useState("")
    const [loading, setLoading] = useState(true);

    const createOTPMutation = useCreateOTP()
    const verifyOTPMutation = useVerifyOTP()

    // if (purpose === "password") {
    //     identifier = state?.identifier
    //     type = state?.type 
    // }

    function getRemainingTime() {
        if (OTPStore.get(purpose)) {
            return Math.max(0, OTPStore.get(purpose)?.expired_time - Date.now())
        }
        else {
            return 0
        }
    }

    const [remainingTime, setRemainingTime] = useState(getRemainingTime);


    const syncRemainingTime = useCallback(() => {
        if (!purpose) {
            setRemainingTime(0);
            return 0;
        }
    
        const active = OTPStore.get(purpose);
        const remaining = active
            ? Math.max(0, active.expired_time - Date.now())
            : 0;
    
        setRemainingTime(remaining);
        return remaining;
    }, [purpose]);

    // useEffect(() => {
    //     if (!purpose) {
    //         setLoading(false);
    //         return;
    //     }

    //     let isMounted = true;

    //     const initializeOtp = async () => {
    //         try {
    //             if (getRemainingTime() > 0) {
    //                 updateTime();
    //                 return;
    //             }
    //             await createOTPMutation.mutateAsync(purpose);
    //             if (!isMounted) return;
    //             updateTime();
    //         } catch (error) {
    //             if (!isMounted) return;
    //             console.error(error);
    //             setWarning("Sending OTP failed");
    //         } finally {
    //             if (isMounted) {
    //                 setLoading(false);
    //             }
    //         }
    //     };

    //     initializeOtp();

    //     return () => {
    //         isMounted = false;
    //     };
    // }, [purpose]);

    useEffect(() => {
        if (remainingTime <= 0 || !purpose) return;

        const intervalId = setInterval(() => {
            const active = OTPStore.get(purpose);
            const remaining = active
                ? Math.max(0, active.expired_time - Date.now())
                : 0;

            setRemainingTime(remaining);

            if (remaining <= 0) {
                clearInterval(intervalId);
            }
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, [purpose, remainingTime > 0]);

    const { mutateAsync: createOtp } = createOTPMutation;
    const hasInitializedRef = useRef(false);

    useEffect(() => {
        if (!purpose) {
            setLoading(false);
            return;
        }

        if (hasInitializedRef.current) return;
        let isMounted = true;

        const initializeOtp = async () => {
            try {
                if (syncRemainingTime() > 0) {
                    setLoading(false)
                }

                hasInitializedRef.current = true
                await createOtp(purpose);

                if (!isMounted) return;
                syncRemainingTime();
                hasInitializedRef.current = false
            } catch (error) {
                hasInitializedRef.current = false
                if (!isMounted) return;
            } finally {
                setLoading(false);
            }
        };

        initializeOtp();

        return () => {
            isMounted = false;
        };
    }, [purpose, syncRemainingTime]);

    if (!purpose) {
        return <Navigate to="/auth/login" replace />;
    }

    if (loading) {
        return <LoadingPage />;
    }

    const formatTime = (milliseconds: number) => {
        const totalSeconds = Math.ceil(milliseconds / 1000);

        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;

        return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    };

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
        if (!purpose || getRemainingTime() > 50 || createOTPMutation.isPending) {
            return;
        }

        setWarning("");

        createOTPMutation.mutate(purpose, {
            onError: () => {
                setWarning("Sending OTP failed");
            },
            onSuccess: (data) => {
                OTPStore.save(data, purpose);
                syncRemainingTime();
            },
        });
    }


    function verifyOTP() {
        if (getRemainingTime() == 0 || !OTPStore.get(purpose)) {
            setWarning("Unknown error")
            return
        }
        if (otp.some((digit) => digit.trim() === "")) {
            return; 
        }
        verifyOTPMutation.mutate(
            {
                created_time: OTPStore.get(purpose)?.created_time,
                expired_time: OTPStore.get(purpose)?.expired_time,
                key: otp.join(''),
                type: purpose
            },
            {
                onError: (error) => {
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