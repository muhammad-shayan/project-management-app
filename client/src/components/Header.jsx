import logo from './assets/logo.png'
const Header = () => {
  return (
    <nav className="navbar navbar-light bg-light mb-4">
        <a href="/" className="navbar-brand">
            <div className="d-flex">
                <img src={logo} alt="Logo" className='mx-3' />
                <div>Project Management App</div>
            </div>
        </a>
    </nav>
  )
}

export default Header