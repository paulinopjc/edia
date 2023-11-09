// export interface InsurancePolicy {
//   giaArNo: string;
//   giaArDate: Date;
//   insurerOrNo: string;
//   insurerOrDate: Date;
//   giaOrNo: string;
//   giaOrDate: Date;
//   sa: string;
//   insurer: string;
//   assured: string;
//   mailingAddress: string;
//   locationOfRisk: string;
//   policy: string;
//   issuedDate: Date;
//   inception: Date;
//   expiry: Date;
//   particulars: string;
//   plate: string;
//   sumInsured: number;
//   premium: number;
//   lgt: number;
//   vat: number;
//   dst: number;
//   otherCharges: number;
//   totalAmount: number;
//   line: string;
//   deductible: number;
//   serial: string;
//   chassisNo: string;
//   mvFile: string;
//   mortgagee: string;
//   color: string;
//   od: number;
//   theft: number;
//   vBi: number;
//   vPd: number;
//   autoPA: number;
//   aog: number;
//   rscc: number;
//   lossOfUse: number;
//   odPrem: number;
//   theftPrem: number;
//   vBiPrem: number;
//   vPdPrem: number;
//   autoPAPrem: number;
//   aogPrem: number;
//   lossOfUsePrem: number;
//   accidentalDeathOrDismemberment: number;
//   medicalExpenses: number;
//   uma: number;
//   building1: number;
//   building2: number;
//   contents1: number;
//   contents2: number;
//   others: number;
//   invoiceNoMarineOnly?: string;
//   blNoMarineOnly?: string;
//   remarks1?: string;
//   remarks2?: string;
//   remarks3?: string;
//   remarks4?: string;
//   etc1?: string;
//   etc2?: string;
// }

// export interface InsurancePolicyOld {
//   sa: string;
//   insurer: string;
//   assured: string;
//   address: string;
//   policy: string;
//   issueDate: string;
//   inception: string;
//   expiry: string;
//   modelMakeRisk: string;
//   plate: string;
//   sumInsured: string;
//   totalPrem: string;
//   grossPrem: string;
//   deductible: string;
//   serial: string;
//   motor: string;
//   mvFile: string;
//   od: string;
//   theft: string;
//   vbi: string;
//   vpd: string;
//   autoPa: string;
//   aog: string;
//   lossOfUse: string;
//   odPrem: string;
//   theftPrem: string;
//   vBiOrPrem: string;
//   vPdOrPrem: string;
//   autoPaOrPrem: string;
//   aogOrPrem: string;
//   lossOfUseOrPrem: string;
//   _id?: string;
//   updatedAt?: string;
//   creator?: string;
// }

// export interface InsurancePolicy {
//   issueDate: string;
//   inception: string;
//   expiry: string;
//   giaArDate: string;
//   insurerOrDate: string;
//   giaOrDate: string;
//   serial: string;
//   policy: string;
//   sa: string;
//   insurer: string;
//   assured: string;
//   address?: string;
//   modelMakeRisk?: string;
//   plate?: string;
//   totalPrem?: string;
//   grossPrem?: string;
//   deductible?: string | number;
//   motor?: string;
//   mvFile?: string;
//   od?: string | number;
//   theft?: string | number;
//   vbi?: string;
//   vpd?: string;
//   autoPa?: string;
//   aog?: string;
//   lossOfUse?: string;
//   odPrem?: string | number;
//   theftPrem?: string | number;
//   vBiOrPrem?: string;
//   vPdOrPrem?: string;
//   autoPaOrPrem?: string;
//   aogOrPrem?: string;
//   lossOfUseOrPrem?: string;
//   _id?: string;
//   updatedAt?: string;
//   updatedByAgentName?: string;
//   updatedByAgent: string;
//   creator?: string;
//   giaArNo?: string;
//   insurerOrNo?: string;
//   giaOrNo?: string;
//   mailingAddress?: string;
//   locationOfRisk?: string;
//   particulars?: string;
//   sumInsured?: number;
//   premium?: number;
//   lgt?: number;
//   vat?: number;
//   dst?: number;
//   otherCharges?: number;
//   totalAmount?: number;
//   line?: string;
//   chassisNo?: string;
//   mortgagee?: string;
//   color?: string;
//   vBi?: number;
//   vPd?: number;
//   autoPA?: number;
//   aogPrem?: number;
//   lossOfUsePrem?: number;
//   vBiPrem?: number;
//   vPdPrem?: number;
//   autoPAPrem?: number;
//   rscc?: number;
//   accidentalDeathOrDismemberment?: number;
//   medicalExpenses?: number;
//   uma?: number;
//   building1?: number;
//   building2?: number;
//   contents1?: number;
//   contents2?: number;
//   others?: number;
//   invoiceNoMarineOnly?: string;
//   blNoMarineOnly?: string;
//   remarks1?: string;
//   remarks2?: string;
//   remarks3?: string;
//   remarks4?: string;
//   etc1?: string;
//   etc2?: string;
// }

