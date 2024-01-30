import { Link } from "react-router-dom";

const MedicineSelectNavbar =({groupNames, setShowGroup, setSearchMedicine}) =>{

    return(
      <nav className="navbar navbar-expand navbar-light bg-body-tertiary bg-light w-100 "
        style={{height: "2.8rem"}}>
        <Link onClick={() => setShowGroup("All")}
        className="navbar-brand pl-2" to="#">&nbsp; All</Link>
        <button className="navbar-toggler shadow-sm" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" 
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className=" bg-light collapse navbar-collapse col-6" id="navbarNavDropdown" >
          <ul className="flex justify-content-between navbar-nav col-12">
              <li className="nav-item dropdown">
                  <Link className="nav-link dropdown-toggle" to="#" role="button" data-toggle="dropdown" aria-expanded="false">
                    Select Group
                  </Link>
                <ul className="dropdown-menu">
                  {groupNames?.map((groupName, i) => (
                    <li onClick={() => setShowGroup(groupName)} className="nav-item active" key={i}>
                      <Link className="dropdown-item" to="#">
                        {groupName}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            <form className="form-inline my-2 my-lg-0">
              <input onChange={(e) =>setSearchMedicine(e.target.value)}
              className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
            </form>
          </ul>
        </div>
      </nav>
    )
}

export default MedicineSelectNavbar

{/* <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Features</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Pricing</a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown link
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</nav> */}