"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var fireSchema = new mongoose_1.Schema(
  {
    fields: {
      type: Map,
      of: mongoose_1.Schema.Types.Mixed,
    },
  },
  { _id: false }
);
var motorSchema = new mongoose_1.Schema(
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
    od: {
      type: mongoose_1.Schema.Types.Mixed,
    },
    theft: {
      type: mongoose_1.Schema.Types.Mixed,
    },
    vbi: String,
    vpd: String,
    autoPa: String,
    aog: String,
    aogPrem: Number,
    lossOfUse: String,
    chassisNo: String,
    color: String,
  },
  { _id: false }
);
var cglSchema = new mongoose_1.Schema(
  {
    fields: {
      type: Map,
      of: mongoose_1.Schema.Types.Mixed,
    },
  },
  { _id: false }
);
var bondSchema = new mongoose_1.Schema(
  {
    fields: {
      type: Map,
      of: mongoose_1.Schema.Types.Mixed,
    },
  },
  { _id: false }
);
var marineSchema = new mongoose_1.Schema(
  {
    fields: {
      type: Map,
      of: mongoose_1.Schema.Types.Mixed,
    },
  },
  { _id: false }
);
var personal_accidentSchema = new mongoose_1.Schema(
  {
    fields: {
      type: Map,
      of: mongoose_1.Schema.Types.Mixed,
    },
  },
  { _id: false }
);
var endorsementSchema = new mongoose_1.Schema(
  {
    fields: {
      type: Map,
      of: mongoose_1.Schema.Types.Mixed,
    },
  },
  { _id: false }
);
var remarksSchema = new mongoose_1.Schema(
  {
    note: String,
  },
  { _id: false }
);
var PolicySchema = new mongoose_1.Schema(
  {
    creator: {
      type: mongoose_1.Types.ObjectId,
    },
    updatedByAgent: {
      type: mongoose_1.Types.ObjectId,
    },
    updatedByAgentName: {
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
    policyNo: String,
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
    insuranceOrNo: String,
    insuranceOrNoDate: {
      type: Date,
    },
    remarks: {
      type: [remarksSchema],
    },
    motor: motorSchema,
    fire: fireSchema,
    cgl: cglSchema,
    bond: bondSchema,
    marine: marineSchema,
    personal_accident: personal_accidentSchema,
    endorsement: endorsementSchema,
  },
  { timestamps: true, versionKey: false }
);
exports.Policy = mongoose_1.models.Policy || (0, mongoose_1.model)("Policy", PolicySchema);
