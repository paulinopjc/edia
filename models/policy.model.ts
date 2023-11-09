import { Schema, model, Document, models, Types } from "mongoose";

const motorSchema = new Schema(
  {
    issueDate: String,
    inception: String,
    expiry: String,
    insurer: String,
    assured: String,
    address: String,
    modelMakeRisk: String,
    plate: String,
    totalPrem: Number,
    grossPrem: Number,
    deductible: Number,
    motor: String,
    mvFile: String,
    serial: {
      type: String,
    },
    od: {
      type: Schema.Types.Mixed,
      default: "0",
    },
    odP: {
      type: Schema.Types.Mixed,
      default: "0",
    },
    vbi: {
      type: Schema.Types.Mixed,
      default: "0",
    },
    vbiP: {
      type: Schema.Types.Mixed,
      default: "0",
    },
    vpd: {
      type: Schema.Types.Mixed,
      default: "0",
    },
    vpdP: {
      type: Schema.Types.Mixed,
      default: "0",
    },
    theft: {
      type: Schema.Types.Mixed,
      default: "0",
    },
    theftP: {
      type: Schema.Types.Mixed,
      default: "0",
    },
    autoPa: {
      type: Schema.Types.Mixed,
      default: "0",
    },
    autoPaP: {
      type: Schema.Types.Mixed,
      default: "0",
    },
    aog: {
      type: Schema.Types.Mixed,
      default: "0",
    },
    aogP: {
      type: Schema.Types.Mixed,
      default: "0",
    },
    docStamp: {
      type: Schema.Types.Mixed,
      default: "0",
    },
    vat: {
      type: Schema.Types.Mixed,
      default: "0",
    },
    others: {
      type: Schema.Types.Mixed,
      default: "0",
    },
    govtTax: {
      type: Schema.Types.Mixed,
      default: "0",
    },
    lu: {
      type: Schema.Types.Mixed,
      default: "0",
    },
    luP: {
      type: Schema.Types.Mixed,
      default: "0",
    },
    ld: {
      type: Schema.Types.Mixed,
      default: "0",
    },
    ldP: {
      type: Schema.Types.Mixed,
      default: "0",
    },
    // lossOfUse: String,
    other: {
      fieldName: String,
      sumIssued: String,
      premium: String,
    },
    chassisNo: String,
    color: String,
  },
  { _id: false }
);

const remarksSchema = new Schema(
  {
    note: String,
  },
  { _id: false }
);

const particularDynamicFieldSchema = new Schema(
  {
    particularHeaderName: { type: String },
    particular: { type: String },
    premium: { type: String },
  },
  { _id: false }
);

const PolicySchema = new Schema(
  {
    soaNo: {
      type: String,
    },
    creator: {
      type: Types.ObjectId,
    },
    updatedByAgent: {
      type: Types.ObjectId,
    },
    updatedByAgentName: {
      type: String,
    },
    producer: {
      type: String,
    },
    type: {
      type: String,
      require: true,
    },
    insurer: String,
    line: String,
    giaIssuedDate: {
      type: Date,
    },
    policyNo: {
      type: String,
    },
    inception: {
      type: Date,
    },
    assured: String,
    expiry: {
      type: Date,
    },
    mailingAddress: String,
    giaAr: String,
    giaDate: {
      type: Date,
    },
    giaOr: String,
    giaARDate: Date,
    insuranceOrNo: String,
    insuranceOrNoDate: {
      type: Date,
    },

    remarks: {
      type: [remarksSchema],
    },
    motor: motorSchema,
    fire: [particularDynamicFieldSchema],
    cgl: [particularDynamicFieldSchema],
    bond: [particularDynamicFieldSchema],
    marine: [particularDynamicFieldSchema],
    personal_accident: [particularDynamicFieldSchema],
    endorsement: [particularDynamicFieldSchema],
    docStamp: {
      type: String,
    },
    vat: {
      type: String,
    },
    others: {
      type: String,
    },
    govtTax: {
      type: String,
    },
    deductibles: {
      type: String,
      default: "0",
    },
    amountDue: { type: String },
  },
  { timestamps: true, versionKey: false, _id: true }
);

const Policy = models.Policy || model("Policy", PolicySchema);

export default Policy;
