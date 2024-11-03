import valid from "card-validator";
import { FormattedMessage } from "react-intl";

export default function validateInfo(values) {
  let errors = {};

  let creditCard = valid.number(values.number);
  creditCard.expirationDate = valid.expirationDate(values.expiry);
  creditCard.cvv = valid.cvv(values.cvc);
  creditCard.cardholderName = valid.cardholderName(values.name);
  
  errors.show = true;
  errors.variant = 'danger';
  errors.message = <FormattedMessage id="erro_desconhecido"></FormattedMessage>
  errors.cname = false;
  errors.cnumber = false;
  errors.cexp = false;
  errors.ccvv = false;
  
  if (!values.number || !creditCard.isValid) {
    errors.message =  <FormattedMessage id="numbercard_invalid"></FormattedMessage>
  } else {
    errors.cnumber = true;
  }

  if (!values.name || !creditCard.cardholderName.isValid) {
    errors.message = 'O nome do titular do cartão é inválido';
  } else {
    errors.cname = true;
  }

  if (!values.expiry || !creditCard.expirationDate.isValid) {
    errors.message = 'A data de validade do cartão é inválida';
  } else {
    errors.cexp = true;
  }

  if (!values.cvc || values.cvc.trim().length !== 3 || !creditCard.cvv.isValid) {
    errors.message = 'O código de segurança do cartão é inválido';
  } else {
    errors.ccvv = true;
  }
  
  if (errors.cname && errors.cnumber && errors.cexp && errors.ccvv) {
    errors.variant = 'success';
    errors.message = 'O cartão de crédito é válido';
  }

  return errors;
}
