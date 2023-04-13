import { jwtVerify } from 'jose';

const tokenVerify = async (req, res, next) => {
    if (req.headers) {
        let { authorization } = req.headers;
        // console.log('Auth: ' + authorization);
        // authorization = authorization.slice(1,-1);
    
        if (!authorization) return res.sendStatus(401);
    
        try {
            const encoder = new TextEncoder();
            const { payload } = await jwtVerify(
                authorization,
                encoder.encode(process.env.JWT_PRIVATE_KEY)
            );
            // console.log('Payload:' + JSON.stringify(payload));
            
            res.locals.userId = payload.userId;
            res.locals.userRole = payload.userRole;
            res.locals.userSpecialtyId = payload.userSpecialty;
    
            next();
        } catch (err) {
            console.log(err);
            return res.sendStatus(401);
        }
    }
}

export default tokenVerify;
