import jwt from 'jsonwebtoken'


export const generateToken  =  async (email) =>{
    // console.log(email)
    const token = await jwt.sign(email,process.env.SECRET_KEY)
    return token
}