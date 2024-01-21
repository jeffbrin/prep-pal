import { jwtDecode } from "jwt-decode"
export function getAccessToken(req, res, next) {
    let jwtBody;
    try {
        jwtBody = jwtDecode(req.appSession.id_token)
    } catch (e) {
        next()
        return
    }
    req.firstName = jwtBody.given_name
    req.lastName = jwtBody.family_name
    req.email = jwtBody.email
    next()
}