import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const UserCredentialsSpec = Joi.object()
  .keys({
    email: Joi.string().email().example("homer@simpson.com").required(),
    password: Joi.string().example("secret").required(),
  })
  .label("UserCredentials");

export const UserSpec = UserCredentialsSpec.keys({
  firstName: Joi.string().example("Homer").required(),
  lastName: Joi.string().example("Simpson").required(),
}).label("UserDetails");

export const UserSpecPlus = UserSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("UserDetailsPlus");

export const UserArray = Joi.array().items(UserSpecPlus).label("UserArray");

export const locationSpec = Joi.object()
  .keys({
    locationname: Joi.string().required().example("Piano Sonata No. 7"),
    latitude: Joi.string().required().example("Beethoven"),
    longitude: Joi.number().allow("").optional().example(12),
    placelistid: IdSpec,
  })
  .label("location");

export const locationSpecPlus = locationSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("locationPlus");

export const locationArraySpec = Joi.array().items(locationSpecPlus).label("locationArray");

export const placelistSpec = Joi.object()
  .keys({
    placelistname: Joi.string().required().example("Beethoven Sonatas"),
    userid: IdSpec,
    locations: locationArraySpec,
  })
  .label("placelist");

export const placelistSpecPlus = placelistSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("placelistPlus");

export const placelistArraySpec = Joi.array().items(placelistSpecPlus).label("placelistArray");

export const JwtAuth = Joi.object()
  .keys({
    success: Joi.boolean().example("true").required(),
    token: Joi.string().example("eyJhbGciOiJND.g5YmJisIjoiaGYwNTNjAOhE.gCWGmY5-YigQw0DCBo").required(),
  })
  .label("JwtAuth");
