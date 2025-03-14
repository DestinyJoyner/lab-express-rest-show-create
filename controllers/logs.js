const express = require("express")
const router = express.Router()
const data = require("../models/log.js")
const {logQueries, validatePost} = require("../models/logsFunctions.js")


// root for /logs route
router.get("/", (req, resp) => {  
    const  query  = req.query
    const display = logQueries(query, [...data]) 
    
    if (Object.keys(query).length){
        display ? resp.json(display) : resp.redirect("/*")
    }
    else{
        resp.json(data)
    }
    
})

// CREATE (Post) for root route w/ validation
router.post("/", validatePost, (req, resp) => {
    data.push(req.body)
    resp.json((data.at(-1)))
})

// SHOW ROUTE for /logs
router.get("/:id", (req, resp) => {
    const {id} = req.params
    data[id] ? resp.json(data[id]) : resp.redirect("/*")
})

// DELETE (destroy) route 
router.delete("/:id", (req, resp) => {
    const {id} = req.params
    if(data[id]){
        const deletedLog = data.splice(id, 1)
        resp.status(200).json(deletedLog)
    }
    else{
        resp.redirect("/*")
    }
})

// PUT (Update) route
router.put("/:id", validatePost, (req, resp) => {
    const {id} = req.params
    if(data[id]){
        data[id] = req.body
        resp.status(200).json(data[id])
    }
    else{
        resp.redirect("/*")
    }
})

module.exports = router