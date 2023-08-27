import { BsPower } from "react-icons/bs";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/store";
import { setIsLoggedIn } from "../pages/login/loginSlice";
export default function Header() {
    const location = useLocation()
    const { userData } = useAppSelector((state) => state.account)
    const dispatch = useAppDispatch()
    const logout = () => {
        localStorage.removeItem('token')
        dispatch(setIsLoggedIn(false))
    }
    return (
        location.pathname === '/login' || location.pathname === '/' ?
            <></> :
            <div className="flex font-metroSemiBold text-white justify-around items-center py-3 bg-blue-600 px-2 ">
                <div className=''>{userData?.name}</div>
                <button onClick={logout} className="flex flex-col items-center justify-center"><BsPower />Logout</button>
            </div>

    )
}