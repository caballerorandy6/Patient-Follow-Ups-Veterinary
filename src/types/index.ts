export type Patient = {
  id: string;
  name: string;
  caretaker: string;
  email: string;
  date: Date;
  symptoms: string;
  maxLength: number;
  minLength: number;
};

export type DrafPatient = Omit<Patient, "id">;

export type PatientState = {
  patients: Patient[];
  activeId: Patient["id"];
  addPatient: (data: DrafPatient) => void;
  deletePatient: (id: Patient["id"]) => void;
  getPatientById: (id: Patient["id"]) => void;
  updatePatient: (data: DrafPatient) => void;
};

export type PatientDetailsProps = {
  patient: Patient;
};

export type PatientDetailItemProps = {
  label: string;
  data: string;
};
