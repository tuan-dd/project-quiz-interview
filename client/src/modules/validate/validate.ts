import { ETypeQuestions } from '@/types/enums/typeQuestions';
import * as Yup from 'yup';

export const INVALID_FIELDS = {
  MIN_USERNAME: 'validation.messages.minUserName',
  MAX_USERNAME: 'validation.messages.maxUserName',
  EMAIL_INVALID: 'validation.messages.emailInvalid',
  EMAIL_EXIST: 'validation.messages.emailExist',
  REQUIRED: 'validation.messages.required',
  MIN_PASSWORD: 'validation.messages.minPassword',
  MAX_PASSWORD: 'validation.messages.maxPassword',
  MIN_NAME: 'validation.messages.minName',
  MAX_NAME: 'validation.messages.maxName',
  PHONE_INVALID: 'validation.messages.phoneInvalid',
  SUBDOMAIN_INVALID: 'validation.messages.subdomainInvalid',
  SUBDOMAIN_NOT_MATCH: 'validation.messages.subdomainNotMatch',
  PASSWORD_NOT_MATCH: 'validation.messages.passwordNotMatch',
  NOT_INCLUDE_SPACE: 'validation.messages.notInclideSpace',
  SURVEY_INVALID: 'validation.messages.surveyInvalid',
  SURVEY_DUPLICATE: 'validation.messages.duplicateSurvey',
  ALLERGEN_DUPLICATE: 'validation.messages.duplicateAllergen',
  CATEGORY_DUPLICATE: 'validation.messages.duplicateCategory',
  PREFERENCE_DUPLICATE: 'validation.messages.duplicateDietPreference',
  INGREDIENT_DUPLICATE: 'validation.messages.duplicateIngredient',
  NUTRIENT_DUPLICATE: 'validation.messages.duplicateNutrient',
  CUISINE_DUPLICATE: 'validation.messages.duplicateCuisine',
  DIET_DUPLICATE: 'validation.messages.duplicateDiet',
  MIN_NUMBER: 'validation.messages.minNumber',
  MAX_NUMBER: 'validation.messages.maxNumber',
  MAX_DESCRIPTION: 'validation.messages.maxDescription',
  PASS_VALID: 'validation.messages.passValid',
  REQUIRE_TO_PASS: 'validation.messages.requireToPass',
  DAY_OF_BIRTH_CAN_NOT_BE_IN_THE_FUTURE:
    'validation.messages.theDateOfBirthCanNotBeInTheFutureTime',
  FEEDBACK_APPOINTMENT: 'validation.messages.feedbackAppointment',
  WEIGHT_MIN_NUMBER: 'validation.messages.weightMinNumber',
  HEIGHT_MIN_NUMBER: 'validation.messages.heightMinNumber',
  ONLY_SUPPORT_ALPHABET: 'validation.messages.onlySupportAlphabet',
};

export const passReg = /^(?=.*[0-9]).{6,20}$/;
export const phoneRegExp = /^[-\s\\.]?[0-9]{3}[-\s\\.]?[0-9]{4,7}$/;
export const alphabetRegex = /^[a-zA-Z0-9!@#\$%\^\&*\)\( +=._-]+$/g;

const yupString = Yup.string().matches(alphabetRegex, INVALID_FIELDS.ONLY_SUPPORT_ALPHABET);

export const passwordYup = Yup.string()
  .trim(INVALID_FIELDS.NOT_INCLUDE_SPACE)
  .strict(true)
  .matches(passReg, INVALID_FIELDS.PASS_VALID)
  .required(INVALID_FIELDS.REQUIRED);

export const phoneYup = Yup.string()
  .trim()
  .matches(phoneRegExp, INVALID_FIELDS.PHONE_INVALID)
  .required(INVALID_FIELDS.REQUIRED);

export const firstNameYup = yupString
  .min(2, INVALID_FIELDS.MIN_NAME)
  .max(50, INVALID_FIELDS.MAX_NAME);

export const lastNameYup = yupString
  .min(2, INVALID_FIELDS.MIN_NAME)
  .max(50, INVALID_FIELDS.MAX_NAME);

export const passwordConfirmYup = Yup.string()
  .required(INVALID_FIELDS.REQUIRED)
  .oneOf([Yup.ref('password')], INVALID_FIELDS.PASSWORD_NOT_MATCH);

export const CUSTOMER_FORM_SCHEMA = Yup.object().shape({
  firstName: firstNameYup.required(INVALID_FIELDS.REQUIRED),
  lastName: lastNameYup.required(INVALID_FIELDS.REQUIRED),
  password: passwordYup,
  phone: phoneYup,
  confirmPassword: passwordConfirmYup,
});

export const CREATE_QUIZ_VALIDATION = {
  submitQuiz: Yup.object().shape({
    quizId: yupString.required(),
    quizVersionId: yupString.required(),
    answers: Yup.array(
      Yup.object({
        id: Yup.number().integer().positive().required(),
        answerIds: Yup.array(Yup.number().required()).min(1).required(),
      }),
    ).required(),
  }),
  selectAnswer: Yup.object().shape({
    quizId: yupString.required(),
    quizVersionId: yupString.required(),
    answers: Yup.array(
      Yup.object({
        id: Yup.number().integer().positive().required(),
        answerIds: Yup.array(Yup.number().required()).required(),
      }),
    ).required(),
  }),
};
