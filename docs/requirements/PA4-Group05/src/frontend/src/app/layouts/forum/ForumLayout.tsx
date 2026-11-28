import { NavLink, Outlet, useNavigate, useSearchParams } from "react-router"
import './ForumLayout.css'
import logo from '../../../shared/assets/image/logo.svg'
import log_out from '../../../shared/assets/icon/log-out.svg'
import notify from '../../../shared/assets/icon/bell.svg'
import arrow_down from '../../../shared/assets/icon/arrow-down.svg'
import { Input } from "../../../shared/ui/input"
import Button from "../../../shared/ui/button"
import { useEffect, useRef, useState } from "react"
import { useLogout } from "../../../features/auth/logout/logout"
import { useAccount } from "../../../features/account/me/account"
const root = import.meta.url

export type ForumOutletContextType = {
    visibleTopBar: (visible: boolean) => void;
};

function ForumLayout() {

    const [searchInfo, setSearchInfo] = useState("")
    const [notifyCount, setNotifyCount] = useState(0)
    const { data: user } = useAccount()

    const navigate = useNavigate()
    const logoutMutation = useLogout()

    function stand_for(name: string) {
        const word = name.split(" ")
        if (word.length === 1 && word[0] == "")
            return "AN"
        else if (word.length === 1 && word[0] != "")
            return name.slice(0,2).toUpperCase()

        return (word[0][0] + word[1][0]).toUpperCase()
    }

    function logout() {
        logoutMutation.mutate(
            undefined , {
                onError: (_) =>  {
                    console.log("There exists non-terminated processes")
                }
            }
        )
    }

    function NavBar() {
        const [searchParam] = useSearchParams();
        const current_page = searchParam.get('page') ?? 'trending'
        const page_set = ['Trending', 'Browse', 'Friend', 'Library', 'Settings']
        const page_index = Math.max(page_set.findIndex((value) => value.toLowerCase() == current_page), 0)
        return <nav className="navbar">
            {
                page_set.map(
                    (page, index) => {
                        return <NavLink
                            key={index}
                            to={`forum?page=${page.toLowerCase()}`}
                            end
                            className={`navlink ${current_page == page.toLowerCase()}`}>
                            <img src={new URL(`../../../shared/assets/icon/${page.toLowerCase()}.svg`, root).href} className="navlink-icon" />
                            <span>{page}</span>
                        </NavLink>
                    }
                )
            }
            <div className="selection-box" style={{top: page_index * 74}}>
                <div className="box"></div>
            </div>
        </nav>
    }

    function SideBar() {
        const [isCollapsed, setIsCollapsed] = useState(false);
        const sidebarRef = useRef<HTMLDivElement>(null);

        useEffect(() => {
            const handleOutsideInteraction = (e: MouseEvent | FocusEvent) => {
                if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
                    setIsCollapsed(true);
                }
            };

            document.addEventListener('mousedown', handleOutsideInteraction);
            document.addEventListener('focusin', handleOutsideInteraction);

            return () => {
              document.removeEventListener('mousedown', handleOutsideInteraction);
              document.removeEventListener('focusin', handleOutsideInteraction);
            };
        }, [])        

        return <div 
            ref={sidebarRef}
            tabIndex={0}
            onClick={() => setIsCollapsed(false)}
            onFocus={() => setIsCollapsed(false)}
            className={`side_bar ${isCollapsed ? 'collapsed' : ''}`}>
            <div className="logo-wrapper">
                <img className="logo" src={logo}/>
                <div className="brand_wrapper">
                    Studitopia 
                </div>
            </div>
            <NavBar/>
            <div className='community_note'>
                <p className="tagline">BETTER TOGETHER</p>
                <p className="message">
                    Good questions.<br/>
                    Great company. 
                </p>
                <p className='description'>Ask freely. Share generously.</p>
            </div>
            <div className='logout' onClick={(e) => {
                e.stopPropagation();
                logout()
            }}>
                <img src={log_out}/>
                <span className="logout_text">Log out</span>
            </div>
        </div> 
    }
    function Content() {
        const [visibleTopBar, setVisibleTopBar] = useState(true)
        const [searchParam] = useSearchParams()
        return <div className={`workspace ${searchParam.getAll('page').join(' ')}`}>
            <div className={`top_bar ${visibleTopBar}`}>
                <div className="box">
                    <Input type="search" placeholder="Search threads, people, ideas…" onChange={(e) => {setSearchInfo(e.target.value.trimStart())}} value={searchInfo}/>
                    <Button className="new_post" onClick={() => {navigate('/create_post')}}>
                        + New Post
                    </Button>
                    <div className='wrap_notify' onClick={() => {navigate('/notification')}}>
                        <div className="notify">
                            <img src={notify}></img>
                        </div>
                        {notifyCount != 0 && <div className="notify_count">{(notifyCount > 100) ? "100+" : notifyCount}</div>}
                    </div>
                    <div className="user_profile">
                        <div className="avatar">{stand_for(user?.displayname ?? "Anonymous")}</div>
                        <div>
                            <p className="displayname">{user?.displayname ?? "Anonymous"}</p>
                            <p className="email">{user?.displayname ?? "Anonymous"}</p>
                        </div>
                        <img src={arrow_down} onClick={() => {navigate('/profile')}}/>
                    </div>
                </div>
            </div>
            <div className="padding">
                <Outlet context={{visibleTopBar: setVisibleTopBar } satisfies ForumOutletContextType}/>
            </div>
        </div>
    }


    return <div className="forum_layout">
        <SideBar />
        <Content />
    </div>
}

export default ForumLayout