import { listenerCount } from "process"
import Admin from "./pages/Admin"
import Auth from "./pages/Auth"
import List from "./pages/List"

import { ADMIN_ROUTE, LISTS_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from "./utils/consts"

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: LISTS_ROUTE,
        Component: List
    },
]

export const publicRoutes =[
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
]