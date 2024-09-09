import transporter from "../emailConnection.js"

const deleteUserEmail = async (token,email) => {
    const info = await transporter.sendMail({
        from: 'notificaciones@oggo.com.co', // sender address
        to: email, // list of receivers
        subject: "Verify OGGO Acount", // Subject line
        text: "Verify OGGO Acount", // plain text body
        html: `<b>Para verificar tu cuenta ingresa al <a href=frontURL/${token}>siguiente link</a></b>` // html body
    })
    console.log('Mensaje enviado: ',info.messageId)
    return info
}

export default deleteUserEmail