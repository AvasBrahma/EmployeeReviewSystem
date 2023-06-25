const mongoose= require("mongoose");
const performanceSchema=new mongoose.Schema({
       empname:{
        type: String,
        required: true
       },
     reviewdate:{
        type: Date,
        required: true
     },
     performancecriteria:{
        type: String,
        required: true
     },
     feedback:{
        type: String,
        required: true
     },
     rating:{
        type: Number,
        required: true
     },
      feedbackstatus:{
      type: String,
      enum: ['pending', 'submitted'],
      default: 'pending'
  },
  employeefeedback:{
    type: String
  },
        employee:{
            type:mongoose.Schema.Types.ObjectId,
            ref: 'Project'
        },
        reviewer:{
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