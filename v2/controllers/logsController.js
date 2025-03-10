const express = require("express")
const router = express.Router()
const data = require("../../models/log.js")


router.get("/", (req, resp) => {
    let display = ""
    data.forEach((obj, i) => 
       display += `
        <li>
            <a href="/v2/logs/${i}">${obj.captainName}</a>
        </li>`
    )
    resp.send(`<ul>${display}</ul>`)
})

router.get("/:index", (req, resp) => {
    const {index} = req.params
    if(data[index]){
    const backButton = `
    <button>
        <a href ="/v2/logs"
        >V2 Logs Home</a>
    </button>`
    
    const showData = `
    <h1>${data[index].title}</h1>
    <p>${data[index].post}</p>
    ${backButton}`

    resp.send(showData)
    }
    else{
        resp.redirect("/*")
    }
})

module.exports = router