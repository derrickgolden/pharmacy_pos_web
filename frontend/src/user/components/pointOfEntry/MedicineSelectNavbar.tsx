import { Link } from "react-router-dom";

const MedicineSelectNavbar =({groupNames, setShowGroup, setSearchMedicine}) =>{
  // console.log(groupNames);
  
    return(
      <nav className="navbar navbar-expand-lg navbar-light bg-light w-100 "
        style={{height: "2.8rem"}}>
        <Link onClick={() => setShowGroup("All")}
        className="navbar-brand pl-2" to="#">&nbsp; All</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="flex justify-content-between collapse navbar-collapse" id="navbarSupportedContent" >
          <div className="scrollable-list">
            <ul className="navbar-nav mr-auto">
              {groupNames?.map((groupName, i) => (
                <li onClick={() => setShowGroup(groupName)} className="nav-item active" key={i}>
                  <Link className="nav-link" to="#">
                    {groupName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <form className="form-inline my-2 my-lg-0">
            <input onChange={(e) =>setSearchMedicine(e.target.value)}
            className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
          </form>
        </div>
      </nav>
    )
}

export default MedicineSelectNavbar