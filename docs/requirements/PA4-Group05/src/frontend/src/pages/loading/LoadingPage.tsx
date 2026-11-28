import './LoadingPage.css'
import bottom_logo from '../../shared/assets/image/bottom_logo.svg'
import top_logo from '../../shared/assets/image/top_logo.svg'
import left_logo from '../../shared/assets/image/left_logo.svg'
import right_logo from '../../shared/assets/image/right_logo.svg'

function LoadingPage() {
    return <div className="loading_page">
        <div className="plus-grid">
            <div className="cell img-top">
            <img src={top_logo} alt="Top" />
            </div>
            <div className="cell img-bottom">
            <img src={bottom_logo} alt="Bottom" />
            </div>
            <div className="cell img-right">
            <img src={right_logo} alt="Right" />
            </div>
            <div className="cell img-left">
            <img src={left_logo} alt="Left" />
            </div>
        </div>
        <p className="app_name">STUDITOPIA</p>
        <p className='message'>Setting up your study space ... </p>
    </div>
    
}

export default LoadingPage