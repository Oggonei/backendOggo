import transporter from "../emailConnection.js"

const deleteUserEmail = async (token,email) => {
    const info = await transporter.sendMail({
        from: 'notificaciones@oggo.com.co', // sender address
        to: email, // list of receivers
        subject: "Delete OGGO Acount", // Subject line
        text: "Delete OGGO Acount", // plain text body
        html: `<p>Su cuenta ha sido eliminada satisfactoriamente</p>` // html body
    })
    console.log('Mensaje enviado: ',info.messageId)
    return info
}

export default deleteUserEmail