import { Link } from "react-router-dom";

const MedicineSelectNavbar =({groupNames, setShowGroup, setSearchMedicine}) =>{

    return(
      <nav className="navbar navbar-expand navbar-light bg-body-tertiary bg-light w-100 "
        style={{height: "2.8rem"}}>
        <div className="px-2 bg-light collapse navbar-collapse col-6 h-100" id="navbarNavDropdown" >
          <ul className="flex justify-content-between align-items-center navbar-nav col-12">
              <Link onClick={() => setShowGroup("All")}
                className="navbar-brand" to="#">&nbsp; All
              </Link>
              <div className="dropdown">
                    <button className="btn dropdown-toggle border-0" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                      Groups
                    </button>
                    <ul className="dropdown-menu " aria-labelledby="dropdownMenuButton1">
                      {
                        groupNames?.map((groupName, i) => (
                          <li onClick={() => setShowGroup(groupName)} className="nav-item active" key={i}>
                            <Link className="dropdown-item" to="#">
                              {groupName}
                            </Link>
                          </li>
                        ))
                      }
                    </ul>
                  </div>
            <form className="form-inline my-2 my-lg-0 col-4">
              <input onChange={(e) =>setSearchMedicine(e.target.value)}
              className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
            </form>
          </ul>
        </div>
      </nav>
    )
}

export default MedicineSelectNavbar