// export interface GIAInsurancePolicy {
//   _id?: string;
//   insurer: string;
//   line: string;
//   giaIssuedDate: Date;
//   policyNo: string;
//   inception: Date;
//   assured: string;
//   expiry: Date;
//   mailingAddress: string;
//   giaAr: string;
//   giaDate: Date;
//   giaOr: string;
//   insuranceOrNo: string;
//   insuranceOrNoDate: Date;
//   type: PolicyTypes;
//   motor?: Motor;
//   premium?: Premium;
//   remarks: Remarks[];
//   etc: string[]
// }

// export interface Motor {
//   plateNo: string;
//   motorEngineNo: string;
//   serialChassisNo: string;
//   color: string;
//   mvFileNo: string;
// }

// export interface Premium {
//   ctpl: number;
//   ctplPrem: number;
//   ownDamage: number;
//   odPrem: number;
//   theft: number;
//   theftPrem: number;
//   actsOfGod: number;
//   aogPrem: number;
//   bi: number;
//   biPrem: number;
//   pd: number;
//   pdPrem: number;
//   autoPa: number;
//   autoPaPrem: number;
//   others: number;
//   deductible: number;
//   mortgage: number;
// }
interface DocumentResult<T> {
  _doc: T;
}
export interface InsurancePolicy extends DocumentResult<InsurancePolicy> {
  _id?: string;
  soaNo: string;
  insurer: string;
  line: string;
  producer: string;
  giaIssuedDate: Date;
  policyNo: string;
  inception: Date;
  assured: string;
  expiry: Date;
  mailingAddress: string;
  giaAr: string;
  giaArDate: string;
  giaDate: Date;
  giaOr: string;
  insuranceOrNo: string;
  insuranceOrNoDate: Date;
  remarks: Remarks[];
  etc: string[];
  type: PolicyTypes;
  motor?: Motor;
  fire?: DynamicField[];
  cgl?: DynamicField[];
  bond?: DynamicField[];
  marine?: DynamicField[];
  personal_accident: DynamicField[];
  endorsement: DynamicField[];
  hmo: DynamicField[];
  ctpl: DynamicField[];
  docStamp: string;
  deductibles: string;
  vat: string;
  govtTax: string;
  others: string;
  amountDue: string;
}

export interface Motor extends DocumentResult<Motor> {
  issueDate: string;
  inception: string;
  expiry: string;
  insurer: string;
  serial: string;
  assured: string;
  address?: string;
  modelMakeRisk?: string;
  plate?: string;
  totalPrem?: string;
  grossPrem?: string;
  deductible?: string | number;
  motor?: string;
  mvFile?: string;
  od?: string;
  odP?: string;
  theft?: string;
  theftP?: string;
  vbi?: string;
  vbiP?: string;
  vpd?: string;
  vpdP?: string;
  autoPa?: string;
  autoPaP?: string;
  aog?: string;
  aogP?: string;
  ld?: string;
  ldP?: string;
  lu?: string;
  luP?: string;
  other?: {
    fieldName: string;
    sumIssued: string | number;
    premium: string;
  };
  chassisNo?: string;
  color?: string;
}

export interface DynamicField extends DocumentResult<DynamicField> {
  particularHeaderName: string;
  particular: string;
  premium: string;
}

export interface Remarks {
  note: string;
}

export enum PolicyTypes {
  MOTOR = "MOTOR",
  FIRE = "FIRE",
  CGL = "CGL",
  BOND = "BOND",
  MARINE = "MARINE",
  PERSONAL_ACCIDENT = "PERSONAL_ACCIDENT",
  ENDORSEMENT = "ENDORSEMENT",
  HMO = "HMO",
  CTPL = "CTPL",
}

export enum MotorLabels {
  od = "OD",
  theft = "THEFT",
  vbi = "V-BI",
  vpd = "V-PD",
  autoPa = "AUTO PA",
  aog = "AOG",
  lu = "LU",
  ld = "LD",
}
