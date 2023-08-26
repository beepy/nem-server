import Joi from 'joi';
import { objectId } from '../validate/custom.validation';
import { NewCreatedPatient } from './patient.interfaces';

const createPatientBody: Record<keyof NewCreatedPatient, any> = {
  name: Joi.string().required(),
};

export const createPatient = {
  body: Joi.object().keys(createPatientBody),
};

export const getPatients = {
  query: Joi.object().keys({
    name: Joi.string(),
    sortBy: Joi.string(),
    projectBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

export const getPatient = {
  params: Joi.object().keys({
    patientId: Joi.string().custom(objectId),
  }),
};

export const updatePatient = {
  params: Joi.object().keys({
    patientId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
    })
    .min(1),
};

export const deletePatient = {
  params: Joi.object().keys({
    patientId: Joi.string().custom(objectId),
  }),
};
