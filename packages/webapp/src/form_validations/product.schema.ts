import * as yup from 'yup';

export const createProductSchema = yup.object().shape({
  name: yup.string().max(150).required(),
  description: yup.string().max(400).required(),
  category: yup.string(),
  nutritionalInformation: yup
    .array()
    .of(yup.string())
    .default(() => []),
  retentionTime: yup.number(),
  reheatingInstructions: yup
    .object({
      reheatMode: yup.string(),
      reheatInstructions: yup.string(),
    })
    .required(),
  availability: yup.boolean().required(),
  servings: yup.number().min(1),
});
