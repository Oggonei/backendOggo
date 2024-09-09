import transporter from "../emailConnection.js"

const loginEmail = async (email) => {
    const info = await transporter.sendMail({
        from: 'notificaciones@oggo.com.co', // sender address
        to: email, // list of receivers
        subject: "Cuenta verificada exitosamente", // Subject line
        text: "Cuenta verificada exitosamente, ya puedes ingresar a OGGO en frontURL/login", // plain text body
        html: `<b>Tu cuenta ha sido verificada exitosamente, puedes ingresar a OGGO en el <a href=frontURL/login>siguiente link</a></b>` // html body
    })
    console.log('Mensaje de confirmación enviado: ',info.messageId)
    return info
}

export default loginEmail