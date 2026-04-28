const mongoose = require('mongoose'); 

  

const employeeSchema = new mongoose.Schema( 

  { 

    firstName: { 

      type: String, 

      required: true, 

      trim: true 

    }, 

    lastName: { 

      type: String, 

      required: true, 

      trim: true 

    }, 

    email: { 

      type: String, 

      required: true, 

      unique: true, 

      lowercase: true, 

      trim: true 

    }, 

    phone: { 

      type: String, 

      required: true, 

      trim: true 

    }, 

    department: { 

      type: String, 

      required: true, 

      trim: true 

    }, 

    position: { 

      type: String, 

      required: true, 

      trim: true 

    }, 

    salary: { 

      type: Number, 

      required: true, 

      min: 0 

    }, 

    joiningDate: { 

      type: Date, 

      required: true 

    }, 

    createdBy: { 

      type: mongoose.Schema.Types.ObjectId, 

      ref: 'User' 

    } 

  }, 

  { timestamps: true } 

); 

  

module.exports = mongoose.model('Employee', employeeSchema);
