import './app-info.css'

function AppInfo({increased, employees}) {
    return(
        <div className='app-info'>
            <h1>Александр Малиновский</h1>
            <h2>Общее число публикаций: {employees}</h2>
            <h2>Понравилось публикаций: {increased}</h2>
        </div>
    )
}

export default AppInfo;