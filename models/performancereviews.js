const mongoose= require("mongoose");
const performanceSchema=new mongoose.Schema({
       empname:{
        type: String,
        required: true
       },
     reviewdate:{
        type: Date
     },
     performancecriteria:{
        type: String
     },
     feedback:{
        type: String,
     },
     rating:{
        type: Number,
     },
      feedbackstatus:{
      type: String,
      enum: ['AssignedToReviewer','Pending', 'Submitted'],
      default: 'AssignedToReviewer'
  },
  employeefeedback:{
    type: String
  },
        employeeid:{
            type:mongoose.Schema.Types.ObjectId,
            ref: 'Employee'
        },
        reviewerid:{
            type:mongoose.Schema.Types.ObjectId,
            ref: 'Admin'
            
        },
        reviewername:{
         type: String,
         required: true
        },
        assignorid:{
            type:mongoose.Schema.Types.ObjectId,
            ref: 'Admin'
        },
        assignorname:{
         type: String,
         required: true
        },

       
    },{
        timestamps:true
    });
    
    module.exports=mongoose.model('PerformanceReview', performanceSchema);