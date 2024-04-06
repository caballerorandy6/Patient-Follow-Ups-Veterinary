import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
// npm i --save-dev @types/uuid "Esto es para que no de error en la importación de uuidv4"
import { v4 as uuidv4 } from "uuid";
import { DrafPatient, Patient, PatientState } from "../types";

//Anadiendo el id al paciente ya que es de tipo DrafPatient y no lo tiene
const createPatient = (patient: DrafPatient): Patient => {
  return { ...patient, id: uuidv4() };
};

//Creamos el store para el state de los pacientes
export const usePatientStore = create<PatientState>()(
  devtools(
    persist(
      (set) => ({
        patients: [],
        activeId: "",
        addPatient: (data) => {
          const newPatient = createPatient(data);
          set((state) => ({
            patients: [...state.patients, newPatient],
          }));
        },
        deletePatient: (id) => {
          set((state) => ({
            patients: state.patients.filter((patient) => patient.id !== id),
          }));
        },
        getPatientById: (id) => {
          //  No requiere pasarle el state pq vamos a estar trabajando sobre un id que ya existe y no necesitamos el state anterior
          set(() => ({
            activeId: id,
          }));
        },
        updatePatient: (data) => {
          set((state) => ({
            patients: state.patients.map((patient) =>
              patient.id === state.activeId
                ? { id: state.activeId, ...data }
                : patient
            ),
            // Despues de actualizar el paciente, limpiamos el activeId
            activeId: "",
          }));
        },
      }),
      {
        name: "patient-storage",
        // storage: createJSONStorage(() => localStorage), Este es el storage por defecto
        // storage: createJSONStorage(() => sessionStorage), Este es el storage para session storage
      }
    )
  )
);
