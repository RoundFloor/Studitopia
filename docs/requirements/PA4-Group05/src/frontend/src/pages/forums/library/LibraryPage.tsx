import { useState } from 'react'
import './LibraryPage.css'
import arrowRight from '../../../shared/assets/icon/arrow-right.svg'
import arrowDown from '../../../shared/assets/icon/arrow-down.svg'
import searchIcon from '../../../shared/assets/icon/search.svg'

type BadgeTone = 'lavender' | 'coral' | 'mint' | 'yellow'
type Resource = {
    title: string
    badge: 'NOTES' | 'EXAM' | 'BOOK'
    tone: BadgeTone
}

type Section = {
    title: string
    note: string
    action: 'Open resource' | 'Continue learning'
    resources: Resource[]
}

const tabs = [
    { label: 'All', width: 98 },
    { label: 'Books', width: 110 },
    { label: 'Exams', width: 110 },
    { label: 'Recommended', width: 172 },
    { label: 'Saved', width: 120 },
    { label: 'My Storage', width: 152 }
]

const filters = [
    { label: 'FORMAT', value: 'ALL FORMATS' },
    { label: 'SUBJECT', value: 'COMPUTER SCIENCE' },
    { label: 'COURSE', value: 'ALL COURSES' },
    { label: 'UNIVERSITY / MAJOR', value: 'ALL UNIVERSITIES' },
    { label: 'ACCESS', value: 'ANY ACCESS' }
]

const popularTags = ['#algorithms', '#study-guide', '#past-paper']

const sections: Section[] = [
    {
        title: 'FOR YOU',
        note: 'Because you study Computer Science',
        action: 'Open resource',
        resources: [
            { title: 'Algorithms, made visual', badge: 'NOTES', tone: 'lavender' },
            { title: 'Data Structures · Mock Exam', badge: 'EXAM', tone: 'coral' },
            { title: 'A practical guide to Python', badge: 'BOOK', tone: 'mint' }
        ]
    },
    {
        title: 'TOP READING',
        note: 'What your campus is opening this week',
        action: 'Open resource',
        resources: [
            { title: 'A practical guide to Python', badge: 'BOOK', tone: 'mint' },
            { title: 'Discrete Maths, one step at a time', badge: 'BOOK', tone: 'lavender' },
            { title: 'Designing for people', badge: 'BOOK', tone: 'yellow' }
        ]
    },
    {
        title: 'YOUR COURSE PROGRESS',
        note: 'Next up in COMP21111 · Week 6 of 12',
        action: 'Continue learning',
        resources: [
            { title: 'Algorithms, made visual', badge: 'NOTES', tone: 'lavender' },
            { title: 'Computer Systems · Past Paper', badge: 'EXAM', tone: 'yellow' },
            { title: 'Data Structures · Mock Exam', badge: 'EXAM', tone: 'coral' }
        ]
    },
    {
        title: 'STARTER SETS',
        note: 'A good place to begin',
        action: 'Open resource',
        resources: [
            { title: 'Discrete Maths, one step at a time', badge: 'BOOK', tone: 'lavender' },
            { title: 'A practical guide to Python', badge: 'BOOK', tone: 'mint' },
            { title: 'Designing for people', badge: 'BOOK', tone: 'yellow' }
        ]
    }
]

function ResourceCard({ resource, action }: { resource: Resource, action: Section['action'] }) {
    return <article className="library_card">
        <span className={`library_card_badge ${resource.tone}`}>{resource.badge}</span>
        <h3 className="library_card_title">{resource.title}</h3>
        <span className="library_card_action">{action} <span aria-hidden>→</span></span>
    </article>
}

function LibraryPage() {
    const [activeTab, setActiveTab] = useState('Recommended')
    const [keyword, setKeyword] = useState('')
    const [tagQuery, setTagQuery] = useState('')
    const [selectedTags, setSelectedTags] = useState<string[]>([])
    const [subject, setSubject] = useState(filters[1].value)

    function toggleTag(tag: string) {
        setSelectedTags(current => current.includes(tag) ? current.filter(item => item !== tag) : [...current, tag])
    }

    return <div className="library_page">
        <header className="library_header">
            <div className="library_heading">
                <p className="library_breadcrumb">Home&nbsp; /&nbsp; Library&nbsp; /&nbsp; Recommended</p>
                <h2 className="library_title">LEARNING RESOURCE LIBRARY</h2>
                <p className="library_subtitle">Good resources. Great breakthroughs. Find it, save it, pass it on.</p>
            </div>
            <div className="library_count">1,248 SHARED RESOURCES</div>
        </header>

        <nav className="library_tabs" aria-label="Library sections">
            {tabs.map(tab => <button
                key={tab.label}
                type="button"
                style={{ width: tab.width }}
                className={`library_tab ${activeTab === tab.label ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.label)}>
                {tab.label}
                {activeTab === tab.label && <img src={arrowRight} alt="" />}
            </button>)}
        </nav>

        <section className="library_search_panel">
            <div className="library_search_row">
                <label className="library_search_field keyword">
                    <img src={searchIcon} alt="" />
                    <input
                        value={keyword}
                        onChange={event => setKeyword(event.target.value)}
                        placeholder="Search titles, authors, courses or keywords…"
                        aria-label="Search resources" />
                </label>
                <label className="library_search_field tag">
                    <img src={searchIcon} alt="" />
                    <input
                        value={tagQuery}
                        onChange={event => setTagQuery(event.target.value)}
                        placeholder="Search #tags…"
                        aria-label="Search tags" />
                </label>
                <button type="button" className="library_button secondary">Filters&nbsp; ↑</button>
                <button type="button" className="library_button primary">Search <img src={arrowRight} alt="" /></button>
            </div>

            <div className="library_filters">
                {filters.map(filter => <div className="library_filter" key={filter.label}>
                    <label>{filter.label}</label>
                    <div className="library_select">
                        <select
                            value={filter.label === 'SUBJECT' ? subject : filter.value}
                            onChange={event => filter.label === 'SUBJECT' && setSubject(event.target.value)}
                            aria-label={filter.label}>
                            <option>{filter.value}</option>
                        </select>
                        <img src={arrowDown} alt="" />
                    </div>
                </div>)}
            </div>

            <div className="library_panel_footer">
                <div className="library_active_chip">Computer Science&nbsp;&nbsp; ×</div>
                <span className="library_popular_label">Popular tags:</span>
                {popularTags.map(tag => <button
                    key={tag}
                    type="button"
                    className={`library_tag ${selectedTags.includes(tag) ? 'selected' : ''}`}
                    onClick={() => toggleTag(tag)}>
                    {tag}
                </button>)}
                <span className="library_hint">Select tags to narrow results</span>
                <button type="button" className="library_clear" onClick={() => setSelectedTags([])}>Clear all</button>
            </div>
        </section>

        <div className="library_recommendations">
            {sections.map(section => <section className="library_section" key={section.title}>
                <div className="library_section_heading">
                    <h3>{section.title}</h3>
                    <span>{section.note}</span>
                </div>
                <div className="library_card_grid">
                    {section.resources.map((resource, index) => <ResourceCard
                        key={`${section.title}-${resource.title}-${index}`}
                        resource={resource}
                        action={section.action} />)}
                </div>
            </section>)}
        </div>
    </div>
}

export default LibraryPage
