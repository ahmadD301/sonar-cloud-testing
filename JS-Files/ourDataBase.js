const fs=require('fs')
const path=require('path')

const userData=`{
    "asemhesham@gmail.com":{"username":"AsemDiab","email": "asemhesham@gmail.com","password": "123456","type":"user"},
    "ahmad@gmail.com":{"username":"ahmad","email": "ahmad@gmail.com","password": "123456","type":"user"},
    "omar@gmail.com":{"username":"omar","email": "omar@gmail.com","password": "123456","type":"user"},
    "ana@gmail.com":{"username":"ana","email": "ana@gmail.com","password": "123456","type":"user"},
    "sayed@hotmail.com":{"username":"Sayed","email": "sayed@hotmail.com","password": "123456","type":"admin"}
}`
const venueData=`{ 
    "101" :   { "venue_id": 101, "name": "Venue A", "location": "City X" ,"capcity":"100","price":"100$","Amenities":["chairs","bathroom"],"url":"101"},
    "102" :   { "venue_id": 102, "name": "Venue B", "location": "City Y" ,"capcity":"100","price":"100$","Amenities":[],"url":"102"},
    "103" :   { "venue_id": 103, "name": "Venue C", "location": "City Z" ,"capcity":"100","price":"100$","Amenities":[],"url":"103"}

}`
const eventData=`{
    "event-001" :{ "event_id": "event-001","owner":"asemhesham@gmail.com" ,"name": "Event 1", "date": "2024-03-01", "venueId": "101", "time":"3:00","theme":"black","Description":"D/D/D","Count":"100","type":"party" ,"url":"event-001"},
    "event-002" :{ "event_id": "event-002", "owner":"asemhesham@gmail.com" ,"name": "Event 2", "date": "2024-03-15", "venueId": "102", "time":"4:00","theme":"gray", "Description":"D/D/D","Count":"100","type":"party" ,"url":"event-002"}
}`

const Reservation=`{
    "Rev-0":{"rev_Id":"Rev-0","email": "asemhesham@gmail.com","reservation_id": "asemhesham@gmail.com","startTime":"4:00","endTime":"5:00","startDate": "2024-04-15","endDate": "2024-04-15"},
    "Rev-1":{"rev_Id":"Rev-1","email": "asemhesham@gmail.com","reservation_id": "102","startTime":"4:00","endTime":"5:00","startDate": "2024-03-30","endDate": "2024-04-25"} ,
    "Rev-2":{"rev_Id":"Rev-2","email": "asemhesham@gmail.com","reservation_id": "103","startTime":"4:00","endTime":"5:00","startDate": "2024-04-2","endDate": "2024-04-22"} ,
    "Rev-3":{"rev_Id":"Rev-3","email": "asemhesham@gmail.com","reservation_id": "104","startTime":"4:00","endTime":"5:00","startDate": "2024-04-1","endDate": "2024-04-2"},
    "Rev-4":{"rev_Id":"Rev-4","email": "ahmad@gmail.com","reservation_id": "105","startTime":"4:00","endTime":"5:00","startDate": "2024-04-2","endDate": "2024-04-25"} ,
    "Rev-5":{"rev_Id":"Rev-5","email": "ahmad@gmail.com","reservation_id": "106","startTime":"4:00","endTime":"1:00","startDate": "2024-04-1","endDate": "2024-04-2"} 
 
}`

const BussinessAccount=`{
    "buss-0":{"email":"asemhesham@gamil.com","PageName":"Asem-Hesham" ,"PhoneNumber":"0598138847","BussinessType":"Paatata"}    
}`



class DataHandler{
    static user;
    static venue;
    static event;
    static isreadUsers=false;
    static isreadvenue=false;
    static isreadevent=false;
    static isUpdate=false;
    constructor(){
        DataHandler.init();
    }
    static init() {
        try {

            DataHandler.userMap=new Map()
            DataHandler.venueMap=new Map()
            DataHandler.eventMap=new Map()
            DataHandler.reservationMap=new Map()
            DataHandler.BussinessAccountMap=new Map()


            let user=JSON.parse(userData);
            this.isreadUsers=true;
            for ( let key  in user){
                DataHandler.userMap.set(key,{username:user[key].username,email:user[key].email,password:user[key].password,type : user[key].type})
            }
            let venue=JSON.parse(venueData);
            for ( let key  in venue)
                DataHandler.insertVenue(key,venue[key].name,venue[key].location,venue[key].capcity,venue[key].price,venue[key].Amenities,venue[key].url)
            this.isreadvenue=true;
            let event=JSON.parse(eventData);
            this.isreadevent=true;
            for ( let key  in event){
                DataHandler.insertEvent(key,event[key].name,event[key].owner,event[key].date,event[key].venueId,event[key].time,event[key].theme,event[key].Description,event[key].Count,event[key].type)
            }
            let  reservation=JSON.parse(Reservation);
            for ( let key  in reservation){
                DataHandler.insertReservation(key,reservation[key].email,reservation[key].rev_Id
                                                ,reservation[key].startDate,reservation[key].endDate,
                                                 reservation[key].startTime,reservation[key].endTime)
            }

            let bussiness=JSON.parse(BussinessAccount)
            for( let key in bussiness)
                DataHandler.insertBussinessAccount(bussiness[key].email,bussiness[key].PageName,bussiness[key].PhoneNumber,bussiness[key].BussinessType,key)
            } catch (err) {
            console.error('Error reading JSON files:', err);
        }
    }

