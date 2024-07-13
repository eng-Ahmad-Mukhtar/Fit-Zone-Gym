const AysncHandler = require("express-async-handler")

var exec = require('child_process').exec
const Subscriber = require('../Models/subiscriper');
const moment = require("moment");



const admin_page = AysncHandler(async (req, res) => {

    res.status(200).render("admin")

})







const adding_new_subiscription = AysncHandler(async (req, res) => {
    const { name, duration, pricePaid, comments } = req.body;

    try {
        let subscriber = await Subscriber.findOne({ name });

        if (!subscriber) {
            // إذا لم يتم العثور على المشترك، قم بإنشاءه
            subscriber = new Subscriber({ name, subscriptions: [] });
        }


const newSubscription = {
        duration: duration,
    
       
        comments: comments,
        amount: pricePaid,
         date: Date.now() 
    };

    subscriber.subscriptions.push(newSubscription);
    await subscriber.save();
    res.redirect("/admin")
    }
    catch(error){
        console.log(error);
        res.status(500).json({ error: 'حدث خطأ في إضافة الاشتراك' });
    }

})

const one_subiscription_information = AysncHandler(async (req, res) => {
    const data = req.session.students || [];
    res.status(200).render("subiscription_information" , {data , moment})

})

const name_search = AysncHandler(async (req, res) => {
    try {
        var regex = new RegExp(req.query["term"], 'i');
        var substitute = Subscriber.find({ name: regex }, { 'name': 1 }).limit(6);

        // Use await to handle the promise returned by exec()
        var data = await substitute.exec();
        
        var result = [];
        if (data && data.length > 0) {
            data.forEach(element => {
                let obj = {
                    label: element.name
                };
                result.push(obj);
            });
        }
        
        res.jsonp(result);
    } catch (err) {
        res.status(500).send(err);
    }
});


const search_subiscription  = AysncHandler(async (req, res) => {
const {name} =req.body
const dataArray = await Subscriber.find({name:name}); 
req.session.students=dataArray
res.redirect('/subiscription_information');
    

})

// **********************************
const all_subiscription = AysncHandler(async (req, res) => {

    const subscriptions = req.session.students || [];
    const total = req.session.total ;
    
    res.status(200).render("all_subiscription_information" , { total, subscriptions , moment})

})
//  *******************************
const all_subiscription_by_history = AysncHandler(async (req, res) => {
  
  
  
  
  
  
  
    try {
        const { history } = req.body;
        
        // Log the input history
 

        // Parse the date string using moment
        const formattedDate = moment(history, 'YYYY-MM').startOf('month').toDate();
        const endOfMonth = moment(history, 'YYYY-MM').endOf('month').toDate();

        // Log the parsed dates

        // Validate the parsed dates
        if (isNaN(formattedDate.getTime()) || isNaN(endOfMonth.getTime())) {
            throw new Error('Invalid date format');
        }

        // Query the database
        const data = await Subscriber.find({
            "subscriptions.date": {
                $gte: formattedDate,
                $lt: endOfMonth
            }
        });

        // Filter and map the results
        const filteredSubscriptions = data.flatMap(user =>
            user.subscriptions.filter(subscription =>
                subscription.date >= formattedDate && subscription.date < endOfMonth
            ).map(subscription => ({
                ...subscription.toObject(),
                userName: user.name
            }))
        );

        // Calculate total amount
        let total = 0;
        filteredSubscriptions.forEach(subscription => { 
            total += subscription.amount;
        });

        // Set session variables
        req.session.total=total;
            req.session.students=filteredSubscriptions;

        // Redirect to the subscribers page
        res.status(200).redirect("/all_subiscripers");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});
  
  
  
  
  
  
  
  
  
  
  
  
//     const {history} = req.body
//     console.log(history);
//     const formattedDate = moment(history, 'M/YYYY').startOf('month').toDate();
//     const endOfMonth = moment(formattedDate).endOf('month').toDate();

// console.log(formattedDate ,endOfMonth );
//     const data = await Subscriber.find({
//         "subscriptions.date": {
//             $gte: formattedDate,
//             $lt: endOfMonth
//         }
//     });
//     const filteredSubscriptions = data.flatMap(user =>
//         user.subscriptions.filter(subscription =>
//             subscription.date >= formattedDate && subscription.date < endOfMonth
//         ).map(subscription => ({
//             ...subscription.toObject(),
//             userName: user.name
//         }))
//     );


//     let total =0 ;
//     filteredSubscriptions.forEach(user => { 
     
//           total += user.amount 
            
//     })
//     req.session.total=total;
//     req.session.students=filteredSubscriptions;
//     res.status(200).redirect("/all_subiscripers")

// })
// ************************************************************
module.exports = {
    admin_page,
    one_subiscription_information,
    adding_new_subiscription,
    name_search,
    search_subiscription,
    all_subiscription,
    all_subiscription_by_history
    
}


