import './Navbar.css';
function Navbar(){
  return (
    <div>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossOrigin="anonymous" />
        <link href="sticky-footer.css" rel="stylesheet" />
        <link rel="canonical" href="https://getbootstrap.com/docs/5.0/examples/sticky-footer/" />
        <link href="/docs/5.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
      
    <nav className="navbar navbar-expand-lg navbar-light p-3 mb-5">
    <div className="container-fluid">
      <p className="logo">vo<span style={{color: '#9B72AA', fontFamily: '"cabin"', fontWeight: 600, fontSize: '32px'}}>ii</span>r</p>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav ms-auto">
          <a className="nav-link" href="#" style={{color: 'black'}}>Login</a>
          <a className="nav-link" href="#" style={{color: 'black'}}>Saved</a>
        </div>
      </div>
    </div>
  </nav>
  </div>
  );
  
}

export default Navbar;