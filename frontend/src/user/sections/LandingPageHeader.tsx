import '../../assets/css/layouts/layouts.css';
import 'boxicons';
import Swal from 'sweetalert2'
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronDown, faFileInvoice,
            faGear, faGaugeHigh, faBars,faX
    } from '@fortawesome/free-solid-svg-icons'
import { MdDashboard, MdInventory, MdPayments, MdPointOfSale } from "react-icons/md";
import { TbReportMoney } from "react-icons/tb";
import { FaLayerGroup, FaListAlt, FaSalesforce, FaShoppingCart } from 'react-icons/fa';
import { RxAvatar } from 'react-icons/rx';
import { getPharmacyDetailsApi } from './pharmacy/apiCalls/getPharmcyDetails';
import { useDispatch, useSelector } from 'react-redux';
import { setPharmacyListDetails } from '../../redux/pharmacyListDetails';
import { RootState } from '../../redux/store';
import { setRerender } from '../../redux/rerender';
import { getSessionStorage } from '../controllers/getSessionStorage';
import { server_baseurl } from '../../baseUrl';
import { pharmLogo } from '../../assets/images';

export default function LandingPageHeader() {

    const [plus, setPlus] = useState(true)
    const [plus2, setPlus2] = useState(true)
    const [plus3, setPlus3] = useState(true)
    const [plus4, setPlus4] = useState(true)
    const [plus5, setPlus5] = useState(true)
    const [plus6, setPlus6] = useState(true)
    const pathname = window.location.pathname
    // const [pathName, setPathName] = useState('/')
    const [render, setRender] = useState(true)
    const [headerToggle, setHeaderToggle] = useState(false)
    const [activeLink, setActiveLink] = useState("dashboard")
    const [headerNavManu, setheaderNavManu] = useState(true)
    const [toggleProfile, setToggleProfile] = useState(false)
    const [activePharmacy, setActivePharmacy] = useState()
    // const [user, setUser] = useState({first_name: "", user_id: null})
    // const [localPharm, setLocalPharm] = useState({})

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const pharmacyListDetails = useSelector((state: RootState) => state.pharmacyListDetailsList) 

    const userPharm = getSessionStorage();
    const {localPharm} = userPharm.localPharm
    const {user} = userPharm.user
    
    useEffect(() =>{
        const medicineList = getPharmacyDetailsApi()
        medicineList.then(data =>{
            if(!activePharmacy) {
                userPharm.localPharm.available? 
                    setActivePharmacy(userPharm.localPharm.localPharm) : 
                    setActivePharmacy(data[0]);
            }
            dispatch(setPharmacyListDetails(data));
        })
    },[pharmacyListDetails.length === 0])

    useEffect(()=>{
        const pharm = activePharmacy || localPharm || pharmacyListDetails[0]
        sessionStorage.setItem("activepharmacy", JSON.stringify(pharm));
        dispatch(setRerender());
    },[activePharmacy])

    const headerTogglehandle = () => {
        setHeaderToggle(!headerToggle)
        setheaderNavManu(!headerNavManu)
    }
    const toggleProfileClick = () =>{
        console.log(toggleProfile);
        
        setToggleProfile(!toggleProfile);
    }

    useEffect(() => {
        const headerSection = document.getElementById('header');
        if ( headerSection !== null) {
            headerToggle && headerSection.classList.add('body-pd')
            headerToggle !== true && headerSection.classList.remove('body-pd')
        }
    }, [headerToggle])

    const updateActive = () => {
        setRender(!render)
    }

    const handleLinkClick: React.MouseEventHandler<HTMLAnchorElement>= (e) =>{
        setRender(!render); 
        const target = e.currentTarget as HTMLAnchorElement;

        const value = target.id;
        setActiveLink(value) 
        setHeaderToggle(false)
        setheaderNavManu(false)        
    }

    const logoutHandle=()=>{
        Swal.fire({
            icon: 'warning',
            title: 'Are you sure you want to log out!',
            showCancelButton: true,
            confirmButtonText: 'Yes',
          }).then((result) => {
            
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                sessionStorage.clear();
                navigate("/user/login")
                window.location.reload();
      
            } else if (result.isDenied) {
              Swal.fire('Changes are not saved', '', 'info')
            }
          })
    }

    return (
        <>
        <div >
            <header 
            className="header mb-4 dropdown body-pd border-bottom border " id="header">
                <div onClick={headerTogglehandle} className="header_toggle" id="header-toggle">
                    {headerNavManu ? <FontAwesomeIcon icon={faBars} /> : <FontAwesomeIcon icon={faX} />}
                </div>
                    <div onClick={toggleProfileClick}
                    style={{cursor: "pointer"}}
                    className="d-flex align-items-center dropdown-toggle" data-bs-toggle="dropdown">
                        <span className="header_img"> <RxAvatar  size={32}/> </span> 
                        <span className="ms-1">{user?.first_name}({user?.user_id})</span> 
                    </div>
                
                    <ul  className={`dropdown-menu droping position-absolute ${toggleProfile? ' show' : ''}`} 
                        style={{padding: '0, 2rem'}} aria-labelledby="dropdownMenuButton1" >
                        {
                        pharmacyListDetails.map((data, i) =>(
                            <li key={i} onClick={() => {
                            setActivePharmacy(data);
                            toggleProfileClick();
                        }
                            }>
                                <Link onClick={()=>toggleProfileClick()} className="dropdown-item" to="#">
                                    {data?.pharmacy_name}
                                </Link>
                            </li>
                        ))
                        }
                        <li><Link onClick={()=>toggleProfileClick()} 
                        className="dropdown-item" to="/user/register-pharmacy">Register Pharmacy</Link></li>
                        <li className="dropdown-item" onClick={logoutHandle}>Log Out</li>
                    </ul>
            </header>
            {/* <div>
                <p></p>
            </div> */}
 
            <div className="manubar">
                <div className={`l-navbar menubar scroll-bar ${headerToggle ? "show" : ""}`} id="nav-bar">
                    <nav className="nav">
                        <div> 
                            <Link to="/user/dashboard" className="nav_logo"> 
                                <img src={`${pharmLogo}`} alt=""
                                className='rounded' 
                                style={{height: "30px", width:"30px"}}/>
                                <span className="text-white ">{activePharmacy?.pharmacy_name}</span> 
                            </Link>

                            <div className="nav_list">
                                
                                <Link onClick={handleLinkClick} id='dashboard' to= "/user/dashboard"
                                className={`${activeLink === 'dashboard'? 'text-white font-weight-bold ' :"" }nav_link`}>
                                    <MdDashboard />
                                    <span className="nav_name ">Dashboard</span>
                                </Link>
                                <Link onClick={handleLinkClick} to={{ pathname: '/user/session',
                                    state: { activePharmacy },
                                  }}id='session'
                                className={`${activeLink === 'session'? 'text-white font-weight-bold ' :"" }nav_link`}>
                                    <MdPointOfSale />
                                    <span className="nav_name ">Session</span>
                                </Link>
                                
                                <div className="accordion" id="accordionExample">
                                    <div className="accordion-item">
                                        <p className="accordion-header" id="headingOne">
                                            <Link  to="#" type="button"
                                                data-toggle="collapse" data-target="#paymentSystem" aria-expanded="true" 
                                                aria-controls="paymentSystem" id='inventory' 
                                                className={`${activeLink === 'inventory'? 'text-white font-weight-bold ' :"" }nav_link`}>
                                                <MdInventory id='inventory'/>
                                                <span className="nav_name "  id='inventory'>Invetory <b>{plus ? <FontAwesomeIcon icon={faChevronLeft} /> : <FontAwesomeIcon icon={faChevronDown} />}</b></span>
                                            </Link>
                                        </p>
                                        <div id="paymentSystem" className="collapse " aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                            <div className="accordion-body">
                                                <Link onClick={handleLinkClick} to="/user/inventory/medicine-list" className={`nav_link ${pathname == "/mobailBank/bKash" && 'active'}`}>
                                                    <FaListAlt />
                                                    <span className="nav_name">List of Medicines</span>
                                                </Link>
                                                <Link onClick={handleLinkClick} to="/user/inventory/medicine-group" className={`nav_link ${pathname == "/manage-bankTransfer" && 'active'}`}>
                                                    <FaLayerGroup style={{color: ""}}/>
                                                    <span className="nav_name">Medicine Groups</span>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion" id="accordionExample">
                                    <div className="accordion-item">
                                        <p className="accordion-header" id="headingOne">
                                            <Link  to="#" type="button" id='report'
                                            data-toggle="collapse" data-target="#systemSetting" aria-expanded="true" aria-controls="systemSetting" 
                                            className={`${activeLink === 'report'? 'text-white font-weight-bold ' :"" }nav_link`}>
                                                <TbReportMoney size={20}/>
                                                <span className="nav_name " id='report'
                                                >Reports <b>{plus2 ? <FontAwesomeIcon icon={faChevronLeft} /> : <FontAwesomeIcon icon={faChevronDown} />}</b></span>
                                            </Link>
                                        </p>
                                        <div id="systemSetting" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                            <div className="accordion-body">
                                                <Link onClick={handleLinkClick} to="/user/report/sales" className={`nav_link ${pathname == "/system-setting/app-setting" && 'active'}`}>
                                                    <FaSalesforce  style={{color: ""}}/>
                                                    <span className="nav_name">Sales Report</span>
                                                </Link>
                                              
                                                <Link onClick={handleLinkClick} to="/user/report/payments" className={`nav_link ${pathname == "/system-setting/templete" && 'active'}`}>
                                                    <MdPayments style={{color: ""}}/>
                                                    <span className="nav_name">Payments Report</span>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                             {/*    <div className="accordion" id="accordionExample">
                                    <div className="accordion-item">
                                        <p className="accordion-header" id="headingOne">
                                            <Link onClick={updateActive} to="#" type="button" onClick={() => setPlus4(!plus4)} data-bs-toggle="collapse" data-bs-target="#addons" aria-expanded="true" aria-controls="addons" className={`nav_link`}>
                                                <FontAwesomeIcon icon={faPuzzlePiece} />
                                                <span className="nav_name ">Addons <b>{plus4 ? <FontAwesomeIcon icon={faChevronLeft} /> : <FontAwesomeIcon icon={faChevronDown} />}</b></span>
                                            </Link>
                                        </p>
                                        <div id="addons" className="accordion-collapse collapse " aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                            <div className="accordion-body">
                                                <Link onClick={updateActive} to="/sms-transaction" className={`nav_link ${pathname == "/sms-transaction" && 'active'}`}>
                                                <FontAwesomeIcon icon={faMessage} />
                                                    <span className="nav_name">Sms Transaction</span>
                                                </Link>
                                                <Link onClick={updateActive} to="/sms-setting/bulksmsbd" className={`nav_link ${pathname == "/sms-setting/bulksmsbd" && 'active'}`}>
                                                <FontAwesomeIcon icon={faMessage} />
                                                    <span className="nav_name">Sms List</span>
                                                </Link>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion" id="accordionExample">
                                    <div className="accordion-item">
                                        <p className="accordion-header" id="headingOne">
                                            <Link onClick={updateActive} to="#" type="button" onClick={() => setPlus6(!plus6)} data-bs-toggle="collapse" data-bs-target="#rollManagement" aria-expanded="true" aria-controls="paymentSystem" className={`nav_link `}>
                                            <FontAwesomeIcon icon={faUsersGear} />
                                                <span className="nav_name ">Role Management <b>{plus6 ? <FontAwesomeIcon icon={faChevronLeft} /> : <FontAwesomeIcon icon={faChevronDown} />}</b></span>
                                            </Link>
                                        </p>
                                        <div id="rollManagement" className="accordion-collapse collapse " aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                            <div className="accordion-body">
                                                <Link onClick={updateActive} to="/role-user" className={`nav_link ${pathname == "/role-user" && 'active'}`}>
                                                    <FontAwesomeIcon icon={faPenToSquare} />
                                                    <span className="nav_name">Role Create</span>
                                                </Link>
                                                <Link onClick={updateActive} to="/role-access" className={`nav_link ${pathname == "/role-access" && 'active'}`}>
                                                <FontAwesomeIcon icon={faEye} />
                                                    <span className="nav_name">Role Access</span>
                                                </Link>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Link onClick={updateActive} to="/theme-market" className={`nav_link ${pathname == "/theme-market" && 'active'}`}>
                                    <FontAwesomeIcon icon={faStore} />
                                    <span className="nav_name">Theme Market</span>
                                </Link> */}
                                <Link onClick={handleLinkClick} to="/user/change-pass" id='changepass'
                                className={`${activeLink === 'changepass'? 'text-white font-weight-bold ' :"" }nav_link`}>
                                    <FontAwesomeIcon icon={faGear} />
                                    <span className="nav_name" id='changepass'>Change Password</span>
                                </Link>
                                {/* <Link onClick={updateActive} to="/activities" className={`nav_link ${pathname == "/activities" && 'active'}`}>
                                    <FontAwesomeIcon icon={faListCheck} />
                                    <span className="nav_name">Activity Logs</span>
                                </Link> */}
                                {/* <div className="accordion" id="accordionExample">
                                    <div className="accordion-item">
                                        <p className="accordion-header" id="headingOne">
                                            <Link onClick={updateActive} to="#" type="button" onClick={() => setPlus5(!plus5)} data-bs-toggle="collapse" data-bs-target="#help" aria-expanded="true" aria-controls="help" className={`nav_link `}>
                                                <FontAwesomeIcon icon={faCircleInfo} />
                                                <span className="nav_name ">Help <b>{plus5 ? <FontAwesomeIcon icon={faChevronLeft} /> : <FontAwesomeIcon icon={faChevronDown} />}</b></span>
                                            </Link>
                                        </p>
                                        <div id="help" className="accordion-collapse collapse " aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                            <div className="accordion-body">
                                                <Link onClick={updateActive} to="/general-setting" className={`nav_link `}>
                                                    <FontAwesomeIcon icon={faGear} />
                                                    <span className="nav_name">General Setting</span>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                                <Link onClick={logoutHandle} to="#" id='logout'
                                className={`${activeLink === 'logout'? 'text-white font-weight-bold ' :"" }nav_link`}>
                                    <FontAwesomeIcon icon={faFileInvoice} />
                                    <span className="nav_name">Logout</span>
                                </Link>
                            </div>
                        </div> 
                    </nav>
                </div>
            </div>

        </div>
        <Outlet />
        </>
    )
}