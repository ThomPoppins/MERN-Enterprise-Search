import mongoose from 'mongoose'
// TODO: [MERNSTACK-101] Fix this schema and reconsider the fields
const companyProjectSchema = new mongoose.Schema(
    {
      companyIds: {
        type: Array,
        ref: 'Company',
        required: true,
      },
      projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true,
      },
      employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true,
      },
      customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true,
      },
      vendorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vendor',
        required: true,
      },
      storyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Story',
        required: true,
      },
      reviewId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
        required: true,
      },
      ratingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rating',
        required: true,
      },
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      serviceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        required: true,
      },
      revenueId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Revenue',
        required: true,
      },
      costId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cost',
        required: true,
      },
      premiumId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Premium',
        required: true,
      },
      public: {
        type: Boolean,
        required: true,
      },
    },
    {
      timestamps: true,
    },
  ),
  CompanyProject = mongoose.model('CompanyProject', companyProjectSchema)

export default CompanyProject
