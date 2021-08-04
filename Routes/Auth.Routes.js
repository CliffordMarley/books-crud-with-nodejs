
module.exports = router=>{

    router.post('/login', (req, res)=>{
        console.log("Login requested")
        res.json({status:"success", message:"Login was successful!"})
    })

    return router
}