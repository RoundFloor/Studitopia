import type { AccountInput } from "./helpers.js";

export type FullFlowTestcase = AccountInput & {
    description: string;
    otp: number;
};

export const fullFlowTestcases: FullFlowTestcase[] = [
    {
        description: "student hcmus domain",
        displayname: "Alice Nguyen",
        email: "alice.nguyen@student.hcmus.edu.vn",
        username: "alice.nguyen",
        password: "Flow@123456",
        otp: 100001,
    },
    {
        description: "apcs domain",
        displayname: "Bao Tran",
        email: "bao.tran@apcs.fitus.edu.vn",
        username: "bao.tran",
        password: "Flow@123456",
        otp: 100002,
    },
    {
        description: "clc domain",
        displayname: "Chi Lan Le",
        email: "chi.lan.le@clc.fitus.edu.vn",
        username: "chi.lan.le",
        password: "Flow@123456",
        otp: 100003,
    },
    {
        description: "ctvp domain",
        displayname: "Dung Pham",
        email: "dung.pham@ctvp.fitus.edu.vn",
        username: "dung.pham",
        password: "Flow@123456",
        otp: 100004,
    },
    {
        description: "hcmut domain",
        displayname: "Giang Vo",
        email: "giang.vo@hcmut.edu.vn",
        username: "giang.vo",
        password: "Flow@123456",
        otp: 100005,
    },
    {
        description: "hcmussh domain",
        displayname: "Hanh Thu Do",
        email: "hanh.thu.do@hcmussh.edu.vn",
        username: "hanh.thu.do",
        password: "Flow@123456",
        otp: 100006,
    },
    {
        description: "hcmiu domain",
        displayname: "Khanh Bui",
        email: "khanh.bui@student.hcmiu.edu.vn",
        username: "khanh.bui",
        password: "Flow@123456",
        otp: 100007,
    },
    {
        description: "gm uit domain",
        displayname: "Linh Hoang",
        email: "linh.hoang@gm.uit.edu.vn",
        username: "linh.hoang",
        password: "Flow@123456",
        otp: 100008,
    },
    {
        description: "ms uit domain",
        displayname: "Minh Dang",
        email: "minh.dang@ms.uit.edu.vn",
        username: "minh.dang",
        password: "Flow@123456",
        otp: 100009,
    },
    {
        description: "st uel domain",
        displayname: "Nam Minh Vu",
        email: "nam.minh.vu@st.uel.edu.vn",
        username: "nam.minh.vu",
        password: "Flow@123456",
        otp: 100010,
    },
    {
        description: "sdh uel domain",
        displayname: "Oanh Kim Ly",
        email: "oanh.kim.ly@sdh.uel.edu.vn",
        username: "oanh.kim.ly",
        password: "Flow@123456",
        otp: 100011,
    },
    {
        description: "reused student hcmus domain",
        displayname: "Phuc Ngo",
        email: "phuc.ngo@student.hcmus.edu.vn",
        username: "phuc.ngo",
        password: "Flow@123456",
        otp: 100012,
    },
];
