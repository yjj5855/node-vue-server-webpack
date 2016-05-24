import setWindowData from '../lib/setWindowDate'

export default async function (req, res) {

    res.render('layout',setWindowData(req,`<div></div>`))
}