     static insertUser(_email,username,password,type){

        if(DataHandler.userMap.get((_email.trim()).toLowerCase())!=undefined&& !DataHandler.isUpdate)
            return;
        
        let x={
            username:username.trim(),
            email:_email.trim(),
            password:password.trim(),
            type : type.trim()
         }
        DataHandler.userMap.set((_email.trim()).toLowerCase(),x)

    }


    static insertVenue(id,name,location,capcity,price,Amenities,url){
        let x= {
            venue_id: id,
             name: name,
             location:location
            ,capcity:capcity,
            price:price,
            Amenities:String(Amenities),
            url:url
                }

             DataHandler.venueMap.set(id,x)
        this.addVenue(id.toString());


    }
    static addVenue(venueName) {
        const venueDir = path.join( venueName);

        // Check if the directory already exists
        if (fs.existsSync(venueDir)) {
            return;
        }

        // Create the directory
        fs.mkdirSync(venueDir);

    }

// Example usage
    static insertReservation(rid,email,id,startDate,endDate,startTime,endTime ){

        if(rid==undefined)
            return

        let x= {
            rev_Id:rid,
            id: id,
            startDate: startDate,
            endDate: endDate
            ,startTime:startTime
            ,endTime:endTime
            ,email:email                }

        DataHandler.reservationMap.set(rid,x)


    }
    static insertEvent(id,name,owner,date,venue,time, theme,Description,Count,type ){

        if(id==undefined)
            id=DataHandler.eventMap.size;

        let x= {
            event_id: id,
             name: name,
            owner:owner,
             date: date,
             venueId: venue
            ,time:time,
            theme:theme,
            Description:Description,
            Count:Count
            ,type:type                }

             DataHandler.eventMap.set(id,x)
            DataHandler.addVenue(id)


    }
    static insertBussinessAccount(email,pageName,phoneNumber,type,key){
        if(key==undefined)
            key='buss-'+DataHandler.eventMap.size;

        let x= {
           email:email,
            PageName:pageName,
            PhoneNumber:phoneNumber,
            BussinessType:type
        }

        DataHandler.BussinessAccountMap.set(key,x)

    }
   static updateUser(_email,username,password,type){

    if(_email==undefined)
        return;
            let row = DataHandler.userMap.get(String(_email).toLowerCase().trim());
            if(row==undefined)
                return;
                let newUsername= (username != undefined ? username :row.username);
                let newPassword= (password != undefined ? password.trim() :row.password);
                let newType= (type != undefined ? type.trim() :row.type)
                console.log("update email=",_email,"to  ",newUsername,newPassword,newType)

        DataHandler.isUpdate=true
            DataHandler.insertUser(_email,newUsername,newPassword,newType)
        DataHandler.isUpdate=false

    }
   static updateEvent(id,name,date,venue,time, theme,Description, Count, type){
       
    if(id!=undefined) {
        let row = DataHandler.eventMap.get(id);
            if(row==undefined)
            return;

            let newName = ((name != undefined && name != '') ? name :row.name);
            let newDate= ((date != undefined && date != '') ? date.trim() :row.date);
            let newVenue= ((venue != undefined && venue != '') ? venue.trim() :row.venueId);
            let newtime= ((time != undefined && time != '') ? time.trim() :row.time);
            let newtheme= ((theme != undefined && theme != '') ? theme.trim() :row.theme);
            let newDescription= ((Description != undefined && Description != '') ? Description.trim() :row.Description);
            let newCount= ((Count != undefined && Count != '')? Count.trim() :row.Count);
            let newtype= ((type != undefined &&type != '') ? type.trim() :row.type);
            DataHandler.insertEvent(id,newName,row.owner,newDate,newVenue,newtime, newtheme ,newDescription, newCount, newtype);
        }
    }
}

module.exports=DataHandler;